import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useStore } from '../store/useStore'

// eslint-disable-next-line react/prop-types
const ProjectCard = ({ project }) => {
  const { mode } = useStore()
  const isPro = mode === 'professional'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className="snap-center w-full min-h-[100svh] flex flex-col justify-center py-12"
    >
      <div className={`group relative flex flex-col items-start gap-6 rounded-3xl border p-8 transition-all hover:shadow-2xl sm:flex-col lg:flex-row lg:items-center ${
        isPro 
          ? 'bg-white border-slate-200 hover:border-blue-300' 
          : 'bg-stone-900/30 border-stone-800 hover:border-stone-600 hover:shadow-[0_0_25px_rgba(255,255,255,0.02)]'
      }`}>

        <div className="relative z-10 w-full lg:w-5/12 shrink-0 overflow-hidden rounded-2xl border border-slate-200 dark:border-stone-800">
          {project.imageUrl && (
            <img 
              src={project.imageUrl} 
              alt={project.title[mode]}
              className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
        </div>

        <div className="relative z-10 lg:w-7/12 space-y-4">
          <h3 className={`text-2xl font-bold transition-colors ${isPro ? 'text-slate-900 group-hover:text-blue-600' : 'text-stone-100 group-hover:text-stone-400'}`}>
            {project.title[mode]}
          </h3>
          
          <p className="text-sm text-slate-600 dark:text-stone-400 leading-relaxed font-medium">
            {project.description[mode]}
          </p>

          <ul className="flex flex-wrap gap-2 pt-2">
            {project.tags.map(tag => (
              <li 
                key={tag} 
                className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${
                  isPro 
                    ? 'bg-slate-100 text-slate-700' 
                    : 'bg-stone-800/50 text-stone-400 border border-stone-700/50'
                }`}
              >
                {tag}
              </li>
            ))}
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
    </motion.div>
  )
}

export default function Projects() {
  const { projectsData, mode } = useStore()
  const isPro = mode === 'professional'

  return (
    <div className="w-full">
      <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-stone-300 lg:hidden mb-4 px-6 pt-12">
        {isPro ? "Projects" : "Trophies"}
      </h2>
      <div className="flex flex-col w-full">
        {projectsData.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
