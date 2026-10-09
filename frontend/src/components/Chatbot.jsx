import React, { useState } from 'react';
import { Bot, Sparkles, Send, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import chatService from '../services/chatService';

export default function Chatbot() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your YR-Elearning AI Assistant. How can I help you today with your coding courses, syllabus, or technical questions?',
      time: 'Just now'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    "🚀 Recommend a course for Full Stack Dev",
    "🧠 What is the best way to master DSA?",
    "⚡ Explain React Hooks with simple examples",
    "💼 How to build a portfolio that gets hired?"
  ];

  const handleSend = async (text) => {
    const query = (text || inputVal).trim();
    if (!query || loading) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const prevHistory = messages
      .filter((m, idx) => idx > 0 && !m.isError)
      .slice(-10)
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text,
      }));
    const history = [...prevHistory, { role: 'user', content: query }];

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setLoading(true);

    try {
      const reply = await chatService.sendMessage(history);
      setMessages((prev) => [...prev, {
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'I could not connect to the AI assistant. Please ensure the backend server is running and try again.';
      setMessages((prev) => [...prev, {
        sender: 'bot',
        text: errorMsg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isError: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-slate-900 p-4 sm:p-6 transition-all dark:from-slate-900 dark:via-indigo-950 dark:to-slate-950 dark:text-white ${isFullScreen ? 'fixed inset-0 z-50 pt-4' : ''}`}>
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        {/* Top Header Card */}
        <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur-xl border border-slate-200 dark:border-gray-700/60 rounded-2xl p-4 sm:p-5 mb-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Bot size={24} className="text-white" />
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">YR AI Learning Mentor</h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30 flex items-center gap-1">
                  <Sparkles size={10} /> Powered by AI
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-gray-400">Ask coding doubts, course guidance, roadmaps, and interview preparation</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
              className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition-all dark:text-gray-400 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700"
            >
              <Maximize2 size={16} />
            </button>
          </div>
        </div>

        {/* Quick prompt suggestions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                handleSend(prompt);
              }}
              className="text-xs bg-white/80 hover:bg-white border border-slate-200 text-slate-700 hover:text-slate-950 px-3 py-1.5 rounded-xl transition-all dark:bg-gray-800/60 dark:hover:bg-gray-700/80 dark:border-gray-700/60 dark:text-gray-300 dark:hover:text-white"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white/95 dark:bg-gray-900/90 backdrop-blur-xl border border-slate-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[540px]">
            <div className="flex flex-col h-full flex-1 p-4 sm:p-6">
              {/* Message List */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {messages.map((m, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.sender === 'bot' && (
                      <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow">
                        <Bot size={18} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                        m.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm'
                          : 'bg-slate-100 border border-slate-200 text-slate-800 rounded-tl-sm dark:bg-gray-800 dark:border-gray-700/60 dark:text-gray-200'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{m.text}</p>
                      <span className="block text-[10px] text-slate-500 dark:text-gray-400 mt-1.5 text-right">{m.time}</span>
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                      <Bot size={18} className="text-white" />
                    </div>
                    <div className="bg-slate-100 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-600 flex items-center gap-2 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Box */}
              <div className="pt-4 border-t border-slate-200 flex items-center gap-2 dark:border-gray-800">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask any programming or course question..."
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-500"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputVal.trim() || loading}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-5 py-3 rounded-xl font-medium text-sm flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30"
                >
                  <span>Send</span>
                  <Send size={16} />
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
