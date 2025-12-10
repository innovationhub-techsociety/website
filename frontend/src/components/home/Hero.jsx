import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket, Sparkles, Users } from "lucide-react";
import Button from "../ui/Button";
import { STATS } from "../../constants";

export default function Hero() {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

    return (
        <motion.section
            style={{ opacity, scale }}
            className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6 pt-32"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, type: "spring" }}
                className="mb-6"
            >
                <span className="px-6 py-3 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/50 rounded-full text-sm font-semibold backdrop-blur-xl">
                    ✨ Launching {STATS.launchDate} • Limited to {STATS.spotsAvailable} Founding Members
                </span>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent leading-tight mb-6"
                style={{
                    textShadow: "0 0 80px rgba(168, 85, 247, 0.4)",
                }}
            >
                Build The
                <br />
                <motion.span
                    animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{ backgroundSize: "200% 200%" }}
                    className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-yellow-400 bg-clip-text"
                >
                    Impossible
                </motion.span>
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="mt-4 text-2xl md:text-3xl text-gray-300 max-w-4xl leading-relaxed font-light"
            >
                Where visionaries meet, groundbreaking ideas take flight, and the next generation of tech leaders is forged.
                <span className="text-fuchsia-400 font-semibold"> Your journey starts here.</span>
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-wrap gap-6 mt-12 justify-center"
            >
                <Button variant="primary" className="text-xl group" onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfQ4dQ5r2dVcuYRW6awkv17GoZ3axOyh1YUrzz7K9JOGz1MfQ/viewform?usp=header', '_blank')}>
                    Start Building
                    <Rocket className="inline-block ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={24} />
                </Button>
                <Button variant="secondary" className="text-xl group">
                    Watch Demo
                    <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-block ml-2"
                    >
                        ▶
                    </motion.span>
                </Button>
            </motion.div>

            {/* Floating Stats Preview */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="flex gap-12 mt-20 flex-wrap justify-center"
            >
                {[
                    { label: "Active members", value: "60+", icon: Rocket },
                    { label: "People reached", value: "45000+", icon: Users },
                    { label: "Starting", value: STATS.launchDate, icon: Sparkles },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.1, y: -5 }}
                        className="flex flex-col items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 cursor-pointer"
                    >
                        <stat.icon className="text-cyan-400" size={32} />
                        <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            {stat.value}
                        </p>
                        <p className="text-sm text-gray-400">{stat.label}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"
                    />
                </div>
            </motion.div>
        </motion.section>
    );
}
