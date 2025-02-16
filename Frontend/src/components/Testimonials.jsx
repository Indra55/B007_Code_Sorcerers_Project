"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    quote:
      "This AI solution has been a game-changer for my startup. It's like having a seasoned co-founder by my side 24/7.",
    author: "Sarah L.",
    role: "Founder, TechNova",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "From idea validation to fundraising, this platform guided me through every step. I couldn't have done it without this AI companion.",
    author: "Michael R.",
    role: "CEO, GreenSpark",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "The AI's insights helped me pivot my business model early on, saving me time and resources. It's an invaluable tool for any solo founder.",
    author: "Emily C.",
    role: "Founder, HealthTech Solutions",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000)
    return () => clearInterval(timer)
  }, []) // Removed nextTestimonial from dependencies

  return (
    <section className="py-20 bg-gradient-to-b from-entrepreneur-800/30 to-entrepreneur-900/30">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 font-pacifico text-entrepreneur-100"
        >
          Success <span className="text-entrepreneur-400">Stories</span>
        </motion.h2>
        <div className="relative h-80 md:h-64">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-entrepreneur-700/30 rounded-lg p-6 backdrop-blur-sm max-w-2xl border border-entrepreneur-500/30">
                <p className="text-entrepreneur-100 italic mb-4 text-lg">"{testimonials[currentIndex].quote}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[currentIndex].author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-entrepreneur-100">{testimonials[currentIndex].author}</p>
                    <p className="text-entrepreneur-300 text-sm">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-entrepreneur-600/50 p-2 rounded-full"
          >
            <ChevronLeft className="text-entrepreneur-100" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-entrepreneur-600/50 p-2 rounded-full"
          >
            <ChevronRight className="text-entrepreneur-100" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

