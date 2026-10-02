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

  const contents = incomingMessages.slice(-12).flatMap((message) => {
    const role = message?.role === 'assistant' ? 'model' : message?.role;
    const text = typeof message?.content === 'string' ? message.content.trim() : '';
    if (!['user', 'model'].includes(role) || !text) return [];
    return [{ role, parts: [{ text: text.slice(0, 4000) }] }];
  });

  if (contents.length === 0 || contents[contents.length - 1].role !== 'user') {
    return res.status(400).json({ message: 'The last chat message must be from the user.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const result = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: 'You are the YR Learning AI mentor. Give clear, accurate help with programming, course curricula, and learning paths. Keep answers concise and never claim access to private account data.',
      },
    });
    const reply = result.text?.trim();
    if (!reply) throw new Error('Gemini returned an empty response.');
    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Gemini chat request failed:', error.message);
    return res.status(502).json({ message: 'Gemini could not generate a reply. Please try again.' });
  }
};

module.exports = { generateReply };