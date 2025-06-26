"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Github, Linkedin } from "lucide-react"
import { easings } from "@/lib/advanced-animations"

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easings.smooth }}
            viewport={{ once: true }}
          >
            <span className="text-white">Get In </span>
            <span className="text-blue-400">Touch</span>
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: easings.elastic }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: easings.smooth }}
            viewport={{ once: true }}
          >
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about
            technology. Feel free to reach out!
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easings.smooth }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-8 text-white">Contact Information</h3>
            <div className="space-y-6">
              <motion.div
                className="flex items-center space-x-4 group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
                  <Mail className="text-blue-400" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <a
                    href="mailto:saurabhshukla8983@gmail.com"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    saurabhshukla8983@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4 group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center group-hover:bg-purple-500/30 transition-colors duration-300">
                  <MapPin className="text-purple-400" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Location</h4>
                  <p className="text-gray-300">Gurugram, Haryana, India</p>
                </div>
              </motion.div>

              <div className="pt-6">
                <h4 className="text-white font-semibold mb-4">Connect with me</h4>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://github.com/Saurabhshukla999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={20} />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/saurabh-kumar-shukla"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin size={20} />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easings.smooth }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-8 text-white">Send a Message</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400 text-white transition-colors duration-200"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400 text-white transition-colors duration-200"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-400 text-white resize-none transition-colors duration-200"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-16 pt-8 border-t border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: easings.smooth }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400">© 2024 Saurabh Shukla. Built with React & Tailwind CSS.</p>
        </motion.div>
      </div>
    </section>
  )
}
