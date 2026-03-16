import { create } from 'zustand'
import { initialAbout, initialExperience, initialProjects } from '../data/initialData'

export const useStore = create((set, get) => ({
  mode: 'professional', // 'professional' | 'creative'
  setMode: (mode) => set({ mode }),
  toggleMode: () => set((state) => ({ mode: state.mode === 'professional' ? 'creative' : 'professional' })),
  
  aboutData: JSON.parse(localStorage.getItem('portfolioAbout')) || initialAbout,
  experienceData: JSON.parse(localStorage.getItem('portfolioExperience')) || initialExperience,
  projectsData: JSON.parse(localStorage.getItem('portfolioProjects')) || initialProjects,

  updateAbout: (newAbout) => {
    localStorage.setItem('portfolioAbout', JSON.stringify(newAbout));
    set({ aboutData: newAbout });
  },
  
  updateExperience: (newExp) => {
    localStorage.setItem('portfolioExperience', JSON.stringify(newExp));
    set({ experienceData: newExp });
  },

  updateProjects: (newProj) => {
    localStorage.setItem('portfolioProjects', JSON.stringify(newProj));
    set({ projectsData: newProj });
  }
}))
