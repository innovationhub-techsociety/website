import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import Button from "../ui/Button";
import { STATS } from "../../constants";

export default function CTA() {
    return (
        <section className="relative z-10 py-32 px-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto text-center p-16 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 backdrop-blur-2xl border border-white/20 rounded-[3rem] relative overflow-hidden"
            >
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            "radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
                            "radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
                            "radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)",
                            "radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
                        ],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />

                <div className="relative z-10">
                    <motion.h2
                        className="text-6xl font-black mb-6"
                        animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                        style={{
                            backgroundImage: "linear-gradient(90deg, #fff, #fuchsia, #blue, #fff, #fuchsia, #blue)",
                            backgroundSize: "200% 100%",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        Become a Founding Member
                    </motion.h2>

                    <p className="text-2xl text-gray-200 mb-10 max-w-2xl mx-auto">
                        Be part of the first cohort. Limited to {STATS.spotsAvailable} visionaries who want to build the future together.
                    </p>

                    <div className="flex gap-6 justify-center flex-wrap">
                        <Button variant="primary" className="text-xl" onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfQ4dQ5r2dVcuYRW6awkv17GoZ3axOyh1YUrzz7K9JOGz1MfQ/viewform?usp=header', '_blank')}>
                            Apply Now
                            <Zap className="inline-block ml-2" size={24} />
                        </Button>
                        <Button variant="outline" className="text-xl">
                            Schedule a Call
                        </Button>
                    </div>

                    <p className="text-sm text-gray-400 mt-8">
                        Applications open {STATS.launchDate} • Only {STATS.spotsAvailable} spots available
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
