// Replace the images in /public/images (or change the paths) and edit the text below.
const d = (issuer, date, text) => ({ details: [["from", issuer], ["date", date]], description: text });

export const COLLECTIONS = {
  certificates: {
    title: "certificates",
    items: [
      { caption: "AI Certificate", image: "/images/AI certificate.png", ...d("fast nuces", "january 2026", "for physical ai and robotics.") },
      { caption: "IBM Certificate", image: "/images/IBM certificate.png", ...d("IBM Coursera", "july 2025", "introduction and basics of data science.") },
      { caption: "Edeviser Certificate", image: "/images/Edeviser Certificate.png", ...d("Edeviser", "September 2025", "marketing internship at edeviser.") },
    ],
  },
  honors: {
    title: "honors",
    items: [
      { caption: "Deans List Fall 2024", image: "/images/deans list fa 2024.jpeg", ...d("fast nuces", "fall 2024", "sgpa higher than 3.5.") },
      { caption: "Rectors List Spring 2025", image: "/images/rector list Sp 2025.jpeg", ...d("fast nuces", "spring 2025", "spga was 4.0.") },
      { caption: "Gold Medal Fall 2024", image: "/images/fall 2024 medal.jpeg", ...d("fast nuces", "fall 2024", "for 1st position.") },
      { caption: "Gold Medal Spring 2025", image: "/images/spring2025medal.jpg", ...d("fast nuces", "spring 2025", "for 1st position.") },
      { caption: "Gold Medal Fall 2025", image: "/images/fall 2025 medal.jpeg", ...d("fast nuces", "fall 2025", "for 1st position.") },
      { caption: "Gold Medal Spring 2026", image: "/images/spring2026medal.jpg", ...d("fast nuces", "spring 2026", "for 1st position.") },
    ],
  },
  papers: {
    title: "research papers",
    items: [
      { caption: "Flood Segmentation", image: "", ...d("fast nuces", "in progress", "comparing diferrent datasets for flood segmentation models.") },
      //{ caption: "research paper 2", image: "/images/paper-2.svg", ...d("journal or conference", "month year", "one or two sentences summarising the paper.") },
    ],
  },
};

// ---------- EXPERIENCE: one folder per object. Copy a block to add a position. ----------
export const EXPERIENCE = [
  { label: "ai engineer", role: "ai engineer", company: "xcorre", dates: "july 2026 – october 2026", image: "/images/xcorre.PNG", description: "built backend using FAST API, built lung disease detection model, implemented hardware elements." },
  { label: "data analysis and visualisation", role: "data visualisation", company: "kdd lab", dates: "july 2026 - august 2026", image: "/images/experience-2.svg", description: "confidence scoring models, geospatial data visualtion, data extraction." },
  { label: "lab demonstrator", role: "lab demonstrator", company: "fast nuces", dates: "january 2026 - may 2026", image: "/images/experience-3.svg", description: "taught 40+ students basics of programming and checked their lab tasks." },
];

// ---------- CHAT SETTINGS ----------
export const CHAT = {
  name: "fatima laraib <3",
  status: "online",
  greeting: "hey! i'm fatima. type a keyword (like ml or python) or pick an option below.",
  recentCount: 3, // how many projects "recent projects" shows
  keywordChips: 5, // how many keyword shortcut buttons to show
};

