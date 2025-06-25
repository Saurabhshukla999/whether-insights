"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { GradientText } from "@/components/gradient-text"
import { BouncyScroll } from "@/components/bouncy-scroll"
import { AsciiTransform } from "@/components/ascii-transform"
import { LiquidButton } from "@/components/liquid-button"

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [heroRef, isInView] = useInView(0.3)

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section ref={heroRef} id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        <div
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: `${20 + mousePosition.x * 0.1}%`,
            top: `${20 + mousePosition.y * 0.1}%`,
            transform: `scale(${1 + mousePosition.x * 0.001})`,
          }}
        ></div>
        <div
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            right: `${20 + mousePosition.x * 0.05}%`,
            bottom: `${20 + mousePosition.y * 0.05}%`,
            transform: `scale(${1 + mousePosition.y * 0.001})`,
          }}
        ></div>
        <div
          className="absolute w-[800px] h-[400px] bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) rotate(${mousePosition.x * 0.1}deg)`,
            transition: "transform 1s ease-out",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div
          className={`transition-all duration-1000 ${
            mounted && isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <BouncyScroll intensity={1.5}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="inline-block text-white animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                Hi, I'm{" "}
              </span>
              <AsciiTransform text="Saurabh" className="inline-block">
                <GradientText
                  className="inline-block animate-fade-in-up text-5xl md:text-7xl font-bold"
                  animationType="continuous"
                  style={{ animationDelay: "0.4s" }}
                >
                  Saurabh
                </GradientText>
              </AsciiTransform>
            </h1>
          </BouncyScroll>

          <BouncyScroll intensity={1.2}>
            <p className="text-xl md:text-2xl text-gray-300 mb-4 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
              Frontend Developer
            </p>
          </BouncyScroll>

          <BouncyScroll intensity={0.8}>
            <p
              className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              React Developer focused on building performant, scalable web interfaces. 2+ years of hands-on experience
              building production-grade apps using React, TypeScript, and modern stacks.
            </p>
          </BouncyScroll>

          <BouncyScroll intensity={1.0}>
            <div className="flex justify-center space-x-6 mb-12 animate-fade-in-up" style={{ animationDelay: "1s" }}>
              {[
                { href: "https://github.com/Saurabhshukla999", icon: Github },
                { href: "https://www.linkedin.com/in/saurabh-kumar-shukla", icon: Linkedin },
                { href: "mailto:saurabhshukla8983@gmail.com", icon: Mail },
              ].map(({ href, icon: Icon }, index) => (
                <LiquidButton
                  key={href}
                  href={href}
                  className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full animate-bounce-in"
                  intensity={1.5}
                  style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                >
                  <Icon size={24} />
                </LiquidButton>
              ))}
            </div>
          </BouncyScroll>

          <BouncyScroll intensity={1.3}>
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
              style={{ animationDelay: "1.4s" }}
            >
              <LiquidButton
                href="#projects"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600"
                intensity={1.8}
              >
                View My Work
              </LiquidButton>
              <LiquidButton
                href="#contact"
                className="px-8 py-3 border border-gray-600 text-white rounded-full hover:bg-gray-800 hover:border-gray-500"
                intensity={1.2}
              >
                Get In Touch
              </LiquidButton>
            </div>
          </BouncyScroll>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <ChevronDown size={32} className="text-gray-400 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
