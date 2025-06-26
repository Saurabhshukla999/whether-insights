"use client"

import { motion } from "framer-motion"
import { easings } from "@/lib/advanced-animations"
import { MotionWrapper } from "@/components/motion-wrapper"

export function EnhancedSkills() {
  const skills = [
    {
      category: "Languages",
      items: ["JavaScript", "TypeScript", "Java", "Python"],
      icon: "💻",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      category: "Frontend",
      items: ["React.js", "Tailwind CSS", "React Query", "Chart.js"],
      icon: "🎨",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      category: "Tools",
      items: ["Git", "GitHub", "Vite", "npm", "Yarn"],
      icon: "🛠️",
      gradient: "from-gray-400 to-gray-600",
    },
    {
      category: "Backend & APIs",
      items: ["Node.js", "Express.js", "Supabase", "REST APIs"],
      icon: "⚡",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      category: "Authentication",
      items: ["JWT", "Supabase Auth"],
      icon: "🔐",
      gradient: "from-red-400 to-pink-500",
    },
    {
      category: "Currently Learning",
      items: ["Next.js"],
      icon: "📚",
      gradient: "from-purple-400 to-indigo-500",
    },
  ]

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const cardVariants = {
    initial: {
      opacity: 0,
      y: 60,
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
      duration: 1,
      ease: easings.elastic,
    },
  }

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.3) 2px, transparent 0)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating geometric shapes */}
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-16 bg-gradient-to-b from-blue-400/20 to-transparent"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: easings.organic,
              delay: i * 0.5,
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              transformOrigin: "center bottom",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <MotionWrapper animation="fadeInLuxury" className="text-center mb-20">
          <motion.h2
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: easings.elastic }}
            viewport={{ once: true }}
          >
            <span className="text-white">Technical </span>
            <motion.span
              className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: easings.organic,
              }}
              style={{
                backgroundSize: "300% 300%",
              }}
            >
              Expertise
            </motion.span>
          </motion.h2>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"
            initial={{ scaleX: 0, originX: 0.5 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: easings.elastic }}
            viewport={{ once: true }}
          />
        </MotionWrapper>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              variants={cardVariants}
              className="group relative"
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3, ease: easings.smooth },
              }}
            >
              <div className="relative overflow-hidden bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 h-full">
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${skillGroup.gradient} opacity-0 group-hover:opacity-5`}
                  transition={{ duration: 0.5, ease: easings.smooth }}
                />

                {/* Static icon with subtle hover effect only */}
                <motion.div
                  className="text-4xl mb-6 relative z-10"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                >
                  {skillGroup.icon}
                </motion.div>

                <motion.h3
                  className="text-xl font-semibold mb-6 text-white relative z-10 group-hover:text-blue-400 transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {skillGroup.category}
                  <motion.div
                    className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r ${skillGroup.gradient} w-0 group-hover:w-full transition-all duration-500`}
                  />
                </motion.h3>

                <div className="flex flex-wrap gap-3 relative z-10">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      className="px-4 py-2 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium border border-gray-600/50 hover:border-blue-400/50 hover:text-blue-300 hover:bg-blue-500/10 transition-all duration-300 cursor-default"
                      initial={{
                        opacity: 0,
                        scale: 0,
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 0.4 + index * 0.1 + skillIndex * 0.05,
                        ease: easings.bounce,
                      }}
                      viewport={{ once: true }}
                      whileHover={{
                        scale: 1.1,
                        y: -2,
                        boxShadow: "0 5px 15px rgba(59, 130, 246, 0.2)",
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                {/* Decorative elements */}
                <motion.div
                  className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-r ${skillGroup.gradient} rounded-full opacity-60`}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: easings.organic,
                    delay: index * 0.3,
                  }}
                />

                <motion.div
                  className={`absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r ${skillGroup.gradient} rounded-full opacity-40`}
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: easings.organic,
                    delay: index * 0.2,
                  }}
                />

                {/* Hover glow effect */}
                <motion.div
                  className={`absolute -inset-1 bg-gradient-to-r ${skillGroup.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20`}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced floating skill badges - removed rotation */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: easings.smooth }}
          viewport={{ once: true }}
        >
          <motion.p
            className="text-gray-400 mb-8 text-lg"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: easings.organic,
            }}
          >
            Always learning, always growing
          </motion.p>

          <motion.div
            className="flex justify-center space-x-4"
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {["React", "TypeScript", "Node.js"].map((skill, index) => (
              <motion.div
                key={skill}
                className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-400/30 backdrop-blur-sm"
                variants={{
                  initial: { scale: 0, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                }}
                transition={{
                  duration: 0.8,
                  delay: 1.5 + index * 0.2,
                  ease: easings.bounce,
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                  transition: { duration: 0.3 },
                }}
                animate={{
                  y: [0, -5, 0],
                }}
                style={{
                  animationDelay: `${index * 0.5}s`,
                  animationDuration: "3s",
                  animationIterationCount: "infinite",
                }}
              >
                <span className="text-blue-300 font-medium">{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
