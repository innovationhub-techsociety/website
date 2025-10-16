import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Sparkles, Zap, Rocket, Users, Award, TrendingUp, Linkedin, Lightbulb, ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const STATS = {
  foundingYear: "2025",
  spotsAvailable: "200",
  programDuration: "12 months",
  launchDate: "19th October 2025"
};

const PROGRAMS = [
  {
    icon: Users,
    title: "Guest Speakers",
    duration: "Monthly",
    description: "Learn from industry leaders, successful founders, and tech innovators who share their journey and insights",
    benefits: ["Industry experts", "Q&A sessions", "Networking opportunities", "Career guidance"],
    color: "from-purple-600 to-fuchsia-600"
  },
  {
    icon: Rocket,
    title: "Competitions",
    duration: "Quarterly",
    description: "Put your skills to the test in hackathons, pitch competitions, and innovation challenges with real prizes",
    benefits: ["Cash prizes", "Mentorship awards", "Exposure to investors", "Portfolio projects"],
    color: "from-blue-600 to-cyan-600"
  },
  {
    icon: Lightbulb,
    title: "Workshops & Talks",
    duration: "Weekly",
    description: "Hands-on workshops covering everything from coding to product design, business strategy to personal branding",
    benefits: ["Technical skills", "Soft skills training", "Interactive sessions", "Expert facilitators"],
    color: "from-fuchsia-600 to-pink-600"
  }
];

const PERKS = [
  { icon: Lightbulb, text: "Free workshops & masterclasses" },
  { icon: Users, text: "Exclusive networking events" },
  { icon: Award, text: "Certification programs" },
  { icon: Zap, text: "24/7 community support" },
  { icon: TrendingUp, text: "Career placement assistance" },
  { icon: Rocket, text: "Access to funding & grants" }
];

const FOUNDERS = [
  {
    name: "Akashdeep Das",
    title: "Founder and President",
    imageUrl: "https://theinnovationhub.vercel.app/assets/akash.jpg",
    socialUrl: "#"
  },
  {
    name: "Nimit Jalan",
    title: "Associate, AI and Content Ambassador",
    imageUrl: "https://theinnovationhub.vercel.app/assets/nimit.jpg",
    socialUrl: "#"
  },
  {
    name: "Vedant Jain",
    title: "Our STEM Ambassador",
    imageUrl: "https://placehold.co/400x400/1a1a1a/FFFFFF?text=VJ",
    socialUrl: "#"
  },
  {
    name: "Mahnoor Khan",
    title: "Content and Social Outreach Ambassador",
    imageUrl: "https://placehold.co/400x400/1a1a1a/FFFFFF?text=MK",
    socialUrl: "#"
  }
];

function Button({ children, className = "", variant = "primary", ...props }) {
  const baseStyles = "px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95";
  const variants = {
    primary: "bg-gradient-to-r from-cyan-600 to-blue-500 text-white shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/70",
    secondary: "bg-white/10 border border-white/20 hover:bg-white/20 backdrop-blur-sm",
    outline: "border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white"
  };
  
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Gradient Mesh Background */}
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

      {/* NAVBAR with Glassmorphism */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 px-10 py-6 backdrop-blur-2xl bg-white/5 border-b border-white/10 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.h1 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src="https://theinnovationhub.vercel.app/assets/Innovation%20Hub%20Logo-oAnrIoLA.png" 
              alt="Innovation Hub Logo" 
              className="h-12 w-12"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-white">
                INNOVATION HUB
              </span>
              <span className="text-xs tracking-widest text-cyan-400">
                TECH SOCIETY
              </span>
            </div>
          </motion.h1>
          
          <nav className="flex gap-10 text-lg">
            {["About", "Programs", "Join Us", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="relative group"
                whileHover={{ y: -2 }}
              >
                <span className="hover:text-fuchsia-400 transition-colors">{item}</span>
                <motion.span 
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-fuchsia-400 to-blue-400 group-hover:w-full transition-all duration-300"
                />
              </motion.a>
            ))}
          </nav>
          
          <Button variant="primary" onClick={() => navigate("/login")}>
            Sign In
            <ArrowRight className="inline-block ml-2" size={18} />
          </Button>          

        </div>
      </motion.header>

      {/* HERO SECTION - Absolutely Insane */}
      <motion.section 
        style={{ opacity, scale }}
        className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6 pt-32"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="mb-6"
        >
          <span className="px-6 py-3 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/50 rounded-full text-sm font-semibold backdrop-blur-xl">
            ✨ Launching {STATS.launchDate} • Limited to {STATS.spotsAvailable} Founding Members
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent leading-tight mb-6"
          style={{
            textShadow: "0 0 80px rgba(168, 85, 247, 0.4)",
          }}
        >
          Build The
          <br />
          <motion.span
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ backgroundSize: "200% 200%" }}
            className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-yellow-400 bg-clip-text"
          >
            Impossible
          </motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-4 text-2xl md:text-3xl text-gray-300 max-w-4xl leading-relaxed font-light"
        >
          Where visionaries meet, groundbreaking ideas take flight, and the next generation of tech leaders is forged. 
          <span className="text-fuchsia-400 font-semibold"> Your journey starts here.</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap gap-6 mt-12 justify-center"
        >
          <Button variant="primary" className="text-xl group" onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfQ4dQ5r2dVcuYRW6awkv17GoZ3axOyh1YUrzz7K9JOGz1MfQ/viewform?usp=header', '_blank')}>
            Start Building
            <Rocket className="inline-block ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={24} />
          </Button>
          <Button variant="secondary" className="text-xl group">
            Watch Demo
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block ml-2"
            >
              ▶
            </motion.span>
          </Button>
        </motion.div>

        {/* Floating Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex gap-12 mt-20 flex-wrap justify-center"
        >
          {[
            { label: "Program Duration", value: STATS.programDuration, icon: Rocket },
            { label: "Founding Members", value: STATS.spotsAvailable, icon: Users },
            { label: "Starting", value: STATS.launchDate, icon: Sparkles },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 cursor-pointer"
            >
              <stat.icon className="text-cyan-400" size={32} />
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10"
        >
                        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* PROGRAMS SECTION - Ultra Premium Cards */}
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

      {/* PERKS SECTION - Bento Grid */}
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

      {/* STATS SECTION - Enhanced */}
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

      {/* FOUNDERS SECTION - NEW */}
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


      {/* CTA SECTION - Mind-Blowing */}
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

      {/* FOOTER - Premium */}
      <footer id="contact" className="relative z-10 py-16 px-10 border-t border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
                <img 
                  src="https://theinnovationhub.vercel.app/assets/Innovation%20Hub%20Logo-oAnrIoLA.png" 
                  alt="Innovation Hub Logo" 
                  className="inline-block h-8 w-8 mr-2"
                />
                Innovation Hub
              </h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering the next generation of builders, creators, and world-changers. Join us in shaping the future.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <div className="space-y-2">
                {["About Us", "Careers", "Blog", "Press Kit"].map((link) => (
                  <a key={link} href="#" className="block text-gray-400 hover:text-blue-400 transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <div className="space-y-2">
                {["Privacy Policy", "Terms of Service", "Cookie Policy", "FAQ"].map((link) => (
                  <a key={link} href="#" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">
              © 2025 Innovation Hub - Tech Society. All rights reserved.
            </p>
            <div className="flex gap-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Status</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
