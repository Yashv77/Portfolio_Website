import { create } from 'zustand'
import { initialAbout, initialExperience, initialEducation, initialSkills, initialSoftwares, initialAcademicProjects, initialPersonalProjects, initialExtracurricular, initialBlog } from '../data/initialData'
import { supabase } from '../utils/supabase'

export const useStore = create((set, get) => ({
  mode: 'professional', // 'professional' | 'creative'
  setMode: (mode) => set({ mode }),
  toggleMode: () => set((state) => ({ mode: state.mode === 'professional' ? 'creative' : 'professional' })),
  
  isAdmin: false,
  setAdmin: (val) => set({ isAdmin: val }),

  isSaving: false,
  isFetching: false,
  saveSuccess: false,

  aboutData: initialAbout,
  experienceData: initialExperience,
  educationData: initialEducation,
  skillsData: initialSkills,
  softwaresData: initialSoftwares,
  academicProjectsData: initialAcademicProjects,
  personalProjectsData: initialPersonalProjects,
  extracurricularData: initialExtracurricular,
  blogData: initialBlog,

  fetchSupabaseData: async () => {
    set({ isFetching: true });
    try {
      const { data, error } = await supabase.from('portfolio_data').select('content').eq('id', 1).single();
      if (data && data.content && Object.keys(data.content).length > 0) {
        set({
          aboutData: data.content.aboutData || initialAbout,
          experienceData: data.content.experienceData || initialExperience,
          educationData: data.content.educationData || initialEducation,
          skillsData: data.content.skillsData || initialSkills,
          softwaresData: data.content.softwaresData || initialSoftwares,
          academicProjectsData: data.content.academicProjectsData || initialAcademicProjects,
          personalProjectsData: data.content.personalProjectsData || initialPersonalProjects,
          extracurricularData: data.content.extracurricularData || initialExtracurricular,
          blogData: data.content.blogData || initialBlog
        });
      }
    } catch (err) {
      console.error('Error fetching Supabase data', err);
    }
    set({ isFetching: false });
  },

  saveSupabaseData: async () => {
    const state = get();
    set({ isSaving: true, saveSuccess: false });
    const content = {
      aboutData: state.aboutData,
      experienceData: state.experienceData,
      educationData: state.educationData,
      skillsData: state.skillsData,
      softwaresData: state.softwaresData,
      academicProjectsData: state.academicProjectsData,
      personalProjectsData: state.personalProjectsData,
      extracurricularData: state.extracurricularData,
      blogData: state.blogData
    };
    try {
      const { data, error } = await supabase.from('portfolio_data').select('id').eq('id', 1).single();

      if (data) {
        await supabase.from('portfolio_data').update({ content }).eq('id', 1);
      } else {
        await supabase.from('portfolio_data').insert([{ id: 1, content }]);
      }
      set({ saveSuccess: true });
      setTimeout(() => set({ saveSuccess: false }), 3000);
    } catch (err) {
      console.error('Error saving:', err);
    }
    set({ isSaving: false });
  },

  updateField: (field, newData) => {
    set({ [field]: newData });
  }
}))
