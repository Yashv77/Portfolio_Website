import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Trash2, Type, Image, LinkIcon, ArrowUp, ArrowDown, FileText, Code, Upload, Loader2, Briefcase, Paintbrush } from 'lucide-react'
import { useStore } from '../store/useStore'
import { supabase } from '../utils/supabase'

// Block type definitions
const BLOCK_TYPES = [
  { type: 'text', label: 'Text / Paragraph', icon: Type },
  { type: 'heading', label: 'Heading', icon: Type },
  { type: 'image', label: 'Image', icon: Image },
  { type: 'link', label: 'Link Card', icon: LinkIcon },
  { type: 'document', label: 'Document / PDF', icon: FileText },
  { type: 'embed', label: 'Embed (iframe)', icon: Code },
]

// Upload file to Supabase storage
async function uploadToSupabase(file, folder = 'uploads') {
  const fileExt = file.name.split('.').pop()
  const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('portfolio-assets')
    .upload(fileName, file, { cacheControl: '3600', upsert: false })
  
  if (error) throw error
  
  const { data: urlData } = supabase.storage
    .from('portfolio-assets')
    .getPublicUrl(fileName)
  
  return urlData.publicUrl
}


// Resolve which store field + item from the URL params
function resolveItem(type, id, store) {
  const fieldMap = {
    experience: 'experienceData',
    education: 'educationData',
    'academic-project': 'academicProjectsData',
    'personal-project': 'personalProjectsData',
    extracurricular: 'extracurricularData',
    blog: 'blogData',
  }
  const storeField = fieldMap[type]
  if (!storeField) return null
  const data = store[storeField]
  if (!data) return null
  const index = data.findIndex(item => item.id === id)
  if (index === -1) return null
  return { storeField, data, index, item: data[index] }
}

