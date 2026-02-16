import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Helper to get assets
// In a real build, we'd use import.meta.glob. For now, we'll list the ones we saw or try to discover them.
// Since we can't rely on Node.js fs at runtime in browser without build-time injection, 
// we'll assume a list or use the glob pattern if Vite supports it (it does).

export function Gallery() {
    const [assets, setAssets] = useState<string[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
        // Dynamically import all images and videos from src/assets
        const modules = import.meta.glob('../assets/assets/*.*', { eager: true, query: '?url', import: 'default' });

        // Convert the modules object to an array of URLs
        // We filter for common media types to be safe
        const loadedAssets = Object.values(modules).filter((url: unknown): url is string => {
            return typeof url === 'string' && /\.(png|jpe?g|gif|mp4|webm)$/i.test(url);
        });

        setAssets(loadedAssets);
    }, []);

    const showNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % assets.length));
    }, [assets.length]);

    const showPrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + assets.length) % assets.length));
    }, [assets.length]);

    useEffect(() => {
        if (selectedIndex === null) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'Escape') setSelectedIndex(null);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, showNext, showPrev]);

    const isVideo = (path: string) => path.endsWith('.mp4');
    const selectedAsset = selectedIndex !== null ? assets[selectedIndex] : null;

    return (
        <section className="py-20 px-4 max-w-7xl mx-auto" id="work">
            <div className="mb-12">
                <h2 className="text-sm font-mono text-neutral-500 mb-4 ml-1">LATEST_WORK_2026</h2>
                <h3 className="text-3xl md:text-5xl font-bold">Selected Works</h3>
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {assets.map((src, index) => {
                    const filename = src.split('/').pop() || 'Unknown';
                    const isVid = isVideo(src);

                    return (
                        <motion.div
                            key={src}
                            className="break-inside-avoid relative group overflow-hidden cursor-pointer mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "200px" }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setSelectedIndex(index)}
                        >
                            {/* Glass Container with Tech Border */}
                            <div className="relative rounded-sm border border-white/10 bg-black/20 backdrop-blur-sm transition-all duration-500 group-hover:border-white/40 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">

                                {/* Corner Brackets - Uses utility class we added */}
                                <div className="absolute inset-0 pointer-events-none tech-border-corner opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                                {/* Media Content */}
                                <div className="relative overflow-hidden">
                                    {isVid ? (
                                        <video
                                            src={src}
                                            className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110"
                                            muted
                                            loop
                                            playsInline
                                            onMouseOver={e => e.currentTarget.play()}
                                            onMouseOut={e => e.currentTarget.pause()}
                                        />
                                    ) : (
                                        <img
                                            src={src}
                                            alt={filename}
                                            className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110"
                                            loading="lazy"
                                        />
                                    )}

                                    {/* Scanline Overlay on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent bg-[length:100%_4px] opacity-0 group-hover:opacity-100 animate-scan pointer-events-none z-10" />
                                </div>

                                {/* Metadata Footer */}
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 backdrop-blur-md border-t border-white/10 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider truncate max-w-[150px]">
                                            ASSET_{String(index + 1).padStart(3, '0')}
                                        </span>
                                        <span className="text-[8px] font-mono text-green-500/80">
                                            {isVid ? 'MP4 // VIDEO_SEQ' : 'PNG // STATIC_IMG'}
                                        </span>
                                    </div>
                                    <div className="text-[10px] font-mono text-white/30">
                                        #{String(index + 1).padStart(3, '0')}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedAsset && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
                        onClick={() => setSelectedIndex(null)}
                    >
                        <button
                            className="absolute top-6 right-6 z-50 text-white/70 hover:text-white transition-colors bg-black/20 backdrop-blur-sm p-2 rounded-full"
                            onClick={() => setSelectedIndex(null)}
                        >
                            <X size={32} />
                        </button>

                        <button
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white/50 hover:text-white transition-colors p-4 hover:bg-white/10 rounded-full"
                            onClick={showPrev}
                        >
                            <ChevronLeft size={48} />
                        </button>

                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white/50 hover:text-white transition-colors p-4 hover:bg-white/10 rounded-full"
                            onClick={showNext}
                        >
                            <ChevronRight size={48} />
                        </button>

                        <div
                            className="relative w-full h-full flex items-center justify-center p-4 md:p-20"
                            onClick={e => e.stopPropagation()}
                        >
                            <motion.div
                                key={selectedAsset}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.8}
                                onDragEnd={(_, { offset, velocity }) => {
                                    const swipe = offset.x;
                                    if (swipe < -50 || velocity.x < -500) {
                                        showNext();
                                    } else if (swipe > 50 || velocity.x > 500) {
                                        showPrev();
                                    }
                                }}
                            >
                                {isVideo(selectedAsset) ? (
                                    <video
                                        src={selectedAsset}
                                        className="max-w-full max-h-full w-full h-full object-contain pointer-events-none"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    />
                                ) : (
                                    <img
                                        src={selectedAsset}
                                        alt="Full view"
                                        className="max-w-full max-h-full w-full h-full object-contain pointer-events-none select-none"
                                    />
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
