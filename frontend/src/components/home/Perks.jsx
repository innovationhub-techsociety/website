import { motion } from "framer-motion";
import { PERKS } from "../../constants";

export default function Perks() {
    return (
        <section className="relative z-10 py-32 px-10">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-6xl font-black text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                >
                    Member Perks
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {PERKS.map((perk, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            className="p-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl text-center cursor-pointer group"
                        >
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className="inline-block p-4 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl mb-4"
                            >
                                <perk.icon size={32} />
                            </motion.div>
                            <p className="text-lg font-semibold group-hover:text-cyan-400 transition-colors">
                                {perk.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
