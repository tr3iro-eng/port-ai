import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { ToastType } from './Toast';

interface ChallengeModalProps {
    isOpen: boolean;
    onClose: () => void;
    showToast: (message: string, type: ToastType) => void;
}

type ProjectType = 'Image' | 'Video';
type ProjectStyle = 'Realistic' | 'Influencer' | 'UGC' | 'Cinematic';

export function ChallengeModal({ isOpen, onClose, showToast }: ChallengeModalProps) {
    const [projectType, setProjectType] = useState<ProjectType>('Image');
    const [projectStyle, setProjectStyle] = useState<ProjectStyle>('Realistic');
    const [details, setDetails] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Reset body scroll when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const discordWebhookUrl = "https://discord.com/api/webhooks/1472916015649394791/Vfk9-al6Yrs-GimnejgMG1KDUdaYiRjc8WgsHE8M8IudONVxRMmBbQSDZwonOOPgRWx6";

        const orderData = {
            id: `ORD-${Date.now()}`,
            date: new Date().toLocaleString(),
            type: projectType,
            style: projectStyle,
            details: details,
            contact: contactInfo
        };

        const embed = {
            title: "🚀 New Challenge Received!",
            color: 5763719, // Green-ish color
            fields: [
                { name: "Order ID", value: orderData.id, inline: true },
                { name: "Date", value: orderData.date, inline: true },
                { name: "Project Type", value: orderData.type, inline: true },
                { name: "Visual Style", value: orderData.style, inline: true },
                { name: "Details", value: orderData.details },
                { name: "Contact Info", value: orderData.contact }
            ],
            footer: {
                text: "Kinetic Lab Studio • Automated System"
            },
            timestamp: new Date().toISOString()
        };

        try {
            const response = await fetch(discordWebhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: "Kinetic Bot",
                    embeds: [embed]
                }),
            });

            if (response.ok) {
                // Success
                await new Promise(resolve => setTimeout(resolve, 1000)); // Small delay for UX
                setIsSubmitting(false);
                onClose();
                setDetails('');
                setContactInfo('');
                showToast("Challenge sent successfully. We'll be in touch.", 'success');
            } else {
                throw new Error('Failed to send to Discord');
            }
        } catch (error) {
            console.error("Submission Error:", error);
            setIsSubmitting(false);
            showToast("Failed to send challenge. Please try again.", 'error');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
                    >
                        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl pointer-events-auto flex flex-col max-h-[85vh]">
                            {/* Header */}
                            <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/5">
                                <div>
                                    <h2 className="text-xl md:text-2xl font-light tracking-wide text-white">CHALLENGE US</h2>
                                    <p className="text-white/40 text-xs md:text-sm mt-1 font-mono">Define your vision. We'll build it.</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
                                <form id="challenge-form" onSubmit={handleSubmit} className="space-y-8">

                                    {/* Project Type */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">Project Type</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {(['Image', 'Video'] as ProjectType[]).map((type) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => setProjectType(type)}
                                                    className={cn(
                                                        "p-4 rounded-xl border transition-all duration-300 text-center relative overflow-hidden group hover:scale-[1.02] active:scale-[0.98]",
                                                        projectType === type
                                                            ? "bg-white/10 text-white border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                                            : "bg-transparent text-white/40 border-white/5 hover:border-white/20 hover:text-white/80"
                                                    )}
                                                >
                                                    <span className="relative z-10 font-light tracking-wide text-sm">{type}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Style */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">Visual Style</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                            {(['Realistic', 'Influencer', 'UGC', 'Cinematic'] as ProjectStyle[]).map((style) => (
                                                <button
                                                    key={style}
                                                    type="button"
                                                    onClick={() => setProjectStyle(style)}
                                                    className={cn(
                                                        "py-2 px-2 rounded-lg border text-xs transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]",
                                                        projectStyle === style
                                                            ? "bg-white/10 text-white border-white/40"
                                                            : "bg-transparent text-white/40 border-white/5 hover:border-white/20 hover:text-white/80"
                                                    )}
                                                >
                                                    {style}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">Project Details</label>
                                        <textarea
                                            value={details}
                                            onChange={(e) => setDetails(e.target.value)}
                                            placeholder="Describe your project requirements..."
                                            className="w-full h-32 bg-white/5 border border-white/5 rounded-xl p-4 text-white text-sm placeholder:text-white/10 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all resize-none"
                                            required
                                        />
                                    </div>

                                    {/* Contact */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">Contact Info</label>
                                        <textarea
                                            value={contactInfo}
                                            onChange={(e) => setContactInfo(e.target.value)}
                                            placeholder="Where should we send the results?"
                                            className="w-full h-20 bg-white/5 border border-white/5 rounded-xl p-4 text-white text-sm placeholder:text-white/10 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all resize-none"
                                            required
                                        />
                                    </div>
                                </form>
                            </div>

                            {/* Footer */}
                            <div className="p-6 md:p-8 border-t border-white/5 bg-white/5 backdrop-blur-3xl">
                                <button
                                    type="submit"
                                    form="challenge-form"
                                    disabled={isSubmitting}
                                    className={cn(
                                        "w-full py-3 rounded-xl font-medium tracking-widest uppercase text-xs flex items-center justify-center gap-3 transition-all duration-300 border",
                                        isSubmitting
                                            ? "bg-white/5 border-white/10 text-white/40 cursor-wait"
                                            : "bg-transparent border-white/20 text-white hover:bg-white hover:text-black hover:border-white hover:scale-[1.02] active:scale-[0.98]"
                                    )}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin" size={16} />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Initialize Project</span>
                                            <Send size={14} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
