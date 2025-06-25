"use client"

import { useInView } from "@/hooks/use-in-view"

export function About() {
  const [aboutRef, isInView] = useInView(0.3)

  return (
    <section ref={aboutRef} id="about" className="py-20 bg-gray-900/50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold mb-4 transition-all duration-1000 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-white">About </span>
            <span className="text-blue-400">Me</span>
          </h2>
          <div
            className={`w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto transition-all duration-1000 delay-200 ${
              isInView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          ></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1000 delay-400 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <h3 className="text-2xl font-semibold mb-6 text-white">Passionate Frontend Developer</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              I'm a dedicated Frontend Developer with 2+ years of experience building modern, responsive web
              applications. My journey in web development started with a curiosity about how websites work, and it has
              evolved into a passion for creating seamless user experiences.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Currently pursuing BTech in Computer Science and Engineering, I combine academic knowledge with practical
              experience to deliver high-quality solutions. I'm eager to contribute and grow with a team pushing real
              impact.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Location", value: "Gurugram, Haryana" },
                { label: "Experience", value: "2+ Years" },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className={`transition-all duration-700 delay-${600 + index * 100} ${
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                  }`}
                >
                  <h4 className="text-blue-400 font-semibold mb-2">{item.label}</h4>
                  <p className="text-gray-300">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-600 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center animate-spin-slow">
              <div className="w-64 h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center animate-reverse-spin-slow">
                <div className="text-6xl font-bold text-white">SS</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full animate-ping"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/20 rounded-full animate-ping delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
