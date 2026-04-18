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
          personalProjectsData: (() => {
            const newML = [
                {
                    id: "ml-1",
                    title: { professional: "Stock Price Movement Prediction", creative: "Wall Street Compass" },
                    description: { professional: "Designed a time-series classification engine using Logistic Regression & SVM to accurately predict NYSE daily stock closing directions utilizing leading momentum indicators (RSI, SMAs) and live data feeds.", creative: "An algorithmic compass that cuts through the noise of the stock market. Bypassing spreadsheets to stream live NY stock data into an ML pipeline to estimate daily spikes and drops." },
                    category: "Data Science", tags: ["Python", "yfinance", "Scikit-Learn", "SVM", "Logistic Regression", "Plotly"], imageUrl: "/assets/stock_prediction_ml.png", github: "", link: "", detailBlocks: []
                },
                {
                    id: "ml-2",
                    title: { professional: "Sales Forecasting Dashboard", creative: "Retail Crystal Ball" },
                    description: { professional: "Engineered a Ridge Regression model to perform cyclic time-series extrapolation for retail inventory estimation, highlighting explicit seasonal impacts globally.", creative: "An intelligent forecasting system designed to prevent empty shelves and wasted capital for managers. It automatically interprets cyclic waves to gaze weeks into future consumer demands." },
                    category: "Data Analysis", tags: ["Python", "Ridge Regression", "Time-Series", "Scikit-Learn", "EDA"], imageUrl: "/assets/sales_forecast_ml.png", github: "", link: "", detailBlocks: []
                },
                {
                    id: "ml-3",
                    title: { professional: "California House Price Prediction System", creative: "AI Real Estate Appraiser" },
                    description: { professional: "Built a highly-optimized geospatial appraisal prototype leveraging competing Gradient Boosting frameworks (XGBoost, LightGBM, CatBoost) to extract predictive dollar evaluations from clustered census data.", creative: "An AI-powered appraisal engine capable of evaluating housing worth intelligently based geographically throughout California, mapping data clusters natively against abstract urban borders." },
                    category: "Data Science", tags: ["Python", "XGBoost", "LightGBM", "CatBoost", "Geospatial Data"], imageUrl: "/assets/house_price_ml.png", github: "", link: "", detailBlocks: []
                },
                {
                    id: "ml-4",
                    title: { professional: "Heart Disease Diagnosis Classifier", creative: "Clinical Triage Assistant" },
                    description: { professional: "Developed a cross-validated diagnostic classification system relying heavily on verified healthcare matrices to establish accurate probabilistic modeling natively against biological outliers.", creative: "A data-driven triage layer determining critical cardiovascular diagnostic patterns natively through machine learning, replacing human guesswork with hard, cross-validated probabilities." },
                    category: "Data Science", tags: ["Python", "Random Forests", "Hist Gradient Boosters", "Decision Trees", "Cross-Validation"], imageUrl: "/assets/heart_disease_ml.png", github: "", link: "", detailBlocks: []
                },
                {
                    id: "ml-5",
                    title: { professional: "E-commerce Customer Segmentation", creative: "Strategic RFM Mapper" },
                    description: { professional: "Constructed an unsupervised K-Means clustering pipeline mapping RFM behavioral metrics securely via log-normalizations to dynamically extract targeted commercial subset groups.", creative: "A marketing architecture mapping hidden customer lifetime profiles. Analyzes real transaction histories to mathematically isolate and target highly distinct retail 'whales' efficiently." },
                    category: "Data Analysis", tags: ["Python", "K-Means Clustering", "RFM Metrics", "PCA", "Machine Learning"], imageUrl: "/assets/ecommerce_seg_ml.png", github: "", link: "", detailBlocks: []
                }
            ];
            const remote = data.content.personalProjectsData || initialPersonalProjects;
            const existingTitles = remote.map(p => p.title.professional);
            const toAdd = newML.filter(p => !existingTitles.includes(p.title.professional));
            return [...toAdd, ...remote];
          })(),
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
