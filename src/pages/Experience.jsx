import { motion } from 'framer-motion'
import { Briefcase, Calendar, Plus, ExternalLink } from 'lucide-react'
import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom'
import EditableText from '../components/EditableText'

export default function Experience() {
  const { mode, experienceData, updateField, isAdmin } = useStore()
  const isPro = mode === 'professional'
  const navigate = useNavigate()

  const handleItemUpdate = (index, field, newValue, isDualMode = true) => {
    const updated = [...experienceData];
    if (isDualMode) {
      updated[index] = { ...updated[index], [field]: { ...updated[index][field], [mode]: newValue } };
    } else {
      updated[index] = { ...updated[index], [field]: newValue };
    }
    updateField('experienceData', updated);
  }

  const addNewExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      period: "Select Date",
      title: { professional: "New Title", creative: "New Quirky Title" },
      company: "New Company",
      description: { professional: "Description point 1.\nDescription point 2.", creative: "Quirky desc 1.\nQuirky desc 2." },
      tags: ["Tag1"],
      detailBlocks: []
    };
    updateField('experienceData', [newExp, ...experienceData]);
  }

  const moveItem = (index, direction) => {
    if (index + direction < 0 || index + direction >= experienceData.length) return;
    const updated = [...experienceData];
    const temp = updated[index];
    updated[index] = updated[index + direction];
    updated[index + direction] = temp;
    updateField('experienceData', updated);
  }

  const deleteItem = (index) => {
    if(!window.confirm(`Delete this item?`)) return;
    const updated = experienceData.filter((_, i) => i !== index);
    updateField('experienceData', updated);
  }

  return (
    <div className="w-full relative">
      {isAdmin && (
        <div className="flex justify-end px-6 pt-12 relative z-50">
          <button onClick={addNewExperience} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold hover:bg-blue-200 transition">
            <Plus className="w-4 h-4" /> Add Experience
          </button>
        </div>
      )}

      <div className="relative w-full before:absolute before:left-5 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-transparent before:via-slate-300 dark:before:via-stone-700 before:to-transparent">
        {experienceData.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0.3, scale: 0.9, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
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
              
              <div className={`ml-16 w-full p-8 rounded-3xl border transition-all hover:shadow-xl relative ${!isAdmin ? 'cursor-pointer' : ''} ${
                isPro 
                  ? 'bg-white border-slate-200 hover:border-blue-300' 
                  : 'bg-black border-stone-800 hover:border-stone-600 hover:shadow-[0_0_20px_rgba(255,255,255,0.02)]'
              }`}
              onClick={() => !isAdmin && navigate(`/detail/experience/${exp.id}`)}
              >
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); navigate(`/detail/experience/${exp.id}`) }} className="text-slate-400 hover:text-blue-500 bg-slate-100 dark:bg-stone-800 p-1 rounded" title="Detail Page"><ExternalLink className="w-3 h-3" /></button>
                    <button onClick={() => moveItem(index, -1)} className="text-slate-400 hover:text-blue-500 bg-slate-100 dark:bg-stone-800 p-1 rounded" title="Move Up">↑</button>
                    <button onClick={() => moveItem(index, 1)} className="text-slate-400 hover:text-blue-500 bg-slate-100 dark:bg-stone-800 p-1 rounded" title="Move Down">↓</button>
                    <button onClick={() => deleteItem(index)} className="text-slate-400 hover:text-red-500 bg-slate-100 dark:bg-stone-800 p-1 rounded" title="Delete">✕</button>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-stone-400 mb-2 font-medium uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" />
                  <EditableText 
                    value={exp.period} 
                    onChange={(val) => handleItemUpdate(index, 'period', val, false)} 
                  />
                </div>
                
                <EditableText
                  value={exp.title[mode]}
                  onChange={(val) => handleItemUpdate(index, 'title', val)}
                  elementType="h3"
                  className={`text-xl font-bold mb-1 ${isPro ? 'text-slate-900' : 'text-stone-100'}`}
                />
                
                <EditableText
                  value={exp.company}
                  onChange={(val) => handleItemUpdate(index, 'company', val, false)}
                  elementType="h4"
                  className={`text-sm font-semibold mb-4 ${isPro ? 'text-blue-600' : 'text-stone-400'}`}
                />
                
                <EditableText
                  value={exp.description[mode]}
                  onChange={(val) => handleItemUpdate(index, 'description', val)}
                  multiline={true}
                  renderAsList={true}
                  elementType="div"
                  className="text-sm text-slate-600 dark:text-stone-400 mb-6 leading-relaxed block"
                />
                
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag, tIdx) => (
                    <EditableText
                      key={tIdx} 
                      value={tag}
                      onChange={(val) => {
                        const newTags = [...exp.tags];
                        newTags[tIdx] = val;
                        handleItemUpdate(index, 'tags', newTags, false);
                      }}
                      elementType="span"
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${
                        isPro 
                          ? 'bg-slate-100 text-slate-600' 
                          : 'bg-stone-800/50 text-stone-400 border border-stone-700/50'
                      }`}
                    />
                  ))}
                  {isAdmin && (
                    <button 
                      onClick={() => {
                        const newTags = [...exp.tags, 'New Tag'];
                        handleItemUpdate(index, 'tags', newTags, false);
                      }}
                      className="text-[10px] font-bold uppercase py-1.5 px-3 rounded-full border border-dashed border-slate-400 text-slate-500 hover:bg-slate-100 dark:hover:bg-stone-800"
                    >
                      + Tag
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
