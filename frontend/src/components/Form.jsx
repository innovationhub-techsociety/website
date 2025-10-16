import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { motion } from "framer-motion";
import { ArrowRight, User, Lock } from "lucide-react";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-black flex items-center justify-center">
            {/* Animated Gradient Mesh Background from Home.jsx */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-black to-blue-950" />
                <motion.div
                    className="absolute w-[50rem] h-[50rem] bg-cyan-600/30 rounded-full blur-[200px]"
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
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 max-w-md w-full"
            >
                <form 
                    onSubmit={handleSubmit} 
                    className="p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl space-y-6 shadow-2xl"
                >
                    <h1 className="text-4xl font-black text-center bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
                        {name}
                    </h1>

                    <div className="relative">
                        <User className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            className="w-full bg-white/5 border border-white/20 rounded-xl px-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            className="w-full bg-white/5 border border-white/20 rounded-xl px-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    
                    {loading && <p className="text-center text-cyan-400">Loading...</p>}

                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-500 shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/70 transition-all duration-300 transform"
                        type="submit"
                    >
                        {name}
                        <ArrowRight className="inline-block ml-2" size={18} />
                    </motion.button>

                    <p className="text-center text-sm text-gray-400">
                        {method === "login" ? "Don't have an account?" : "Already have an account?"}
                        <a 
                            href={method === "login" ? "/register" : "/login"} 
                            className="font-semibold text-cyan-400 hover:text-cyan-300 ml-1"
                        >
                            {method === "login" ? "Register" : "Login"}
                        </a>
                    </p>
                </form>
            </motion.div>
        </div>
    );
}

export default Form;