"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { easings } from "@/lib/advanced-animations"
import { MotionWrapper } from "@/components/motion-wrapper"

export function EnhancedProjects() {
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
      gradient: "from-blue-500 to-cyan-500",
      accentColor: "blue",
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
      gradient: "from-purple-500 to-pink-500",
      accentColor: "purple",
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
      gradient: "from-green-500 to-teal-500",
      accentColor: "green",
    },
  ]

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    initial: {
      opacity: 0,
      y: 100,
      scale: 0.8,
      filter: "blur(10px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
    },
    transition: {
      duration: 1.2,
      ease: easings.elastic,
    },
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-900/50 to-black/50 relative overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: easings.organic,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <MotionWrapper animation="fadeInLuxury" className="text-center mb-20">
          <motion.h2
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easings.silk }}
            viewport={{ once: true }}
          >
            <span className="text-white">Featured </span>
            <motion.span
              className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: easings.organic,
              }}
              style={{
                backgroundSize: "300% 300%",
              }}
            >
              Projects
            </motion.span>
          </motion.h2>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: easings.elastic }}
            viewport={{ once: true }}
          />

          <motion.p
            className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: easings.smooth }}
            viewport={{ once: true }}
          >
            A showcase of my passion for creating exceptional digital experiences. Each project represents a unique
            challenge solved with creativity and technical expertise.
          </motion.p>
        </MotionWrapper>

        <motion.div
          className="space-y-32"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
            >
              {/* Project Info */}
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <motion.div
                  className="group relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: easings.smooth }}
                >
                  {/* Floating badge - removed rotation */}
                  <motion.div
                    className={`absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r ${project.gradient} rounded-full text-white text-sm font-semibold shadow-lg`}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: easings.bounce }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    }}
                  >
                    Featured
                  </motion.div>

                  <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 relative overflow-hidden">
                    {/* Animated background gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-5`}
                      transition={{ duration: 0.5, ease: easings.smooth }}
                    />

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className={`text-${project.accentColor}-400 mb-6 font-medium`}>{project.subtitle}</p>
                    </motion.div>

                    <motion.p
                      className="text-gray-300 mb-8 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      {project.description}
                    </motion.p>

                    {/* Enhanced highlights */}
                    <motion.div
                      className="mb-8"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <h4 className="text-white font-semibold mb-4 flex items-center">
                        <motion.div
                          className={`w-2 h-2 bg-${project.accentColor}-400 rounded-full mr-3`}
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                        Key Achievements
                      </h4>
                      <ul className="space-y-3">
                        {project.highlights.map((highlight, i) => (
                          <motion.li
                            key={i}
                            className="text-gray-300 flex items-start group/item"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ x: 5 }}
                          >
                            <ArrowRight
                              size={16}
                              className={`text-${project.accentColor}-400 mr-3 mt-0.5 group-hover/item:translate-x-1 transition-transform duration-200`}
                            />
                            {highlight}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Enhanced tech stack - removed rotation */}
                    <motion.div
                      className="flex flex-wrap gap-3 mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1 }}
                      viewport={{ once: true }}
                    >
                      {project.tech.map((tech, i) => (
                        <motion.span
                          key={tech}
                          className={`px-4 py-2 bg-${project.accentColor}-500/20 text-${project.accentColor}-300 rounded-full text-sm font-medium border border-${project.accentColor}-500/30`}
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: 1.2 + i * 0.1,
                            ease: easings.bounce,
                          }}
                          viewport={{ once: true }}
                          whileHover={{
                            scale: 1.1,
                            boxShadow: `0 5px 15px rgba(59, 130, 246, 0.3)`,
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>

                    {/* Enhanced action buttons - removed floating animation from icons */}
                    <motion.div
                      className="flex space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.4 }}
                      viewport={{ once: true }}
                    >
                      <motion.a
                        href={project.githubUrl || "https://github.com/Saurabhshukla999"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center space-x-2 px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg border border-gray-600/50 transition-all duration-300"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={18} className="group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-white font-medium">Code</span>
                      </motion.a>

                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${project.gradient} rounded-lg relative overflow-hidden`}
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/20"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.5, ease: easings.smooth }}
                          />
                          <ExternalLink
                            size={18}
                            className="relative z-10 group-hover:scale-110 transition-transform duration-300"
                          />
                          <span className="relative z-10 text-white font-medium">Live Demo</span>
                        </motion.a>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Enhanced Project Visual - removed text rotation */}
              <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5, ease: easings.smooth }}
                >
                  <div className="relative overflow-hidden rounded-2xl">
                    <motion.div
                      className={`w-full h-80 bg-gradient-to-br ${project.gradient} rounded-2xl flex items-center justify-center relative overflow-hidden`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5, ease: easings.smooth }}
                    >
                      {/* Animated background pattern */}
                      <motion.div
                        className="absolute inset-0 opacity-20"
                        animate={{
                          backgroundPosition: ["0% 0%", "100% 100%"],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                        style={{
                          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                          backgroundSize: "20px 20px",
                        }}
                      />

                      <motion.div
                        className="text-6xl font-bold text-white/90 relative z-10"
                        whileHover={{
                          scale: 1.1,
                          textShadow: "0 0 30px rgba(255,255,255,0.5)",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {project.title}
                      </motion.div>
                    </motion.div>

                    {/* Glow effect */}
                    <motion.div
                      className={`absolute -inset-1 bg-gradient-to-r ${project.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30`}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  {/* Static decorative elements - removed floating animation */}
                  <motion.div
                    className={`absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r ${project.gradient} rounded-full opacity-60`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  />

                  <motion.div
                    className={`absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r ${project.gradient} rounded-full opacity-40`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
