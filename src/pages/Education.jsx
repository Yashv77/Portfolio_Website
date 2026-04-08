import { motion } from 'framer-motion'
import { Plus, ExternalLink } from 'lucide-react'
import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom'
import EditableText from '../components/EditableText'

export default function Education() {
  const { educationData, mode, updateField, isAdmin } = useStore()
  const isPro = mode === 'professional'
  const navigate = useNavigate()

  const handleItemUpdate = (index, field, newValue, isDualMode = true) => {
    const updated = [...educationData];
    if (isDualMode) {
      updated[index] = { ...updated[index], [field]: { ...updated[index][field], [mode]: newValue } };
    } else {
      updated[index] = { ...updated[index], [field]: newValue };
    }
    updateField('educationData', updated);
  }

  const addNewEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      degree: "New Degree",
      institution: "New Institution",
      year: "Year - Year",
      score: "CGPA/Grade",
      description: { professional: "Learned stuff.", creative: "Survived stuff." },
      detailBlocks: []
    };
    updateField('educationData', [...educationData, newEdu]);
  }

  const moveItem = (index, direction) => {
    if (index + direction < 0 || index + direction >= educationData.length) return;
    const updated = [...educationData];
    const temp = updated[index];
    updated[index] = updated[index + direction];
    updated[index + direction] = temp;
    updateField('educationData', updated);
  }

  const deleteItem = (index) => {
    if(!window.confirm("Delete this education?")) return;
    const updated = educationData.filter((_, i) => i !== index);
    updateField('educationData', updated);
  }

  return (
    <div className="snap-center w-full min-h-[100svh] flex flex-col justify-center py-12 px-6">
      {isAdmin && (
        <div className="flex justify-end mb-4 relative z-50">
          <button onClick={addNewEducation} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold hover:bg-blue-200 transition">
            <Plus className="w-4 h-4" /> Add Education
          </button>
        </div>
      )}
      <div className="flex flex-col gap-12 w-full">
        {educationData.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0.3, scale: 0.9, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`group relative flex flex-col gap-2 p-6 rounded-2xl border transition-all hover:shadow-lg ${!isAdmin ? 'cursor-pointer' : ''} ${
              isPro 
                ? 'bg-white border-slate-200 hover:border-blue-300' 
                : 'bg-black border-stone-800 hover:border-stone-600'
            }`}
            onClick={() => !isAdmin && navigate(`/detail/education/${edu.id}`)}
          >
            {isAdmin && (
              <div className="absolute top-4 right-4 flex gap-2 z-50">
                <button onClick={(e) => { e.stopPropagation(); navigate(`/detail/education/${edu.id}`) }} className="text-slate-400 hover:text-blue-500 bg-slate-100 dark:bg-stone-800 p-1 rounded" title="Detail Page"><ExternalLink className="w-3 h-3" /></button>
                <button onClick={(e) => { e.stopPropagation(); moveItem(index, -1) }} className="text-slate-400 hover:text-blue-500 bg-slate-100 dark:bg-stone-800 p-1 rounded" title="Move Up">↑</button>
                <button onClick={(e) => { e.stopPropagation(); moveItem(index, 1) }} className="text-slate-400 hover:text-blue-500 bg-slate-100 dark:bg-stone-800 p-1 rounded" title="Move Down">↓</button>
                <button onClick={(e) => { e.stopPropagation(); deleteItem(index) }} className="text-slate-400 hover:text-red-500 bg-slate-100 dark:bg-stone-800 p-1 rounded" title="Delete">✕</button>
              </div>
            )}
            <div className="flex justify-between items-start gap-4">
              <div>
                <EditableText
                  value={edu.degree}
                  onChange={(val) => handleItemUpdate(index, 'degree', val, false)}
                  elementType="h3"
                  className={`text-xl font-bold ${isPro ? 'text-slate-900' : 'text-stone-100'}`}
                />
                <EditableText
                  value={edu.institution}
                  onChange={(val) => handleItemUpdate(index, 'institution', val, false)}
                  elementType="p"
                  className={`text-sm font-semibold mt-1 ${isPro ? 'text-blue-600' : 'text-stone-400'}`}
                />
              </div>
              <div className="text-right shrink-0 pb-4">
                <EditableText
                  value={edu.year}
                  onChange={(val) => handleItemUpdate(index, 'year', val, false)}
                  elementType="span"
                  className={`block text-sm font-bold ${isPro ? 'text-slate-500' : 'text-stone-500'}`}
                />
                <EditableText
                  value={edu.score}
                  onChange={(val) => handleItemUpdate(index, 'score', val, false)}
                  elementType="span"
                  className={`inline-block px-3 py-1 mt-2 text-xs font-bold rounded-full ${isPro ? 'bg-slate-100 text-slate-700' : 'bg-stone-800 text-stone-300'}`}
                />
              </div>
            </div>
            <EditableText
              value={edu.description[mode]}
              onChange={(val) => handleItemUpdate(index, 'description', val)}
              multiline={true}
              elementType="p"
              className="text-sm text-slate-600 dark:text-stone-400 leading-relaxed font-medium mt-2 block"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
