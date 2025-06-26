"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react"
import { animations, easings } from "@/lib/advanced-animations"

export function EnhancedHero() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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

  const letterVariants = {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0.5,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  }

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  }

  const socialVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    whileHover: {
      scale: 1.1,
      boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
      transition: { duration: 0.3, ease: easings.bounce },
    },
    whileTap: { scale: 0.9 },
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: easings.organic,
          }}
          style={{
            left: `${20 + mousePosition.x * 0.05}%`,
            top: `${20 + mousePosition.y * 0.05}%`,
          }}
        />

        <motion.div
          className="absolute w-[600px] h-[600px] bg-gradient-to-l from-cyan-500/8 via-blue-500/8 to-purple-500/8 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: easings.organic,
          }}
          style={{
            right: `${15 + mousePosition.x * 0.03}%`,
            bottom: `${15 + mousePosition.y * 0.03}%`,
          }}
        />

        {/* Static geometric shapes - removed floating animation */}
        {Array.from({ length: 6 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-20 bg-gradient-to-b from-blue-400/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: i * 0.2, duration: 1 }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              transformOrigin: "center bottom",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Enhanced greeting animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: easings.silk }}
        >
          <motion.p
            className="text-lg md:text-xl text-blue-400 mb-4 font-light tracking-wider"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: easings.smooth }}
          >
            Welcome to my digital space
          </motion.p>
        </motion.div>

        {/* Sophisticated name animation - removed rotation */}
        <motion.div variants={containerVariants} animate="animate">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 perspective-1000">
            <motion.span
              className="inline-block text-white mr-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: easings.elastic }}
            >
              Hi, I'm
            </motion.span>

            <motion.span className="inline-block">
              {"Saurabh".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  transition={{
                    duration: 0.8,
                    delay: 1.2 + index * 0.1,
                    ease: easings.bounce,
                  }}
                  className="inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                  whileHover={{
                    scale: 1.2,
                    textShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
                    transition: { duration: 0.3 },
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          </h1>
        </motion.div>

        {/* Enhanced subtitle with morphing effect */}
        <motion.div
          initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
          animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
          transition={{ duration: 1.5, delay: 2, ease: easings.organic }}
        >
          <motion.h2
            className="text-xl md:text-3xl mb-4 relative"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: easings.organic,
            }}
            style={{
              background: "linear-gradient(45deg, #60A5FA, #A855F7, #EC4899, #60A5FA)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Frontend Developer & Digital Craftsman
          </motion.h2>
        </motion.div>

        {/* Enhanced description */}
        <motion.p
          className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 2.5, ease: easings.silk }}
        >
          Crafting exceptional digital experiences with{" "}
          <motion.span
            className="text-blue-400 font-semibold"
            whileHover={{
              scale: 1.1,
              textShadow: "0 0 10px rgba(59, 130, 246, 0.8)",
            }}
          >
            React
          </motion.span>
          ,{" "}
          <motion.span
            className="text-purple-400 font-semibold"
            whileHover={{
              scale: 1.1,
              textShadow: "0 0 10px rgba(147, 51, 234, 0.8)",
            }}
          >
            TypeScript
          </motion.span>
          , and modern web technologies. Passionate about creating performant, accessible, and beautiful interfaces.
        </motion.p>

        {/* Enhanced social links - removed floating animation */}
        <motion.div
          className="flex justify-center space-x-8 mb-12"
          variants={animations.staggerContainer}
          animate="animate"
        >
          {[
            { href: "https://github.com/Saurabhshukla999", icon: Github, color: "from-gray-400 to-gray-600" },
            {
              href: "https://www.linkedin.com/in/saurabh-kumar-shukla",
              icon: Linkedin,
              color: "from-blue-400 to-blue-600",
            },
            { href: "mailto:saurabhshukla8983@gmail.com", icon: Mail, color: "from-red-400 to-red-600" },
          ].map(({ href, icon: Icon, color }, index) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              variants={socialVariants}
              transition={{
                duration: 0.6,
                delay: 3 + index * 0.1,
                ease: easings.bounce,
              }}
              className={`p-4 bg-gradient-to-r ${color} rounded-full relative overflow-hidden group`}
            >
              <Icon size={24} className="relative z-10 text-white" />
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Enhanced CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.5, ease: easings.elastic }}
        >
          <motion.a
            href="#projects"
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ x: "100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3, ease: easings.smooth }}
            />
            <span className="relative z-10 text-white font-semibold">Explore My Work</span>
          </motion.a>

          <motion.a
            href="#contact"
            className="group relative px-8 py-4 border-2 border-gray-600 rounded-full overflow-hidden"
            whileHover={{
              scale: 1.05,
              borderColor: "rgb(59, 130, 246)",
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3, ease: easings.smooth }}
            />
            <span className="relative z-10 text-white font-semibold">Let's Connect</span>
          </motion.a>
        </motion.div>

        {/* Enhanced scroll indicator - removed floating animation */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4, ease: easings.smooth }}
        >
          <motion.div className="flex flex-col items-center space-y-2">
            <span className="text-gray-400 text-sm tracking-wider">Scroll to explore</span>
            <motion.div
              whileHover={{ scale: 1.2, color: "#60A5FA" }}
              className="p-2 border border-gray-600 rounded-full"
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: easings.organic,
              }}
            >
              <ChevronDown size={20} className="text-gray-400" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
