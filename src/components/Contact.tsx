import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

interface ContactProps {
    onOpenChallenge?: () => void;
}

export function Contact({ onOpenChallenge }: ContactProps) {
    return (
        <section id="contact" className="py-20 px-4 bg-charcoal">
            <div className="max-w-4xl mx-auto text-center">
                <motion.h2
                    className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    LET'S CREATE THE FUTURE
                </motion.h2>

                <p className="text-neutral-400 mb-12 text-lg max-w-xl mx-auto">
                    We are always looking for visionary partners. Whether you have a specific project or just a vague idea, let's talk.
                </p>

                <motion.button
                    onClick={onOpenChallenge}
                    className="inline-flex items-center space-x-3 px-8 py-4 bg-white text-black font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors rounded-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span>Start a Project</span>
                    <Mail size={18} />
                </motion.button>

                <div className="mt-20 flex justify-center space-x-10">
                    {/* Social links or other footer content can go here if needed in the future */}
                </div>
            </div>
        </section>
    );
}
