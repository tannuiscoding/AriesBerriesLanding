"use client"

import { Brain, Menu } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-gray-800 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-md shadow-lg shadow-black/20" : "bg-black/95 backdrop-blur"
      } supports-[backdrop-filter]:bg-black/60`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto max-w-7xl">
        <div className="flex items-center space-x-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 group-hover:scale-110 transition-transform duration-300">
            <Brain className="h-5 w-5 text-white group-hover:animate-pulse" />
          </div>
          <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AriesBerriesCompany
          </span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#apps"
            className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 relative group"
          >
            Our Apps
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="#careers"
            className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 relative group"
          >
            Careers
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 relative group"
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            size="sm"
            className="font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
          >
            Get Started
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
