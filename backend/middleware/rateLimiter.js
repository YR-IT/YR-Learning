const rateLimit = require('express-rate-limit');

// 1. IP-level Login Rate Limiter (Brute-Force & Credential Stuffing Protection)
// Limits failed login attempts to 5 per 15 minutes per IP.
// Successful logins do not count against the limit.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 failed attempts per IP window
  skipSuccessfulRequests: true, // Only count 4xx / 5xx responses
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message: 'Too many failed login attempts from this IP. For security reasons, please try again in 15 minutes.',
      retryAfterMinutes: 15,
    });
  },
});

// 2. Account-Level Brute-Force Tracker (Targeted account protection)
// If a specific email experiences 5 consecutive failures, lock attempts for that email for 15 minutes
const failedAttemptsByEmail = new Map();

// Periodic cleanup of expired lockouts every 10 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [email, record] of failedAttemptsByEmail.entries()) {
    if (record.lockedUntil && record.lockedUntil < now) {
      failedAttemptsByEmail.delete(email);
    }
  }
}, 10 * 60 * 1000).unref();

const accountLockoutProtection = (req, res, next) => {
  const email = (req.body?.email || '').toLowerCase().trim();
  if (!email) return next();

  const record = failedAttemptsByEmail.get(email);
  if (record && record.lockedUntil && Date.now() < record.lockedUntil) {
    const remainingMinutes = Math.max(1, Math.ceil((record.lockedUntil - Date.now()) / 60000));
    return res.status(429).json({
      success: false,
      message: `This account is temporarily locked due to multiple failed login attempts. Please try again in ${remainingMinutes} minute(s).`,
      retryAfterMinutes: remainingMinutes,
    });
  }

  // Attach tracker functions to request
  req.recordLoginSuccess = () => {
    failedAttemptsByEmail.delete(email);
  };

  req.recordLoginFailure = () => {
    const current = failedAttemptsByEmail.get(email) || { count: 0, lockedUntil: null };
    current.count += 1;
    if (current.count >= 5) {
      current.lockedUntil = Date.now() + 15 * 60 * 1000;
      console.warn(`🔒 Account locked out due to brute-force attempts: ${email}`);
    }
    failedAttemptsByEmail.set(email, current);
  };

  next();
};

// 3. Chatbot Rate Limiter (AI Resource & Cost Abuse Protection)
// 10 messages per minute burst limit per IP
const chatbotPerMinuteLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message: 'You are sending messages too quickly to the AI assistant. Please wait a moment before sending another message.',
      retryAfterSeconds: 60,
    });
  },
});

// 30 messages per 10 minutes window per IP
const chatbotGeneralLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message: 'You have reached the message limit for the AI assistant. Please wait a few minutes before asking more questions.',
      retryAfterMinutes: 10,
    });
  },
});

// 4. Chatbot Payload & Length Validation Middleware
const validateChatbotInput = (req, res, next) => {
  const { message, prompt, history } = req.body || {};
  const query = (message || prompt || '').trim();

  let textToCheck = query;
  if (!textToCheck && Array.isArray(history) && history.length > 0) {
    const last = history[history.length - 1];
    textToCheck = (last.content || last.text || '').trim();
  }

  if (textToCheck && textToCheck.length > 2000) {
    return res.status(400).json({
      success: false,
      message: 'Message is too long. Please keep your question under 2,000 characters.',
    });
  }

  // Prevent sending bloated history payloads
  if (Array.isArray(history) && history.length > 25) {
    req.body.history = history.slice(-20);
  }

  next();
};

// 5. Global API Rate Limiter (Protects general endpoints from aggressive scraping / flood)
const generalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 400, // 400 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return res.status(429).json({
      success: false,
      message: 'Too many requests from this IP. Please slow down and try again shortly.',
    });
  },
});

module.exports = {
  loginLimiter,
  accountLockoutProtection,
  chatbotPerMinuteLimiter,
  chatbotGeneralLimiter,
  validateChatbotInput,
  generalApiLimiter,
};