// File upload button component
function FileUploadButton({ onUpload, accept, label, className }) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const url = await uploadToSupabase(file, accept?.includes('pdf') ? 'documents' : 'images')
      onUpload(url)
    } catch (err) {
      console.error('Upload failed:', err)
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <label className={`inline-flex items-center gap-1.5 cursor-pointer text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${className || 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}>
      {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
      {uploading ? 'Uploading...' : label || 'Upload'}
      <input ref={inputRef} type="file" accept={accept} onChange={handleFile} className="hidden" />
    </label>
  )
}


// Render a single block
function RenderBlock({ block, isAdmin, onUpdate, onDelete, onMove, totalBlocks, blockIndex }) {
  const isPro = useStore(state => state.mode) === 'professional'

  if (block.type === 'heading') {
    return (
      <div className="relative group">
        {isAdmin ? (
          <div className="flex items-start gap-2">
            <BlockControls onDelete={onDelete} onMove={onMove} totalBlocks={totalBlocks} blockIndex={blockIndex} />
            <input
              className={`w-full bg-transparent text-2xl md:text-3xl font-bold outline-none border-b-2 border-transparent focus:border-blue-500 py-2 ${isPro ? 'text-slate-900' : 'text-stone-100'}`}
              value={block.content}
              onChange={e => onUpdate({ ...block, content: e.target.value })}
              placeholder="Heading text..."
            />
          </div>
        ) : (
          <h2 className={`text-2xl md:text-3xl font-bold py-2 ${isPro ? 'text-slate-900' : 'text-stone-100'}`}>{block.content}</h2>
        )}
      </div>
    )
  }

  if (block.type === 'text') {
    return (
      <div className="relative group">
        {isAdmin ? (
          <div className="flex items-start gap-2">
            <BlockControls onDelete={onDelete} onMove={onMove} totalBlocks={totalBlocks} blockIndex={blockIndex} />
            <textarea
              className={`w-full bg-transparent outline-none border border-transparent focus:border-blue-500 rounded-lg p-3 min-h-[120px] text-base leading-relaxed resize-y ${isPro ? 'text-slate-700' : 'text-stone-300'}`}
              value={block.content}
              onChange={e => onUpdate({ ...block, content: e.target.value })}
              placeholder="Write your paragraph here..."
            />
          </div>
        ) : (
          <div className={`text-base leading-relaxed whitespace-pre-line ${isPro ? 'text-slate-700' : 'text-stone-300'}`}>
            {block.content}
          </div>
        )}
      </div>
    )
  }

  if (block.type === 'image') {
    return (
      <div className="relative group">
        {isAdmin && <BlockControls onDelete={onDelete} onMove={onMove} totalBlocks={totalBlocks} blockIndex={blockIndex} />}
        {block.url ? (
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img src={block.url} alt={block.caption || ''} className="w-full object-cover" />
            {block.caption && (
              <p className={`text-center text-xs py-2 ${isPro ? 'text-slate-500 bg-slate-50' : 'text-stone-500 bg-stone-900'}`}>{block.caption}</p>
            )}
          </div>
        ) : null}
        {isAdmin && (
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex gap-2 items-center">
              <input
                className="flex-1 text-sm p-2 rounded border border-slate-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-slate-900 dark:text-white outline-none"
                value={block.url || ''}
                onChange={e => onUpdate({ ...block, url: e.target.value })}
                placeholder="Image URL or upload →"
              />
              <FileUploadButton accept="image/*" label="Upload Image" onUpload={(url) => onUpdate({ ...block, url })} />
            </div>
            <input
              className="text-sm p-2 rounded border border-slate-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-slate-900 dark:text-white outline-none"
              value={block.caption || ''}
              onChange={e => onUpdate({ ...block, caption: e.target.value })}
              placeholder="Caption (optional)..."
            />
          </div>
        )}
      </div>
    )
  }

  if (block.type === 'link') {
    return (
      <div className="relative group">
        {isAdmin && <BlockControls onDelete={onDelete} onMove={onMove} totalBlocks={totalBlocks} blockIndex={blockIndex} />}
        {!isAdmin ? (
          <a
            href={block.url}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all hover:shadow-md ${isPro ? 'bg-blue-50 border-blue-200 hover:border-blue-400' : 'bg-stone-900 border-stone-700 hover:border-stone-500'}`}
          >
            <LinkIcon className={`w-5 h-5 shrink-0 ${isPro ? 'text-blue-600' : 'text-stone-400'}`} />
            <div>
              <div className={`font-bold text-sm ${isPro ? 'text-blue-700' : 'text-stone-200'}`}>{block.text || block.url}</div>
              {block.description && <div className={`text-xs mt-1 ${isPro ? 'text-slate-500' : 'text-stone-500'}`}>{block.description}</div>}
            </div>
          </a>
        ) : (
          <div className="flex flex-col gap-2">
            <input className="text-sm p-2 rounded border border-slate-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-slate-900 dark:text-white outline-none" value={block.url || ''} onChange={e => onUpdate({ ...block, url: e.target.value })} placeholder="Link URL..." />
            <input className="text-sm p-2 rounded border border-slate-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-slate-900 dark:text-white outline-none" value={block.text || ''} onChange={e => onUpdate({ ...block, text: e.target.value })} placeholder="Link title..." />
            <input className="text-sm p-2 rounded border border-slate-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-slate-900 dark:text-white outline-none" value={block.description || ''} onChange={e => onUpdate({ ...block, description: e.target.value })} placeholder="Short description..." />
          </div>
        )}
      </div>
    )
  }

  if (block.type === 'document') {
    return (
      <div className="relative group">
        {isAdmin && <BlockControls onDelete={onDelete} onMove={onMove} totalBlocks={totalBlocks} blockIndex={blockIndex} />}
        {block.url ? (
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-stone-700">
            <div className={`flex items-center gap-3 px-4 py-3 ${isPro ? 'bg-slate-50' : 'bg-stone-900'}`}>
              <FileText className={`w-5 h-5 ${isPro ? 'text-red-500' : 'text-red-400'}`} />
              <span className={`font-bold text-sm flex-1 ${isPro ? 'text-slate-700' : 'text-stone-200'}`}>{block.title || 'Document'}</span>
              <a href={block.url} target="_blank" rel="noreferrer" className={`text-xs font-bold px-3 py-1 rounded-full transition-colors ${isPro ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-stone-700 text-stone-200 hover:bg-stone-600'}`}>
                Open ↗
              </a>
            </div>
            <iframe 
              src={block.url.includes('drive.google.com') ? block.url.replace('/view', '/preview') : block.url}
              className="w-full border-0"
              style={{ height: block.height || '600px' }}
              title={block.title || 'Embedded Document'}
              allow="autoplay"
            />
          </div>
        ) : null}
        {isAdmin && (
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex gap-2 items-center">
              <input className="flex-1 text-sm p-2 rounded border border-slate-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-slate-900 dark:text-white outline-none" value={block.url || ''} onChange={e => onUpdate({ ...block, url: e.target.value })} placeholder="Document URL or upload →" />
              <FileUploadButton accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" label="Upload Doc" onUpload={(url) => onUpdate({ ...block, url })} className="bg-red-100 text-red-700 hover:bg-red-200" />
            </div>
            <div className="flex gap-2">
              <input className="flex-1 text-sm p-2 rounded border border-slate-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-slate-900 dark:text-white outline-none" value={block.title || ''} onChange={e => onUpdate({ ...block, title: e.target.value })} placeholder="Document title..." />
              <input className="w-24 text-sm p-2 rounded border border-slate-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-slate-900 dark:text-white outline-none" value={block.height || '600px'} onChange={e => onUpdate({ ...block, height: e.target.value })} placeholder="Height" />
            </div>
          </div>
        )}
      </div>
    )
  }

  if (block.type === 'embed') {
    return (
      <div className="relative group">
        {isAdmin && <BlockControls onDelete={onDelete} onMove={onMove} totalBlocks={totalBlocks} blockIndex={blockIndex} />}
        {block.url ? (
          <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-stone-700">
            {block.title && (
              <div className={`flex items-center gap-3 px-4 py-3 ${isPro ? 'bg-slate-50' : 'bg-stone-900'}`}>
                <Code className={`w-5 h-5 ${isPro ? 'text-purple-500' : 'text-purple-400'}`} />
                <span className={`font-bold text-sm ${isPro ? 'text-slate-700' : 'text-stone-200'}`}>{block.title}</span>
              </div>
            )}
            <iframe 
              src={block.url}
              className="w-full border-0"
              style={{ height: block.height || '400px' }}
              title={block.title || 'Embedded Content'}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : null}
        {isAdmin && (
          <div className="flex flex-col gap-2 mt-2">
            <input className="text-sm p-2 rounded border border-slate-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-slate-900 dark:text-white outline-none" value={block.url || ''} onChange={e => onUpdate({ ...block, url: e.target.value })} placeholder="Embed URL (YouTube, Figma, CodePen, etc.)..." />
            <div className="flex gap-2">
              <input className="flex-1 text-sm p-2 rounded border border-slate-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-slate-900 dark:text-white outline-none" value={block.title || ''} onChange={e => onUpdate({ ...block, title: e.target.value })} placeholder="Title (optional)..." />
              <input className="w-24 text-sm p-2 rounded border border-slate-300 dark:border-stone-700 bg-white dark:bg-stone-950 text-slate-900 dark:text-white outline-none" value={block.height || '400px'} onChange={e => onUpdate({ ...block, height: e.target.value })} placeholder="Height" />
            </div>
          </div>
        )}
      </div>
    )
  }

  return null
}

