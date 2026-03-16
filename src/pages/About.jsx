import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'

export default function About() {
  const { mode, aboutData } = useStore()
  const isPro = mode === 'professional'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="snap-center w-full min-h-[100svh] flex flex-col justify-center py-12"
    >
      <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-stone-300 lg:hidden mb-4">
        {isPro ? "About" : "The Lore"}
      </h2>
      
      <div className={`p-8 rounded-3xl transition-all ${isPro ? 'bg-slate-50 border border-slate-200 text-slate-800 hover:shadow-xl' : 'bg-stone-900/30 border border-stone-800 text-stone-300 hover:border-stone-700 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]'}`}>
        <p className="text-lg leading-relaxed whitespace-pre-wrap">
          {aboutData[mode]}
        </p>
      </div>
    </motion.div>
  )
}
