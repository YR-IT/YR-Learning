import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Maximize2, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import chatService from '../services/chatService';

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi there! 👋 I am your YR AI Mentor. How can I help you accelerate your tech learning today?',
      time: 'Just now'
    }
  ]);

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const quickPrompts = [
    "🚀 Best Web Dev Course?",
    "🧠 How to start DSA?",
    "📜 Get Certified"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const text = (textToSend || inputVal).trim();
    if (!text || loading) return;

    const userMessage = {
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const prevHistory = messages
      .filter((m, idx) => idx > 0 && !m.isError)
      .slice(-10)
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        content: m.text,
      }));
    const history = [...prevHistory, { role: 'user', content: text }];

    setMessages((prev) => [...prev, userMessage]);
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="mb-3 w-[360px] sm:w-[420px] max-h-[580px] h-[520px] bg-slate-900/95 backdrop-blur-2xl border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-4 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <Bot size={22} className="text-white" />
                  </div>
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-indigo-900 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold flex items-center gap-1.5">
                    YR AI Learning Mentor
                    <Sparkles size={13} className="text-yellow-300" />
                  </h3>
                  <p className="text-[11px] text-blue-200">24/7 Course & Coding Guide</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-white/80">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/chatbot');
                  }}
                  title="Expand to Full Page"
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Maximize2 size={16} />
                </button>
                <button
                  onClick={() => setMessages([{
                    sender: 'bot',
                    text: 'Chat history cleared. How else can I assist you?',
                    time: 'Just now'
                  }])}
                  title="Clear Chat"
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Quick Prompts Bar */}
            <div className="px-3 py-2 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800/90 hover:bg-indigo-600/80 text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-400 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none shadow-md'
                        : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 px-1">
                    {msg.time}
                  </span>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-slate-400 text-xs bg-slate-800/70 border border-slate-700/60 rounded-2xl px-3 py-2 w-fit">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0.3s' }} />
                  <span className="ml-1 text-[11px]">Thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-slate-950/80 border-t border-slate-800">
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-700/80 rounded-2xl px-3 py-1.5 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
                <input
                  type="text"
                  placeholder="Ask anything about our courses or coding..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none py-1.5"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputVal.trim() || loading}
                  className="p-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-colors"
                >
                  <Send size={14} />
                </button>
              </div>

              {/* Bottom Footer Info */}
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
                <span>Looking for the full workspace?</span>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/chatbot');
                  }}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-0.5"
                >
                  Full AI Studio <ArrowRight size={11} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-xl shadow-blue-600/40 hover:shadow-blue-600/60 transition-all"
        aria-label="Toggle AI Chatbot"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-gray-900 animate-pulse" />
        {isOpen ? <X size={24} /> : <Bot size={26} className="group-hover:rotate-12 transition-transform duration-300" />}
      </motion.button>
    </div>
  );
}
