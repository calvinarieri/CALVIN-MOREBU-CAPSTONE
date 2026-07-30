import React, { useState, useRef, useEffect } from "react";
import { ChatProvider, useChat } from "../context/ChatProvider";

function ChatInner() {
  const { messages, loading, error, sendMessage, submitFeedback } = useChat();
  const [input, setInput] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    sendMessage(input);
    setInput("");
  };

  const handleFeedback = (score) => {
    setRating(score);
    submitFeedback(score, "")
      .then(() => setFeedbackSent(true))
      .catch(() => setFeedbackSent(false));
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 font-sans text-slate-800">
      {/* Widget Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-slate-900 text-white shadow">
        <div className="flex items-center space-x-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <h2 className="font-semibold text-sm">Customer Assistant</h2>
        </div>
      </header>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-slate-400 text-xs py-8">
            Ask a question to start chatting!
          </div>
        )}

        {messages.map((item) => (
          <React.Fragment key={item.id}>
            {/* User Question */}
            <div className="flex justify-end">
              <div className="max-w-[80%] bg-blue-600 text-white px-3.5 py-2 rounded-2xl rounded-br-none text-sm shadow-sm">
                {item.question}
              </div>
            </div>

            {/* Bot Response */}
            {item.response ? (
              <div className="flex justify-start">
                <div className="max-w-[85%] bg-white border border-slate-200 text-slate-800 px-3.5 py-2 rounded-2xl rounded-bl-none text-sm shadow-sm space-y-2">
                  <p className="leading-relaxed">{item.response}</p>
                  
                  {/* Referenced Knowledge Articles counter */}
                  {item.article_ids?.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                      Sources: {item.article_ids.length} knowledge article(s)
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Loading state for pending server response */
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-2xl rounded-bl-none text-xs text-slate-400 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}

        <div ref={chatEndRef} />
      </div>

      {/* Feedback Bar */}
      {messages.length > 0 && !feedbackSent && (
        <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Was this helpful?</span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleFeedback(star)}
                className="hover:text-amber-500 transition-colors"
              >
                ★
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && <div className="px-4 py-1.5 bg-red-50 text-red-600 text-xs text-center">{error}</div>}

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 px-3.5 py-2 text-sm bg-slate-100 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default function ChatWidget({ productId }) {
  return (
    <ChatProvider productId={productId}>
      <ChatInner />
    </ChatProvider>
  );
}