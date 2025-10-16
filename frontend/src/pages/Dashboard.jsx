import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { BookOpen, Mic, Video, BrainCircuit, Users, Calendar, Award, FileText, UploadCloud, BarChart2, MessageSquare, ArrowRight, Check, Search, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ESSAY_PROMPTS = [
  {
    title: "The Future of Artificial Intelligence in Creative Fields",
    category: "Artificial Intelligence",
    deadline: "November 15, 2025",
    submitted: false,
  },
  {
    title: "Solving Urban Mobility with Decentralized Networks",
    category: "Blockchain & IoT",
    deadline: "December 1, 2025",
    submitted: true,
  },
  {
    title: "The Ethical Implications of Genetic Engineering",
    category: "BioTech",
    deadline: "December 10, 2025",
    submitted: false,
  }
];

const PITCH_COMPETITIONS = [
    {
      title: "Innovate for Impact: Social Enterprise Challenge",
      deadline: "December 20, 2025",
      status: "Open",
      submitted: false
    },
    {
      title: "AI for a Better Tomorrow",
      deadline: "January 15, 2026",
      status: "Upcoming",
      submitted: false
    }
];

const TIMELINE_EVENTS = [
  {
    date: "October 19, 2025",
    title: "Innovation Hub Launch Day",
    description: "Join us for the official launch of the Innovation Hub, featuring a keynote from a surprise guest.",
    type: "Virtual"
  },
  {
    date: "October 25, 2025",
    title: "Workshop: Introduction to Machine Learning",
    description: "A hands-on workshop for beginners to understand the fundamentals of machine learning.",
    type: "In-Person"
  },
  {
    date: "November 5, 2025",
    title: "Guest Speaker: Founder of a Unicorn Startup",
    description: "Learn from the journey of a successful entrepreneur.",
    type: "Virtual"
  },
];

const RESEARCH_OPPORTUNITIES = [
    {
      title: "AI in Healthcare: Predictive Modeling for Disease Outbreak",
      field: "Artificial Intelligence",
      professor: "Dr. Evelyn Reed",
      spots: 3
    },
    {
      title: "Developing Sustainable Energy Solutions with Nanotechnology",
      field: "CleanTech",
      professor: "Dr. Kenji Tanaka",
      spots: 2
    }
];

const SESSION_RECORDINGS = [
    {
        title: "Keynote: The Future of Web3",
        speaker: "Akashdeep Das",
        date: "October 12, 2025",
        duration: "45 min"
    },
    {
        title: "Fireside Chat with Nimit Jalan",
        speaker: "Nimit Jalan",
        date: "October 5, 2025",
        duration: "60 min"
    }
];


function Button({ children, className = "", variant = "primary", ...props }) {
    const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2";
    const variants = {
      primary: "bg-gradient-to-r from-cyan-600 to-blue-500 text-white shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/70",
      secondary: "bg-white/10 border border-white/20 hover:bg-white/20 backdrop-blur-sm",
      outline: "border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white"
    };
    
    return (
      <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  }

export default function Dashboard() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden font-sans">
      {/* Animated Gradient Mesh Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-black to-blue-950" />
        <motion.div
          className="absolute w-[50rem] h-[50rem] bg-cyan-600/20 rounded-full blur-[200px]"
          style={{
            left: mousePosition.x - 400,
            top: mousePosition.y - 400,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[40rem] h-[40rem] bg-blue-600/15 rounded-full blur-[180px] top-[10%] right-[10%]"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Sidebar Navigation */}
      <motion.aside 
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 h-full w-64 bg-black/30 backdrop-blur-2xl border-r border-white/10 z-30 flex flex-col"
      >
        <div className="flex items-center gap-3 p-6 border-b border-white/10">
          <img 
            src="https://theinnovationhub.vercel.app/assets/Innovation%20Hub%20Logo-oAnrIoLA.png" 
            alt="Innovation Hub Logo" 
            className="h-10 w-10"
          />
          <div>
            <span className="text-xl font-bold tracking-tight text-white">INNOVATION HUB</span>
            <span className="text-xs tracking-widest text-cyan-400">MEMBER PORTAL</span>
          </div>
        </div>
        <nav className="flex flex-col p-6 space-y-4">
          {["Dashboard", "Essay Portal", "Pitch Competitions", "Events", "Research", "Recordings"].map((item, index) => (
            <motion.a 
              key={item} 
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors ${index === 0 ? 'bg-white/10 text-white' : ''}`}
              whileHover={{ x: 5 }}
            >
              {[<BarChart2 />, <FileText />, <Award />, <Calendar />, <BrainCircuit />, <Video />][index]}
              <span>{item}</span>
            </motion.a>
          ))}
        </nav>
        <div className="mt-auto p-6">
            <Button variant="outline" className="w-full" onClick={() => navigate("/")}>
                Logout
            </Button>
        </div>
      </motion.aside> {/* <-- FIX: This closing tag was missing. */}

      {/* Main Content */}
      <main className="ml-64 relative z-10 p-10">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold">Welcome back, {USER.name.split(' ')[0]}!</h1>
            <p className="text-gray-400">Here's what's happening in the Hub today.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search..." className="bg-white/5 border border-white/10 rounded-full py-2 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <Bell className="text-gray-400 hover:text-white cursor-pointer" />
            <img src={USER.avatarUrl} alt="User Avatar" className="w-12 h-12 rounded-full border-2 border-cyan-500" />
          </div>
        </header>

        {/* Essay Submission Portal */}
        <motion.section id="essay-portal" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Essay Submission Portal</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {ESSAY_PROMPTS.map((prompt, i) => (
                    <motion.div key={i} whileHover={{ y: -5 }} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col">
                        <span className="text-sm font-semibold text-cyan-400 mb-2">{prompt.category}</span>
                        <h3 className="text-xl font-semibold mb-3 flex-grow">{prompt.title}</h3>
                        <p className="text-sm text-gray-400 mb-4">Deadline: {prompt.deadline}</p>
                        {prompt.submitted ? (
                             <div className="flex items-center gap-2 text-green-400">
                                <Check size={20} />
                                <span>Submitted</span>
                            </div>
                        ) : (
                            <Button variant="primary">
                                <UploadCloud size={18} />
                                Submit Now
                            </Button>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.section>

        {/* Virtual Startup Business Pitch Competition Submission */}
        <motion.section id="pitch-competitions" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Startup Pitch Competitions</h2>
            {PITCH_COMPETITIONS.map((comp, i) => (
                <motion.div key={i} whileHover={{ y: -5 }} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-4 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-semibold">{comp.title}</h3>
                        <p className="text-sm text-gray-400">Submission Deadline: {comp.deadline}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${comp.status === 'Open' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{comp.status}</span>
                        <Button variant="outline">
                            View Brief & Submit
                            <ArrowRight size={18} />
                        </Button>
                    </div>
                </motion.div>
            ))}
        </motion.section>

        <div className="grid grid-cols-3 gap-8 mb-12">
            {/* Timeline of Events and Comps */}
            <motion.section id="events" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="col-span-2">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Timeline of Events</h2>
                <div className="space-y-6">
                    {TIMELINE_EVENTS.map((event, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div className="flex flex-col items-center">
                                <div className="p-2 bg-cyan-500/20 rounded-full">
                                    {event.type === "Virtual" ? <Video className="text-cyan-400" /> : <Users className="text-cyan-400" />}
                                </div>
                                <div className="w-px h-16 bg-white/10"></div>
                            </div>
                            <div>
                                <p className="font-semibold text-cyan-300">{event.date}</p>
                                <h3 className="text-lg font-bold">{event.title}</h3>
                                <p className="text-gray-400 text-sm">{event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.section>
            
            {/* Research Opportunities */}
            <motion.section id="research" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Research Opportunities</h2>
                <div className="space-y-4">
                    {RESEARCH_OPPORTUNITIES.map((opp, i) => (
                        <motion.div key={i} whileHover={{ y: -5, scale: 1.02 }} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 cursor-pointer">
                            <h4 className="font-semibold">{opp.title}</h4>
                            <p className="text-sm text-cyan-400">{opp.field}</p>
                            <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
                                <span>with {opp.professor}</span>
                                <span>{opp.spots} spots available</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </div>


        <div className="grid grid-cols-2 gap-8">
            {/* In-person Club Session */}
            <motion.section id="in-person-sessions" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">In-Person Sessions</h2>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold">Weekly Hack Night</h3>
                    <p className="text-gray-400 mb-4">Every Thursday, 7 PM @ The Innovation Lounge</p>
                    <p className="mb-4">Join fellow members for a casual night of coding, collaboration, and pizza. Work on your projects, get help, or just hang out.</p>
                    <Button variant="secondary">RSVP for this week</Button>
                </div>
            </motion.section>

            {/* Session Recordings (Virtual) */}
            <motion.section id="recordings" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Session Recordings</h2>
                <div className="space-y-4">
                    {SESSION_RECORDINGS.map((rec, i) => (
                        <motion.div key={i} whileHover={{ x: 5 }} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-4">
                                <Mic className="text-fuchsia-400" />
                                <div>
                                    <h4 className="font-semibold">{rec.title}</h4>
                                    <p className="text-sm text-gray-400">{rec.speaker} • {rec.date}</p>
                                </div>
                            </div>
                            <span className="text-gray-400 text-sm">{rec.duration}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </div>
      </main>
    </div>
  );
}