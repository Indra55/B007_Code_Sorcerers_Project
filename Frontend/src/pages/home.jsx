"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom" // Import Link for navigation
import Navbar from "../components/Navbar"
import Hero from "../components/hero"
import Features from "../components/Features"
import HowItWorks from "../components/HowItWorks"
import Testimonials from "../components/Testimonials"
import Pricing from "../components/Pricing"
import FAQ from "../components/FAQ"
import CTA from "../components/CTA"
import Footer from "../components/Footer"

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMenuOpen(false)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-[#030303] text-white overflow-hidden">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      
      {/* Link to ChatBot Page */}
      <div className="text-center mt-8">
        <Link to="/BOT">
          <button className="bg-blue-500 text-white p-2 rounded">
            Go to ChatBot
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  )
}

export default Home
