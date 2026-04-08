import json
import re

with open(r'c:\Users\yashv\Documents\Projects\Portfolio_Website\src\data\initialData.js', 'r', encoding='utf-8') as f:
    text = f.read()

new_content = """export const initialAbout = {
  professional: "I'm Yash Vardhan, a Mechanical Engineering from TIET with a Computer Science minor. My experience spans from leading ATV chassis design at Team Ultron Motorsports to interning at DRDO's Ballistics Research Lab. In my engineering life, I had the chance to developed expertise in various fields from robotics to machine learning, from aerodynamics to basic full-stack development, from automotive design to data analytics. And as a generalist, this diverse background allows me to approach engineering challenges with both traditional mechanical knowledge and modern technological solutions.",
  creative: "Professional overfitter of neural networks. Occasional destroyer of datasets. I build things with metal and code. I've designed ATV chassis, explored ballistics at DRDO, and then decided my text editor also needed some love. Sometimes I do machine learning, sometimes robotics, but mainly I try to make things that don't explode (unless they're supposed to)."
};

export const initialEducation = [
  {
    id: "1",
    degree: "B.E. Mechanical Engineering, CSE Minor",
    institution: "Thapar Institute of Engineering & Technology, Patiala",
    score: "8.24 CGPA",
    year: "2021-Present",
    description: "Focusing on mechanical systems and computer science fundamentals. Relevant coursework in statistics, basic AI & ML, robotics, and CFD/FEA analysis."
  },
  {
    id: "2",
    degree: "CBSE Class XII",
    institution: "Veena Vidya Niketan, Patna",
    score: "86.4%",
    year: "2020",
    description: "Completed higher secondary education focusing on Science."
  },
  {
    id: "3",
    degree: "CBSE Class X",
    institution: "Saint John’s Academy, Hajipur",
    score: "87%",
    year: "2018",
    description: "Completed secondary education."
  }
];

export const initialSkills = [
  { category: "Analytical", items: ["Data Analytics", "Finance & Business Analytics", "Statistics"] },
  { category: "CSE", items: ["Basic Web Development", "Extensions Development", "Basic AI & ML"] },
  { category: "Mechanical", items: ["Designing", "CAD Modelling", "Simulations", "FEM & CFD Analysis", "Engineering Drawing", "Manufacturing", "CAM", "Automation & Robotics"] },
  { category: "Soft Skills", items: ["Project Management", "Leadership", "Communication", "Problem-Solving", "Decision-Making"] }
];

export const initialSoftwares = [
  "Python", "C", "HTML", "CSS", "JavaScript", "SQL", "Excel", "Tableau", "Power BI", 
  "Autodesk Fusion 360", "SolidWorks", "Ansys", "Autodesk CFD Ultimate", "CREO Parametric", 
  "Autodesk AutoCAD", "Matlab"
];

""" + text[text.find('export const initialExperience'):text.find('export const initialProjects')]

