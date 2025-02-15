"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesIcon, StarIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { User, Lightbulb, Search, Scale, Banknote, MessageCircle, ArrowRight } from "lucide-react";

const levels = [
  {
    id: 1,
    icon: <User className="w-8 h-8 text-indigo-400" />,
    title: "Personal Assessment of Founder",
    fields: [
      { label: "Skills", key: "skills", placeholder: "Describe your skills..." },
      { label: "Experience", key: "experience", placeholder: "Describe your experience..." },
    ],
  },
  {
    id: 2,
    icon: <Lightbulb className="w-8 h-8 text-indigo-400" />,
    title: "Taking Ideas From The Founder",
    fields: [
      { label: "Business Idea", key: "idea", placeholder: "Share your business idea..." },
      { label: "Pitch", key: "pitch", placeholder: "Refine your pitch..." },
    ],
  },
  {
    id: 3,
    icon: <Search className="w-8 h-8 text-indigo-400" />,
    title: "Qualities of Co-Founder",
    fields: [
      { label: "Co-Founder Qualities", key: "coFounderQualities", placeholder: "Describe your ideal co-founder..." },
      { label: "Roles", key: "roles", placeholder: "Define roles for the co-founder..." },
    ],
  },
  {
    id: 4,
    icon: <Scale className="w-8 h-8 text-indigo-400" />,
    title: "Legal Compliances",
    fields: [
      { label: "Business Structure", key: "businessStructure", placeholder: "Choose a business structure..." },
      { label: "Legal Questions", key: "legalQuestions", placeholder: "Ask about legal requirements..." },
    ],
  },
  {
    id: 5,
    icon: <Banknote className="w-8 h-8 text-indigo-400" />,
    title: "Investment",
    fields: [
      { label: "Funding Needs", key: "fundingNeeds", placeholder: "Describe your funding needs..." },
      { label: "Investor Preferences", key: "investorPreferences", placeholder: "Describe your ideal investors..." },
    ],
  },
  {
    id: 6,
    icon: <MessageCircle className="w-8 h-8 text-indigo-400" />,
    title: "Chatbot Assistance",
    fields: [
      { label: "Chatbot Questions", key: "chatbotQuestions", placeholder: "Ask me anything..." },
    ],
  },
];

const Ideation = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [userData, setUserData] = useState({
    level1: { skills: "", experience: "" },
    level2: { idea: "", pitch: "" },
    level3: { coFounderQualities: "", roles: "" },
    level4: { businessStructure: "", legalQuestions: "" },
    level5: { fundingNeeds: "", investorPreferences: "" },
    level6: { chatbotQuestions: "" },
  });

  const currentLevelData = levels[currentLevel - 1];

  const handleInputChange = (level, field, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [`level${level}`]: {
        ...prevData[`level${level}`],
        [field]: value,
      },
    }));
  };

  const handleLevelCompletion = () => {
    if (currentLevel < levels.length) {
      setCurrentLevel(currentLevel + 1);
    } else {
      // Final level: Export data as JSON
      const jsonData = JSON.stringify(userData, null, 2);
      console.log("User Data:", jsonData);
      alert("Journey Complete! Check the console for the JSON data.");
    }
  };

  // Check if all fields in the current level are filled
  const isFormValid = currentLevelData.fields.every(
    (field) => userData[`level${currentLevel}`][field.key].trim() !== ""
  );

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl border shadow-lg shadow-slate-800/50 border-slate-800 rounded-2xl bg-slate-900/50 backdrop-blur-xl p-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center px-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-800 text-white border border-slate-700">
              <StarIcon className="w-4 h-4 mr-1 text-yellow-500" />
              Level 1
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-800 text-white border border-slate-700">
              {currentLevel}/{levels.length}
            </span>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <SparklesIcon className="w-5 h-5 text-indigo-400" />
              {currentLevelData.title}
            </h1>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentLevel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 mt-6"
          >
            {currentLevelData.fields.map((field, index) => (
              <div key={index}>
                <label className="block text-white mb-2">{field.label}</label>
                <textarea
                  value={userData[`level${currentLevel}`][field.key]}
                  onChange={(e) => handleInputChange(currentLevel, field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                />
              </div>
            ))}

            <button
              onClick={handleLevelCompletion}
              disabled={!isFormValid}
              className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentLevel === levels.length ? "Complete Journey" : "Complete Level"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Ideation;