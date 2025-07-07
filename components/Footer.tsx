"use client"

import { Brain, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className="border-t border-gray-800 bg-gray-900/50">
      <div className="container px-4 py-12 md:px-6 mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-4">
          <div
            className={`space-y-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center space-x-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-5 w-5 text-white group-hover:animate-pulse" />
              </div>
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AriesBerriesCompany
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Engineering the future, one app at a time. Building intelligent applications that redefine what's
              possible.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                <Github className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {[
            {
              title: "Product",
              links: [
                { name: "Our Apps", href: "#apps" },
                { name: "Features", href: "#" },
                { name: "API", href: "#" },
              ],
              delay: "delay-200",
            },
            {
              title: "Company",
              links: [
                { name: "About", href: "#about" },
                { name: "Careers", href: "#careers" },
                { name: "Blog", href: "#" },
              ],
              delay: "delay-400",
            },
            {
              title: "Support",
              links: [
                { name: "Contact", href: "#contact" },
                { name: "Documentation", href: "#" },
                { name: "Privacy Policy", href: "#" },
              ],
              delay: "delay-600",
            },
          ].map((section, index) => (
            <div
              key={index}
              className={`space-y-4 transition-all duration-700 ${section.delay} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h4 className="text-sm font-semibold text-white">{section.title}</h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className={`mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400 transition-all duration-700 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p>&copy; {new Date().getFullYear()} AriesBerriesCompany. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
