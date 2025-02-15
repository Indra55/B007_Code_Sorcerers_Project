// AIAssistantLanding.jsx
import React from 'react';
import { CheckCircle } from 'lucide-react';
import HeroImage from '../assets/HeroImage.jpeg'
const Hero = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4 bg-white shadow-xl rounded-xl p-16">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
                Your personal AI assistant
              </h1>
              <h2 className="text-3xl sm:text-4xl font-bold text-blue-500">
                trained on your content
              </h2>
              <p className="text-xl text-gray-600 mt-4">
                Say goodbye to the chaos of scattered communication. Streamline your business 
                with an AI chat solution that scales your workflow - from Sales and Lead 
                Generation to Personalized Customer Support and more.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/80 hover:bg-white hover:scale-105 transition-all duration-300 rounded-xl p-6 shadow-xl">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <p className="text-lg text-gray-700">
                    Grow Your Revenue with Increased Customer Engagement
                  </p>
                </div>
              </div>

              <div className="bg-white/80 hover:bg-white hover:scale-105 transition-all duration-300 rounded-xl p-6 shadow-xl">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <p className="text-lg text-gray-700">
                    Lower Your Costs with Improved Efficiency
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[400px] lg:h-[600px]">
            <div className="absolute inset-0 bg-gray-200 rounded-3xl overflow-hidden">
              <img 
                src={HeroImage}
                alt="AI Assistant Robot"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;