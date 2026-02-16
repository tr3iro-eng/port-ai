import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
    onOpenChallenge: () => void;
}

export function Navbar({ onOpenChallenge }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'WORK', href: '#work', id: '01' },
        { name: 'CHALLENGE US', href: '#', id: '09', action: true },
    ];

    const handleLinkClick = (e: React.MouseEvent, link: typeof navLinks[0]) => {
        if (link.action) {
            e.preventDefault();
            onOpenChallenge();
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <motion.nav
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-lg"
            initial={{ y: -100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className={cn(
                "relative flex items-center justify-between px-4 sm:px-6 py-3 rounded-full transition-all duration-500",
                "bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/50"
            )}>
                {/* Logo Area */}
                <a href="#" className="flex items-center gap-2 group">
                    <img
                        src="/port-ai/logo.png"
                        alt="Kinetic Lab Logo"
                        className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
                    />
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link)}
                            className="text-xs font-mono text-white/60 hover:text-white transition-colors flex items-center gap-1 group"
                        >
                            <span className="text-[10px] text-white/30 opacity-0 group-hover:opacity-100 transition-opacity">[{link.id}]</span>
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white p-1"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="absolute top-full left-0 right-0 mt-2 p-2 mx-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="p-4 text-center text-sm font-mono text-white/80 hover:bg-white/5 rounded-xl transition-colors border border-transparent hover:border-white/5"
                                    onClick={(e) => handleLinkClick(e, link)}
                                >
                                    <span className="text-xs text-white/30 mr-2">{link.id} //</span>
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
