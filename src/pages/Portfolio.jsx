import { motion } from 'framer-motion'
import { Mail, Linkedin, Github, Twitter, Briefcase, Paintbrush } from 'lucide-react'
import { useStore } from '../store/useStore'
import { useState, useEffect } from 'react'
import About from './About'
import Experience from './Experience'
import Projects from './Projects'

const UpworkIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.4,14.6c-1.3,0-2.4-0.6-3.1-1.6l-1.3-4.5c0.8-2.1,2.5-3.6,4.7-3.6c2.8,0,5,2.3,5,5.1 S20.2,14.6,17.4,14.6 M17.4,3c-3.1,0-5.7,1.8-6.8,4.3L9.5,4.2H7.2V11c0,1.2-1,2.1-2.1,2.1S3,12.2,3,11V4.2H0.7V11 c0,2.4,2,4.4,4.4,4.4s4.4-2,4.4-4.4V8.4l0.8,2.7c-0.8,1.4-1.3,3-1.4,4.5l-2.2,6.3h2.4l1.4-4c0.1-1.3,0.5-2.6,1-3.7 c1.1,1.8,3,2.9,5.2,2.9c4,0,7.3-3.3,7.3-7.3C24.7,6.3,21.5,3,17.4,3" />
  </svg>
)

export default function Portfolio() {
  const { mode, toggleMode } = useStore()
  const isPro = mode === 'professional'
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, {
      root: document.getElementById('content'),
      rootMargin: "-40% 0px -50% 0px" // Creates a horizontal crosshair near the middle of the viewport
    })

    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  return (
    <div className="bg-transparent dark:bg-transparent transition-colors duration-300 ease-in-out relative h-screen w-full flex justify-center overflow-hidden">
      
      {/* DYNAMIC BACKGROUND GRID AND GRADIENT AURA VIGNETTE */}
      <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full bg-slate-50 dark:bg-[#09090b] transition-colors duration-300 ease-in-out">
        <div className={`absolute inset-0 transition-opacity duration-300 ease-in-out bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:48px_48px] ${isPro ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute inset-0 transition-opacity duration-300 ease-in-out bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:48px_48px] ${!isPro ? 'opacity-100' : 'opacity-0'}`}></div>
        
        {/* VIGNETTE MASK */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(248,250,252,0.95)_80%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(9,9,11,1)_85%)] pointer-events-none"></div>

        <div className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-blue-400/20 dark:bg-stone-500/15 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-lighten pointer-events-none transform -translate-y-1/4 translate-x-1/4 transition-colors duration-500 ease-in-out"></div>
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vh] bg-indigo-400/20 dark:bg-stone-600/15 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-lighten pointer-events-none transform translate-y-1/4 -translate-x-1/4 transition-colors duration-500 ease-in-out"></div>
      </div>

      <div className="w-full max-w-screen-xl px-6 font-sans md:px-12 lg:px-24 h-full relative z-10">
        
        {/* MOBILE TOGGLE (Visible only on small screens) */}
        <button
          onClick={toggleMode}
          className="lg:hidden fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full border bg-white/50 backdrop-blur-md dark:bg-[#18181b]/50 hover:bg-white dark:hover:bg-[#27272a] transition-all shadow-sm dark:border-[#27272a]"
          title={`Switch to ${isPro ? 'Creative' : 'Professional'} Mode`}
        >
          {isPro ? (
            <Briefcase className="w-4 h-4 text-slate-700" />
          ) : (
            <Paintbrush className="w-4 h-4 text-stone-300" />
          )}
        </button>

        <div className="lg:flex lg:justify-between lg:gap-12 h-full">
          
          {/* STATIC LEFT SIDE */}
          <header className="lg:sticky lg:top-0 lg:flex lg:w-1/2 lg:flex-col lg:justify-center py-12 lg:py-0 h-[30vh] lg:h-full relative">
            <div className="flex flex-col gap-2 relative z-20">
              <motion.h1 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold tracking-tight text-slate-900 dark:text-stone-200 sm:text-5xl"
              >
                Yash Vardhan
              </motion.h1>
              <motion.h2 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-3 text-lg font-medium tracking-tight text-slate-900 dark:text-stone-400 sm:text-xl"
              >
                {isPro ? "Mechanical Engineer | Minor in CSE" : "Professional Builder"}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 max-w-sm leading-relaxed text-slate-600 dark:text-stone-500"
              >
                {isPro 
                  ? "Mechanical Engineering student combining engineering expertise with modern tech skills."
                  : "I build things. Sometimes they fly, sometimes they hover, and occasionally they are just centered divs."}
              </motion.p>

              {/* NAVIGATION */}
              <nav className="nav hidden lg:block mt-16">
                <ul className="w-max space-y-4">
                  {['about', 'experience', 'projects'].map((section, idx) => {
                    const isActive = activeSection === section;
                    return (
                      <motion.li 
                        key={section}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                      >
                        <a className={`group flex items-center py-2 relative transition-all ${isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`} href={`#${section}`}>
                          <span className={`nav-indicator mr-4 h-px transition-all group-hover:w-16 group-hover:bg-slate-900 dark:group-hover:bg-stone-300 ${isActive ? 'w-16 bg-slate-900 dark:bg-stone-300' : 'w-8 bg-slate-400 dark:bg-stone-700'}`}></span>
                          <span className={`nav-text text-xs font-bold uppercase tracking-widest transition-colors group-hover:text-slate-900 dark:group-hover:text-stone-300 ${isActive ? 'text-slate-900 dark:text-stone-300' : 'text-slate-500 dark:text-stone-500'}`}>
                            {section}
                          </span>
                        </a>
                      </motion.li>
                    )
                  })}
                </ul>
              </nav>
            </div>

            {/* SOCIAL ICONS */}
            <motion.ul 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex items-center gap-5 relative z-20"
            >
              {[
                { icon: Mail, href: "mailto:yashvardhan7749@gmail.com" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/yash-vardhan-111904186/" },
                { icon: Github, href: "https://github.com/Yashv77" },
                { icon: Twitter, href: "https://x.com/yashv_7" },
                { icon: UpworkIcon, href: "https://www.upwork.com/freelancers/~01f6c24c7b6fc85c66" },
              ].map((social, idx) => (
                <li key={idx} className="shrink-0">
                  <a 
                    href={social.href} 
                    target="_blank" 
                    rel="noreferrer"
                    className="block hover:text-slate-900 dark:hover:text-stone-200 text-slate-500 dark:text-stone-500 transition-colors"
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                </li>
              ))}
            </motion.ul>

            {/* DESKTOP TOGGLE BUTTON (Bottom Left of the Left Column) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="hidden lg:flex absolute bottom-12 left-0 z-20"
            >
              <button
                onClick={toggleMode}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-stone-800 bg-white/50 backdrop-blur-md dark:bg-stone-900/50 hover:bg-slate-50 dark:hover:bg-stone-800 transition-all shadow-sm group"
                title={`Switch to ${isPro ? 'Creative' : 'Professional'} Mode`}
              >
                {isPro ? (
                  <>
                    <Briefcase className="w-4 h-4 text-blue-600 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-bold text-slate-700">Pro Mode</span>
                  </>
                ) : (
                  <>
                    <Paintbrush className="w-4 h-4 text-stone-300 transition-transform group-hover:scale-110" />
                    <span className="text-sm font-bold text-stone-300">Creative Mode</span>
                  </>
                )}
              </button>
            </motion.div>
          </header>

          {/* RIGHT SIDE SCROLLING CONTENT WITH SNAP */}
          <main id="content" className="lg:w-1/2 h-[70vh] lg:h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth hide-scrollbar pb-12 lg:pb-0 relative z-20">
            <section id="about" className="w-full">
              <About />
            </section>
            
            <section id="experience" className="w-full">
              <Experience />
            </section>
            
            <section id="projects" className="w-full">
              <Projects />
            </section>
          </main>
          
        </div>
      </div>
    </div>
  )
}
