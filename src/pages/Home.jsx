import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function Home() {
  const mode = useStore((state) => state.mode)

  const isPro = mode === 'professional'

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl w-full text-center space-y-8"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Yash Vardhan
        </motion.h1>
        
        <h2 className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-cyan-400">
          {isPro 
            ? "Mechanical Engineer | Minor in CSE"
            : "Professional Builder of Things that (usually) Don't Break"}
        </h2>
        
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          {isPro
            ? "Mechanical Engineering student combining engineering expertise with modern tech skills to build robust software and hardware solutions."
            : "I write code, bend metal, and occasionally train neural networks. I'm just out here trying to make computers and machines do cool stuff."}
        </p>

        <div className="flex justify-center gap-6 pt-8">
          {[
            { icon: Mail, href: "mailto:yashvardhan7749@gmail.com" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/yash-vardhan-111904186/" },
            { icon: Github, href: "https://github.com/Yashv77" },
            { icon: Twitter, href: "https://x.com/yashv_7" },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full transition-all ${
                isPro 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-gray-800 text-cyan-400 hover:bg-cyan-900/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] border border-cyan-800'
              }`}
              whileHover={{ scale: 1.1, translateY: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
