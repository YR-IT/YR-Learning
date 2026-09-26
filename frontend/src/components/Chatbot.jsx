import React, { useState } from 'react';
import { Bot, Sparkles, Send, RefreshCw, Maximize2, ExternalLink, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Chatbot() {
  const [iframeKey, setIframeKey] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [chatMode, setChatMode] = useState('agent'); // 'agent' | 'instant'
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

  const handleSend = (text) => {
    const query = text || inputVal;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setLoading(true);

    // AI assistant intelligent answer engine
    setTimeout(() => {
      let botResponse = "That is a great question! On YR-Elearning, our expert-led curriculum covers this step-by-step with practical hands-on exercises and project building.";
      
      const q = query.toLowerCase();
      if (q.includes('dsa') || q.includes('algorithm')) {
        botResponse = "For Data Structures & Algorithms, we recommend our 'Data Structures & Algorithms in Python' course. Focus on high-frequency patterns: Two Pointers, Sliding Window, BFS/DFS, and Dynamic Programming.";
      } else if (q.includes('full stack') || q.includes('web') || q.includes('react')) {
        botResponse = "To become a Full Stack Developer, start with our 'Advanced Full-Stack JavaScript & React' course! Master HTML5/CSS, ES6+ JavaScript, React component patterns, REST APIs with Node/Express, and MongoDB database modeling.";
      } else if (q.includes('ai') || q.includes('machine learning')) {
        botResponse = "Our 'Machine Learning & AI Foundations' course covers everything from vector math and regressions to deep learning with PyTorch and fine-tuning LLMs!";
      } else if (q.includes('portfolio') || q.includes('hired') || q.includes('interview')) {
        botResponse = "Check out our latest article: 'Design a Hiring-Ready Developer Portfolio (That Actually Converts)' in the Articles section! Key advice: build 2-3 polished, deployed full-stack apps with clear READMEs rather than 10 tutorial clones.";
      }

      const botMsg = {
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className={`min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white p-4 sm:p-6 transition-all ${isFullScreen ? 'fixed inset-0 z-50 pt-4' : ''}`}>
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        {/* Top Header Card */}
        <div className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/60 rounded-2xl p-4 sm:p-5 mb-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Bot size={24} className="text-white" />
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-gray-900 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">YR AI Learning Mentor</h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                  <Sparkles size={10} /> Powered by AI
                </span>
              </div>
              <p className="text-xs text-gray-400">Ask coding doubts, course guidance, roadmaps, and interview preparation</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <div className="bg-gray-900/60 p-1 rounded-xl border border-gray-700 flex text-xs font-medium">
              <button
                onClick={() => setChatMode('agent')}
                className={`px-3 py-1.5 rounded-lg transition-all ${chatMode === 'agent' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
              >
                Interactive Agent
              </button>
              <button
                onClick={() => setChatMode('instant')}
                className={`px-3 py-1.5 rounded-lg transition-all ${chatMode === 'instant' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
              >
                Quick Chat
              </button>
            </div>

            <button
              onClick={() => setIframeKey((k) => k + 1)}
              title="Refresh Streamlit Agent"
              className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 transition-all"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
              className="p-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 transition-all"
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
                setChatMode('instant');
                handleSend(prompt);
              }}
              className="text-xs bg-gray-800/60 hover:bg-gray-700/80 border border-gray-700/60 text-gray-300 hover:text-white px-3 py-1.5 rounded-xl transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col min-h-[540px]">
          {chatMode === 'agent' ? (
            <div className="relative w-full h-full flex-1">
              <iframe
                key={iframeKey}
                src="https://rihmag-myagent-myagentmain-kzujcs.streamlit.app/~/+//?embed_options=light_theme,show_padding,disable_scrolling,show_toolbar,show_footer,show_colored_line"
                title="Embedded Streamlit App"
                width="100%"
                height="100%"
                className="w-full h-full min-h-[540px] border-0"
              />
            </div>
          ) : (
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
                          : 'bg-gray-800 border border-gray-700/60 text-gray-200 rounded-tl-sm'
                      }`}
                    >
                      <p>{m.text}</p>
                      <span className="block text-[10px] text-gray-400 mt-1.5 text-right">{m.time}</span>
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                      <Bot size={18} className="text-white" />
                    </div>
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl px-4 py-2.5 text-xs text-gray-400 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Box */}
              <div className="pt-4 border-t border-gray-800 flex items-center gap-2">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask any programming or course question..."
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          )}
        </div>
      </div>
    </div>
  );
}
