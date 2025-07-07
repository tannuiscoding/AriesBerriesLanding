"use client"

import { Eye, Rocket, Shield, Star, Zap } from "lucide-react"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { useEffect, useRef, useState } from "react"

const Building = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setCardsVisible(true), 500)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section ref={sectionRef} className="py-20 md:py-32 bg-gray-900/50">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <Badge
              variant="secondary"
              className={`bg-purple-500/20 text-purple-300 border-purple-500/30 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Our First Innovation is on the Horizon
            </Badge>

            <h2
              className={`text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              What We're Building
            </h2>

            <div
              className={`relative transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl animate-pulse" />
              <Card className="relative bg-gray-900/80 border-gray-800 backdrop-blur hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/10 max-w-4xl mx-auto">
                <CardContent className="p-8 md:p-12 lg:p-16">
                  <div className="flex items-center justify-center mb-6">
                    <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl hover:scale-110 transition-transform duration-300">
                      <Rocket
                        className="h-12 w-12 text-purple-400 animate-bounce"
                        style={{ animationDuration: "3s" }}
                      />
                    </div>
                  </div>
                  <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                    We're currently developing our flagship application, a revolutionary AI tool designed to transform
                    the creative process. Get ready to unlock new levels of productivity and imagination that will
                    fundamentally change how you approach creativity, productivity, and innovation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <div
              className={`space-y-6 transition-all duration-700 delay-600 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                The Future is Limited Only by Imagination
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                At AriesBerriesCompany, we believe in building human-centric AI that amplifies human potential rather
                than replacing it. Our vision is to create technology that empowers creativity, enhances productivity,
                and opens new possibilities for innovation across every industry.
              </p>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-6xl mx-auto">
              {[
                {
                  icon: Eye,
                  title: "Imagination",
                  description: "We explore what could be, not just what is.",
                  delay: "delay-[800ms]",
                },
                {
                  icon: Zap,
                  title: "Autonomy",
                  description: "We build tools that empower, not replace.",
                  delay: "delay-[900ms]",
                },
                {
                  icon: Star,
                  title: "Excellence",
                  description: "Obsessed with quality, from code to user experience.",
                  delay: "delay-[1000ms]",
                },
                {
                  icon: Shield,
                  title: "Integrity",
                  description: "We build responsible AI that earns trust.",
                  delay: "delay-[1100ms]",
                },
              ].map((value, index) => (
                <Card
                  key={index}
                  className={`bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-700 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 ${value.delay} ${
                    cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <CardHeader className="text-center p-6">
                    <div className="mx-auto p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl w-fit hover:scale-110 transition-transform duration-300">
                      <value.icon className="h-6 w-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-white text-lg">{value.title}</CardTitle>
                    <CardDescription className="text-gray-400 text-sm leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Apps Section */}
      <section id="apps" className="py-20 md:py-32 bg-gray-900/50">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <div
              className={`space-y-6 transition-all duration-700 delay-1000 ${
                cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                A Constellation of AI-Powered Solutions
              </Badge>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Our Innovations are Coming Soon
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                We are hard at work building our first application. Our goal is to launch a tool that will fundamentally
                change how you approach creativity, productivity, and data analysis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Building
