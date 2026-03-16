export const initialAbout = {
  professional: "I'm Yash Vardhan, a Mechanical Engineering from TIET with a Computer Science minor. My experience spans from leading ATV chassis design at Team Ultron Motorsports to interning at DRDO's Ballistics Research Lab. In my engineering life, I had the chance to developed expertise in various fields from robotics to machine learning, from aerodynamics to basic full-stack development, from automotive design to data analytics. And as a generalist, this diverse background allows me to approach engineering challenges with both traditional mechanical knowledge and modern technological solutions.",
  creative: "Professional overfitter of neural networks. Occasional destroyer of datasets. I build things with metal and code. I've designed ATV chassis, explored ballistics at DRDO, and then decided my text editor also needed some love. Sometimes I do machine learning, sometimes robotics, but mainly I try to make things that don't explode (unless they're supposed to)."
};

export const initialExperience = [
  {
    id: "1",
    period: "Jun 2024 - Jul 2024",
    title: {
      professional: "Research Intern",
      creative: "Explosive Metals Enthusiast"
    },
    company: "DRDO Terminal Ballistics Research Laboratory",
    description: {
      professional: "Conducted research on explosive welding process and mastered industrial mechanical engineering processes including additive manufacturing and CNC machining. Learned prototypes development using 3D printing, SolidWorks, and related software.",
      creative: "Studied how to perfectly fuse metals with strategic explosions. Basically played sandbox with industrial 3D printers and CNC machines while learning the art of blowing things up for science."
    },
    tags: ["3D Printing", "SolidWorks", "CNC", "Prototyping"]
  },
  {
    id: "2",
    period: "Dec 2022 - Present",
    title: {
      professional: "Structures & Chassis Head",
      creative: "Chief Pipe Bender"
    },
    company: "Team Ultron Motorsports",
    description: {
      professional: "Led chassis team in designing space-frame chassis for four-wheel drive ATV, reducing development time by 50% and improving competition points by 30% through innovative design approaches.",
      creative: "Designed a roll cage for an ATV, meaning I am legally responsible to ensure our drivers survive jumps. Cut development time in half so we have more time to test and break it before competitions."
    },
    tags: ["CAD Design", "FEA", "Project Management", "Team Leadership"]
  },
  {
    id: "3",
    period: "Nov 2022 - Sept 2023",
    title: {
      professional: "Project Design Head",
      creative: "Aero Wizard"
    },
    company: "Concept Electrical Vehicle",
    description: {
      professional: "Designed vehicle body improving energy efficiency through reduced weight and increased aerodynamic efficiency. Managed project timeline and secured funding through strategic partnerships.",
      creative: "Tricked some smart people into giving us money to build a sleek EV body. Squeezed out every last drop of aerodynamic efficiency because dragging heavy things around is no longer cool."
    },
    tags: ["CFD Analysis", "FEA", "Project Planning", "Cost Optimization"]
  },
  {
    id: "4",
    period: "Sep 2022 - Present",
    title: {
      professional: "Database Manager and Virtual Assistant",
      creative: "Digital Handyman"
    },
    company: "Freelancing",
    description: {
      professional: "Providing freelance database management and virtual assistance services, ensuring efficient content handling, organization, and administrative support for US based digital marketing client.",
      creative: "Organizing the chaos of the digital world for clients overseas. From wrangling messy Notion tables to keeping operations smooth, basically getting paid to be ridiculously organized."
    },
    tags: ["Notion", "Content Development", "Content Research", "Transcription"]
  }
];

