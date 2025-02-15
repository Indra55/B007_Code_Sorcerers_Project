"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparklesIcon, StarIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { MessageCircle, ArrowRight } from "lucide-react";

const mcqLevels = [
  {
    id: 6.1,
    icon: <MessageCircle className="w-8 h-8 text-indigo-400" />,
    title: "MCQ Questions (Part 1)",
    questions: [
      {
        question: "What is the most important quality in a co-founder?",
        key: "q1",
        options: ["Trustworthiness", "Expertise", "Communication", "Commitment", "Other"],
      },
      {
        question: "How do you handle conflicts with a co-founder?",
        key: "q2",
        options: ["Open Discussion", "Mediation", "Avoidance", "Compromise", "Other"],
      },
    ],
  },
  {
    id: 6.2,
    icon: <MessageCircle className="w-8 h-8 text-indigo-400" />,
    title: "MCQ Questions (Part 2)",
    questions: [
      {
        question: "What is your preferred working relationship with a co-founder?",
        key: "q3",
        options: ["Equal Partnership", "Hierarchical", "Flexible Roles", "Other"],
      },
      {
        question: "How much experience should your co-founder have?",
        key: "q4",
        options: ["0-2 years", "3-5 years", "6-10 years", "10+ years"],
      },
    ],
  },
  {
    id: 6.3,
    icon: <MessageCircle className="w-8 h-8 text-indigo-400" />,
    title: "MCQ Questions (Part 3)",
    questions: [
      {
        question: "What skills should your co-founder have?",
        key: "q5",
        options: ["Technical", "Business", "Design", "Marketing", "Operations"],
      },
      {
        question: "How important is shared vision for your co-founder?",
        key: "q6",
        options: ["Very important", "Important", "Neutral", "Not important"],
      },
      {
        question: "What is the preferred work style of your co-founder?",
        key: "q7",
        options: ["Collaborative", "Independent", "Structured", "Flexible"],
      },
    ],
  },
];

const MCQQuestions = () => {
  const [currentMCQLevel, setCurrentMCQLevel] = useState(0);
  const [userMCQData, setUserMCQData] = useState({
    level6_1: { q1: "", q2: "" },
    level6_2: { q3: "", q4: "" },
    level6_3: { q5: "", q6: "", q7: "" },
  });

  const currentMCQLevelData = mcqLevels[currentMCQLevel];

  const handleQuestionChange = (level, questionKey, value) => {
    setUserMCQData((prevData) => ({
      ...prevData,
      [`level${level}`]: {
        ...prevData[`level${level}`],
        [questionKey]: value,
      },
    }));
  };

  const handleMCQLevelCompletion = () => {
    if (currentMCQLevel < mcqLevels.length - 1) {
      setCurrentMCQLevel(currentMCQLevel + 1);
    } else {
      alert("MCQ Questions Complete! Check the console for the JSON data.");
      console.log("MCQ Data:", JSON.stringify(userMCQData, null, 2));
    }
  };

  // Check if all questions in the current MCQ level are answered
  const isMCQFormValid = currentMCQLevelData.questions.every(
    (question) => userMCQData[`level${currentMCQLevelData.id}`][question.key].trim() !== ""
  );

  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="w-full max-w-2xl border shadow-lg shadow-slate-800/50 border-slate-800 rounded-2xl bg-slate-900/50 backdrop-blur-xl p-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center px-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-800 text-white border border-slate-700">
              <StarIcon className="w-4 h-4 mr-1 text-yellow-500" />
              Level {currentMCQLevelData.id}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-800 text-white border border-slate-700">
              {currentMCQLevel + 1}/{mcqLevels.length}
            </span>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <SparklesIcon className="w-5 h-5 text-indigo-400" />
              {currentMCQLevelData.title}
            </h1>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentMCQLevel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 mt-6"
          >
            {currentMCQLevelData.questions.map((question, index) => (
              <div key={index}>
                <label className="block text-white mb-2">{question.question}</label>
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <label key={optionIndex} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question-${question.key}`}
                        value={option}
                        checked={userMCQData[`level${currentMCQLevelData.id}`][question.key] === option}
                        onChange={() => handleQuestionChange(currentMCQLevelData.id, question.key, option)}
                        className="form-radio text-indigo-500"
                      />
                      <span className="text-white/90">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={handleMCQLevelCompletion}
              disabled={!isMCQFormValid}
              className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentMCQLevel === mcqLevels.length - 1 ? "Complete MCQs" : "Next MCQ Level"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MCQQuestions;