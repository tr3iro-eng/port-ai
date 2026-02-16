import { useState, useEffect } from 'react';

export function HUD() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-40 select-none overflow-hidden">
            {/* Top Left Bracket */}
            <div className="absolute top-8 left-8 w-64 h-64 border-l-2 border-t-2 border-white/20 rounded-tl-lg" />

            {/* Top Right Bracket */}
            <div className="absolute top-8 right-8 w-64 h-64 border-r-2 border-t-2 border-white/20 rounded-tr-lg" />

            {/* Bottom Left Bracket */}
            <div className="absolute bottom-8 left-8 w-64 h-64 border-l-2 border-b-2 border-white/20 rounded-bl-lg" />

            {/* Bottom Right Bracket */}
            <div className="absolute bottom-8 right-8 w-64 h-64 border-r-2 border-b-2 border-white/20 rounded-br-lg" />

            {/* System Status - Top Left */}
            <div className="absolute top-12 left-12 font-mono text-xs text-white/40 space-y-1">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>SYSTEM_ONLINE</span>
                </div>
                <div>ID: KINETIC_LAB_V1.0</div>
                <div>SECURE_CONNECTION</div>
            </div>

            {/* Time Code - Bottom Left */}
            <div className="absolute bottom-12 left-12 font-mono text-xs text-white/40">
                <div>LOC: EARTH_SOL_3</div>
                <div className="text-xl text-white/80">{formatTime(time)}</div>
            </div>

            {/* Recording Indicator - Top Right */}
            <div className="absolute top-12 right-12 flex items-center gap-2 font-mono text-xs text-red-500/80">
                <span className="animate-pulse">REC</span>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </div>

            {/* Grid Lines - Subtle Background */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                    backgroundSize: '100px 100px'
                }}
            />
        </div>
    );
}
