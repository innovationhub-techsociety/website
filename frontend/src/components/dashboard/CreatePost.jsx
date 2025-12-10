import { useState, useRef } from "react";
import { UploadCloud, X, Send } from "lucide-react";
import Button from "../ui/Button";
import api from "../../api";

export default function CreatePost({ onPostCreated }) {
    const [content, setContent] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) {
                setError("File size exceeds 5MB limit.");
                return;
            }
            setFile(selectedFile);
            setError(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim() && !file) return;

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("content", content);
        if (file) {
            formData.append("file", file);
        }

        try {
            await api.post("/api/posts/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setContent("");
            setFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            if (onPostCreated) onPostCreated();
        } catch (err) {
            console.error("Failed to create post:", err);
            setError("Failed to create post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                    placeholder="Share something with the community..."
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                {file && (
                    <div className="flex items-center gap-2 mt-4 bg-white/5 p-2 rounded-lg w-fit">
                        <span className="text-sm text-cyan-400 truncate max-w-[200px]">{file.name}</span>
                        <button
                            type="button"
                            onClick={() => {
                                setFile(null);
                                if (fileInputRef.current) fileInputRef.current.value = "";
                            }}
                            className="text-gray-400 hover:text-white"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-4">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            id="post-file-upload"
                        />
                        <label
                            htmlFor="post-file-upload"
                            className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors text-sm"
                        >
                            <UploadCloud size={20} />
                            <span>Attach file (max 5MB)</span>
                        </label>
                    </div>
                    <Button type="submit" disabled={loading || (!content.trim() && !file)} variant="primary">
                        {loading ? "Posting..." : <><Send size={18} /> Post</>}
                    </Button>
                </div>
            </form>
        </div>
    );
}
