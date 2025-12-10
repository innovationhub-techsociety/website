import { useState } from "react";
import { Heart, MessageCircle, FileText, Download } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import api from "../../api";
import CommentSection from "./CommentSection";

export default function PostItem({ post, onUpdate }) {
    const [showComments, setShowComments] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);

    const handleLike = async () => {
        if (likeLoading) return;
        setLikeLoading(true);
        try {
            await api.post(`/api/posts/${post.id}/like/`);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error("Failed to toggle like:", error);
        } finally {
            setLikeLoading(false);
        }
    };

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-4">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    {post.user_linkedin ? (
                        <a href={post.user_linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                            <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-lg group-hover:ring-2 group-hover:ring-cyan-400 transition-all">
                                {post.user.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h4 className="font-bold group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                                    {post.user}
                                    <span className="text-[10px] bg-blue-600/30 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/30">IN</span>
                                </h4>
                                <p className="text-sm text-gray-400">
                                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                                </p>
                            </div>
                        </a>
                    ) : (
                        <>
                            <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-lg">
                                {post.user.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h4 className="font-bold">{post.user}</h4>
                                <p className="text-sm text-gray-400">
                                    {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <p className="text-gray-200 mb-4 whitespace-pre-wrap">{post.content}</p>

            {post.file && (
                <a
                    href={post.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-black/30 border border-white/10 rounded-xl p-3 mb-4 hover:bg-black/50 transition-colors group"
                >
                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                        <FileText size={24} />
                    </div>
                    <div className="flex-grow overflow-hidden">
                        <p className="text-sm font-medium truncate text-purple-300">Attached File</p>
                        <p className="text-xs text-gray-500">Click to view or download</p>
                    </div>
                    <Download size={20} className="text-gray-400 group-hover:text-white" />
                </a>
            )}

            <div className="flex items-center gap-6 text-sm font-medium border-t border-white/10 pt-4">
                <button
                    onClick={handleLike}
                    disabled={likeLoading}
                    className={`flex items-center gap-2 transition-colors ${post.is_liked ? "text-pink-500" : "text-gray-400 hover:text-pink-400"}`}
                >
                    <Heart size={20} fill={post.is_liked ? "currentColor" : "none"} />
                    <span>{post.likes_count}</span>
                </button>
                <button
                    onClick={() => setShowComments(!showComments)}
                    className={`flex items-center gap-2 transition-colors ${showComments ? "text-cyan-400" : "text-gray-400 hover:text-cyan-400"}`}
                >
                    <MessageCircle size={20} />
                    <span>{post.comments ? post.comments.length : 0}</span>
                </button>
            </div>

            {showComments && (
                <CommentSection
                    postId={post.id}
                    comments={post.comments || []}
                    onCommentAdded={onUpdate}
                />
            )}
        </div>
    );
}
