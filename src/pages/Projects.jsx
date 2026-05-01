import { motion } from 'framer-motion'
import { ExternalLink, Github, Plus } from 'lucide-react'
import { useStore } from '../store/useStore'
import { useAppMode } from '../context/ModeContext'
import { useNavigate } from 'react-router-dom'
import EditableText from '../components/EditableText'

// eslint-disable-next-line react/prop-types
const ProjectCard = ({ project, index, storeField, data }) => {
  const { isAdmin, updateField } = useStore()
  const mode = useAppMode()
  const isPro = mode === 'professional'
  const navigate = useNavigate()
  const projectType = storeField === 'academicProjectsData' ? 'academic-project' : 'personal-project'

  const handleItemUpdate = (field, newValue, isDualMode = true) => {
    const updated = [...data];
    if (isDualMode) {
      updated[index] = { ...updated[index], [field]: { ...updated[index][field], [mode]: newValue } };
    } else {
      updated[index] = { ...updated[index], [field]: newValue };
    }
    updateField(storeField, updated);
  }

  const moveItem = (direction) => {
    if (index + direction < 0 || index + direction >= data.length) return;
    const updated = [...data];
    const temp = updated[index];
    updated[index] = updated[index + direction];
    updated[index + direction] = temp;
    updateField(storeField, updated);
  }

  const deleteItem = () => {
    if(!window.confirm("Delete this project?")) return;
    const updated = data.filter((_, i) => i !== index);
    updateField(storeField, updated);
  }

  const scrollNext = () => {
    document.getElementById('content').scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  }
  const scrollPrev = () => {
    document.getElementById('content').scrollBy({ top: -(window.innerHeight * 0.8), behavior: 'smooth' });
  }

  return (
    <motion.div
      initial={{ opacity: 0.3, scale: 0.9, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      viewport={{ amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="snap-center w-full min-h-[90svh] flex flex-col justify-center py-12 relative items-center"
    >
      {index > 0 && (
        <button onClick={scrollPrev} className="mb-6 p-2 text-slate-400 hover:text-blue-500 animate-bounce cursor-pointer z-50">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
        </button>
      )}

      <div className={`group relative w-full flex flex-col lg:flex-row items-center gap-8 p-8 rounded-3xl border transition-all hover:shadow-2xl ${!isAdmin ? 'cursor-pointer' : ''} ${
        isPro 
          ? 'bg-white border-slate-200 hover:border-blue-300' 
          : 'bg-black border-stone-800 hover:border-stone-600 hover:shadow-[0_0_25px_rgba(255,255,255,0.02)]'
      }`}
      onClick={() => !isAdmin && navigate(`/detail/${projectType}/${project.id}`)}
      >
        {isAdmin && (
          <div className="absolute top-4 right-4 flex gap-2 z-50">
            <button onClick={(e) => { e.stopPropagation(); navigate(`/detail/${projectType}/${project.id}`) }} className="text-slate-400 hover:text-blue-500 bg-slate-100 dark:bg-stone-800 p-1 rounded" title="Detail Page"><ExternalLink className="w-3 h-3" /></button>
            <button onClick={(e) => { e.stopPropagation(); moveItem(-1) }} className="text-slate-400 hover:text-blue-500 bg-slate-100 dark:bg-stone-800 p-1 rounded" title="Move Up">↑</button>
            <button onClick={(e) => { e.stopPropagation(); moveItem(1) }} className="text-slate-400 hover:text-blue-500 bg-slate-100 dark:bg-stone-800 p-1 rounded" title="Move Down">↓</button>
            <button onClick={(e) => { e.stopPropagation(); deleteItem() }} className="text-slate-400 hover:text-red-500 bg-slate-100 dark:bg-stone-800 p-1 rounded" title="Delete">✕</button>
          </div>
        )}
        
        <div className="relative z-10 w-full lg:w-5/12 shrink-0 overflow-hidden rounded-2xl border border-slate-200 dark:border-stone-800">
          {isAdmin && (
            <EditableText
              value={project.imageUrl || "/assets/placeholder.png"}
              onChange={(val) => handleItemUpdate('imageUrl', val, false)}
              className="absolute top-2 left-2 z-20 bg-black/50 text-white text-xs p-1"
            />
          )}
          {project.imageUrl && (
            <img 
              src={project.imageUrl} 
              alt={project.title[mode]}
              className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
        </div>

        <div className="relative z-10 lg:w-7/12 space-y-4">
          <EditableText
            value={project.title[mode]}
            onChange={(val) => handleItemUpdate('title', val)}
            elementType="h3"
            className={`text-2xl font-bold transition-colors ${isPro ? 'text-slate-900 group-hover:text-blue-600' : 'text-stone-100 group-hover:text-stone-400'}`}
          />
          
          <div className="flex">
            <EditableText
              value={project.category}
              onChange={(val) => handleItemUpdate('category', val, false)}
              elementType="span"
              className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${isPro ? 'bg-blue-100 text-blue-700' : 'bg-stone-800 text-stone-300'}`}
            />
          </div>
          
          <EditableText
            value={project.description[mode]}
            onChange={(val) => handleItemUpdate('description', val)}
            multiline={true}
            renderAsList={true}
            elementType="div"
            className="text-sm text-slate-600 dark:text-stone-400 leading-relaxed font-medium block"
          />

          <ul className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag, tIdx) => (
              <EditableText
                key={tIdx} 
                value={tag}
                onChange={(val) => {
                  const newTags = [...project.tags];
                  newTags[tIdx] = val;
                  handleItemUpdate('tags', newTags, false);
                }}
                elementType="li"
                className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${
                  isPro 
                    ? 'bg-slate-100 text-slate-700' 
                    : 'bg-stone-800/50 text-stone-400 border border-stone-700/50'
                }`}
              />
            ))}
            {isAdmin && (
              <button 
                onClick={() => {
                  const newTags = [...project.tags, 'New Tag'];
                  handleItemUpdate('tags', newTags, false);
                }}
                className="text-[10px] font-bold uppercase py-1.5 px-3 rounded-full border border-dashed border-slate-400 text-slate-500 hover:bg-slate-100 dark:hover:bg-stone-800"
              >
                + Tag
              </button>
            )}
          </ul>

          <div className="flex gap-4 pt-4">
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                  isPro ? 'text-blue-600 hover:text-blue-800' : 'text-stone-300 hover:text-white'
                }`}
              >
                <ExternalLink className="w-4 h-4" /> Live
              </a>
            )}
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noreferrer"
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                  isPro ? 'text-slate-600 hover:text-slate-900' : 'text-stone-500 hover:text-stone-300'
                }`}
              >
                <Github className="w-4 h-4" /> Source
              </a>
            )}
          </div>
        </div>
      </div>
      
      {index < data.length - 1 && (
        <button onClick={scrollNext} className="mt-6 p-2 text-slate-400 hover:text-blue-500 animate-bounce cursor-pointer z-50">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
      )}
    </motion.div>
  )
}

export default function Projects({ title, data, mode, storeField }) {
  const { isAdmin, updateField } = useStore()
  const isPro = mode === 'professional'

  const addNewProject = () => {
    const newProj = {
      id: Date.now().toString(),
      title: { professional: "New Title", creative: "Quirky Title" },
      description: { professional: "First point.\nSecond point.", creative: "Quirky point 1.\nQuirky point 2." },
      category: "Web Dev",
      tags: ["Tag1"],
      imageUrl: "",
      github: "",
      link: "",
      detailBlocks: []
    };
    updateField(storeField, [newProj, ...data]);
  }

  return (
    <div className="w-full relative">
      {isAdmin && (
        <div className="flex justify-end px-6 pt-12 relative z-50">
          <button onClick={addNewProject} className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold hover:bg-blue-200 transition">
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
      )}
      <div className="flex flex-col w-full px-6">
        {data.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} storeField={storeField} data={data} />
        ))}
      </div>
    </div>
  )
}
