import { motion } from "framer-motion";
import { PARTNERS } from "../../constants";

export default function Partners() {
    return (
        <section className="relative z-10 py-20 px-10 border-b border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto text-center">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-10"
                >
                    Trusted Partners & Collaborators
                </motion.p>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                    {PARTNERS.map((partner, i) => (
                        <motion.a
                            key={i}
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
                            className="transition-all duration-300 cursor-pointer block"
                        >
                            {/* Partner Logo */}
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="h-12 md:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                            />
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
