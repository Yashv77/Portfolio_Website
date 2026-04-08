export const initialAbout = {
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
    description: {
      professional: "Focusing on mechanical systems and computer science fundamentals. Relevant coursework in statistics, basic AI & ML, robotics, and CFD/FEA analysis.",
      creative: "Survived four years of thermodynamics and coding. Learned how to make robots move and occasionally crash gracefully."
    }
  },
  {
    id: "2",
    degree: "CBSE Class XII",
    institution: "Veena Vidya Niketan, Patna",
    score: "86.4%",
    year: "2020",
    description: {
      professional: "Completed higher secondary education focusing on Science.",
      creative: "Memorized entire textbooks and passed the physics exams without deeply questioning the universe."
    }
  },
  {
    id: "3",
    degree: "CBSE Class X",
    institution: "Saint John’s Academy, Hajipur",
    score: "87%",
    year: "2018",
    description: {
      professional: "Completed secondary education.",
      creative: "The glory days where standard math was actually understandable."
    }
  }
];

export const initialSkills = [
  { 
    category: "Analytical", 
    items: {
      professional: ["Data Analytics", "Finance & Business Analytics", "Statistics"],
      creative: ["Staring at Spreadsheets", "Guessing Numbers", "Making Charts Look Smart"]
    } 
  },
  { 
    category: "CSE", 
    items: {
      professional: ["Basic Web Development", "Extensions Development", "Basic AI & ML"],
      creative: ["Copying from StackOverflow", "Breaking the Browser", "Convincing Rocks to Think"]
    } 
  },
  { 
    category: "Mechanical", 
    items: {
      professional: ["Designing", "CAD Modelling", "Simulations", "FEM & CFD Analysis", "Engineering Drawing", "Manufacturing", "CAM", "Automation & Robotics"],
      creative: ["Drawing Fancy Boxes", "Pretending I Know Physics", "Making Things Turn", "Duct Taping Gears"]
    } 
  },
  { 
    category: "Soft Skills", 
    items: {
      professional: ["Project Management", "Leadership", "Communication", "Problem-Solving", "Decision-Making"],
      creative: ["Herding Cats", "Nodding enthusiastically", "Writing strongly worded emails", "Googling the error"]
    } 
  }
];

export const initialSoftwares = [
  "Python", "C", "HTML", "CSS", "JavaScript", "SQL", "Excel", "Tableau", "Power BI", 
  "Autodesk Fusion 360", "SolidWorks", "Ansys", "Autodesk CFD Ultimate", "CREO Parametric", 
  "Autodesk AutoCAD", "Matlab"
];

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

export const initialExtracurricular = [
  {
    id: "ec1",
    title: {
      professional: "Structures & Chassis Head — Team Ultron Motorsports",
      creative: "The Guy Who Makes Sure the ATV Doesn't Fold in Half"
    },
    organization: "Team Ultron Motorsports, TIET",
    period: "Dec 2022 - Present",
    description: {
      professional: "Led the chassis team in designing and manufacturing space-frame chassis for a four-wheel-drive ATV.\nReduced development cycle by 50% through parametric CAD modeling and simulation-driven design.\nImproved competition ranking by 30% at BAJA SAE India through optimized structural integrity and weight reduction.\nManaged a cross-functional team of 8 members across design, manufacturing, and testing phases.",
      creative: "I bend tubes so our ATV doesn't become a pancake mid-jump.\nCut our design time in half because apparently sleeping is overrated.\nDragged our team up 30% in competition rankings.\nBossing around 8 people who are smarter than me and somehow making it work."
    },
    tags: ["BAJA SAE", "CAD Design", "FEA Analysis", "Team Leadership", "Motorsports"],
    detailBlocks: []
  },
  {
    id: "ec2",
    title: {
      professional: "Project Design Head — Concept Electrical Vehicle",
      creative: "EV Body Sculptor & Budget Negotiator"
    },
    organization: "Concept Electrical Vehicle Team, TIET",
    period: "Nov 2022 - Sep 2023",
    description: {
      professional: "Designed the vehicle body with focus on energy efficiency through reduced weight and improved aerodynamics.\nConducted CFD analysis to optimize drag coefficient and airflow management.\nManaged project timeline, resource allocation, and secured sponsorships through strategic partnerships.\nPresented design proposals to faculty review board and industry mentors.",
      creative: "Shaped the body of an electric vehicle so pretty the wind just slides right off.\nRan hundreds of CFD simulations because one more couldn't hurt, right?\nConvinced actual companies to give us money. Peak con artist behavior.\nPresented our work to professors who actually looked impressed for once."
    },
    tags: ["EV Design", "CFD Analysis", "Aerodynamics", "Sponsorship", "Project Management"],
    detailBlocks: []
  },
  {
    id: "ec3",
    title: {
      professional: "Community Outreach Lead — Team Neki",
      creative: "Professional Do-Gooder & Chief Volunteer Wrangler"
    },
    organization: "Team Neki, Hajipur",
    period: "2019 - Present",
    description: {
      professional: "Founded and led community outreach initiatives organizing social and charitable events for underprivileged communities.\nOrganized educational workshops, donation drives, and awareness campaigns across Bihar.\nCoordinated with local government bodies and NGOs for community development projects.\nMentored younger volunteers and scaled the team from 5 to 30+ active members.",
      creative: "Started a group to actually do good stuff instead of just talking about it.\nRan donation drives, awareness campaigns, and workshops that people actually showed up to.\nGot the government and NGOs to pay attention to our little corner of Bihar.\nGrew the squad from 5 to 30+ — turns out people like helping people."
    },
    tags: ["Social Work", "Leadership", "Event Management", "Community Service", "NGO Collaboration"],
    detailBlocks: []
  },
  {
    id: "ec4",
    title: {
      professional: "Freelance Virtual Assistant & Database Manager",
      creative: "Remote Chaos Tamer (International Edition)"
    },
    organization: "Upwork — US-based Digital Marketing Client",
    period: "Sep 2022 - Present",
    description: {
      professional: "Providing freelance database management and virtual assistance services for a US-based digital marketing firm.\nManaging content pipelines, data organization, and administrative workflows using Notion and related tools.\nHandling transcription, content research, and editorial support across multiple projects simultaneously.\nMaintaining a 100% job success score on Upwork with consistent 5-star client reviews.",
      creative: "Getting paid in dollars to organize someone else's digital mess from 10,000 km away.\nNotion is my weapon of choice. I make databases that spark joy.\nJuggling transcription, research, and editing like a one-man content factory.\n100% job success on Upwork — flexing that green badge energy."
    },
    tags: ["Freelancing", "Notion", "Content Management", "Upwork", "Remote Work"],
    detailBlocks: []
  }
];

