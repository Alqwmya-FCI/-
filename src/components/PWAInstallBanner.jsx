import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function PWAInstallBanner() {
    const [installPrompt, setInstallPrompt] = useState(null);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        if (window.__deferredPwaPrompt) {
            setInstallPrompt(window.__deferredPwaPrompt);
        }

        const handleReady = () => {
            if (window.__deferredPwaPrompt) {
                setInstallPrompt(window.__deferredPwaPrompt);
            }
        };

        window.addEventListener('ax-pwa-ready', handleReady);
        window.addEventListener('appinstalled', () => {
            setInstallPrompt(null);
        });

        return () => {
            window.removeEventListener('ax-pwa-ready', handleReady);
        };
    }, []);

    const handleInstall = async () => {
        if (!installPrompt) return;
        installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;
        if (outcome === 'accepted') {
            setInstallPrompt(null);
            window.__deferredPwaPrompt = null;
        }
    };

    if (!installPrompt || dismissed) return null;

    return (
        <aside 
            aria-label="تثبيت تطبيق القومية"
            className="fixed bottom-6 left-6 z-50 bg-slate-900/95 border border-white/10 text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3.5 max-w-sm"
            dir="rtl"
        >
            <div className="w-10 h-10 rounded-xl bg-white p-1 shrink-0 overflow-hidden shadow">
                <img src="/logo-white.png" alt="القومية" className="w-full h-full object-contain" />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-white truncate">تطبيق القومية على هاتفك</h4>
                <p className="text-[11px] text-slate-400">تصفح المنتجات واطلب بدون إنترنت.</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
                <button
                    onClick={handleInstall}
                    className="bg-primary hover:bg-emerald-400 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 active:scale-95 shadow-md"
                >
                    <Download className="w-3.5 h-3.5" />
                    تثبيت
                </button>
                <button
                    onClick={() => setDismissed(true)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                    aria-label="إغلاق"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </aside>
    );
}
