import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Bot, X } from 'lucide-react';

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chatbot/ask/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { sender: "bot", text: data.response || "No response from bot." }
      ]);
    } catch (error) {
      console.error("Chatbot API error:", error);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ Error connecting to chatbot." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 z-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        aria-label={isOpen ? "Close Chat" : "Open Chat"}
      >
        {isOpen ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
      </button>

      {isOpen && (
        <div
          className="fixed bottom-24 right-5 w-80 h-[400px] bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl flex flex-col overflow-hidden z-40 transition-all duration-300 ease-in-out"
        >
  
          <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white p-4 flex items-center justify-between font-semibold text-lg rounded-t-xl">
            <div className="flex items-center">
              <Bot className="h-6 w-6 mr-2" />
              CounselIQ Chatbot
            </div>
          </div>

          <div
            className="flex-1 p-4 overflow-y-auto text-slate-100 space-y-3 custom-scrollbar"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`inline-block p-3 rounded-lg max-w-[80%] break-words
                    ${msg.sender === "user"
                      ? "bg-emerald-600 text-white shadow-md" 
                      : "bg-slate-700 text-slate-100 shadow-sm" 
                    }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <span className="inline-block p-3 rounded-lg bg-slate-700 text-slate-400 text-sm italic shadow-sm">
                  Typing...
                </span>
              </div>
            )}
            <div ref={messagesEndRef} /> 
          </div>

          <div className="flex p-3 border-t border-slate-700 bg-slate-800 rounded-b-xl">
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-3 border border-slate-600 rounded-l-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              disabled={loading} 
            />
            <button
              onClick={sendMessage}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-r-lg px-4 py-3 ml-1 flex items-center justify-center shadow-md hover:from-emerald-600 hover:to-cyan-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              disabled={loading || !input.trim()} 
              aria-label="Send Message"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;