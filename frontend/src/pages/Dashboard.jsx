import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Mic, Video, BrainCircuit, Users, Calendar, Award, FileText, UploadCloud, Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Button from "../components/ui/Button";
import Sidebar from "../components/dashboard/Sidebar";
import SubmissionModal from "../components/dashboard/SubmissionModal";
import Feed from "../components/dashboard/Feed";

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dashboardData, setDashboardData] = useState({
        competitions: [],
        events: [],
        research: [],
        recordings: [],
    });
    const [loading, setLoading] = useState(true);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeSection, setActiveSection] = useState("Dashboard");
    const [isLinkedInPopoverOpen, setLinkedInPopoverOpen] = useState(false);
    const [linkedInUrl, setLinkedInUrl] = useState("");
    const [isUpdatingLinkedIn, setIsUpdatingLinkedIn] = useState(false);
    const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
    const [selectedCompetition, setSelectedCompetition] = useState(null);

    const fetchData = async () => {
        try {
            const [userRes, compRes, eventRes, researchRes, recordingRes] = await Promise.all([
                api.get("/api/user/"),
                api.get("/api/competitions/"),
                api.get("/api/events/"),
                api.get("/api/research/"),
                api.get("/api/recordings/"),
            ]);
            setUser(userRes.data);
            setDashboardData({
                competitions: compRes.data,
                events: eventRes.data,
                research: researchRes.data,
                recordings: recordingRes.data,
            });
        } catch (error) {
            console.error("Failed to fetch dashboard data:", error);
            navigate("/login");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [navigate]);

    useEffect(() => {
        if (user) {
            setLinkedInUrl(user.linkedin_profile || "");
        }
    }, [user]);

    const handleSaveLinkedIn = async () => {
        setIsUpdatingLinkedIn(true);
        try {
            const res = await api.patch("/api/user/", { linkedin_profile: linkedInUrl });
            setUser(res.data);
            setLinkedInPopoverOpen(false);
        } catch (error) {
            console.error("Failed to update LinkedIn profile:", error);
        } finally {
            setIsUpdatingLinkedIn(false);
        }
    };

    useEffect(() => {
        const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <div className="text-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-16 h-16 border-4 border-t-cyan-500 border-r-cyan-500 border-b-white/20 border-l-white/20 rounded-full mb-4 mx-auto"
                    />
                    <p className="text-xl text-gray-300">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    const now = new Date();
    const activeComps = dashboardData.competitions.filter(c => new Date(c.deadline) > now);
    const pastComps = dashboardData.competitions.filter(c => new Date(c.deadline) <= now);

    const activeEssay = activeComps.filter(c => c.type === 'ESSAY');
    const pastEssay = pastComps.filter(c => c.type === 'ESSAY');

    const activePitch = activeComps.filter(c => c.type === 'PITCH');
    const pastPitch = pastComps.filter(c => c.type === 'PITCH');

    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden font-sans">
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-black to-blue-950" />
                <motion.div className="absolute w-[50rem] h-[50rem] bg-cyan-600/20 rounded-full blur-[200px]" style={{ left: mousePosition.x - 400, top: mousePosition.y - 400 }} animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
                <motion.div className="absolute w-[40rem] h-[40rem] bg-blue-600/15 rounded-full blur-[180px] top-[10%] right-[10%]" animate={{ scale: [1, 1.4, 1], x: [0, 100, 0], y: [0, -50, 0], rotate: [0, 180, 360] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} />
            </div>

            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} navigate={navigate} />

            <main className="ml-64 relative z-10 p-10">
                {/* Header */}
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold">Welcome back, {user?.first_name || user?.username}!</h1>
                        <p className="text-gray-400">Here's what's happening in the Hub today.</p>
                    </div>
                    <div className="relative flex items-center gap-6">
                        <button onClick={() => setLinkedInPopoverOpen(!isLinkedInPopoverOpen)} className="w-12 h-12 rounded-full border-2 border-cyan-500 bg-purple-800 flex items-center justify-center font-bold text-xl cursor-pointer">
                            {user?.username.charAt(0).toUpperCase()}
                        </button>
                        {isLinkedInPopoverOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute top-16 right-0 w-80 bg-black/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6 z-50 shadow-2xl">
                                <h3 className="font-bold text-lg mb-2 text-white">{user?.first_name || user?.username}</h3>
                                <p className="text-sm text-gray-400 mb-4">Update your LinkedIn profile</p>
                                <div className="flex flex-col gap-4">
                                    <input
                                        type="text"
                                        value={linkedInUrl}
                                        onChange={(e) => setLinkedInUrl(e.target.value)}
                                        placeholder="https://linkedin.com/in/your-profile"
                                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
                                    />
                                    <Button onClick={handleSaveLinkedIn} disabled={isUpdatingLinkedIn} variant="primary" className="w-full">
                                        {isUpdatingLinkedIn ? "Saving..." : "Save"}
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </header>

                {activeSection === 'Dashboard' && (
                    <Feed />
                )}

                {activeSection === 'Essay Portal' && (
                    <motion.section id="essay-portal" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Essay Submission Portal</h2>

                        {/* Active Essays */}
                        {activeEssay.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4 text-white/80">Active Prompts</h3>
                                <div className="grid md:grid-cols-3 gap-6">
                                    {activeEssay.map((prompt) => (
                                        <motion.div key={prompt.id} whileHover={{ y: -5 }} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col">
                                            <span className="text-sm font-semibold text-cyan-400 mb-2">{prompt.category}</span>
                                            <h3 className="text-xl font-semibold mb-3 flex-grow">{prompt.title}</h3>
                                            <p className="text-sm text-gray-400 mb-4">Deadline: {new Date(prompt.deadline).toLocaleDateString()}</p>
                                            {prompt.has_submitted ? (<div className="flex items-center gap-2 text-green-400 font-semibold"><Check size={20} /><span>Submitted</span></div>
                                            ) : (
                                                <Button variant="primary" onClick={() => { setSelectedCompetition(prompt); setIsSubmissionModalOpen(true); }}><UploadCloud size={18} /> Submit Now</Button>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Past Essays */}
                        {pastEssay.length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-white/80">Past Prompts</h3>
                                <div className="grid md:grid-cols-3 gap-6 opacity-60">
                                    {pastEssay.map((prompt) => (
                                        <div key={prompt.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col">
                                            <span className="text-sm font-semibold text-cyan-400 mb-2">{prompt.category}</span>
                                            <h3 className="text-xl font-semibold mb-3 flex-grow">{prompt.title}</h3>
                                            <p className="text-sm text-gray-400 mb-4">Ended: {new Date(prompt.deadline).toLocaleDateString()}</p>
                                            <div className="flex items-center gap-2 text-gray-500 font-semibold">
                                                <span>Closed</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.section>
                )}

                {activeSection === 'Pitch Competitions' && (
                    <motion.section id="pitch-competitions" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Startup Pitch Competitions</h2>

                        {/* Active Pitch */}
                        {activePitch.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-4 text-white/80">Active Competitions</h3>
                                {activePitch.map((comp) => (
                                    <motion.div key={comp.id} whileHover={{ y: -5 }} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-4 flex items-center justify-between">
                                        <div><h3 className="text-xl font-semibold">{comp.title}</h3><p className="text-sm text-gray-400">Submission Deadline: {new Date(comp.deadline).toLocaleDateString()}</p></div>
                                        <div className="flex items-center gap-4">
                                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${comp.status === 'OPEN' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{comp.status}</span>
                                            {comp.has_submitted ? (
                                                <div className="flex items-center gap-2 text-green-400 font-semibold"><Check size={20} /><span>Submitted</span></div>
                                            ) : (
                                                <Button variant="outline" onClick={() => { setSelectedCompetition(comp); setIsSubmissionModalOpen(true); }}>View Brief & Submit <ArrowRight size={18} /></Button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Past Pitch */}
                        {pastPitch.length > 0 && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-white/80">Past Competitions</h3>
                                {pastPitch.map((comp) => (
                                    <div key={comp.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-4 flex items-center justify-between opacity-60">
                                        <div><h3 className="text-xl font-semibold">{comp.title}</h3><p className="text-sm text-gray-400">Ended: {new Date(comp.deadline).toLocaleDateString()}</p></div>
                                        <div className="flex items-center gap-4">
                                            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-gray-500/20 text-gray-400">CLOSED</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.section>
                )}

                {activeSection === 'Events' && (
                    <div className="grid grid-cols-3 gap-8 mb-12">
                        <motion.section id="events" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="col-span-2">
                            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Timeline of Events</h2>
                            <div className="space-y-6">
                                {dashboardData.events.map((event, i) => (
                                    <div key={event.id} className="flex items-start gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="p-2 bg-cyan-500/20 rounded-full">{event.type === "VIRTUAL" ? <Video className="text-cyan-400" /> : <Users className="text-cyan-400" />}</div>
                                            {i < dashboardData.events.length - 1 && <div className="w-px h-16 bg-white/10"></div>}
                                        </div>
                                        <div><p className="font-semibold text-cyan-300">{new Date(event.event_date).toLocaleString()}</p><h3 className="text-lg font-bold">{event.title}</h3><p className="text-gray-400 text-sm">{event.description}</p></div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    </div>
                )}

                {activeSection === 'Research' && (
                    <motion.section id="research" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Research Opportunities</h2>
                        <div className="space-y-4">
                            {dashboardData.research.map((opp) => (
                                <motion.div key={opp.id} whileHover={{ y: -5, scale: 1.02 }} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 cursor-pointer">
                                    <h4 className="font-semibold">{opp.title}</h4><p className="text-sm text-cyan-400">{opp.field}</p>
                                    <div className="flex justify-between items-center mt-2 text-xs text-gray-400"><span>with {opp.professor}</span><span>{opp.spots_available} spots available</span></div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}

                {activeSection === 'Recordings' && (
                    <motion.section id="recordings" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">Session Recordings</h2>
                        <div className="space-y-4">
                            {dashboardData.recordings.map((rec) => (
                                <motion.a key={rec.id} href={rec.video_url} target="_blank" rel="noopener noreferrer" whileHover={{ x: 5 }} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center justify-between cursor-pointer">
                                    <div className="flex items-center gap-4"><Mic className="text-fuchsia-400" /><div><h4 className="font-semibold">{rec.title}</h4><p className="text-sm text-gray-400">{rec.speaker} • {new Date(rec.recording_date).toLocaleDateString()}</p></div></div>
                                    <span className="text-gray-400 text-sm">{rec.duration_minutes} min</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.section>
                )}
            </main>

            {isSubmissionModalOpen && selectedCompetition && (
                <SubmissionModal
                    competition={selectedCompetition}
                    onClose={() => {
                        setIsSubmissionModalOpen(false);
                        setSelectedCompetition(null);
                    }}
                    onSuccess={fetchData}
                />
            )}
        </div>
    );
}