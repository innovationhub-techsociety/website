import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { FOUNDERS } from "../../constants";

export default function Founders() {
    return (
        <section id="founders" className="relative z-10 py-32 px-10">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-6xl font-black text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                >
                    Meet the Team
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {FOUNDERS.map((founder, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -10, scale: 1.05 }}
                            className="group relative flex flex-col items-center text-center p-6 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10"
                        >
                            <div className="relative mb-4">
                                <img
                                    src={founder.imageUrl}
                                    alt={founder.name}
                                    className="w-40 h-40 rounded-full object-cover border-4 border-cyan-500/30 group-hover:border-cyan-500 transition-all duration-300"
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                />
                            </div>
                            <h3 className="text-2xl font-bold mb-1">{founder.name}</h3>
                            <p className="text-cyan-400 font-semibold mb-4">{founder.title}</p>
                            <a href={founder.socialUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin size={24} />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
