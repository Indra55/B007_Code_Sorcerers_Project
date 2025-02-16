import React, { useState, useRef, useEffect } from 'react';
import { Send, ChevronLeft, Bot, User, Plus, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const stages = [
  { id: 'ideation', title: 'Ideation Bot', color: 'blue' },
  { id: 'business', title: 'Business Bot', color: 'green' },
  { id: 'legal', title: 'Legal Bot', color: 'purple' },
  { id: 'execution', title: 'Execution Bot', color: 'orange' }
];

const ChatBot = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [messagesMap, setMessagesMap] = useState({
    ideation: [],
    business: [],
    legal: [],
    execution: []
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFinalAnalysisLoading, setIsFinalAnalysisLoading] = useState(false);
  const [finalAnalysis, setFinalAnalysis] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messagesMap, currentStage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const currentBot = stages[currentStage].id;
    setMessagesMap(prev => ({
      ...prev,
      [currentBot]: [...prev[currentBot], { text: inputMessage, isBot: false }]
    }));
    
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/chatbot/${currentBot}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage, stage: currentBot })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      
      setMessagesMap(prev => ({
        ...prev,
        [currentBot]: [...prev[currentBot], { 
          text: data.message || "No response received", 
          isBot: true 
        }]
      }));
    } catch (error) {
      console.error('Error:', error);
      setMessagesMap(prev => ({
        ...prev,
        [currentBot]: [...prev[currentBot], { 
          text: "Sorry, there was an error connecting to the server. Please try again.", 
          isBot: true 
        }]
      }));
    } finally {
      setIsLoading(false);
      setInputMessage('');
    }
  };

  const handleNewChat = async () => {
    const currentBot = stages[currentStage].id;
    const currentChat = messagesMap[currentBot]; // Retrieve current bot's messages
  
    if (currentChat.length > 0) {
      setIsLoading(true);
      try {
        console.log("Saving conversation to backend..."); // Debugging log
        const response = await fetch('http://localhost:5000/save-conversation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages: currentChat, stage: currentBot }),
        });
  
        if (!response.ok) {
          throw new Error(`Failed to save conversation: ${response.status}`);
        }
  
        console.log("Conversation saved. Resetting chat..."); // Debugging log
  
        // Reset messages for all bots
        setMessagesMap({
          ideation: [],
          business: [],
          legal: [],
          execution: []
        });
  
        // Reset to the first stage (Ideation Bot)
        setCurrentStage(0);
  
        // Ensure the final analysis state (if any) is cleared
        setFinalAnalysis(null); // Reset final analysis if it's affecting UI state
  
      } catch (error) {
        console.error('Error saving conversation:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("No messages to save. Just resetting chat.");
      setMessagesMap({
        ideation: [],
        business: [],
        legal: [],
        execution: []
      });
      setCurrentStage(0);
      setFinalAnalysis(null);
    }
  };
  
  

  const handleFinalAnalysis = async () => {
    setIsFinalAnalysisLoading(true);
    try {
      const response = await fetch('http://localhost:5000/final-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: messagesMap })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      setFinalAnalysis(data.summary || "No summary available.");
    } catch (error) {
      console.error('Error fetching final analysis:', error);
      setFinalAnalysis("Sorry, there was an error fetching the final analysis.");
    } finally {
      setIsFinalAnalysisLoading(false);
    }
  };

  return (
    <motion.div 
      className="flex bg-black/40 rounded-xl shadow-lg overflow-hidden backdrop-blur-md"
      style={{ width: '800px', height: '600px' }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Sidebar */}
      <motion.div 
        className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-black/40 border-r border-gray-700 transition-all duration-300 overflow-hidden`}
        initial={{ x: -100 }}
        animate={{ x: isSidebarOpen ? 0 : -100 }}
      >
        <div className="p-4">
          <button 
            onClick={handleNewChat}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-3xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors mb-2"
          >
            <Plus size={20} />
            New Chat
          </button>
          <button 
            onClick={handleFinalAnalysis}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-3xl flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
          >
            <FileText size={20} />
            Final Analysis
          </button>
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-73px)]">
          {stages.map((stage, index) => (
            <div 
              key={stage.id}
              className={`p-3 hover:bg-gray-700 cursor-pointer flex items-center gap-3 ${
                currentStage === index ? 'bg-gray-700' : ''
              }`}
              onClick={() => setCurrentStage(index)}
            >
              <div className={`w-2 h-2 rounded-full bg-${stage.color}-500`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate text-white">{stage.title}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-black/40 border-b border-gray-700 p-4 flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} className={`transform transition-transform ${!isSidebarOpen ? 'rotate-180' : ''} text-white`} />
          </button>
          <h1 className="font-semibold text-white">{stages[currentStage].title}</h1>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messagesMap[stages[currentStage].id].map((message, index) => (
              <motion.div 
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex gap-2 max-w-[80%] items-center">
                  {message.isBot && (
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div className={`rounded-xl p-3 ${
                    message.isBot 
                      ? 'bg-black/40 border border-gray-700 text-white' 
                      : 'bg-indigo-600 text-white'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                  </div>
                  {!message.isBot && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-black/40 border border-gray-700 rounded-xl p-3">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          {isFinalAnalysisLoading && (
            <div className="flex justify-center">
              <div className="bg-black/40 border border-gray-700 rounded-xl p-3">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          {finalAnalysis && (
            <div className="bg-black/40 border border-gray-700 rounded-xl p-4">
              <h2 className="font-semibold text-white mb-2">Final Analysis</h2>
              <p className="text-sm text-white">{finalAnalysis}</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/40 border-t border-gray-700">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Ask ${stages[currentStage].title} anything...`}
              className="flex-1 border-gray-700 rounded-xl px-4 py-2 focus:outline-none bg-black/40 text-white"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="p-2 bg-indigo-600 text-white rounded-full flex items-center justify-center p-3 hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatBot;