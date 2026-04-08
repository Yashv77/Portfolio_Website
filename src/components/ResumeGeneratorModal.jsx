import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, FileDown, CheckCircle, Circle, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Link, PDFViewer } from '@react-pdf/renderer';

// Create styles matching LaTeX article standard
const styles = StyleSheet.create({
  page: { padding: '0.4in', fontFamily: 'Times-Roman', fontSize: 11, color: '#000', lineHeight: 1.3 },
  sectionTitle: { fontFamily: 'Times-Bold', fontSize: 12, textTransform: 'uppercase', borderBottomWidth: 1.25, borderBottomColor: '#000', marginTop: 12, marginBottom: 6, paddingBottom: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  headerTitle: { fontFamily: 'Times-Bold', fontSize: 24, marginBottom: 12 },
  headerText: { fontSize: 10, lineHeight: 1.2 },
  headerRight: { fontSize: 10, textAlign: 'right', lineHeight: 1.2 },
  link: { textDecoration: 'none', color: '#000' },
  bold: { fontFamily: 'Times-Bold' },
  italic: { fontFamily: 'Times-Italic' },
  
  // Table styles
  table: { width: 'auto', borderStyle: 'solid', borderWidth: 1, borderTopWidth: 1, borderRightWidth: 1, borderLeftWidth: 1, borderBottomWidth: 1, marginTop: 4, marginBottom: 8 },
  tableRow: { flexDirection: 'row' },
  col1: { width: '22%', borderStyle: 'solid', borderBottomWidth: 1, borderRightWidth: 1, padding: 3 },
  col2: { width: '53%', borderStyle: 'solid', borderBottomWidth: 1, borderRightWidth: 1, padding: 3 },
  col3: { width: '15%', borderStyle: 'solid', borderBottomWidth: 1, borderRightWidth: 1, padding: 3 },
  col4: { width: '10%', borderStyle: 'solid', borderBottomWidth: 1, padding: 3 },
  tableHeader: { fontFamily: 'Times-Bold', fontSize: 10 },
  tableCell: { fontSize: 10 },
  
  // Custom List styles
  entryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  bulletView: { flexDirection: 'row', marginBottom: 2, paddingLeft: 10 },
  bulletPoint: { width: 12, fontSize: 11 },
  bulletText: { flex: 1, fontSize: 11 }
});

const ResumeDocument = ({ data }) => {
  const { educationData, experienceData, projectsData, skillsData, softwaresData, extracurricularData = [] } = data;
  
  const groupedProjects = {};
  ['Mechanical', 'Web Dev', 'Data Analysis', 'Data Science'].forEach(cat => {
    groupedProjects[cat] = projectsData.filter(p => p.category?.toLowerCase() === cat.toLowerCase());
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER */}
        <View style={styles.row}>
          <View style={{ width: '50%' }}>
            <Text style={styles.headerTitle}>Yash Vardhan</Text>
            <Text style={styles.headerText}>B.E Mechanical Engineering</Text>
            <Text style={styles.headerText}>CSE Minor</Text>
            <Text style={styles.headerText}>TIET, Patiala</Text>
          </View>
          <View style={{ width: '50%', paddingTop: 4 }}>
            <Text style={styles.headerRight}>+91-8102330119</Text>
            <Text style={styles.headerRight}>TIET Campus, Patiala 147004</Text>
            <Link src="mailto:yvardhan_be21@thapar.edu" style={[styles.headerRight, styles.link]}>yvardhan_be21@thapar.edu</Link>
            <Link src="https://yash-vardhan-portfolio-website.netlify.app/" style={[styles.headerRight, styles.link]}>yash-vardhan-portfolio-website.netlify.app/</Link>
          </View>
        </View>

        {/* EDUCATION */}
        {educationData.length > 0 && <View style={styles.sectionTitle}><Text>Education</Text></View>}
        {educationData.length > 0 && (
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.col1}><Text style={styles.tableHeader}>Degree</Text></View>
              <View style={styles.col2}><Text style={styles.tableHeader}>Institution</Text></View>
              <View style={styles.col3}><Text style={styles.tableHeader}>CGPA/%</Text></View>
              <View style={styles.col4}><Text style={styles.tableHeader}>Year</Text></View>
            </View>
            {educationData.map((edu, idx) => (
              <View style={styles.tableRow} key={idx}>
                <View style={styles.col1}><Text style={styles.tableCell}>{edu.degree}</Text></View>
                <View style={styles.col2}><Text style={styles.tableCell}>{edu.institution}</Text></View>
                <View style={styles.col3}><Text style={styles.tableCell}>{edu.score}</Text></View>
                <View style={styles.col4}><Text style={styles.tableCell}>{edu.year}</Text></View>
              </View>
            ))}
          </View>
        )}

        {/* EXPERIENCE */}
        {experienceData.length > 0 && <View style={styles.sectionTitle}><Text>Experience</Text></View>}
        {experienceData.map((exp, idx) => (
          <View key={idx} style={{ marginBottom: 6 }}>
            <View style={styles.entryRow}>
              <Text><Text style={styles.bold}>{exp.tempTitle} | {exp.company}</Text></Text>
              <Text style={styles.bold}>{exp.period}</Text>
            </View>
            {exp.tempDesc.split('\n').filter(Boolean).map((sentence, i) => (
              <View style={styles.bulletView} key={i}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>{sentence.trim().replace(/^[•\-\*]\s*/, '')}</Text>
              </View>
            ))}
          </View>
        ))}

        {/* PROJECTS */}
        {projectsData.length > 0 && <View style={styles.sectionTitle}><Text>Personal & Academic Projects</Text></View>}
        {Object.keys(groupedProjects).map(cat => {
          if (groupedProjects[cat].length === 0) return null;
          return (
            <View key={cat} style={{ marginBottom: 6 }}>
              <Text style={[styles.bold, { marginBottom: 2 }]}>{cat} Projects</Text>
              {groupedProjects[cat].map((proj, idx) => (
                <View key={idx} style={{ marginBottom: 4 }}>
                   <View style={styles.entryRow}>
                      <Text style={styles.bold}>{proj.tempTitle}</Text>
                   </View>
                   {proj.tempDesc.split('\n').filter(Boolean).map((sentence, i) => (
                     <View style={styles.bulletView} key={i}>
                       <Text style={styles.bulletPoint}>•</Text>
                       <Text style={styles.bulletText}>{sentence.trim().replace(/^[•\-\*]\s*/, '')}</Text>
                     </View>
                   ))}
                </View>
              ))}
            </View>
          );
        })}

        {/* SKILLS */}
        <View style={styles.sectionTitle}><Text>Skills</Text></View>
        {skillsData.map((skillGrp, idx) => (
          <View key={idx} style={{ marginBottom: 2 }}>
            <Text>
              <Text style={styles.bold}>{skillGrp.category}: </Text>
              {skillGrp.tempItems}
            </Text>
          </View>
        ))}

        {/* SOFTWARES */}
        <View style={styles.sectionTitle}><Text>Softwares & Programming Languages</Text></View>
        <Text style={{ marginBottom: 6 }}>{softwaresData.text}</Text>

        {/* EXTRACURRICULAR */}
        {extracurricularData.length > 0 && (
          <>
            <View style={styles.sectionTitle}><Text>Extracurricular Activities</Text></View>
            {extracurricularData.map((extra, idx) => (
              <View key={idx} style={{ marginBottom: 4 }}>
                <View style={styles.entryRow}>
                  <Text style={styles.bold}>{extra.tempTitle}{extra.organization ? ` | ${extra.organization}` : ''}</Text>
                  <Text>{extra.period || ''}</Text>
                </View>
                {extra.tempDesc && extra.tempDesc.split('\n').filter(l => l.trim()).map((line, i) => (
                  <View key={i} style={styles.bulletView}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletText}>{line.replace(/^-\s*/, '').trim()}</Text>
                  </View>
                ))}
              </View>
            ))}
          </>
        )}

      </Page>
    </Document>
  );
};


