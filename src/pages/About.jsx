import { motion } from 'framer-motion'
import { useStore } from '../store/useStore'
import EditableText from '../components/EditableText'

export default function About() {
  const { mode, aboutData, updateField } = useStore()
  const isPro = mode === 'professional'

  const handleUpdate = (newText) => {
    updateField('aboutData', { ...aboutData, [mode]: newText })
  }

  return (
    <motion.div
      initial={{ opacity: 0.3, scale: 0.9, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="snap-center w-full min-h-[100svh] flex flex-col justify-center py-12 px-6"
    >
      <div className={`p-8 rounded-3xl transition-all ${isPro ? 'bg-slate-50 border border-slate-200 text-slate-800 hover:shadow-xl' : 'bg-black border border-stone-800 text-stone-300 hover:border-stone-700 hover:shadow-[0_0_30px_rgba(255,255,255,0.02)]'}`}>
        <EditableText 
          value={aboutData[mode]} 
          onChange={handleUpdate} 
          multiline={true}
          elementType="p"
          className="text-lg leading-relaxed whitespace-pre-wrap block"
        />
      </div>
    </motion.div>
  )
}
