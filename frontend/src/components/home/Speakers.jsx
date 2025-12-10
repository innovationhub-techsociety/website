import { motion } from "framer-motion";
import { UNIVERSITIES } from "../../constants";

export default function Speakers() {
    return (
        <section className="relative z-10 py-20 px-10 border-b border-white/10 bg-black">
            <div className="max-w-7xl mx-auto text-center">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-10"
                >
                    Our Speakers Come From Top Universities
                </motion.p>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                    {UNIVERSITIES.map((uni, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 group"
                        >
                            <img
                                src={uni.logo}
                                alt={uni.name}
                                className="h-16 md:h-20 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 filter brightness-0 invert group-hover:filter-none"
                            />
                            <p className="mt-4 text-sm text-gray-400 group-hover:text-white transition-colors duration-300 font-medium">
                                {uni.name}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