export default function ResumeGeneratorModal({ onClose }) {
  const storeData = useStore();
  
  // Local editable deep copies
  const [localData, setLocalData] = useState(() => ({
    education: storeData.educationData.map(e => ({ ...e, _include: true })),
    experience: storeData.experienceData.map(e => ({ ...e, _include: true, tempTitle: e.title.professional, tempDesc: e.description.professional })),
    projects: [...storeData.academicProjectsData, ...storeData.personalProjectsData].map(p => ({ ...p, _include: true, tempTitle: p.title.professional, tempDesc: p.description.professional })),
    skills: storeData.skillsData.map(s => ({ ...s, _include: true, tempItems: s.items.professional.join(', ') })),
    softwares: { text: storeData.softwaresData.join(' | ') },
    extracurricular: storeData.extracurricularData ? storeData.extracurricularData.map(e => ({ ...e, _include: true, tempTitle: e.title.professional, tempDesc: e.description.professional })) : []
  }));

  const handleUpdate = (category, index, field, value) => {
    setLocalData(prev => {
      const newCategory = [...prev[category]];
      newCategory[index] = { ...newCategory[index], [field]: value };
      return { ...prev, [category]: newCategory };
    });
  };

  const toggleInclude = (category, index) => {
    setLocalData(prev => {
      const newCategory = [...prev[category]];
      newCategory[index] = { ...newCategory[index], _include: !newCategory[index]._include };
      return { ...prev, [category]: newCategory };
    });
  };

  const toggleMasterCategory = (catName) => {
    setLocalData(prev => {
      const newProjects = prev.projects.map(p => {
        if (p.category === catName) {
          // If any project in this category is currently included, we turn ALL OFF. If all off, we turn ALL ON.
          // Or simple invert based on first item:
          return { ...p, _include: !prev.projects.find(px => px.category === catName)?._include };
        }
        return p;
      });
      // better toggle strategy: check if at least one is NOT included -> include all. else -> exclude all
      const catProjects = prev.projects.filter(p => p.category === catName);
      const shouldInclude = catProjects.some(p => !p._include);
      
      const updatedProjects = prev.projects.map(p => 
        p.category === catName ? { ...p, _include: shouldInclude } : p
      );
      
      return { ...prev, projects: updatedProjects };
    });
  };

  // Memoized filtered data for the PDF Renderer
  const filteredData = useMemo(() => ({
    educationData: localData.education.filter(e => e._include),
    experienceData: localData.experience.filter(e => e._include),
    projectsData: localData.projects.filter(p => p._include),
    skillsData: localData.skills.filter(s => s._include),
    softwaresData: localData.softwares,
    extracurricularData: localData.extracurricular.filter(e => e._include)
  }), [localData]);

  // UI Tabs State for the Builder
  const [activeTab, setActiveTab] = useState('experience');

  const tabs = [
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills & Tools' },
    { id: 'extracurricular', label: 'Extracurricular' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex bg-slate-50 dark:bg-stone-950 overflow-hidden">
      
      {/* LEFT SIDE: BUILDER FORM */}
      <div className="w-full lg:w-1/2 h-full flex flex-col border-r border-slate-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-2xl relative">
        <div className="p-6 border-b border-slate-200 dark:border-stone-800 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-stone-100 mb-1">Resume Builder</h2>
            <p className="text-xs text-slate-500 dark:text-stone-400">Select items to include and edit descriptions solely for the PDF export.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-stone-800 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-slate-200 dark:border-stone-800 px-6 py-2 gap-4 overflow-x-auto">
          {tabs.map(t => (
            <button 
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 font-bold text-sm tracking-widest uppercase rounded-full transition-colors whitespace-nowrap ${
                activeTab === t.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-stone-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* TAB CONTENTS */}

          {activeTab === 'experience' && localData.experience.map((exp, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border transition-all ${exp._include ? 'border-blue-300 bg-blue-50/30 dark:bg-blue-900/10' : 'border-slate-200 dark:border-stone-800 opacity-60'}`}>
              <div className="flex items-center gap-3 cursor-pointer mb-3" onClick={() => toggleInclude('experience', idx)}>
                <div className={`w-6 h-6 rounded flex items-center justify-center ${exp._include ? 'bg-blue-600 text-white' : 'border-2 border-slate-300 dark:border-stone-700'}`}>
                  {exp._include && <CheckCircle className="w-4 h-4" />}
                </div>
                <div className="flex-1 font-bold text-slate-900 dark:text-stone-100">{exp.tempTitle} <span className="font-normal text-slate-500 text-sm">at {exp.company}</span></div>
              </div>
              
              {exp._include && (
                <div className="space-y-3 pl-9">
                  <input 
                    className="w-full bg-white dark:bg-stone-950 border border-slate-200 dark:border-stone-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-stone-100" 
                    value={exp.tempTitle} 
                    onChange={(e) => handleUpdate('experience', idx, 'tempTitle', e.target.value)} 
                  />
                  <textarea 
                    className="w-full bg-white dark:bg-stone-950 border border-slate-200 dark:border-stone-700 rounded-lg px-3 py-2 text-sm min-h-[80px] focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-stone-100" 
                    value={exp.tempDesc} 
                    onChange={(e) => handleUpdate('experience', idx, 'tempDesc', e.target.value)} 
                  />
                </div>
              )}
            </div>
          ))}

          {activeTab === 'projects' && (
            <>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {['Mechanical', 'Web Dev', 'Data Analysis', 'Data Science'].map(cat => {
                  const catProjects = localData.projects.filter(p => p.category === cat);
                  if(catProjects.length === 0) return null;
                  const allIncluded = catProjects.every(p => p._include);

                  return (
                    <button 
                      key={cat} 
                      onClick={() => toggleMasterCategory(cat)}
                      className={`p-3 rounded-xl border text-sm font-bold flex items-center justify-between transition-colors ${allIncluded ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-stone-800 dark:text-stone-400 dark:border-stone-700'}`}
                    >
                      {cat} Projects
                      <div className={`w-5 h-5 rounded flex items-center justify-center ${allIncluded ? 'bg-blue-600 text-white' : 'border-2 border-slate-300 dark:border-stone-600'}`}>
                        {allIncluded && <CheckCircle className="w-3 h-3" />}
                      </div>
                    </button>
                  )
                })}
              </div>

              {localData.projects.map((proj, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border transition-all ${proj._include ? 'border-blue-300 bg-blue-50/30 dark:bg-blue-900/10' : 'border-slate-200 dark:border-stone-800 opacity-60'}`}>
                  <div className="flex items-center gap-3 cursor-pointer mb-3" onClick={() => toggleInclude('projects', idx)}>
                    <div className={`w-6 h-6 rounded flex items-center justify-center ${proj._include ? 'bg-blue-600 text-white' : 'border-2 border-slate-300 dark:border-stone-700'}`}>
                      {proj._include && <CheckCircle className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-slate-900 dark:text-stone-100">{proj.tempTitle} <span className="text-xs font-normal text-slate-500">({proj.category})</span></div>
                    </div>
                  </div>
                  
                  {proj._include && (
                    <div className="space-y-3 pl-9">
                      <input 
                        className="w-full bg-white dark:bg-stone-950 border border-slate-200 dark:border-stone-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-stone-100" 
                        value={proj.tempTitle} 
                        onChange={(e) => handleUpdate('projects', idx, 'tempTitle', e.target.value)} 
                      />
                      <textarea 
                        className="w-full bg-white dark:bg-stone-950 border border-slate-200 dark:border-stone-700 rounded-lg px-3 py-2 text-sm min-h-[60px] focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-stone-100" 
                        value={proj.tempDesc} 
                        onChange={(e) => handleUpdate('projects', idx, 'tempDesc', e.target.value)} 
                      />
                    </div>
                  )}
                </div>
              ))}
            </>
          )}

          {activeTab === 'education' && localData.education.map((edu, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border transition-all ${edu._include ? 'border-blue-300 bg-blue-50/30 dark:bg-blue-900/10' : 'border-slate-200 dark:border-stone-800 opacity-60'}`}>
              <div className="flex items-center gap-3 cursor-pointer mb-3" onClick={() => toggleInclude('education', idx)}>
                <div className={`w-6 h-6 rounded flex items-center justify-center ${edu._include ? 'bg-blue-600 text-white' : 'border-2 border-slate-300 dark:border-stone-700'}`}>
                  {edu._include && <CheckCircle className="w-4 h-4" />}
                </div>
                <div className="flex-1 font-bold text-slate-900 dark:text-stone-100">{edu.degree}</div>
              </div>
            </div>
          ))}

          {activeTab === 'skills' && (
            <div className="space-y-6">
              {localData.skills.map((skill, idx) => (
                <div key={idx} className={`p-4 rounded-2xl border transition-all ${skill._include ? 'border-blue-300 bg-blue-50/30 dark:bg-blue-900/10' : 'border-slate-200 dark:border-stone-800 opacity-60'}`}>
                  <div className="flex items-center gap-3 cursor-pointer mb-3" onClick={() => toggleInclude('skills', idx)}>
                    <div className={`w-6 h-6 rounded flex items-center justify-center ${skill._include ? 'bg-blue-600 text-white' : 'border-2 border-slate-300 dark:border-stone-700'}`}>
                      {skill._include && <CheckCircle className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 font-bold text-slate-900 dark:text-stone-100">{skill.category}</div>
                  </div>
                  {skill._include && (
                    <input 
                      className="w-full ml-9 bg-white dark:bg-stone-950 border border-slate-200 dark:border-stone-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-stone-100" 
                      value={skill.tempItems} 
                      onChange={(e) => handleUpdate('skills', idx, 'tempItems', e.target.value)} 
                    />
                  )}
                </div>
              ))}
              
              <div className="p-4 rounded-2xl border border-blue-300 bg-blue-50/30 dark:bg-blue-900/10">
                <div className="font-bold text-slate-900 dark:text-stone-100 mb-2">Softwares / Languages</div>
                <input 
                  className="w-full bg-white dark:bg-stone-950 border border-slate-200 dark:border-stone-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-stone-100" 
                  value={localData.softwares.text} 
                  onChange={(e) => setLocalData(prev => ({ ...prev, softwares: { text: e.target.value } }))} 
                />
              </div>
            </div>
          )}

          {activeTab === 'extracurricular' && localData.extracurricular.map((extra, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border transition-all ${extra._include ? 'border-blue-300 bg-blue-50/30 dark:bg-blue-900/10' : 'border-slate-200 dark:border-stone-800 opacity-60'}`}>
              <div className="flex items-center gap-3 cursor-pointer mb-3" onClick={() => toggleInclude('extracurricular', idx)}>
                <div className={`w-6 h-6 rounded flex items-center justify-center ${extra._include ? 'bg-blue-600 text-white' : 'border-2 border-slate-300 dark:border-stone-700'}`}>
                  {extra._include && <CheckCircle className="w-4 h-4" />}
                </div>
                <div className="flex-1 font-bold text-slate-900 dark:text-stone-100">{extra.tempTitle}</div>
              </div>
              
              {extra._include && (
                <div className="space-y-3 pl-9">
                  <input 
                    className="w-full bg-white dark:bg-stone-950 border border-slate-200 dark:border-stone-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-stone-100" 
                    value={extra.tempTitle} 
                    onChange={(e) => handleUpdate('extracurricular', idx, 'tempTitle', e.target.value)} 
                  />
                  <textarea 
                    className="w-full bg-white dark:bg-stone-950 border border-slate-200 dark:border-stone-700 rounded-lg px-3 py-2 text-sm min-h-[60px] focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-stone-100" 
                    value={extra.tempDesc} 
                    onChange={(e) => handleUpdate('extracurricular', idx, 'tempDesc', e.target.value)} 
                  />
                </div>
              )}
            </div>
          ))}

        </div>
        
        {/* DOWNLOAD ACTION */}
        <div className="p-6 border-t border-slate-200 dark:border-stone-800 bg-slate-50 dark:bg-stone-950/50">
          <PDFDownloadLink 
            document={<ResumeDocument data={filteredData} />} 
            fileName="Yash_Vardhan_Resume.pdf"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl shadow-lg font-bold tracking-wider transition hover:scale-[1.02]"
          >
            {({ loading }) => (
              loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white"></div>
                  Updating PDF Document...
                </>
              ) : (
                <>
                  <FileDown className="w-5 h-5" />
                  Download Final PDF
                </>
              )
            )}
          </PDFDownloadLink>
        </div>

      </div>

      {/* RIGHT SIDE: LIVE PDF PREVIEW */}
      <div className="hidden lg:flex w-1/2 h-full bg-slate-400 p-8">
        <div className="w-full h-full shadow-2xl rounded-2xl overflow-hidden bg-white">
          <PDFViewer width="100%" height="100%" className="border-none">
            <ResumeDocument data={filteredData} />
          </PDFViewer>
        </div>
      </div>
      
    </div>
  );
}
