"use client"

import { useState, useEffect } from "react"
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
      <Footer />
    </div>
  )
}


export default Home

