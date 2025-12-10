import { motion } from "framer-motion";
import { BarChart2, FileText, Award, Calendar, BrainCircuit, Video } from "lucide-react";
import Button from "../ui/Button";

export default function Sidebar({ activeSection, setActiveSection, navigate }) {
    const navItems = ["Dashboard", "Essay Portal", "Pitch Competitions", "Events", "Research", "Recordings"];
    const navIcons = [<BarChart2 key="dashboard" />, <FileText key="essay" />, <Award key="pitch" />, <Calendar key="events" />, <BrainCircuit key="research" />, <Video key="recordings" />];

    return (
        <motion.aside initial={{ x: -200 }} animate={{ x: 0 }} transition={{ duration: 0.8 }} className="fixed top-0 left-0 h-full w-64 bg-black/30 backdrop-blur-2xl border-r border-white/10 z-30 flex flex-col">
            <div className="flex items-center gap-3 p-6 border-b border-white/10">
                <img src="https://theinnovationhub.vercel.app/assets/Innovation%20Hub%20Logo-oAnrIoLA.png" alt="Innovation Hub Logo" className="h-10 w-10" />
                <div>
                    <span className="block text-xl font-bold tracking-tight text-white">INNOVATION HUB</span>
                    <span className="block text-xs tracking-widest text-cyan-400">MEMBER PORTAL</span>
                </div>

            </div>
            <nav className="flex flex-col p-6 space-y-4">
                {navItems.map((item, index) => (
                    <motion.button
                        key={item}
                        onClick={() => setActiveSection(item)}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors ${activeSection === item ? 'bg-white/10 text-white' : ''}`}
                        whileHover={{ x: 5 }}
                    >
                        {navIcons[index]}
                        <span>{item}</span>
                    </motion.button>
                ))}
            </nav>
            <div className="mt-auto p-6"><Button variant="outline" className="w-full" onClick={() => navigate("/")}>Logout</Button></div>
        </motion.aside>
    );
}
