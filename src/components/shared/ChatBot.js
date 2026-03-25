import React, { useState, useEffect, useRef } from 'react';
import { HfInference } from '@huggingface/inference';
import { MessageSquare, Send, X, Bot, Minimize2, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import T from '../../tokens/theme';

// Initialize Hugging Face Inference
const hf = new HfInference(process.env.REACT_APP_HF_TOKEN || '');

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm your **FairFlow AI assistant**. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await hf.chatCompletion({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        messages: [
          { role: "system", content: "You are a helpful assistant for FairFlow, a platform focusing on employee fairness, dashbaords and rewards." },
          ...messages,
          userMsg
        ],
        max_tokens: 500,
      });

      const botMsg = { role: 'assistant', content: response.choices[0].message.content };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("HF Error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I'm having trouble connecting to my AI core. Please ensure the HF_TOKEN is correctly set in your environment variables." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 10000, fontFamily: T.fontBody }}>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: `0 0 20px rgba(159, 167, 255, 0.4)` }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            style={{
              width: 64, height: 64, borderRadius: "50%",
              background: T.gradientPrimary,
              color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
              border: "none", boxShadow: T.shadow, cursor: "pointer"
            }}
          >
            <MessageSquare size={30} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            style={{
              width: 420, height: active ? 80 : 620,
              background: T.bgFloating, borderRadius: 24,
              border: `1px solid ${T.border}`,
              boxShadow: T.shadow,
              display: "flex", flexDirection: "column", overflow: "hidden",
              backdropFilter: T.glassFilter,
              WebkitBackdropFilter: T.glassFilter,
            }}
          >
            {/* Header */}
            <div style={{
              padding: "16px 24px", background: "rgba(255, 255, 255, 0.03)", 
              color: T.text, display: "flex", alignItems: "center", justifyContent: "space-between",
              borderBottom: `1px solid ${T.border}`
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ padding: 6, background: T.gradientPrimary, borderRadius: 10 }}>
                   <Bot size={20} color="#fff" />
                </div>
                <div>
                   <span style={{ fontWeight: 600, fontSize: 16, display: "block", color: T.text, fontFamily: T.fontHeader }}>FairFlow AI</span>
                   <span style={{ fontSize: 11, color: T.success, display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ width: 6, height: 6, background: T.success, borderRadius: "50%" }}></span> Online
                   </span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => setActive(!active)} style={{ background: "none", border: "none", color: T.textMid, cursor: "pointer", opacity: 0.7 }}>
                  {active ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>
                <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: T.textMid, cursor: "pointer", opacity: 0.7 }}>
                  <X size={22} />
                </button>
              </div>
            </div>

            {!active && (
              <>
                {/* Chat Area */}
                <div ref={scrollRef} style={{ flex: 1, padding: 24, overflowY: "auto", display: "flex", flexDirection: "column", gap: 20 }}>
                  {messages.map((m, i) => (
                    <div key={i} style={{
                      alignSelf: m.role === 'user' ? "flex-end" : "flex-start",
                      maxWidth: "85%",
                      display: "flex", flexDirection: "column",
                      alignItems: m.role === 'user' ? "flex-end" : "flex-start"
                    }}>
                      <div style={{
                        padding: "14px 18px", borderRadius: 20,
                        background: m.role === 'user' ? T.gradientPrimary : "rgba(255, 255, 255, 0.05)",
                        color: m.role === 'user' ? "#fff" : T.text,
                        fontSize: 14.5, lineHeight: 1.6,
                        boxShadow: m.role === 'user' ? "0 4px 15px rgba(159, 167, 255, 0.25)" : "none",
                        border: m.role === 'user' ? "none" : `1px solid ${T.border}`,
                      }}>
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </div>
                      <span style={{ fontSize: 10, color: T.textSoft, marginTop: 6, letterSpacing: "0.02em", textTransform: "uppercase", fontWeight: 600 }}>
                        {m.role === 'user' ? 'Member' : 'FairFlow AI'}
                      </span>
                    </div>
                  ))}
                  {isLoading && (
                    <div style={{ alignSelf: "flex-start", padding: "14px 18px", borderRadius: 20, background: "rgba(255, 255, 255, 0.05)", border: `1px solid ${T.border}`, display: "flex", gap: 6 }}>
                      <span className="dot" style={{ width: 6, height: 6, background: T.primary, borderRadius: "50%", animation: "pulse 1.4s infinite" }} />
                      <span className="dot" style={{ width: 6, height: 6, background: T.primary, borderRadius: "50%", animation: "pulse 1.4s infinite 0.2s" }} />
                      <span className="dot" style={{ width: 6, height: 6, background: T.primary, borderRadius: "50%", animation: "pulse 1.4s infinite 0.4s" }} />
                    </div>
                  )}
                </div>

                {/* Footer Input */}
                <div style={{ padding: "20px 24px 24px", background: "rgba(0,0,0,0.1)", borderTop: `1px solid ${T.border}`, display: "flex", gap: 14 }}>
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Ask FairFlow AI anything..."
                    style={{
                      flex: 1, padding: "14px 20px", borderRadius: 16, border: `1px solid ${T.border}`,
                      outline: "none", fontSize: 14, transition: "all 0.3s",
                      background: "rgba(0,0,0,0.2)", color: T.text,
                    }}
                  />
                  <motion.button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: 48, height: 48, borderRadius: 16,
                      background: T.gradientPrimary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                      border: "none", cursor: "pointer", opacity: (!input.trim() || isLoading) ? 0.5 : 1,
                      boxShadow: "0 4px 12px rgba(159, 167, 255, 0.2)"
                    }}
                  >
                    <Send size={22} />
                  </motion.button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        ::-webkit-scrollbar {
          width: 5px;
        }
        ::-webkit-scrollbar-thumb {
          background: ${T.borderStrong};
          border-radius: 10px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}
