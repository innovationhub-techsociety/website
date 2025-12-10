import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { motion } from "framer-motion";
import { ArrowRight, User, Lock } from "lucide-react";
import Background from "./home/Background";

function Form({ route, method, children }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const payload = { username, password };
            if (method === "register") {
                payload.email = email;
            }
            const res = await api.post(route, payload);
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/dashboard");
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
            <Background />

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

                    {method === "register" && (
                        <div className="relative">
                            <User className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                className="w-full bg-white/5 border border-white/20 rounded-xl px-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </div>
                    )}

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
                {/* Render additional content (Social Login) inside the card but outside the form tag if preferred, or inside. 
                    If inside form, buttons (SocialLogin) must have type="button" to avoid submitting. 
                    SocialLogin buttons already have type="button". 
                    Let's put them inside the motion.div but outside the form for cleaner separation or inside form? 
                    Inside form allows spacing. Let's put them INSIDE the form block for consistency. 
                 */}
                <div className="mt-4 px-8 pb-8">
                    {children}
                </div>
            </motion.div>
        </div>
    );
}

export default Form;