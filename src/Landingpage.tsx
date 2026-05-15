"use client"

import { useState, useEffect } from "react"
import { Button } from "./components/button"
import { useNavigate } from "react-router-dom"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Orange Swirl Background */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute top-0 right-0 w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#f7931e" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffb347" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path
            d="M800 0C900 100 1000 200 1100 350C1150 450 1200 550 1200 650C1200 750 1150 800 1100 800C1000 800 900 750 800 700C700 650 600 600 500 550C400 500 300 450 200 400C100 350 50 300 0 250V0H800Z"
            fill="url(#orangeGradient)"
            className={`transition-all duration-2000 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
            }`}
          />
          <path
            d="M600 100C700 150 800 200 900 300C950 400 1000 500 1000 600C1000 700 950 750 900 750C800 750 700 700 600 650C500 600 400 550 300 500C200 450 100 400 50 350C0 300 0 250 0 200V100H600Z"
            fill="url(#orangeGradient)"
            className={`transition-all duration-2500 ease-out delay-300 ${
              isVisible ? "opacity-60 translate-x-0" : "opacity-0 translate-x-full"
            }`}
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated Headline */}
          <h1 className="text-6xl md:text-8xl font-bold mb-8">
            <span
              className={`inline-block transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ color: "#ff6b35" }}
            >
              Introducing
            </span>
            <br />
            <span
              className={`inline-block transition-all duration-1000 ease-out delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ color: "#ff6b35" }}
            >
              AI Body Predictor
            </span>
          </h1>

          {/* Animated Subtitle */}
          <p
            className={`text-xl md:text-2xl text-gray-700 mb-12 transition-all duration-1000 ease-out delay-600 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Advanced AI-powered health predictions for a better tomorrow
          </p>

          {/* Animated CTA Button */}
          <div
            className={`transition-all duration-1000 ease-out delay-900 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Button
              onClick={() => navigate("/landingpage")}
              className="bg-orange-400 hover:bg-gray-800 text-white px-12 py-4 text-xl font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-orange-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-orange-300 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-32 left-16 w-3 h-3 bg-orange-500 rounded-full animate-ping opacity-50"></div>
      </div>
    </div>
  )
}
