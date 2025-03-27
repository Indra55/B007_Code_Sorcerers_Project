import React, { useState, useRef, useEffect } from 'react';
import { Send, ChevronLeft, Bot, User, Plus, FileText, ChevronRight, Code, Sparkles, Image } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const stages = [
  { id: 'ideation', title: 'Ideation Bot', color: 'blue' },
  { id: 'business', title: 'Business Bot', color: 'green' },
  { id: 'legal', title: 'Legal Bot', color: 'purple' },
  { id: 'execution', title: 'Execution Bot', color: 'orange' },
  { id: 'final-report', title: 'Final Report', color: 'indigo' }
];

const ChatBot = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [messagesMap, setMessagesMap] = useState({
    ideation: [{ text: "Welcome to Ideation Bot! Let's discuss your startup idea.", isBot: true }],
    business: [{ text: "I'm Business Bot, ready to help with your business plan.", isBot: true }],
    legal: [{ text: "Legal Bot here. I'll help you navigate legal requirements.", isBot: true }],
    execution: [{ text: "Execution Bot at your service. Let's implement your plan.", isBot: true }]
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeModifiers, setActiveModifiers] = useState([]);
  const [finalReportResponse, setFinalReportResponse] = useState(null);
  const [finalReportLoading, setFinalReportLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const modifiers = [
    { id: 'code', icon: <Code size={20} />, label: 'Code' },
    { id: 'creative', icon: <Sparkles size={20} />, label: 'Creative' },
    { id: 'image', icon: <Image size={20} />, label: 'Image' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesMap, currentStage, finalReportResponse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const currentBot = stages[currentStage].id;
    if (currentBot === 'final-report') return; // Final Report stage doesn't use chat input

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
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2U1MzgxMTBmMjhiZDQxMGM4NmI0MjkiLCJpYXQiOjE3NDMwNzUzNjIsImV4cCI6MTc0MzA3ODk2Mn0.7Jr-SdLLqLuNRHxXMGuPhTc0edyi22ClqSyXeKGmA3g'
        },
        body: JSON.stringify({ message: inputMessage, stage: currentBot })
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setMessagesMap(prev => ({
        ...prev,
        [currentBot]: [
          ...prev[currentBot],
          { text: data.message || data.response || "No response received", isBot: true }
        ]
      }));
    } catch (error) {
      console.error('Error:', error);
      setMessagesMap(prev => ({
        ...prev,
        [currentBot]: [
          ...prev[currentBot],
          { text: "Sorry, there was an error connecting to the server. Please try again.", isBot: true }
        ]
      }));
    } finally {
      setIsLoading(false);
      setInputMessage('');
    }
  };

  const toggleModifier = (modifierId) => {
    setActiveModifiers(prev =>
      prev.includes(modifierId)
        ? prev.filter(id => id !== modifierId)
        : [...prev, modifierId]
    );
  };

  const handleFinalReportClick = async () => {
    setFinalReportLoading(true);
    const currentBot = stages[currentStage].id; // 'final-report'
    try {
      const response = await fetch(`http://localhost:5000/chatbot/final-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2U1MzgxMTBmMjhiZDQxMGM4NmI0MjkiLCJpYXQiOjE3NDMwNzUzNjIsImV4cCI6MTc0MzA3ODk2Mn0.7Jr-SdLLqLuNRHxXMGuPhTc0edyi22ClqSyXeKGmA3g'
        },
        body: JSON.stringify({ message: "Generate final report", stage: currentBot, userContext: {} })
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setFinalReportResponse(data.message || data.response || "No response received");
    } catch (error) {
      console.error('Error:', error);
      setFinalReportResponse("Sorry, there was an error connecting to the server. Please try again.");
    } finally {
      setFinalReportLoading(false);
    }
  };

  const currentStageId = stages[currentStage].id;

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
        className={`${isSidebarOpen ? 'w-64' : 'w-0'} bg-black/40 border-r border-gray-700 transition-all duration-300 overflow-hidden flex flex-col`}
        initial={{ x: -100 }}
        animate={{ x: isSidebarOpen ? 0 : -100 }}
      >
        <div className="p-4">
          <button 
            onClick={() => {
              setMessagesMap({
                ideation: [{ text: "Welcome to Ideation Bot! Let's discuss your startup idea.", isBot: true }],
                business: [{ text: "I'm Business Bot, ready to help with your business plan.", isBot: true }],
                legal: [{ text: "Legal Bot here. I'll help you navigate legal requirements.", isBot: true }],
                execution: [{ text: "Execution Bot at your service. Let's implement your plan.", isBot: true }]
              });
              setFinalReportResponse(null); // Reset final report on new chat
            }}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-3xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors mb-2"
          >
            <Plus size={20} />
            New Chat
          </button>
        </div>
        
        <div className="overflow-y-auto flex-1">
          {stages.slice(0, -1).map((stage, index) => ( // Exclude the final-report stage
            <div 
              key={stage.id}
              className={`p-3 hover:bg-gray-700 cursor-pointer flex items-center gap-3 ${
                currentStage === index ? 'bg-gray-700' : ''
              }`}
              onClick={() => setCurrentStage(index)}
            >
              <div className={`w-2 h-2 rounded-full ${
                stage.color === 'blue' ? 'bg-blue-500' :
                stage.color === 'green' ? 'bg-green-500' :
                stage.color === 'purple' ? 'bg-purple-500' :
                stage.color === 'orange' ? 'bg-orange-500' :
                stage.color === 'indigo' ? 'bg-indigo-500' : ''
              }`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate text-white">{stage.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Final Report Button at the Bottom */}
        <div className="p-4 border-t border-gray-700">
          <button 
            onClick={() => setCurrentStage(stages.length - 1)} // Navigate to the final-report stage
            className="w-full py-2 px-4 bg-green-600 text-white rounded-3xl flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
          >
            <FileText size={20} />
            Final Report
          </button>
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
          <div className="flex-1 flex justify-end gap-2">
            <button
              onClick={() => setCurrentStage(prev => (prev > 0 ? prev - 1 : prev))}
              disabled={currentStage === 0}
              className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentStage(prev => (prev < stages.length - 1 ? prev + 1 : prev))}
              disabled={currentStage === stages.length - 1}
              className="p-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 h-1.5">
          <div
            className="h-1.5 bg-indigo-600 transition-all duration-300"
            style={{ width: `${((currentStage + 1) / stages.length) * 100}%` }}
          />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/50">
          {currentStageId === 'final-report' ? (
            // Final Report stage: centered markdown response.
            <div className="flex-1 flex flex-col justify-center items-center p-6">
              {finalReportResponse ? (
                <div className="max-w-3xl mx-auto bg-black/40 border border-gray-700 rounded-xl p-6 text-white shadow-lg backdrop-blur-md">
                  <ReactMarkdown>{finalReportResponse}</ReactMarkdown>
                </div>
              ) : (
                <button 
                  onClick={handleFinalReportClick} 
                  className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  disabled={finalReportLoading}
                >
                  {finalReportLoading ? 'Loading...' : 'Generate Final Report'}
                </button>
              )}
            </div>
          ) : (
            <>
              <AnimatePresence>
                {messagesMap[currentStageId] && messagesMap[currentStageId].map((message, index) => (
                  <motion.div 
                    key={index}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="flex items-end gap-2 max-w-[80%]">
                      {message.isBot && (
                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div className={`rounded-2xl p-3 shadow-lg backdrop-blur-md ${
                        message.isBot ? 'bg-gray-700/60 border border-gray-700' : 'bg-indigo-600/60 border border-indigo-600'
                      } text-white`}>
                        <ReactMarkdown 
                          className="text-sm prose prose-invert max-w-none"
                          components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
                            li: ({ children }) => <li className="mb-1">{children}</li>,
                            code: ({ inline, children }) => 
                              inline ? (
                                <code className="bg-gray-800 px-1 rounded">{children}</code>
                              ) : (
                                <pre className="bg-gray-800 p-2 rounded overflow-x-auto">
                                  <code>{children}</code>
                                </pre>
                              )
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      </div>
                      {!message.isBot && (
                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700/60 border border-gray-700 rounded-2xl p-3 backdrop-blur-md">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ transform: 'translateY(-10px)' }} />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s', transform: 'translateY(-10px)' }} />
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s', transform: 'translateY(-10px)' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Chat Input */}
        {currentStageId !== 'final-report' && (
          <div className="bg-black/40 border-t border-gray-700 p-4">
            {/* <div className="flex gap-2 mb-3">
              {modifiers.map(mod => (
                <motion.button
                  key={mod.id}
                  onClick={() => toggleModifier(mod.id)}
                  className={`p-2 rounded-md flex items-center gap-2 text-sm ${
                    activeModifiers.includes(mod.id) ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {mod.icon}
                  {mod.label}
                </motion.button>
              ))}
            </div> */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Ask ${stages[currentStage].title} anything...`}
                className="flex-1 border border-gray-700 rounded-md px-4 py-2 focus:outline-none bg-gray-900 text-white"
              />
              <motion.button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-2 bg-indigo-600 text-white rounded-md flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send size={20} />
              </motion.button>
            </form>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatBot;