import React, { useState } from 'react';
import { Send, Menu } from 'lucide-react';

const Ideation = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div className=" p-8 flex justify-center items-center">
      <div className="w-96 max-w-4xl bg-black/40 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
        {/* Chat Header */}
        <div className="border-b border-white/20 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="font-medium text-white">Ask AI</span>
          </div>
          <Menu className="text-white/70 h-5 w-5" />
        </div>

        {/* Chat Area */}
        <div className="h-[400px] p-6 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-white/70">
              Ask anything about your ideation process...
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className="bg-white/20 rounded-lg p-3 text-white">
                  {message}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/20">
          <div className="flex items-center bg-black/20 rounded-xl p-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-transparent outline-none px-3 text-white placeholder-white/50"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
            />
            <button 
              onClick={handleSendMessage}
              className="p-2 hover:bg-white/10 rounded-lg transition-all"
            >
              <Send className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ideation;
