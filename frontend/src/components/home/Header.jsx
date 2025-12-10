import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";

export default function Header() {
    const navigate = useNavigate();

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 left-0 right-0 z-50 px-10 py-6 backdrop-blur-2xl bg-white/5 border-b border-white/10 shadow-2xl"
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <motion.h1
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.05 }}
                >
                    <img
                        src="https://theinnovationhub.vercel.app/assets/Innovation%20Hub%20Logo-oAnrIoLA.png"
                        alt="Innovation Hub Logo"
                        className="h-12 w-12"
                    />
                    <div className="flex flex-col">
                        <span className="text-2xl font-extrabold tracking-tight text-white">
                            INNOVATION HUB
                        </span>
                        <span className="text-xs tracking-widest text-cyan-400">
                            TECH SOCIETY
                        </span>
                    </div>
                </motion.h1>

                <nav className="flex gap-10 text-lg">
                    {["About", "Programs", "Join Us", "Contact"].map((item) => (
                        <motion.a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="relative group"
                            whileHover={{ y: -2 }}
                        >
                            <span className="hover:text-fuchsia-400 transition-colors">{item}</span>
                            <motion.span
                                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-fuchsia-400 to-blue-400 group-hover:w-full transition-all duration-300"
                            />
                        </motion.a>
                    ))}
                </nav>

                <Button variant="primary" onClick={() => navigate("/login")}>
                    Sign In
                    <ArrowRight className="inline-block ml-2" size={18} />
                </Button>

            </div>
        </motion.header>
    );
}
