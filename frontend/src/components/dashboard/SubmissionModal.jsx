import { motion } from "framer-motion";
import Button from "../ui/button";
import { useState } from "react";
import api from "../../api";

export default function SubmissionModal({ competition, onClose, onSuccess }) {
    const [submissionText, setSubmissionText] = useState("");
    const [submissionFile, setSubmissionFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (!submissionFile) {
                alert("Please select a file to upload.");
                setIsSubmitting(false);
                return;
            }
            const formData = new FormData();
            formData.append('competition', competition.id);
            formData.append('submission_text', submissionText);
            if (submissionFile) {
                formData.append('submission_file', submissionFile);
            }

            await api.post("/api/submissions/", formData);

            alert("Submission successful! You'll receive a confirmation email shortly.");
            onSuccess();
            onClose();
        } catch (error) {
            console.error("Failed to submit:", error);
            let errorMessage = "Failed to submit. Please try again.";
            if (error.response && error.response.data) {
                // Try to extract a specific error message
                const data = error.response.data;
                if (typeof data === 'string') {
                    errorMessage = data;
                } else if (typeof data === 'object') {
                    // Join values if it's a dictionary of errors (e.g. DRF validation errors)
                    errorMessage = Object.values(data).flat().join('\n');
                }
            }
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
                <h2 className="text-2xl font-bold mb-2">Submit to {competition.title}</h2>
                <p className="text-gray-400 mb-6">Category: {competition.category}</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Submission Text (Optional)</label>
                        <textarea
                            value={submissionText}
                            onChange={(e) => setSubmissionText(e.target.value)}
                            placeholder="Enter your submission text, notes, or description..."
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all text-white placeholder-gray-500 h-32"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2">Upload File <span className="text-red-400">*</span></label>
                        <div className="relative">
                            <input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file && file.size > 5 * 1024 * 1024) {
                                        alert("File size exceeds 5MB limit. Please choose a smaller file.");
                                        e.target.value = "";
                                        setSubmissionFile(null);
                                    } else {
                                        setSubmissionFile(file || null);
                                    }
                                }}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-700"
                            />
                        </div>
                        {submissionFile && <p className="text-sm text-cyan-400 mt-2">Selected: {submissionFile.name} ({(submissionFile.size / (1024 * 1024)).toFixed(2)}MB)</p>}
                        <p className="text-sm text-gray-500 mt-1">Max file size: 5MB</p>
                    </div>

                    <div className="flex gap-4 justify-end">
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            className="px-6"
                            type="button"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6"
                        >
                            {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
