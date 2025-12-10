import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Background() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-black to-blue-950" />

            {/* Multiple Animated Orbs */}
            <motion.div
                className="absolute w-[50rem] h-[50rem] bg-cyan-600/30 rounded-full blur-[200px]"
                style={{
                    left: mousePosition.x - 400,
                    top: mousePosition.y - 400,
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                className="absolute w-[40rem] h-[40rem] bg-blue-600/20 rounded-full blur-[180px] top-[10%] right-[10%]"
                animate={{
                    scale: [1, 1.4, 1],
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    rotate: [0, 180, 360],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
                className="absolute w-[35rem] h-[35rem] bg-cyan-500/25 rounded-full blur-[160px] bottom-[20%] left-[20%]"
                animate={{
                    scale: [1.2, 0.8, 1.2],
                    x: [0, -80, 0],
                    y: [0, 80, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                />
            ))}
        </div>
    );
}