// ---------- PROJECTS: copy a block to add one. Everything else updates automatically. ----------
// summary  = one line a recruiter reads in the chat (no click needed)
// keywords = what the search matches (add synonyms, e.g. "ML" and "machine learning")
// date     = "YYYY-MM", used to sort "recent projects".  status is optional.
export const PROJECTS = [
  { name: "Crumb", summary: "web app for celiac disease.", keywords: ["Python", "FAST API", "APIs"], date: "2026-10", status: "in progress", image: "/images/crumb.PNG", description: "web application for celiac disease. find recipes, scan recipes for gluten, recommend recipes/restaurants.", link: "https://github.com/fatimaLaraibBonk/Crumb_Application" },
  { name: "Flappy Bird Neural Network", featured:true, summary: "neural network from scratch.", keywords: ["Python", "Deep Learning", "Neural Networks"], date: "2026-07", image: "/images/flappybird.jpg", description: "built a neural network from scratch that simulates a flappy bird game.", link: "https://github.com/fatimaLaraibBonk/Flappy-Bird-Neural-Network-Simulation" },
  { name: "Study With A Buddy", featured:true, summary: "web app for networking within university.", keywords: ["Python", "GMAIL SNMTP", "Software Engineering", "Node js", "Express", "SQL", "Supabase", "Vercel"], date: "2026-04", image: "/images/StudyBuddy1.png", description: "A web-application that allows FAST Islamabad students to post their study sessions and lets other students to request and join in on the sessions. Tracks the session, tracks performance, build friends and report users for misuse.", link: "https://github.com/fatimaLaraibBonk/StudyWithABuddy" },
  { name: "RideFlow", summary: "uber dupe.", keywords: ["Web", "Node", "Express", "SQL", "Database"], date: "2025-05", image: "/images/RideFlow.png", description: "RideFlow is a web based application that allows a variety of users to perform various tasks regarding verification, booking, tracking rides and expenses, tracking what cities bring back more money. The 3 main roles are: Admin, Rider and Driver.", link: "https://github.com/fatimaLaraibBonk/RideFlow" },
  { name: "Movie Recommender", summary: "recommends movies from 5000 movie dataset.", keywords: ["C++", "Data Structures", "Algorithms"], date: "2025-09", image: "/images/movie.PNG", description: "This project focuses on the management of a large database of movies, along with their actors, genres, release years, and ratings. Through the use of different data structures, and various algorithms the project accomplishes the goal of making connection amongst movies, actors and genres, and uses those connections to find shortest paths among movies and suggest movies via a recommendation system.", link: "https://github.com/fatimaLaraibBonk/DataStructures_FinalProject_MoviesDataAnalysis" },
  { name: "Piano Guru", summary: "physical ai + machine learning to make a piano from scratch.", keywords: ["ML", "Machine Learning", "AI", "API", "Hardware", "Robotics", "Physical AI"], date: "2025-09", image: "/images/piano.jpeg", description: "Piano hardware built from scratch using ESP32, FSRs, Servo Motors, LEDS accompanied by a little robot dancer. The software is built using python and Arduino which allows user to play various melodies based on their performance level, recommends new melodies, generates melodies based on audio sung into the microphone, emotion recognition and melody suggestion.", link: "" },
  { name: "Chatbot + Object Detection", summary: "chatbot using OpenAi api + YOLO V8.", keywords: ["API", "Chatbot", "Python", "Object Detection", "YOLO V8", "Voice Chat"], date: "2025-06", image: "/images/chatbot.jpeg", description: "Built a conversational chatbot application integrating the OpenAI API, handling context management, prompt engineering, and structured response parsing..", link: "" },
];

// ---------- SMALL TALK: default replies in the projects chat. Add your own! ----------
// patterns = phrases that trigger it (lowercase). {time} and {date} are filled in automatically.
export const SMALL_TALK = [
  { patterns: ["hello", "hi", "hey", "hiya", "good morning", "good afternoon", "good evening"], reply: "hey! nice to meet you. ask me about a skill or tool, like ml or react, or tap recent projects." },
  { patterns: ["how are you", "how are u", "how r u", "hows it going", "how's it going", "whats up", "what's up"], reply: "doing great, thanks for asking! want to see what i'm working on lately?" },
  { patterns: ["what time is it", "what time", "time is it", "current time"], reply: "it's {time} right now." },
  { patterns: ["what day is it", "what is the date", "todays date", "today's date"], reply: "today is {date}." },
  { patterns: ["who are you", "whats your name", "what's your name", "your name"], reply: "i'm fatima laraib. this chat is a quick way to explore my projects." },
  { patterns: ["thanks", "thank you", "thx"], reply: "you're welcome!" },
  { patterns: ["bye", "goodbye", "see you"], reply: "bye! thanks for stopping by." },
  { patterns: ["help", "what can i ask", "what can you do"], reply: "type a keyword like ml or python to find projects, or tap one of the buttons below." },
];

// ---------- SKILLS: one cd per object. Add more cds or skills freely. ----------
export const SKILLS = [
  { label: "programming languages", skills: ["Python", "Assembly", "C++", "SQL"] },
  { label: "softwares", skills: ["jupyter notebook", "claude code", "supabase", "vs code", "power bi"] },
  { label: "concepts", skills: ["Machine learning", "Data structures", "Algorithms", "OOP", "REST APIs", "FAST APIs", "Natural Language Processing", "CNNs", "Deep Learning"] },
  { label: "communication", skills: ["Public speaking", "Technical writing", "Teamwork", "Presentations"] },
];

// ---------- CONTACT ----------
// cv: put your file in /public and keep the name (or change it here).
// To make the message form send straight to your inbox, fill in formEndpoint (and accessKey if the
// service gives you one). Until then, the send button opens the visitor's own email app instead.
export const CONTACT = {
  email: "fatimalaraib06@gmail.com",
  cv: "/cv.pdf",
  github: "https://github.com/fatimaLaraibBonk",
  linkedin: "https://www.linkedin.com/in/fatima-laraib-620273318/",
  formEndpoint: "/api/contact", // handled by api/contact.js; the secret key lives in Vercel env vars
};
