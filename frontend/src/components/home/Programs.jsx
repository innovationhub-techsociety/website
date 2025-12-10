import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PROGRAMS } from "../../constants";

export default function Programs() {
    return (
        <section id="programs" className="relative z-10 py-32 px-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        What We Do at the Hub
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Regular events, competitions, and learning opportunities to help you grow and connect
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {PROGRAMS.map((program, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group relative p-8 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden cursor-pointer"
                        >
                            {/* Gradient Overlay on Hover */}
                            <motion.div
                                className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                            />

                            {/* Animated Border */}
                            <motion.div
                                className="absolute inset-0 rounded-3xl"
                                style={{
                                    background: `linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.5), transparent)`,
                                }}
                                animate={{
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                            />

                            <div className="relative z-10">
                                <motion.div
                                    whileHover={{ rotate: 360, scale: 1.2 }}
                                    transition={{ duration: 0.6 }}
                                    className={`inline-block p-4 bg-gradient-to-br ${program.color} rounded-2xl mb-6`}
                                >
                                    <program.icon size={40} />
                                </motion.div>

                                <span className="inline-block px-4 py-1 bg-cyan-500/20 rounded-full text-sm font-semibold text-cyan-300 mb-4">
                                    {program.duration}
                                </span>

                                <h3 className="text-3xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">
                                    {program.title}
                                </h3>

                                <p className="text-gray-300 mb-6 leading-relaxed">
                                    {program.description}
                                </p>

                                <div className="space-y-3">
                                    {program.benefits.map((benefit, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="flex items-center gap-3"
                                        >
                                            <Check className="text-green-400 flex-shrink-0" size={20} />
                                            <span className="text-gray-300">{benefit}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-8 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl font-semibold transition-all group-hover:border-cyan-500/50"
                                >
                                    Learn More →
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
