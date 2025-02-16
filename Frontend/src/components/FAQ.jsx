"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How does the AI-powered idea validation work?",
    answer:
      "Our AI analyzes market trends, consumer behavior, and industry data to provide insights on the viability of your startup idea. It assesses factors like market size, competition, and potential challenges to give you a comprehensive evaluation.",
  },
  {
    question: "Can the AI really help me find a co-founder?",
    answer:
      "Yes! Our AI co-founder matching system uses advanced algorithms to analyze skills, experience, and personality traits to suggest potential co-founders who complement your strengths and align with your vision.",
  },
  {
    question: "How accurate are the AI-generated growth strategies?",
    answer:
      "Our AI leverages data from successful startups and current market trends to generate tailored growth strategies. While no prediction is 100% accurate, our strategies have helped numerous startups achieve significant growth.",
  },
  {
    question: "Is my startup data secure on your platform?",
    answer:
      "Absolutely. We use state-of-the-art encryption and security measures to protect your data. Our platform is compliant with industry standards, and we never share your information with third parties without your explicit consent.",
  },
]

const FAQ = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null)

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-[#030303] to-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                className="flex justify-between items-center w-full text-left p-4 rounded-lg bg-white/5 backdrop-blur-sm"
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              >
                <span className="font-semibold">{faq.question}</span>
                {openFaqIndex === index ? <ChevronUp className="text-white" /> : <ChevronDown className="text-white" />}
              </button>
              <AnimatePresence>
                {openFaqIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 p-4 rounded-lg bg-white/5 backdrop-blur-sm"
                  >
                    <p className="text-white/70">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ

