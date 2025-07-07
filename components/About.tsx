"use client"

import { Eye, Rocket, Users } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setCardsVisible(true), 300)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const cards = [
    {
      icon: Users,
      title: "Our Mission",
      description: "To build AI applications that amplify human creativity and solve real-world problems.",
      delay: "delay-200",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "A future where AI empowers every individual to achieve their creative and productive potential.",
      delay: "delay-400",
    },
    {
      icon: Rocket,
      title: "Our Approach",
      description: "Product-led innovation with a focus on user experience and responsible AI development.",
      delay: "delay-600",
    },
  ]

  return (
    <section ref={sectionRef} id="about" className="py-20 md:py-32">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <Badge
              variant="secondary"
              className={`bg-purple-500/20 text-purple-300 border-purple-500/30 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              The Minds Behind the Mission
            </Badge>
            <h2
              className={`text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              About AriesBerriesCompany
            </h2>
            <p
              className={`text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              We are a product-led innovation hub, focused on identifying problems and building AI-driven solutions that
              make a meaningful impact. Our mission is to create technology that enhances human potential and opens new
              frontiers of possibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {cards.map((card, index) => (
              <Card
                key={index}
                className={`bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-700 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 ${card.delay} ${
                  cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <CardContent className="p-6 lg:p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 group">
                    <card.icon className="h-10 w-10 text-white group-hover:animate-pulse" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
