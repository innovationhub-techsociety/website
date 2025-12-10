import { useState } from "react";
import { Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import api from "../../api";

export default function CommentSection({ postId, comments, onCommentAdded }) {
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setLoading(true);
        try {
            await api.post("/api/comments/", {
                post: postId,
                content: newComment
            });
            setNewComment("");
            if (onCommentAdded) onCommentAdded();
        } catch (error) {
            console.error("Failed to add comment:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4 pt-4 border-t border-white/10">
            <div className="space-y-4 mb-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                        {comment.user_linkedin ? (
                            <a href={comment.user_linkedin} target="_blank" rel="noopener noreferrer" className="block w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold shrink-0 hover:ring-2 hover:ring-purple-400 transition-all">
                                {comment.user.charAt(0).toUpperCase()}
                            </a>
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold shrink-0">
                                {comment.user.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="bg-white/5 rounded-lg p-3 flex-grow">
                            <div className="flex justify-between items-start mb-1">
                                {comment.user_linkedin ? (
                                    <a href={comment.user_linkedin} target="_blank" rel="noopener noreferrer" className="font-semibold text-sm hover:text-purple-400 transition-colors flex items-center gap-1.5">
                                        {comment.user}
                                        <span className="text-[9px] bg-blue-600/30 text-blue-300 px-1 py-px rounded border border-blue-500/30">IN</span>
                                    </a>
                                ) : (
                                    <span className="font-semibold text-sm">{comment.user}</span>
                                )}
                                <span className="text-xs text-gray-400">{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                            </div>
                            <p className="text-sm text-gray-300">{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-grow bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
                <button
                    type="submit"
                    disabled={loading || !newComment.trim()}
                    className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 disabled:opacity-50 transition-colors"
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
}
