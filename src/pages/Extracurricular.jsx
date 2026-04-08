import { motion } from 'framer-motion'
import { Heart, Calendar, Plus, ExternalLink } from 'lucide-react'
import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom'
import EditableText from '../components/EditableText'

export default function Extracurricular() {
  const { mode, extracurricularData, updateField, isAdmin } = useStore()
  const isPro = mode === 'professional'
  const navigate = useNavigate()

  const handleItemUpdate = (index, field, newValue, isDualMode = true) => {
    const updated = [...extracurricularData];
    if (isDualMode) {
      updated[index] = { ...updated[index], [field]: { ...updated[index][field], [mode]: newValue } };
    } else {
      updated[index] = { ...updated[index], [field]: newValue };
    }
    updateField('extracurricularData', updated);
  }

  const addNew = () => {
    const item = {
      id: Date.now().toString(),
      title: { professional: "New Activity", creative: "New Fun Thing" },
      organization: "Organization",
      period: "Year - Present",
      description: { professional: "Description.", creative: "Quirky description." },
      tags: ["Tag1"],
      detailBlocks: []
    };
    updateField('extracurricularData', [item, ...extracurricularData]);
  }

  const moveItem = (index, direction) => {
    if (index + direction < 0 || index + direction >= extracurricularData.length) return;
    const updated = [...extracurricularData];
    const temp = updated[index];
    updated[index] = updated[index + direction];
    updated[index + direction] = temp;
    updateField('extracurricularData', updated);
  }

  const deleteItem = (index) => {
    if(!window.confirm("Delete this item?")) return;
    updateField('extracurricularData', extracurricularData.filter((_, i) => i !== index));
  }

  return (
    <div className="w-full relative">
      {isAdmin && (
        <div className="flex justify-end px-6 pt-12 relative z-50">
          <button onClick={addNew} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold hover:bg-blue-200 transition">
            <Plus className="w-4 h-4" /> Add Activity
          </button>
        </div>
      )}

      <div className="flex flex-col w-full px-6">
        {extracurricularData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0.3, scale: 0.9, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="snap-center w-full min-h-[90svh] flex flex-col justify-center py-12 relative items-center"
          >
            <div
              onClick={() => !isAdmin && navigate(`/detail/extracurricular/${item.id}`)}
              className={`w-full group relative flex flex-col gap-3 p-6 rounded-3xl border transition-all hover:shadow-2xl ${!isAdmin ? 'cursor-pointer' : ''} ${
                isPro 
                  ? 'bg-white border-slate-200 hover:border-blue-300' 
                  : 'bg-black border-stone-800 hover:border-stone-600'
              }`}
          >
            {isAdmin && (
              <div className="absolute top-4 right-4 flex gap-2 z-50">
                <button onClick={(e) => { e.stopPropagation(); navigate(`/detail/extracurricular/${item.id}`) }} className="text-slate-400 hover:text-blue-500 bg-slate-100 dark:bg-stone-800 p-1 rounded" title="Edit Detail Page"><ExternalLink className="w-3 h-3" /></button>
                <button onClick={(e) => { e.stopPropagation(); moveItem(index, -1) }} className="text-slate-400 hover:text-blue-500 bg-slate-100 dark:bg-stone-800 p-1 rounded" title="Move Up">↑</button>
                <button onClick={(e) => { e.stopPropagation(); moveItem(index, 1) }} className="text-slate-400 hover:text-blue-500 bg-slate-100 dark:bg-stone-800 p-1 rounded" title="Move Down">↓</button>
                <button onClick={(e) => { e.stopPropagation(); deleteItem(index) }} className="text-slate-400 hover:text-red-500 bg-slate-100 dark:bg-stone-800 p-1 rounded" title="Delete">✕</button>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Heart className={`w-4 h-4 ${isPro ? 'text-blue-500' : 'text-stone-400'}`} />
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-stone-400 font-medium uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" />
                <EditableText value={item.period} onChange={(val) => handleItemUpdate(index, 'period', val, false)} />
              </div>
            </div>

            <EditableText
              value={item.title[mode]}
              onChange={(val) => handleItemUpdate(index, 'title', val)}
              elementType="h3"
              className={`text-xl font-bold ${isPro ? 'text-slate-900' : 'text-stone-100'}`}
            />
            <EditableText
              value={item.organization}
              onChange={(val) => handleItemUpdate(index, 'organization', val, false)}
              elementType="h4"
              className={`text-sm font-semibold ${isPro ? 'text-blue-600' : 'text-stone-400'}`}
            />
            <EditableText
              value={item.description[mode]}
              onChange={(val) => handleItemUpdate(index, 'description', val)}
              multiline={true}
              renderAsList={true}
              elementType="div"
              className="text-sm text-slate-600 dark:text-stone-400 leading-relaxed block"
            />

            <div className="flex flex-wrap gap-2 mt-2">
              {item.tags.map((tag, tIdx) => (
                <EditableText
                  key={tIdx}
                  value={tag}
                  onChange={(val) => { const nt = [...item.tags]; nt[tIdx] = val; handleItemUpdate(index, 'tags', nt, false); }}
                  elementType="span"
                  className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${isPro ? 'bg-slate-100 text-slate-600' : 'bg-stone-800/50 text-stone-400 border border-stone-700/50'}`}
                />
              ))}
              {isAdmin && (
                <button onClick={(e) => { e.stopPropagation(); handleItemUpdate(index, 'tags', [...item.tags, 'New Tag'], false); }} className="text-[10px] font-bold uppercase py-1.5 px-3 rounded-full border border-dashed border-slate-400 text-slate-500 hover:bg-slate-100 dark:hover:bg-stone-800">
                  + Tag
                </button>
              )}
            </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