export const initialBlog = [
  {
    id: "blog1",
    title: {
      professional: "Designing an ATV Chassis: From Sketch to Competition",
      creative: "How I Bent Tubes for a Year and Called It Engineering"
    },
    date: "2025-03-20",
    excerpt: {
      professional: "A deep dive into the engineering process behind designing a competition-grade ATV chassis for BAJA SAE India — covering CAD modeling, FEA simulation, material selection, and lessons learned.",
      creative: "The saga of designing a roll cage that needs to survive jumps, mud, and the occasional driver error. Spoiler: it involved a lot of late nights and SolidWorks crashes."
    },
    tags: ["Engineering", "ATV Design", "BAJA SAE", "FEA"],
    coverImage: "",
    detailBlocks: [
      { id: "bb1", type: "heading", content: "The Challenge" },
      { id: "bb2", type: "text", content: "When I joined Team Ultron Motorsports as the Structures & Chassis Head in December 2022, we were facing a significant challenge. Our previous ATV chassis design had scored in the bottom third at BAJA SAE India, and our development cycle was painfully slow — taking nearly 8 months from concept to manufactured frame.\n\nThe mandate was clear: design a lighter, stiffer, and safer chassis in half the time. No pressure." },
      { id: "bb3", type: "heading", content: "Parametric Design Approach" },
      { id: "bb4", type: "text", content: "The first thing I changed was our entire design methodology. Instead of the traditional approach of sketching a frame and then analyzing it, I built a fully parametric model in SolidWorks where every critical dimension — roll cage height, front overhang angle, rear suspension mount locations — was driven by a master spreadsheet.\n\nThis meant that when the suspension team changed their geometry (which they did approximately 47 times), I could update the entire chassis model in minutes instead of days. The parametric approach alone cut our iteration time by roughly 60%." },
      { id: "bb5", type: "heading", content: "Simulation-Driven Validation" },
      { id: "bb6", type: "text", content: "Every major design iteration went through ANSYS for structural FEA before we committed to it. We simulated four key load cases:\n\n• Front impact at 8G (BAJA SAE requirement)\n• Side impact at 4G\n• Rollover with 2x vehicle weight on the roll cage\n• Torsional rigidity under asymmetric loading\n\nThe simulation workflow became second nature — export from SolidWorks, mesh in ANSYS Workbench, apply boundary conditions, solve, and iterate. We probably ran over 200 simulations across the entire project." },
      { id: "bb7", type: "heading", content: "Results & Lessons Learned" },
      { id: "bb8", type: "text", content: "The final chassis came in at 68 kg — a 15% weight reduction from the previous year — while actually improving torsional stiffness by 22%. At BAJA SAE India 2024, our team improved our overall standing by 30%, with the chassis specifically receiving commendation from the technical judges.\n\nThe biggest lesson? Engineering is iterative. The first design is never the final design. And parametric modeling isn't just a nice-to-have — it's the difference between finishing on time and pulling all-nighters the week before fabrication." }
    ]
  }
];

