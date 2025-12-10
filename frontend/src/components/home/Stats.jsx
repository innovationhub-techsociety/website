import { motion } from "framer-motion";
import { Award, Users, Zap } from "lucide-react";

export default function Stats() {
    return (
        <section id="success" className="relative z-10 py-32">
            <div className="max-w-7xl mx-auto px-10">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-6xl font-black text-center mb-10"
                >
                    Why Join as a Founding Member?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-2xl text-gray-300 text-center mb-20 max-w-3xl mx-auto"
                >
                    Be part of history. Shape the culture, set the standards, and build alongside the first wave of innovators.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        {
                            icon: Award,
                            title: "Lifetime Benefits",
                            description: "Founding members get permanent access to all future programs, events, and resources",
                            color: "blue"
                        },
                        {
                            icon: Users,
                            title: "Exclusive Network",
                            description: "Direct access to mentors, industry leaders, and fellow founding members",
                            color: "fuchsia"
                        },
                        {
                            icon: Zap,
                            title: "Shape the Future",
                            description: "Your feedback and ideas will directly influence how Innovation Hub evolves",
                            color: "purple"
                        },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, type: "spring" }}
                            whileHover={{ scale: 1.05, y: -10 }}
                            className="text-center p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 cursor-pointer group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.6 }}
                                className={`inline-block p-6 bg-gradient-to-br from-${item.color}-600 to-${item.color}-800 rounded-3xl mb-6`}
                            >
                                <item.icon size={48} />
                            </motion.div>
                            <h3 className={`text-3xl font-bold text-${item.color}-400 mb-4`}>
                                {item.title}
                            </h3>
                            <p className="text-xl text-gray-300 leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