new_content += """
export const initialAcademicProjects = [
  {
    id: "2",
    title: { professional: "Hybrid Wing Drone-Hovercraft", creative: "The Amphibious Sky-Boat" },
    description: { professional: "Designed and manufactured a hybrid of fixed wing drone and hovercraft for emergency response and surveillance, capable of operating on any terrain or water.", creative: "If a drone and a boat had a baby. It flies, it hovers, it swims. Built from scratch because choosing between land and sky was too boring." },
    tags: ["CAD Design", "Prototyping", "Manufacturing", "Analysis"],
    category: "Mechanical",
    imageUrl: "/assets/Arcraft_1.3.4 v4_hv.png",
    link: "https://arcraft.netlify.app/",
    github: "",
    gradient: "from-purple-600 to-indigo-600",
    achievements: ["Custom carbon-fiber frame design", "Aerodynamic testing via CFD", "Successful water-land transition"]
  },
  {
    id: "8",
    title: { professional: "Shell Eco-Marathon EV Urban Concept", creative: "The Eco-Cruiser EV" },
    description: { professional: "Advanced to Design Round of Shell Eco-Marathon 2022 by presenting an innovative Electric Vehicle Urban Concept focused on energy efficiency.", creative: "A hyper-efficient electric pod designed for the Shell Eco-Marathon. Squeezing miles out of electrons like nobody's business." },
    tags: ["EV Design", "CAD", "Energy Efficiency", "Innovation"],
    category: "Mechanical",
    imageUrl: "/assets/SEM.png",
    link: "",
    github: "",
    gradient: "from-lime-500 to-emerald-600",
    achievements: ["Design Round Advancement", "Optimized mass reduction", "High efficiency powertrain analysis"]
  },
  {
    id: "9",
    title: { professional: "Portable Digital Storage Oscilloscope", creative: "Pocket Sized DSO" },
    description: { professional: "Developing a cost-effective, portable DSO under faculty supervision, focusing on signal processing and electronic system design.", creative: "A tiny portable oscilloscope that fits in your pocket but still reads signals like a heavy benchtop rig." },
    tags: ["Electronics", "Signal Processing", "Circuit Design", "Embedded Systems"],
    category: "Mechanical",
    imageUrl: "/assets/PDSO.png",
    link: "",
    github: "",
    gradient: "from-cyan-500 to-blue-600",
    achievements: ["Cost-effective prototyping", "Signal noise filtering", "Custom PCB layout"]
  },
  {
    id: "10",
    title: { professional: "Waste Wrapper as Fuel for Water Desalination", creative: "Trash to Treasure" },
    description: { professional: "Researching Thermally-Localized Multistage Wrapper Combustion Still System, an innovative waste-to-energy solution using waste wrappers as fuel source for sustainable water desalination process.", creative: "Taking garbage wrappers and burning them cleanly to purify water. The ultimate zero-waste alchemy system." },
    tags: ["Sustainability", "Thermal Analysis", "Process Design", "Environmental"],
    category: "Data Analysis",
    imageUrl: "/assets/TLMSWCS.png",
    link: "",
    github: "",
    gradient: "from-amber-500 to-yellow-600",
    achievements: ["Thermal combustion optimization", "Waste-to-energy lifecycle", "Sustainable distillation output"]
  }
];

export const initialPersonalProjects = [
  {
    id: "1",
    title: { professional: "Stock Price Prediction using LSTM", creative: "Magic 8-Ball for Wall Street" },
    description: { professional: "Developed a time series forecasting model using LSTM neural networks for stock price prediction.", creative: "Tried to get rich by predicting stock prices using Deep Learning. It successfully predicted the past! Built an LSTM to see if I can outsmart the market." },
    tags: ["Python", "Deep Learning", "LSTM", "Time Series"],
    category: "Data Science",
    imageUrl: "/assets/Stock_Prediction.png",
    link: "https://stock-prediction-ml-lstm.streamlit.app/",
    github: "",
    gradient: "from-blue-600 to-cyan-500",
    achievements: ["Designed advanced LSTM model", "Deployed on Streamlit", "Interactive data visualization"]
  },
  {
    id: "3",
    title: { professional: "Project Management App", creative: "Anti-Procrastination Machine" },
    description: { professional: "Developed interactive & responsive web applications including a simple feature rich Project Management App using React and hosted using Netlify.", creative: "Built a React app so I can manage the projects that I usually procrastinate on. Features drag-n-drop everything and looks suspiciously clean." },
    tags: ["React", "JavaScript", "CSS", "API Integration"],
    category: "Web Dev",
    imageUrl: "/assets/PMA.png",
    link: "https://project-management-app-1-2.netlify.app/",
    github: "",
    gradient: "from-emerald-500 to-teal-500",
    achievements: ["Responsive React UI", "State Management implementation", "Deployed to Netlify"]
  },
  {
    id: "4",
    title: { professional: "Marketing Strategy Analysis", creative: "Data Whispering" },
    description: { professional: "Conducted decision making analysis involving data collection, cleaning, visualization, A/B testing & regression analysis to compare marketing strategies.", creative: "Stared at thousands of rows of data until they confessed which marketing strategy actually brought in money. Excel sheets are my canvas." },
    tags: ["Data Analytics", "A/B Testing", "Regression", "Visualization"],
    category: "Data Analysis",
    imageUrl: "/assets/abtesting.png",
    link: "",
    github: "",
    gradient: "from-orange-500 to-red-500",
    achievements: ["Comprehensive A/B testing", "Predictive regression modeling", "Data visualization dashboards"]
  },
  {
    id: "5",
    title: { professional: "Text-Encryption Chrome Extension", creative: "Digital Cipher Tool" },
    description: { professional: "Created utility Chrome extensions including Text-Encryption-Decryption tool for real time encryption of saved text on any website.", creative: "Built a secret-agent-level encryption tool right in your browser. Because plain text is for amateurs." },
    tags: ["JavaScript", "Chrome API", "HTML", "CSS"],
    category: "Web Dev",
    imageUrl: "/assets/ted.png",
    link: "",
    github: "",
    gradient: "from-zinc-600 to-stone-500",
    achievements: ["Real time text encryption", "Chrome Extension API", "Seamless browser integration"]
  },
  {
    id: "6",
    title: { professional: "Website-Locker Chrome Extension", creative: "Anti-Distraction Vault" },
    description: { professional: "Created utility Chrome extension Website-locker for enhanced browsing security and productivity.", creative: "A browser utility that locks you out of your favorite time-wasting sites so you're forced to actually get work done." },
    tags: ["JavaScript", "Chrome API", "HTML", "CSS"],
    category: "Web Dev",
    imageUrl: "/assets/weblock.png",
    link: "",
    github: "",
    gradient: "from-red-600 to-orange-600",
    achievements: ["Productivity boost tracking", "URL pattern matching", "Custom blocklist architecture"]
  },
  {
    id: "7",
    title: { professional: "Library Management System", creative: "Digital Librarian" },
    description: { professional: "Built a full-stack library management system using MERN stack, featuring user authentication, book tracking, and administrative controls.", creative: "Automated the librarian's job using MongoDB, Express, React, and Node. Because tracking who has 'Harry Potter' manually in 2024 is unacceptable." },
    tags: ["MongoDB", "Express", "React", "Node.js"],
    category: "Web Dev",
    imageUrl: "/assets/LMS.png",
    link: "",
    github: "",
    gradient: "from-indigo-500 to-blue-500",
    achievements: ["Full MERN stack implementation", "JWT-based authentication", "Admin and User roles"]
  }
];
export const initialProjects = [...initialAcademicProjects, ...initialPersonalProjects];
"""

with open(r'c:\Users\yashv\Documents\Projects\Portfolio_Website\src\data\initialData.js', 'w', encoding='utf-8') as f:
    f.write(new_content)