function BlockControls({ onDelete, onMove, totalBlocks, blockIndex }) {
  return (
    <div className="flex flex-col gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
      {blockIndex > 0 && <button onClick={() => onMove(-1)} className="p-1 text-slate-400 hover:text-blue-500 bg-slate-100 dark:bg-stone-800 rounded"><ArrowUp className="w-3 h-3" /></button>}
      {blockIndex < totalBlocks - 1 && <button onClick={() => onMove(1)} className="p-1 text-slate-400 hover:text-blue-500 bg-slate-100 dark:bg-stone-800 rounded"><ArrowDown className="w-3 h-3" /></button>}
      <button onClick={onDelete} className="p-1 text-slate-400 hover:text-red-500 bg-slate-100 dark:bg-stone-800 rounded"><Trash2 className="w-3 h-3" /></button>
    </div>
  )
}


export default function DetailPage() {
  const { type, id } = useParams()
  const navigate = useNavigate()
  const store = useStore()
  const { isAdmin, updateField, mode, fetchSupabaseData, toggleMode, saveSupabaseData, isSaving, saveSuccess } = store
  const isPro = mode === 'professional'
  const [showAddBlock, setShowAddBlock] = useState(false)

  useEffect(() => {
    fetchSupabaseData()
  }, [])

  const resolved = resolveItem(type, id, store)
  if (!resolved) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] dark:bg-[#070708]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-stone-100 mb-4">Page Not Found</h1>
          <Link to="/" className="text-blue-600 hover:underline font-bold">← Back to Portfolio</Link>
        </div>
      </div>
    )
  }

  const { storeField, data, index, item } = resolved
  const blocks = item.detailBlocks || []

  const updateBlocks = (newBlocks) => {
    const updated = [...data]
    updated[index] = { ...updated[index], detailBlocks: newBlocks }
    updateField(storeField, updated)
  }

  const addBlock = (blockType) => {
    const newBlock = { id: Date.now().toString(), type: blockType, content: '' }
    if (blockType === 'image') { newBlock.url = ''; newBlock.caption = '' }
    if (blockType === 'link') { newBlock.url = ''; newBlock.text = ''; newBlock.description = '' }
    if (blockType === 'document') { newBlock.url = ''; newBlock.title = ''; newBlock.height = '600px' }
    if (blockType === 'embed') { newBlock.url = ''; newBlock.title = ''; newBlock.height = '400px' }
    updateBlocks([...blocks, newBlock])
    setShowAddBlock(false)
  }

  const updateBlock = (blockIdx, updatedBlock) => {
    const nb = [...blocks]
    nb[blockIdx] = updatedBlock
    updateBlocks(nb)
  }

  const deleteBlock = (blockIdx) => {
    updateBlocks(blocks.filter((_, i) => i !== blockIdx))
  }

  const moveBlock = (blockIdx, direction) => {
    const nb = [...blocks]
    const temp = nb[blockIdx]
    nb[blockIdx] = nb[blockIdx + direction]
    nb[blockIdx + direction] = temp
    updateBlocks(nb)
  }

  // Derive display fields
  const displayTitle = item.title?.[mode] || item.title?.professional || item.degree || 'Untitled'
  const subtitle = item.company || item.organization || item.institution || ''
  const dateStr = item.period || item.date || item.year || ''
  const descText = item.description?.[mode] || item.description || ''

  // Format type label
  const typeLabels = { experience: 'Experience', education: 'Education', 'academic-project': 'Academic Project', 'personal-project': 'Personal Project', extracurricular: 'Extracurricular', blog: 'Blog Post' }

  return (
    <div className="bg-transparent dark:bg-transparent transition-colors duration-300 ease-in-out relative h-screen w-full flex justify-center overflow-hidden">
      
      {/* DYNAMIC BACKGROUND - same as portfolio */}
      <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full bg-[#f0f2f5] dark:bg-[#070708] transition-colors duration-300 ease-in-out overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(240,242,245,0.95)_80%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,7,8,1)_85%)] pointer-events-none z-10"></div>
        <div className={`absolute -top-[30%] -left-[20%] w-[80vw] h-[80vw] mix-blend-multiply dark:mix-blend-screen pointer-events-none blur-[120px] animate-liquid transition-colors duration-1000 ${isPro ? 'bg-slate-300/60' : 'bg-neutral-800/80'}`}></div>
        <div className={`absolute -bottom-[30%] -right-[20%] w-[90vw] h-[90vw] mix-blend-multiply dark:mix-blend-screen pointer-events-none blur-[140px] animate-liquid-fast animation-delay-2000 transition-colors duration-1000 ${isPro ? 'bg-stone-300/50' : 'bg-stone-800/80'}`}></div>
        <div className={`absolute top-[10%] left-[20%] w-[70vw] h-[70vw] mix-blend-multiply dark:mix-blend-screen pointer-events-none blur-[130px] animate-liquid animation-delay-4000 transition-colors duration-1000 ${isPro ? 'bg-gray-300/50' : 'bg-zinc-800/70'}`}></div>
      </div>

      <div className="w-full max-w-screen-xl px-6 font-sans md:px-12 lg:px-24 h-full relative z-10">
        
        {/* MOBILE TOGGLE */}
        <button
          onClick={toggleMode}
          className="lg:hidden fixed top-6 right-6 z-50 flex items-center justify-center p-3 rounded-full border bg-white/50 backdrop-blur-md dark:bg-[#18181b]/50 hover:bg-white dark:hover:bg-[#27272a] transition-all shadow-sm dark:border-[#27272a]"
          title={`Switch to ${isPro ? 'Creative' : 'Professional'} Mode`}
        >
          {isPro ? <Briefcase className="w-5 h-5 text-slate-700" /> : <Paintbrush className="w-5 h-5 text-stone-300" />}
        </button>

        <div className="lg:flex lg:justify-between lg:gap-12 h-full">
          
          {/* LEFT SIDE - STICKY HEADER with item details */}
          <header className="lg:sticky lg:top-0 lg:flex lg:w-1/2 lg:flex-col lg:justify-center py-12 lg:py-0 h-[30vh] lg:h-full relative">
            <div className="flex flex-col gap-2 relative z-20">
              
              {/* Back button */}
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                <button onClick={() => navigate('/')} className={`flex items-center gap-2 font-bold text-sm mb-6 transition-colors ${isPro ? 'text-slate-500 hover:text-slate-900' : 'text-stone-500 hover:text-white'}`}>
                  <ArrowLeft className="w-4 h-4" /> Back to Portfolio
                </button>
              </motion.div>

              {/* Type badge */}
              <motion.span 
                initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.4, delay: 0.05 }}
                className={`inline-block w-max text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 ${isPro ? 'bg-blue-100 text-blue-700' : 'bg-stone-800 text-stone-400'}`}
              >
                {typeLabels[type] || type}
              </motion.span>
              
              {/* Title */}
              <motion.h1 
                initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-stone-200"
              >
                {displayTitle}
              </motion.h1>

              {/* Subtitle */}
              {subtitle && (
                <motion.h2 
                  initial={{ opacity: 0, x: -30 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className={`mt-2 text-lg font-medium tracking-tight ${isPro ? 'text-blue-600' : 'text-stone-400'}`}
                >
                  {subtitle}
                </motion.h2>
              )}

              {/* Date / Period */}
              {dateStr && (
                <motion.p 
                  initial={{ opacity: 0, x: -30 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={`text-sm mt-1 ${isPro ? 'text-slate-500' : 'text-stone-500'}`}
                >
                  {dateStr}
                </motion.p>
              )}

              {/* Description */}
              {descText && (
                <motion.p 
                  initial={{ opacity: 0, x: -30 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-4 max-w-sm leading-relaxed text-slate-600 dark:text-stone-500 text-sm whitespace-pre-line"
                >
                  {descText}
                </motion.p>
              )}

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, x: -30 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-wrap gap-2 mt-4"
                >
                  {item.tags.map((tag, i) => (
                    <span key={i} className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${isPro ? 'bg-slate-100 text-slate-600' : 'bg-stone-800/50 text-stone-400 border border-stone-700/50'}`}>
                      {tag}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* Admin editing badge */}
              {isAdmin && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="inline-block w-max text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3 py-1 rounded-full mt-4">
                  Editing Mode
                </motion.span>
              )}
            </div>

            {/* Desktop mode toggle */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="hidden lg:flex absolute bottom-12 left-0 z-20"
            >
              <button
                onClick={toggleMode}
                className="flex items-center justify-center p-4 rounded-full border border-slate-200 dark:border-stone-800 bg-white/50 backdrop-blur-md dark:bg-stone-900/50 hover:bg-slate-50 dark:hover:bg-stone-800 transition-all shadow-sm group"
                title={`Switch to ${isPro ? 'Creative' : 'Professional'} Mode`}
              >
                {isPro ? <Briefcase className="w-5 h-5 text-blue-600 transition-transform group-hover:scale-110" /> : <Paintbrush className="w-5 h-5 text-stone-300 transition-transform group-hover:scale-110" />}
              </button>
            </motion.div>
          </header>

          {/* RIGHT SIDE - SCROLLABLE CONTENT */}
          <main 
            style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)', maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)' }} 
            className="lg:w-1/2 h-[70vh] lg:h-full overflow-y-auto overflow-x-hidden scroll-smooth hide-scrollbar pb-12 lg:pb-0 relative z-20"
          >
            <div className="min-h-full flex flex-col py-12 px-2">
              <div className="space-y-8 my-auto">
              {/* CONTENT BLOCKS */}
              {blocks.map((block, bIdx) => (
                <motion.div
                  key={block.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: bIdx * 0.05 }}
                >
                  <RenderBlock
                    block={block}
                    isAdmin={isAdmin}
                    onUpdate={(updated) => updateBlock(bIdx, updated)}
                    onDelete={() => deleteBlock(bIdx)}
                    onMove={(dir) => moveBlock(bIdx, dir)}
                    totalBlocks={blocks.length}
                    blockIndex={bIdx}
                  />
                </motion.div>
              ))}

              {/* ADD BLOCK BUTTON */}
              {isAdmin && (
                <div className="mt-8 border-t border-dashed border-slate-300 dark:border-stone-700 pt-8">
                  {!showAddBlock ? (
                    <button
                      onClick={() => setShowAddBlock(true)}
                      className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-stone-700 text-slate-400 dark:text-stone-500 hover:border-blue-400 hover:text-blue-500 transition-colors font-bold text-sm"
                    >
                      <Plus className="w-5 h-5" /> Add Content Block
                    </button>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {BLOCK_TYPES.map(bt => (
                        <button
                          key={bt.type}
                          onClick={() => addBlock(bt.type)}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all hover:scale-105 ${isPro ? 'border-slate-200 hover:border-blue-400 bg-white hover:shadow-md' : 'border-stone-700 hover:border-stone-500 bg-stone-900'}`}
                        >
                          <bt.icon className={`w-6 h-6 ${isPro ? 'text-blue-600' : 'text-stone-300'}`} />
                          <span className={`text-xs font-bold ${isPro ? 'text-slate-700' : 'text-stone-300'}`}>{bt.label}</span>
                        </button>
                      ))}
                      <button
                        onClick={() => setShowAddBlock(false)}
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-stone-700 text-slate-400 dark:text-stone-500 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-500 hover:border-red-300 transition-colors"
                      >
                        <span className="text-xs font-bold">Cancel</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* EMPTY STATE */}
              {blocks.length === 0 && !isAdmin && (
                <div className={`text-center py-16 rounded-2xl border-2 border-dashed ${isPro ? 'border-slate-200 text-slate-400' : 'border-stone-800 text-stone-600'}`}>
                  <p className="text-lg font-medium">No detailed content yet.</p>
                  <p className="text-sm mt-1">Check back later for more details.</p>
                </div>
              )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* FLOATING ADMIN SAVE PANEL */}
      {isAdmin && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
          {saveSuccess && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-emerald-500 text-white px-4 py-2 rounded shadow text-sm font-bold">
              Successfully Saved to Supabase
            </motion.div>
          )}
          <button 
            onClick={saveSupabaseData}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-xl font-bold tracking-wider transition hover:scale-105 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save to Cloud"}
          </button>
        </div>
      )}
    </div>
  )
}
