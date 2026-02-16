import heroVideo from '../assets/assets/ComfyUI_00001_.mp4';
import { motion } from 'framer-motion';

export function Hero() {
    return (
        <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50 filter brightness-50 contrast-125 saturate-0"
            >
                <source src={heroVideo} type="video/mp4" />
            </video>

            {/* Dynamic Mesh Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-10" />
            <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

            {/* Content */}
            <div className="relative z-20 text-center px-4 w-full max-w-7xl mx-auto flex flex-col items-center">

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative mb-8"
                >
                    <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/0 leading-tight select-none">
                        IMAGINE
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white/10 leading-tight blur-lg animate-pulse">
                            IMAGINE
                        </h1>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="flex items-center gap-4 text-xs font-mono text-green-500/80 tracking-widest border border-green-500/20 bg-green-500/5 px-4 py-1 rounded-full uppercase">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        Kinetic Lab Studio
                    </div>

                    <p className="text-lg md:text-xl text-neutral-400 max-w-xl font-light tracking-wide text-balance leading-relaxed">
                        Redefining visual storytelling through <span className="text-white font-normal">generative synthesis</span> and neural rendering.
                    </p>
                </motion.div>
            </div>

            {/* Scroll Indicator - HUD Style */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <span className="text-[10px] font-mono text-white/30 tracking-widest">SCROLL_TO_INIT</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
            </motion.div>
        </section>
    );
}
