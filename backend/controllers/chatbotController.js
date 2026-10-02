const { GoogleGenAI } = require('@google/genai');

const generateReply = async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      message: 'Gemini chat is not configured. Set GEMINI_API_KEY in the backend environment.',
    });
  }

  const incomingMessages = req.body?.messages;
  if (!Array.isArray(incomingMessages) || incomingMessages.length === 0) {
    return res.status(400).json({ message: 'Send at least one chat message.' });
  }

  const rawContents = incomingMessages.slice(-12).flatMap((message) => {
    const role = message?.role === 'assistant' ? 'model' : message?.role;
    const text = typeof message?.content === 'string' ? message.content.trim() : '';
    if (!['user', 'model'].includes(role) || !text) return [];
    return [{ role, parts: [{ text: text.slice(0, 4000) }] }];
  });

  // Ensure conversation turns alternate properly without consecutive duplicates
  const contents = [];
  for (const item of rawContents) {
    if (contents.length > 0 && contents[contents.length - 1].role === item.role) {
      contents[contents.length - 1].parts[0].text += `\n${item.parts[0].text}`;
    } else {
      contents.push(item);
    }
  }

  if (contents.length === 0 || contents[contents.length - 1].role !== 'user') {
    return res.status(400).json({ message: 'The last chat message must be from the user.' });
  }

  // Model candidates with fallback support (e.g. if gemini-3.8-flash hits 503 high demand spikes)
  const candidateModels = [
    process.env.GEMINI_MODEL,
    'gemini-3.5-flash-lite',
    'gemini-3.5-flash',
    'gemini-3.8-flash',
  ].filter(Boolean);

  const uniqueModels = [...new Set(candidateModels)];

  const ai = new GoogleGenAI({ apiKey });
  let lastError = null;

  for (const model of uniqueModels) {
    try {
      const result = await ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction: 'You are the YR Learning AI mentor. Give clear, accurate help with programming, course curricula, and learning paths. Keep answers concise, helpful, and properly formatted with bullet points and code snippets where appropriate. Never claim access to private account data.',
        },
      });

      const reply = result.text?.trim();
      if (reply) {
        return res.status(200).json({ reply, modelUsed: model });
      }
    } catch (error) {
      console.warn(`Gemini attempt with model "${model}" failed:`, error.message);
      lastError = error;
    }
  }

  console.error('All Gemini model candidates failed. Last error:', lastError?.message);
  return res.status(502).json({
    message: 'The AI assistant is temporarily unavailable. Please try again shortly.',
    error: lastError?.message || 'Unknown error',
  });
};

module.exports = { generateReply };