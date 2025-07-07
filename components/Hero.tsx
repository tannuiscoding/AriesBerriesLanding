"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent" />

      <div className="container relative px-4 md:px-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center text-center space-y-8 min-h-[60vh]">
          <Badge
            variant="secondary"
            className={`bg-purple-500/20 text-purple-300 border-purple-500/30 transition-all duration-1000 font-medium ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Sparkles className="w-3 h-3 mr-1 animate-pulse" />
            Shape your thoughts, and watch the world take form
          </Badge>

          <div className="space-y-4 max-w-5xl mx-auto">
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ fontFeatureSettings: "'cv02', 'cv03', 'cv04', 'cv11'" }}
            >
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent block">
                Engineering the Future,
              </span>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
                One App at a Time
              </span>
            </h1>

            <p
              className={`text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-normal transition-all duration-1000 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              AriesBerriesCompany is an innovation lab building a portfolio of intelligent applications designed to
              redefine what's possible.
            </p>
          </div>

          {/* Neural Network Animation */}
          <div
            className={`relative w-full max-w-3xl h-48 md:h-64 my-12 mx-auto transition-all duration-1000 delay-600 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-3xl animate-pulse" />
            <div className="relative h-full bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-gray-800 flex items-center justify-center hover:border-purple-500/50 transition-colors duration-500">
              <div className="grid grid-cols-4 gap-4 opacity-60">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse hover:scale-125 transition-transform duration-300"
                    style={{
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: "2s",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className={`h-14 px-8 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-1000 delay-800 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            See What's Coming
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Hero