export const initialProjects = [
  {
    id: "1",
    title: {
      professional: "Stock Price Prediction using LSTM",
      creative: "Magic 8-Ball for Wall Street"
    },
    description: {
      professional: "Developed a time series forecasting model using LSTM neural networks for stock price prediction.",
      creative: "Tried to get rich by predicting stock prices using Deep Learning. It successfully predicted the past! Built an LSTM to see if I can outsmart the market."
    },
    tags: ["Python", "Deep Learning", "LSTM", "Time Series"],
    imageUrl: "/_old_site/assets/Stock_Prediction.png",
    link: "https://stock-prediction-ml-lstm.streamlit.app/",
    github: "",
    gradient: "from-blue-600 to-cyan-500",
    achievements: [
      "Designed advanced LSTM model",
      "Deployed on Streamlit",
      "Interactive data visualization"
    ]
  },
  {
    id: "2",
    title: {
      professional: "Hybrid Wing Drone-Hovercraft",
      creative: "The Amphibious Sky-Boat"
    },
    description: {
      professional: "Designed and manufactured a hybrid of fixed wing drone and hovercraft for emergency response and surveillance, capable of operating on any terrain or water.",
      creative: "If a drone and a boat had a baby. It flies, it hovers, it swims. Built from scratch because choosing between land and sky was too boring."
    },
    tags: ["CAD Design", "Prototyping", "Manufacturing", "Analysis"],
    imageUrl: "/_old_site/assets/Arcraft_1.3.4 v4_hv.png",
    link: "https://arcraft.netlify.app/",
    github: "",
    gradient: "from-purple-600 to-indigo-600",
    achievements: [
      "Custom carbon-fiber frame design",
      "Aerodynamic testing via CFD",
      "Successful water-land transition"
    ]
  },
  {
    id: "3",
    title: {
      professional: "Project Management App",
      creative: "Anti-Procrastination Machine"
    },
    description: {
      professional: "Developed interactive & responsive web applications including a simple feature rich Project Management App using React and hosted using Netlify.",
      creative: "Built a React app so I can manage the projects that I usually procrastinate on. Features drag-n-drop everything and looks suspiciously clean."
    },
    tags: ["React", "JavaScript", "CSS", "API Integration"],
    imageUrl: "/_old_site/assets/PMA.png",
    link: "https://project-management-app-1-2.netlify.app/",
    github: "",
    gradient: "from-emerald-500 to-teal-500",
    achievements: [
      "Responsive React UI",
      "State Management implementation",
      "Deployed to Netlify"
    ]
  },
  {
    id: "4",
    title: {
      professional: "Marketing Strategy Analysis",
      creative: "Data Whispering"
    },
    description: {
      professional: "Conducted decision making analysis involving data collection, cleaning, visualization, A/B testing & regression analysis to compare marketing strategies.",
      creative: "Stared at thousands of rows of data until they confessed which marketing strategy actually brought in money. Excel sheets are my canvas."
    },
    tags: ["Data Analytics", "A/B Testing", "Regression", "Visualization"],
    imageUrl: "/_old_site/assets/abtesting.png",
    link: "",
    github: "",
    gradient: "from-orange-500 to-red-500",
    achievements: [
      "Comprehensive A/B testing",
      "Predictive regression modeling",
      "Data visualization dashboards"
    ]
  },
  {
    id: "5",
    title: {
      professional: "Text-Encryption Chrome Extension",
      creative: "Digital Cipher Tool"
    },
    description: {
      professional: "Created utility Chrome extensions including Text-Encryption-Decryption tool for real time encryption of saved text on any website.",
      creative: "Built a secret-agent-level encryption tool right in your browser. Because plain text is for amateurs."
    },
    tags: ["JavaScript", "Chrome API", "HTML", "CSS"],
    imageUrl: "/_old_site/assets/ted.png",
    link: "",
    github: "",
    gradient: "from-zinc-600 to-stone-500",
    achievements: [
      "Real time text encryption",
      "Chrome Extension API",
      "Seamless browser integration"
    ]
  },
  {
    id: "6",
    title: {
      professional: "Website-Locker Chrome Extension",
      creative: "Anti-Distraction Vault"
    },
    description: {
      professional: "Created utility Chrome extension Website-locker for enhanced browsing security and productivity.",
      creative: "A browser utility that locks you out of your favorite time-wasting sites so you're forced to actually get work done."
    },
    tags: ["JavaScript", "Chrome API", "HTML", "CSS"],
    imageUrl: "/_old_site/assets/weblock.png",
    link: "",
    github: "",
    gradient: "from-red-600 to-orange-600",
    achievements: [
      "Productivity boost tracking",
      "URL pattern matching",
      "Custom blocklist architecture"
    ]
  },
  {
    id: "7",
    title: {
      professional: "Library Management System",
      creative: "Digital Librarian"
    },
    description: {
      professional: "Built a full-stack library management system using MERN stack, featuring user authentication, book tracking, and administrative controls.",
      creative: "Automated the librarian's job using MongoDB, Express, React, and Node. Because tracking who has 'Harry Potter' manually in 2024 is unacceptable."
    },
    tags: ["MongoDB", "Express", "React", "Node.js"],
    imageUrl: "/_old_site/assets/LMS.png",
    link: "",
    github: "",
    gradient: "from-indigo-500 to-blue-500",
    achievements: [
      "Full MERN stack implementation",
      "JWT-based authentication",
      "Admin and User roles"
    ]
  },
  {
    id: "8",
    title: {
      professional: "Shell Eco-Marathon EV Urban Concept",
      creative: "The Eco-Cruiser EV"
    },
    description: {
      professional: "Advanced to Design Round of Shell Eco-Marathon 2022 by presenting an innovative Electric Vehicle Urban Concept focused on energy efficiency.",
      creative: "A hyper-efficient electric pod designed for the Shell Eco-Marathon. Squeezing miles out of electrons like nobody's business."
    },
    tags: ["EV Design", "CAD", "Energy Efficiency", "Innovation"],
    imageUrl: "/_old_site/assets/SEM.png",
    link: "",
    github: "",
    gradient: "from-lime-500 to-emerald-600",
    achievements: [
      "Design Round Advancement",
      "Optimized mass reduction",
      "High efficiency powertrain analysis"
    ]
  },
  {
    id: "9",
    title: {
      professional: "Portable Digital Storage Oscilloscope",
      creative: "Pocket Sized DSO"
    },
    description: {
      professional: "Developing a cost-effective, portable DSO under faculty supervision, focusing on signal processing and electronic system design.",
      creative: "A tiny portable oscilloscope that fits in your pocket but still reads signals like a heavy benchtop rig."
    },
    tags: ["Electronics", "Signal Processing", "Circuit Design", "Embedded Systems"],
    imageUrl: "/_old_site/assets/PDSO.png",
    link: "",
    github: "",
    gradient: "from-cyan-500 to-blue-600",
    achievements: [
      "Cost-effective prototyping",
      "Signal noise filtering",
      "Custom PCB layout"
    ]
  },
  {
    id: "10",
    title: {
      professional: "Waste Wrapper as Fuel for Water Desalination",
      creative: "Trash to Treasure"
    },
    description: {
      professional: "Researching Thermally-Localized Multistage Wrapper Combustion Still System, an innovative waste-to-energy solution using waste wrappers as fuel source for sustainable water desalination process.",
      creative: "Taking garbage wrappers and burning them cleanly to purify water. The ultimate zero-waste alchemy system."
    },
    tags: ["Sustainability", "Thermal Analysis", "Process Design", "Environmental"],
    imageUrl: "/_old_site/assets/TLMSWCS.png",
    link: "",
    github: "",
    gradient: "from-amber-500 to-yellow-600",
    achievements: [
      "Thermal combustion optimization",
      "Waste-to-energy lifecycle",
      "Sustainable distillation output"
    ]
  }
];
