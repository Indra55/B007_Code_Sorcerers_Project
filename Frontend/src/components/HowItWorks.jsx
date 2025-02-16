import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const steps = [
  { title: "Sign Up", description: "Create your account and tell us about your startup idea." },
  { title: "AI Analysis", description: "Our AI analyzes your concept and provides initial feedback." },
  { title: "Personalized Roadmap", description: "Receive a customized action plan tailored to your startup." },
  { title: "Execute & Iterate", description: "Implement strategies with AI guidance and adapt as you grow." },
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-white/70">{step.description}</p>
              {index < steps.length - 1 && <ArrowRight className="text-indigo-400 mt-4 hidden lg:block" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

