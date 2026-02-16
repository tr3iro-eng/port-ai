import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { ChallengeModal } from './ChallengeModal';
import { Toast, ToastType } from './Toast';


interface LayoutProps {
    children: React.ReactNode;
    isChallengeOpen: boolean;
    setIsChallengeOpen: (isOpen: boolean) => void;
    onOpenChallenge: () => void;
}

export function Layout({ children, isChallengeOpen, setIsChallengeOpen, onOpenChallenge }: LayoutProps) {
    const [toastState, setToastState] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
        message: '',
        type: 'success',
        isVisible: false
    });

    const showToast = (message: string, type: ToastType = 'success') => {
        setToastState({ message, type, isVisible: true });
    };

    const closeToast = () => {
        setToastState(prev => ({ ...prev, isVisible: false }));
    };

    return (
        <div className="min-h-screen bg-obsidian text-white selection:bg-white selection:text-obsidian relative">
            <Navbar onOpenChallenge={onOpenChallenge} />
            <main className="w-full">
                {children}
            </main>
            <footer className="py-12 border-t border-white/10 text-center text-neutral-500 text-xs tracking-widest uppercase">
                <p>&copy; {new Date().getFullYear()} Kinetic Lab Studio. All systems nominal.</p>
            </footer>

            <ChallengeModal
                isOpen={isChallengeOpen}
                onClose={() => setIsChallengeOpen(false)}
                showToast={showToast}
            />

            <Toast
                message={toastState.message}
                type={toastState.type}
                isVisible={toastState.isVisible}
                onClose={closeToast}
            />
        </div>
    );
}
