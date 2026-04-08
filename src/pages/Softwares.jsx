import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useStore } from '../store/useStore'
import EditableText from '../components/EditableText'

export default function Softwares() {
  const { softwaresData, mode, updateField, isAdmin } = useStore()
  const isPro = mode === 'professional'

  const handleItemUpdate = (index, newValue) => {
    const updated = [...softwaresData];
    updated[index] = newValue;
    updateField('softwaresData', updated);
  }

  return (
    <motion.div 
      initial={{ opacity: 0.3, scale: 0.9, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="snap-center w-full min-h-[100svh] flex flex-col justify-center py-12"
    >
      <div className="flex flex-col gap-8 w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`p-8 rounded-2xl border ${
            isPro 
              ? 'bg-white border-slate-200' 
              : 'bg-black border-stone-800 hover:shadow-[0_0_20px_rgba(255,255,255,0.02)]'
          }`}>
            {isAdmin && (
              <div className="flex justify-end mb-4">
                <button 
                  onClick={() => updateField('softwaresData', [...softwaresData, 'New Software'])}
                  className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold hover:bg-blue-200 transition"
                >
                  <Plus className="w-4 h-4" /> Add Software
                </button>
              </div>
            )}
            <ul className="flex flex-wrap gap-4">
              {softwaresData.map((software, index) => (
                <div key={index} className="flex items-center gap-1">
                  <EditableText
                    value={software}
                    onChange={(val) => handleItemUpdate(index, val)}
                    elementType="li"
                    className={`text-sm font-bold px-5 py-2.5 rounded-lg transition-transform hover:scale-105 ${
                      isPro 
                        ? 'bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100' 
                        : 'bg-stone-800 text-stone-300 border border-stone-700 hover:bg-stone-700 hover:text-white'
                    }`}
                  />
                  {isAdmin && (
                    <button 
                      onClick={() => updateField('softwaresData', softwaresData.filter((_, i) => i !== index))}
                      className="text-red-500 hover:text-red-700 ml-1 font-bold"
                      title="Remove"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
