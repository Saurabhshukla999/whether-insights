import { ExternalLink, Github } from "lucide-react"
import { TiltCard } from "@/components/tilt-card"
import { BouncyScroll } from "@/components/bouncy-scroll"
import { BreathingButton } from "@/components/breathing-button"

export function Projects() {
  const projects = [
    {
      title: "DevLog",
      subtitle: "Technical Blog for Developers",
      description:
        "Developed a responsive blogging platform for developers using React with functional components and hooks. Implemented JWT-based user authentication using Supabase's built-in auth features.",
      tech: ["React", "React Query", "Tailwind CSS", "Supabase (PostgreSQL)"],
      highlights: [
        "Optimized component rendering using React.memo and useCallback, improving performance by ~40%",
        "Applied best practices in component structuring and state management",
        "Clean, mobile-friendly UI with Tailwind CSS",
      ],
    },
    {
      title: "WeatherInsights",
      subtitle: "Climate Visualization Tool",
      description:
        "Built a weather dashboard using React, integrating the OpenWeather API for real-time climate data. Implemented geolocation-based weather fetching with dynamic 5-day forecast visualizations.",
      tech: ["React", "Axios", "Chart.js", "Geolocation API", "OpenWeather API"],
      highlights: [
        "Reduced unnecessary API calls by 30% through smart caching",
        "Interactive and responsive UI that adapts to current weather conditions",
        "Dynamic visualizations using Chart.js",
      ],
      liveUrl: "https://whether-insights.vercel.app/",
      githubUrl: "https://github.com/Saurabhshukla999/whether-insights",
    },
    {
      title: "FlowBoard",
      subtitle: "Task Management App",
      description:
        "Developed a Trello-style task board with drag-and-drop functionality using React DnD. Built a type-safe React codebase with TypeScript, improving reliability and developer experience.",
      tech: ["React", "TypeScript", "React DnD", "JWT Authentication"],
      highlights: [
        "Clean component architecture and modular design for scalability",
        "Responsive, intuitive UI with real-time feedback",
        "Secure JWT-based user authentication",
      ],
      liveUrl: "https://flowboard-app-iota.vercel.app/",
      githubUrl: "https://github.com/Saurabhshukla999/flowboard-app",
    },
  ]

  return (
    <section id="projects" className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BouncyScroll intensity={1.2}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-white">Featured </span>
              <span className="text-blue-400">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
          </div>
        </BouncyScroll>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <BouncyScroll key={project.title} intensity={1.0 + index * 0.1}>
              <div
                className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                data-cursor="project"
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <TiltCard className="h-full">
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg h-full">
                      <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-blue-400 mb-4">{project.subtitle}</p>
                      <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                      <div className="mb-6">
                        <h4 className="text-white font-semibold mb-3">Key Highlights:</h4>
                        <ul className="space-y-2">
                          {project.highlights.map((highlight, i) => (
                            <li key={i} className="text-gray-300 flex items-start">
                              <span className="text-blue-400 mr-2">•</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex space-x-4">
                        <BreathingButton
                          href={project.githubUrl || "https://github.com/Saurabhshukla999"}
                          className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                          intensity={0.8}
                        >
                          <Github size={16} />
                          <span>Code</span>
                        </BreathingButton>
                        {project.liveUrl && (
                          <BreathingButton
                            href={project.liveUrl}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                            intensity={1.2}
                          >
                            <ExternalLink size={16} />
                            <span>Live Demo</span>
                          </BreathingButton>
                        )}
                      </div>
                    </div>
                  </TiltCard>
                </div>

                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <div className="relative">
                    <div className="w-full h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                      <div className="text-4xl font-bold text-white">{project.title}</div>
                    </div>
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/20 rounded-full animate-pulse delay-1000"></div>
                  </div>
                </div>
              </div>
            </BouncyScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
