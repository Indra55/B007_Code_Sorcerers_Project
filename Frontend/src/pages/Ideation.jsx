"use client"

import { useState } from "react"
import { SparklesIcon, StarIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    answer: "paris",
    hint: "City of Lights",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    answer: "mars",
    hint: "Named after the Roman god of war",
  },
  {
    id: 3,
    question: "What is 2 + 2?",
    answer: "4",
    hint: "Think basic arithmetic",
  },
]

const Ideation = () => {
  const [currentLevel, setCurrentLevel] = useState(1)
  const [userAnswer, setUserAnswer] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)

  const currentQuestion = questions[currentLevel - 1]

  const handleSubmit = (e) => {
    e.preventDefault()
    const isAnswerCorrect = userAnswer.toLowerCase().trim() === currentQuestion.answer
    setIsCorrect(isAnswerCorrect)
    setShowAnswer(true)

    if (isAnswerCorrect && currentLevel < questions.length) {
      setTimeout(() => {
        setCurrentLevel(currentLevel + 1)
        setUserAnswer("")
        setShowAnswer(false)
        setIsCorrect(null)
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen  p-4 flex items-center justify-center">
      <div className="w-full max-w-lg border border-slate-800 rounded-lg bg-slate-950/50 backdrop-blur-sm p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center px-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-900 text-white border border-slate-800">
              <StarIcon className="w-4 h-4 mr-1 text-yellow-500" />
              Level {currentLevel}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-900 text-white border border-slate-800">
              {currentLevel}/{questions.length}
            </span>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <SparklesIcon className="w-5 h-5 text-indigo-400" />
              Space Quiz Challenge
            </h1>
          </div>
        </div>

        <div className="space-y-6 mt-6">
          <div className="text-center p-6 rounded-lg bg-slate-900/50 border border-slate-800">
            <h3 className="text-xl text-white mb-2">{currentQuestion.question}</h3>
            <p className="text-slate-400 text-sm">{currentQuestion.hint}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={!userAnswer.trim()}
              className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
            >
              Submit Answer
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </form>

          {showAnswer && (
            <div
              className={`p-4 rounded-lg text-center transition-all duration-500 ${
                isCorrect
                  ? "bg-green-950/30 text-green-400 border border-green-900"
                  : "bg-red-950/30 text-red-400 border border-red-900"
              }`}
            >
              {isCorrect ? (
                <>
                  <p className="font-bold">Correct! 🎉</p>
                  {currentLevel < questions.length && <p className="text-sm mt-1">Preparing next level...</p>}
                </>
              ) : (
                <>
                  <p className="font-bold">Not quite right!</p>
                  <p className="text-sm mt-1">The correct answer is: {currentQuestion.answer}</p>
                </>
              )}
            </div>
          )}

          {currentLevel === questions.length && isCorrect && (
            <div className="text-center p-4 bg-indigo-950/30 border border-indigo-900 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-2">🎉 Congratulations! 🎉</h3>
              <p className="text-indigo-400">You've completed all levels!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Ideation

