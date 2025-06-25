"use client"

import { useInView } from "@/hooks/use-in-view"
import { TiltCard } from "@/components/tilt-card"

export function Skills() {
  const [skillsRef, isInView] = useInView(0.2)

  const skills = [
    { category: "Languages", items: ["JavaScript", "TypeScript", "Java", "Python"] },
    { category: "Frontend", items: ["React.js", "Tailwind CSS", "React Query", "Chart.js"] },
    { category: "Tools", items: ["Git", "GitHub", "Vite", "npm", "Yarn"] },
    { category: "Backend & APIs", items: ["Node.js", "Express.js", "Supabase", "REST APIs"] },
    { category: "Authentication", items: ["JWT", "Supabase Auth"] },
    { category: "Currently Learning", items: ["Next.js"] },
  ]

  return (
    <section ref={skillsRef} id="skills" className="py-20 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.1) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl font-bold mb-4 transition-all duration-1000 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-white">Technical </span>
            <span className="text-blue-400">Skills</span>
          </h2>
          <div
            className={`w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto transition-all duration-1000 delay-200 ${
              isInView ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          ></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => (
            <TiltCard
              key={skillGroup.category}
              className={`transition-all duration-500 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${400 + index * 100}ms`,
                animation: isInView ? `float 6s ease-in-out infinite ${index * 0.5}s` : "none",
              }}
            >
              <div className="bg-gray-900/50 p-6 rounded-lg hover:bg-gray-800/50 transition-all duration-500">
                <h3 className="text-xl font-semibold mb-4 text-blue-400 relative">
                  {skillGroup.category}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500 group-hover:w-full"></div>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-blue-500/20 hover:text-blue-300 transition-all duration-300 transform hover:scale-110 ${
                        isInView ? "animate-fade-in" : ""
                      }`}
                      style={{
                        animationDelay: `${600 + index * 100 + skillIndex * 50}ms`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
