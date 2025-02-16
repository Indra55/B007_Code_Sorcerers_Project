import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Users, PiggyBank, Rocket, Target, Shield } from 'lucide-react';
import Card from "../components/ui/card";

const features = [
  {
    icon: Lightbulb,
    title: "Idea Validation",
    description: "AI-powered market analysis and feedback to validate your startup concept.",
  },
  {
    icon: Users,
    title: "Co-founder Matching",
    description: "Intelligent algorithms to find the perfect co-founder based on skills and vision.",
  },
  {
    icon: PiggyBank,
    title: "Fundraising Assistance",
    description: "Tailored advice and connections to potential investors in your industry.",
  },
  {
    icon: Rocket,
    title: "Growth Strategies",
    description: "Data-driven insights to accelerate your startup's growth and success.",
  },
  {
    icon: Target,
    title: "Goal Setting & Tracking",
    description: "AI-assisted goal setting and progress tracking to keep you on target.",
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "Predictive analysis to identify and mitigate potential risks in your startup journey.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background to-background/90">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
        >
          Your AI-Powered Startup Companion
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-all duration-300 border-muted">
                <feature.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground text-lg">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;