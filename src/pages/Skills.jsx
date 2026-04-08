import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useStore } from '../store/useStore'
import EditableText from '../components/EditableText'

export default function Skills() {
  const { skillsData, mode, updateField, isAdmin } = useStore()
  const isPro = mode === 'professional'

  const handleGroupUpdate = (groupIndex, field, newValue) => {
    const updated = [...skillsData];
    updated[groupIndex] = { ...updated[groupIndex], [field]: newValue };
    updateField('skillsData', updated);
  }

  const handleItemUpdate = (groupIndex, itemIndex, newValue) => {
    const updated = [...skillsData];
    updated[groupIndex].items[mode] = [...updated[groupIndex].items[mode]];
    updated[groupIndex].items[mode][itemIndex] = newValue;
    updateField('skillsData', updated);
  }

  const addNewSkillGroup = () => {
    const newGroup = {
      category: "New Category",
      items: { professional: ["Skill"], creative: ["Skill"] }
    };
    updateField('skillsData', [...skillsData, newGroup]);
  }

  const moveGroup = (index, direction) => {
    if (index + direction < 0 || index + direction >= skillsData.length) return;
    const updated = [...skillsData];
    const temp = updated[index];
    updated[index] = updated[index + direction];
    updated[index + direction] = temp;
    updateField('skillsData', updated);
  }

  const deleteGroup = (index) => {
    if(!window.confirm("Delete this skill category?")) return;
    const updated = skillsData.filter((_, i) => i !== index);
    updateField('skillsData', updated);
  }

  return (
    <motion.div 
      initial={{ opacity: 0.3, scale: 0.9, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="snap-center w-full min-h-[100svh] flex flex-col justify-center py-12 relative"
    >
      {isAdmin && (
        <div className="flex justify-end px-6 mb-4 relative z-50">
          <button onClick={addNewSkillGroup} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold hover:bg-blue-200 transition">
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>
      )}
      <div className="flex flex-col gap-8 w-full px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.map((skillGroup, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-6 rounded-2xl border relative ${
                isPro 
                  ? 'bg-white border-slate-200' 
                  : 'bg-black border-stone-800 hover:shadow-[0_0_20px_rgba(255,255,255,0.02)]'
              }`}
            >
              {isAdmin && (
                <div className="absolute top-4 right-4 flex gap-2 z-50">
                  <button onClick={() => moveGroup(idx, -1)} className="text-slate-400 hover:text-blue-500 bg-slate-100 dark:bg-stone-800 p-1 rounded">↑</button>
                  <button onClick={() => moveGroup(idx, 1)} className="text-slate-400 hover:text-blue-500 bg-slate-100 dark:bg-stone-800 p-1 rounded">↓</button>
                  <button onClick={() => deleteGroup(idx)} className="text-slate-400 hover:text-red-500 bg-slate-100 dark:bg-stone-800 p-1 rounded">✕</button>
                </div>
              )}
              <EditableText
                value={skillGroup.category}
                onChange={(val) => handleGroupUpdate(idx, 'category', val)}
                elementType="h3"
                className={`text-lg font-bold mb-4 ${isPro ? 'text-slate-900' : 'text-stone-100'}`}
              />
              <ul className="flex flex-wrap gap-2">
                {skillGroup.items[mode].map((item, itemIdx) => (
                  <EditableText
                    key={itemIdx} 
                    value={item}
                    onChange={(val) => handleItemUpdate(idx, itemIdx, val)}
                    elementType="li"
                    className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                      isPro 
                        ? 'bg-slate-100 text-slate-700' 
                        : 'bg-stone-800/50 text-stone-400 border border-stone-700/50'
                    }`}
                  />
                ))}
                {isAdmin && (
                  <button 
                    onClick={() => {
                      const updated = [...skillsData];
                      updated[idx].items[mode] = [...updated[idx].items[mode], 'New Skill'];
                      updateField('skillsData', updated);
                    }}
                    className="text-[10px] font-bold uppercase py-1.5 px-3 rounded-full border border-dashed border-slate-400 text-slate-500 hover:bg-slate-100 dark:hover:bg-stone-800"
                  >
                    + Skill
                  </button>
                )}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
