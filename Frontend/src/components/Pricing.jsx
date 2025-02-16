import { motion } from "framer-motion"
import { Check } from "lucide-react"
import Button from "./Button"

const plans = [
  {
    name: "Starter",
    price: "$49",
    features: [
      "AI-powered idea validation",
      "Basic market analysis",
      "Goal setting ",
      "Goal tracking",
      "24/7 AI chat support",
    ],
  },
  {
    name: "Pro",
    price: "$99",
    features: [
      "All Starter features",
      "Advanced market insights",
      "Fundraising assistance",
      "Co-founder matching",
      "Personalized growth strategies",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "All Pro features",
      "Dedicated AI consultant",
      "Custom integrations",
      "Priority support",
      "Tailored risk assessment",
    ],
  },
]

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-[#030303]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 rounded-lg p-8 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-3xl font-bold text-indigo-400 mb-6">
                {plan.price}
                <span className="text-sm text-white/70">/month</span>
              </p>
              <ul className="mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center mb-2">
                    <Check className="text-green-500 mr-2" />
                    <span className="text-white/90">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Get Started</Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing

