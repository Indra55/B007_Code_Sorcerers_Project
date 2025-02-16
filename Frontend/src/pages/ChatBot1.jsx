import React, { useState } from 'react';
import { Send, Menu, MessageSquare, Image, Code, Sparkles, ChevronLeft, Plus } from 'lucide-react';

const ChatBot = ({ id }) => {
  const [conversations, setConversations] = useState([
    { id: 1, title: 'Project Brainstorming', timestamp: '2:30 PM' },
    { id: 2, title: 'Code Review Help', timestamp: '1:15 PM' },
    { id: 3, title: 'Design Ideas', timestamp: 'Yesterday' },
  ]);
  
  const [currentChat, setCurrentChat] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeModifiers, setActiveModifiers] = useState([]);

  const modifiers = [
    { id: 'code', icon: <Code size={20} />, label: 'Code' },
    { id: 'creative', icon: <Sparkles size={20} />, label: 'Creative' },
    { id: 'image', icon: <Image size={20} />, label: 'Image' },
  ];

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: Date.now(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString(),
      };
      
      // Simulate AI response
      const aiResponse = {
        id: Date.now() + 1,
        text: `AI response to: ${inputValue}`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setCurrentChat([...currentChat, newMessage, aiResponse]);
      setInputValue('');
    }
  };

  const toggleModifier = (modifierId) => {
    setActiveModifiers(prev => 
      prev.includes(modifierId) 
        ? prev.filter(id => id !== modifierId)
        : [...prev, modifierId]
    );
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-white border-r transition-all duration-300 overflow-hidden`}>
        <div className="p-4 border-b">
          <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg flex items-center justify-center gap-2">
            <Plus size={20} />
            New Chat
          </button>
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-73px)]">
          {conversations.map(conv => (
            <div key={conv.id} className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3">
              <MessageSquare size={18} className="text-gray-500" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{conv.title}</div>
                <div className="text-xs text-gray-500">{conv.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b p-4 flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ChevronLeft size={20} className={`transform transition-transform ${!isSidebarOpen ? 'rotate-180' : ''}`} />
          </button>
          <h1 className="font-semibold">Chat Assistant {id}</h1>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentChat.map(message => (
            <div 
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white border'
              }`}>
                <div>{message.text}</div>
                <div className={`text-xs mt-1 ${
                  message.sender === 'user' 
                    ? 'text-indigo-200' 
                    : 'text-gray-500'
                }`}>
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t">
          {/* Modifiers */}
          <div className="flex gap-2 mb-3">
            {modifiers.map(mod => (
              <button
                key={mod.id}
                onClick={() => toggleModifier(mod.id)}
                className={`p-2 rounded-lg flex items-center gap-2 text-sm ${
                  activeModifiers.includes(mod.id)
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {mod.icon}
                {mod.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-600"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;