import { motion } from 'framer-motion'
import { BookOpen, Calendar, Plus, ExternalLink } from 'lucide-react'
import { useStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom'
import EditableText from '../components/EditableText'

export default function Blog() {
  const { mode, blogData, updateField, isAdmin } = useStore()
  const isPro = mode === 'professional'
  const navigate = useNavigate()

  const handleItemUpdate = (index, field, newValue, isDualMode = true) => {
    const updated = [...blogData];
    if (isDualMode) {
      updated[index] = { ...updated[index], [field]: { ...updated[index][field], [mode]: newValue } };
    } else {
      updated[index] = { ...updated[index], [field]: newValue };
    }
    updateField('blogData', updated);
  }

  const addNew = () => {
    const item = {
      id: Date.now().toString(),
      title: { professional: "New Blog Post", creative: "New Rant" },
      date: new Date().toISOString().split('T')[0],
      excerpt: { professional: "Write a summary...", creative: "TL;DR..." },
      tags: ["Blog"],
      coverImage: "",
      detailBlocks: [
        { id: Date.now().toString(), type: "text", content: "Start writing your blog post here..." }
      ]
    };
    updateField('blogData', [item, ...blogData]);
  }

  const deleteItem = (index) => {
    if(!window.confirm("Delete this blog post?")) return;
    updateField('blogData', blogData.filter((_, i) => i !== index));
  }

  return (
    <div className="w-full relative">
      {isAdmin && (
        <div className="flex justify-end px-6 pt-12 relative z-50">
          <button onClick={addNew} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold hover:bg-blue-200 transition">
            <Plus className="w-4 h-4" /> New Post
          </button>
        </div>
      )}

      <div className="flex flex-col w-full px-6">
        {blogData.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0.3, scale: 0.9, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="snap-center w-full min-h-[90svh] flex flex-col justify-center py-12 relative items-center"
          >
            <div
              onClick={() => navigate(`/detail/blog/${post.id}`)}
              className={`w-full group relative p-8 rounded-3xl border cursor-pointer transition-all hover:shadow-2xl ${
                isPro 
                  ? 'bg-white border-slate-200 hover:border-blue-300' 
                  : 'bg-black border-stone-800 hover:border-stone-600'
              }`}
          >
            {isAdmin && (
              <div className="absolute top-4 right-4 flex gap-2 z-50">
                <button onClick={(e) => { e.stopPropagation(); deleteItem(index) }} className="text-slate-400 hover:text-red-500 bg-slate-100 dark:bg-stone-800 p-1 rounded" title="Delete">✕</button>
              </div>
            )}
            
            {post.coverImage && (
              <div className="w-full h-40 rounded-xl overflow-hidden mb-4">
                <img src={post.coverImage} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            )}

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-stone-500 font-medium mb-2">
              <Calendar className="w-3 h-3" />
              <EditableText value={post.date} onChange={(val) => handleItemUpdate(index, 'date', val, false)} />
            </div>

            <EditableText
              value={post.title[mode]}
              onChange={(val) => handleItemUpdate(index, 'title', val)}
              elementType="h3"
              className={`text-lg font-bold mb-2 group-hover:underline decoration-2 underline-offset-4 ${isPro ? 'text-slate-900 decoration-blue-400' : 'text-stone-100 decoration-stone-500'}`}
            />
            
            <EditableText
              value={post.excerpt[mode]}
              onChange={(val) => handleItemUpdate(index, 'excerpt', val)}
              multiline={true}
              elementType="p"
              className="text-sm text-slate-600 dark:text-stone-400 leading-relaxed mb-3 block"
            />

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, tIdx) => (
                  <EditableText
                    key={tIdx}
                    value={tag}
                    onChange={(val) => { const nt = [...post.tags]; nt[tIdx] = val; handleItemUpdate(index, 'tags', nt, false); }}
                    elementType="span"
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${isPro ? 'bg-slate-100 text-slate-600' : 'bg-stone-800/50 text-stone-400 border border-stone-700/50'}`}
                  />
                ))}
              </div>
              <span className={`text-xs font-bold flex items-center gap-1 ${isPro ? 'text-blue-600' : 'text-stone-400'}`}>
                Read More <ExternalLink className="w-3 h-3" />
              </span>
            </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
