import { useState, useEffect } from "react";
import CreatePost from "./CreatePost";
import PostItem from "./PostItem";
import api from "../../api";
import { motion } from "framer-motion";

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const res = await api.get("/api/posts/");
            setPosts(res.data);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
        >
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                Community Feed
            </h2>

            <CreatePost onPostCreated={fetchPosts} />

            {loading ? (
                <div className="text-center text-gray-400 py-10">Loading updates...</div>
            ) : (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <PostItem key={post.id} post={post} onUpdate={fetchPosts} />
                    ))}
                    {posts.length === 0 && (
                        <div className="text-center text-gray-500 py-10">
                            No posts yet. Be the first to share something!
                        </div>
                    )}
                </div>
            )}
        </motion.div>
    );
}
