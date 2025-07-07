"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { useEffect, useRef, useState } from "react"

const Career = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
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
    <section ref={sectionRef} id="careers" className="py-20 md:py-32 bg-gray-900/50">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2
            className={`text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Help Us Build What's Next
          </h2>
          <p
            className={`text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Join our foundational team of passionate innovators and builders. We're looking for people who share our
            vision of creating AI that enhances human potential and solves meaningful problems.
          </p>
          <Button
            size="lg"
            className={`h-11 lg:h-12 px-8 lg:px-10 text-base md:text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-700 delay-400 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <Link href="#contact" className="flex items-center">
              Interested in joining our mission?
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Career
