"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { LiquidButton } from "@/components/liquid-button"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <LiquidButton className="text-2xl font-bold" intensity={1.2}>
            <span className="text-white">Saurabh</span>
            <span className="text-blue-400">.</span>
          </LiquidButton>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <LiquidButton
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 relative group px-2 py-1"
                intensity={1.0}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
              </LiquidButton>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <LiquidButton className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)} intensity={1.5}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </LiquidButton>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md rounded-lg mt-2 p-4">
            {navItems.map((item) => (
              <LiquidButton
                key={item.href}
                href={item.href}
                className="block py-2 text-gray-300 hover:text-white transition-colors duration-200 w-full text-left"
                onClick={() => setIsOpen(false)}
                intensity={1.0}
              >
                {item.label}
              </LiquidButton>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
