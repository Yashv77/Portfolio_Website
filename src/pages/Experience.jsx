import { motion } from 'framer-motion'
import { Briefcase, Calendar } from 'lucide-react'
import { useStore } from '../store/useStore'

export default function Experience() {
  const { mode, experienceData } = useStore()
  const isPro = mode === 'professional'

  return (
    <div className="w-full">
      <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-stone-300 lg:hidden mb-12 px-6 pt-12">
        {isPro ? "Experience" : "Battle Scars"}
      </h2>

      <div className="relative w-full before:absolute before:left-5 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-stone-700 before:to-transparent">
        {experienceData.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="snap-center w-full min-h-[100svh] flex flex-col justify-center py-8"
          >
            <div className="relative flex items-center w-full">
              <div className={`absolute left-0 flex items-center justify-center w-10 h-10 rounded-full border-4 shadow z-10 ${
                isPro 
                  ? 'bg-white border-blue-500 text-blue-500' 
                  : 'bg-stone-900 border-stone-600 text-stone-300 shadow-[0_0_15px_rgba(120,113,108,0.2)]'
              }`}>
                <Briefcase className="w-4 h-4 z-20 relative" />
              </div>
              
              <div className={`ml-16 w-full p-8 rounded-3xl border transition-all hover:shadow-xl ${
                isPro 
                  ? 'bg-white border-slate-200 hover:border-blue-300' 
                  : 'bg-stone-900/30 border-stone-800 hover:border-stone-600 hover:shadow-[0_0_20px_rgba(255,255,255,0.02)]'
              }`}>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-stone-400 mb-2 font-medium uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{exp.period}</span>
                </div>
                
                <h3 className={`text-xl font-bold mb-1 ${isPro ? 'text-slate-900' : 'text-stone-100'}`}>
                  {exp.title[mode]}
                </h3>
                
                <h4 className={`text-sm font-semibold mb-4 ${isPro ? 'text-blue-600' : 'text-stone-400'}`}>
                  {exp.company}
                </h4>
                
                <p className="text-sm text-slate-600 dark:text-stone-400 mb-6 leading-relaxed">
                  {exp.description[mode]}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(tag => (
                    <span 
                      key={tag} 
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${
                        isPro 
                          ? 'bg-blue-50 text-blue-700 border border-blue-100'
                          : 'bg-stone-800/50 text-stone-300 border border-stone-700/50'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
