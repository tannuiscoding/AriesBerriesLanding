import About from "@/components/About"
import BuildingSection from "@/components/BuildingSection"
import Career from "@/components/Career"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Hero from "@/components/Hero"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* What We're Building Section */}
      <BuildingSection />

      {/* About Section */}
      <About />

      {/* Careers Section */}
      <Career />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  )
}
