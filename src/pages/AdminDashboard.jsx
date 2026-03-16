import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated, logout } from '../utils/auth'
import { useStore } from '../store/useStore'
import { initialExperience, initialProjects } from '../data/initialData'
import { Trash2, Plus, GripVertical, Save, RotateCcw } from 'lucide-react'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const { aboutData, updateAbout, experienceData, updateExperience, projectsData, updateProjects } = useStore()
  
  const [localAbout, setLocalAbout] = useState(aboutData)
  const [localExp, setLocalExp] = useState(experienceData)
  const [localProj, setLocalProj] = useState(projectsData)
  
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/signin')
    }
  }, [navigate])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const showMessage = (msg) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 3000)
  }

  const handleSaveAll = () => {
    updateAbout(localAbout)
    updateExperience(localExp)
    updateProjects(localProj)
    showMessage('All changes saved successfully!')
  }

  const handleReset = () => {
    if(window.confirm("Are you sure you want to restore default demo data? All custom edits will be lost.")) {
      setLocalExp(initialExperience)
      setLocalProj(initialProjects)
      updateExperience(initialExperience)
      updateProjects(initialProjects)
      showMessage('Restored to default projects and experience.')
    }
  }

  // Experience Helpers
  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      period: "New Period",
      title: { professional: "New Title", creative: "New Creative Title" },
      company: "Company Name",
      description: { professional: "Desc...", creative: "Desc..." },
      tags: ["Tag1", "Tag2"]
    }
    setLocalExp([...localExp, newExp])
  }

  const updateExpField = (id, field, value, nestedField = null) => {
    setLocalExp(localExp.map(exp => {
      if (exp.id === id) {
        if (nestedField) {
          return { ...exp, [field]: { ...exp[field], [nestedField]: value } }
        }
        return { ...exp, [field]: value }
      }
      return exp
    }))
  }

  const deleteExperience = (id) => {
    setLocalExp(localExp.filter(exp => exp.id !== id))
  }

  // Project Helpers
  const addProject = () => {
    const newProj = {
      id: Date.now().toString(),
      title: { professional: "New Project", creative: "Crazy Name" },
      description: { professional: "Desc...", creative: "Desc..." },
      tags: ["Tag1"],
      imageUrl: "",
      link: "",
      github: "",
      gradient: "from-blue-500 to-cyan-500",
      achievements: ["Achievement 1"]
    }
    setLocalProj([...localProj, newProj])
  }

  const updateProjField = (id, field, value, nestedField = null) => {
    setLocalProj(localProj.map(p => {
      if (p.id === id) {
        if (nestedField) {
          return { ...p, [field]: { ...p[field], [nestedField]: value } }
        }
        return { ...p, [field]: value }
      }
      return p
    }))
  }

  const deleteProject = (id) => {
    setLocalProj(localProj.filter(p => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans text-gray-900 pb-32">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* HEADER BAR */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-4 z-40">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Portfolio Farm Dashboard</h1>
            <div className="flex gap-4 items-center">
              <button 
                onClick={handleReset}
                className="px-4 py-2 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 rounded-md text-sm font-medium transition-colors flex items-center gap-2 border border-yellow-200"
              >
                <RotateCcw className="w-4 h-4" /> Reset Missing Data
              </button>
              <button 
                onClick={handleSaveAll}
                className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md text-sm font-bold transition-colors flex items-center gap-2 shadow-sm"
              >
                <Save className="w-4 h-4" /> Save All Changes
              </button>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors border border-gray-200 ml-4"
              >
                Logout
              </button>
            </div>
          </div>
          {message && (
            <div className="px-6 py-3 bg-green-50 text-green-700 text-sm border-t border-green-200 font-medium">
              {message}
            </div>
          )}
        </div>

        {/* ABOUT SECTION FARM */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-4">
          <h2 className="text-xl font-bold border-b pb-4 text-gray-900">About Section</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Professional Mode Content</label>
              <textarea 
                className="w-full h-40 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                value={localAbout.professional}
                onChange={(e) => setLocalAbout({...localAbout, professional: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Creative Mode Content</label>
              <textarea 
                className="w-full h-40 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                value={localAbout.creative}
                onChange={(e) => setLocalAbout({...localAbout, creative: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* EXPERIENCE FARM */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">Experience Entries <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{localExp.length}</span></h2>
            <button onClick={addExperience} className="flex items-center gap-1 text-sm bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md border border-blue-200 hover:bg-blue-100 font-semibold"><Plus className="w-4 h-4"/> Add Experience</button>
          </div>
          
          <div className="space-y-6">
            {localExp.map((exp, i) => (
              <div key={exp.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50 relative group">
                <button onClick={() => deleteExperience(exp.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 p-2 bg-white rounded-md border border-gray-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" title="Delete Entry"><Trash2 className="w-4 h-4" /></button>
                <div className="absolute top-4 -left-3 text-gray-400 cursor-move bg-white border border-gray-200 p-1 rounded-md shadow-sm"><GripVertical className="w-4 h-4" /></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-12">
                   <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Period / Dates</label>
                      <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" value={exp.period} onChange={(e) => updateExpField(exp.id, 'period', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Company Name</label>
                      <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" value={exp.company} onChange={(e) => updateExpField(exp.id, 'company', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Pro Title</label>
                      <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" value={exp.title.professional} onChange={(e) => updateExpField(exp.id, 'title', e.target.value, 'professional')} />
                   </div>
                   <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Creative Title</label>
                      <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" value={exp.title.creative} onChange={(e) => updateExpField(exp.id, 'title', e.target.value, 'creative')} />
                   </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Pro Description</label>
                    <textarea className="w-full mt-1 p-2 border border-gray-300 rounded-md h-24" value={exp.description.professional} onChange={(e) => updateExpField(exp.id, 'description', e.target.value, 'professional')} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Creative Description</label>
                    <textarea className="w-full mt-1 p-2 border border-gray-300 rounded-md h-24" value={exp.description.creative} onChange={(e) => updateExpField(exp.id, 'description', e.target.value, 'creative')} />
                  </div>
                </div>

                <div>
                   <label className="text-xs font-bold text-gray-500 uppercase">Tags (comma separated)</label>
                   <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" value={exp.tags.join(', ')} onChange={(e) => updateExpField(exp.id, 'tags', e.target.value.split(',').map(t => t.trim()))} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROJECTS FARM */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">Projects Entries <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{localProj.length}</span></h2>
            <button onClick={addProject} className="flex items-center gap-1 text-sm bg-blue-50 text-blue-700 px-3 py-1.5 rounded-md border border-blue-200 hover:bg-blue-100 font-semibold"><Plus className="w-4 h-4"/> Add Project</button>
          </div>
          
          <div className="space-y-6">
            {localProj.map((proj, i) => (
              <div key={proj.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50 relative group">
                <button onClick={() => deleteProject(proj.id)} className="absolute top-4 right-4 text-red-400 hover:text-red-600 p-2 bg-white rounded-md border border-gray-200 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity" title="Delete Project"><Trash2 className="w-4 h-4" /></button>
                <div className="absolute top-4 -left-3 text-gray-400 cursor-move bg-white border border-gray-200 p-1 rounded-md shadow-sm"><GripVertical className="w-4 h-4" /></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-12">
                   <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Pro Title</label>
                      <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" value={proj.title.professional} onChange={(e) => updateProjField(proj.id, 'title', e.target.value, 'professional')} />
                   </div>
                   <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Creative Title</label>
                      <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" value={proj.title.creative} onChange={(e) => updateProjField(proj.id, 'title', e.target.value, 'creative')} />
                   </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Pro Description</label>
                    <textarea className="w-full mt-1 p-2 border border-gray-300 rounded-md h-24" value={proj.description.professional} onChange={(e) => updateProjField(proj.id, 'description', e.target.value, 'professional')} />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Creative Description</label>
                    <textarea className="w-full mt-1 p-2 border border-gray-300 rounded-md h-24" value={proj.description.creative} onChange={(e) => updateProjField(proj.id, 'description', e.target.value, 'creative')} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                   <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Image URL path</label>
                      <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" value={proj.imageUrl} onChange={(e) => updateProjField(proj.id, 'imageUrl', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Live Link</label>
                      <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" value={proj.link} onChange={(e) => updateProjField(proj.id, 'link', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Github Link</label>
                      <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" value={proj.github} onChange={(e) => updateProjField(proj.id, 'github', e.target.value)} />
                   </div>
                </div>

                <div className="mb-4">
                   <label className="text-xs font-bold text-gray-500 uppercase">Tags (comma separated)</label>
                   <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" value={proj.tags.join(', ')} onChange={(e) => updateProjField(proj.id, 'tags', e.target.value.split(',').map(t => t.trim()))} />
                </div>
                
                <div>
                   <label className="text-xs font-bold text-gray-500 uppercase">Achievements (comma separated)</label>
                   <input type="text" className="w-full mt-1 p-2 border border-gray-300 rounded-md" value={proj.achievements?.join(', ') || ''} onChange={(e) => updateProjField(proj.id, 'achievements', e.target.value.split(',').map(t => t.trim()))} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
