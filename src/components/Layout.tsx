import React from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-obsidian text-white selection:bg-white selection:text-obsidian">
            <Navbar />
            <main className="w-full">
                {children}
            </main>
            <footer className="py-12 border-t border-white/10 text-center text-neutral-500 text-xs tracking-widest uppercase">
                <p>&copy; {new Date().getFullYear()} Kinetic Lab Studio. All systems nominal.</p>
            </footer>
        </div>
    );
}
