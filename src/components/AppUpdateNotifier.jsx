import React, { useState, useEffect } from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';

const CURRENT_VERSION = '1.2.0';

export default function AppUpdateNotifier() {
    const [hasUpdate, setHasUpdate] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const checkVersion = async () => {
            try {
                const res = await fetch(`/version.json?_t=${Date.now()}`, {
                    cache: 'no-store',
                    headers: { 'Cache-Control': 'no-cache' }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.version && data.version !== CURRENT_VERSION) {
                        setHasUpdate(true);
                    }
                }
            } catch {}
        };

        const interval = setInterval(checkVersion, 45000);
        window.addEventListener('focus', checkVersion);

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready.then(reg => {
                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    if (newWorker) {
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                setHasUpdate(true);
                            }
                        });
                    }
                });
            });
        }

        return () => {
            clearInterval(interval);
            window.removeEventListener('focus', checkVersion);
        };
    }, []);

    const handleApplyUpdate = async () => {
        setIsUpdating(true);
        try {
            if ('serviceWorker' in navigator) {
                const regs = await navigator.serviceWorker.getRegistrations();
                for (const reg of regs) {
                    if (reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
                    await reg.update().catch(() => {});
                }
            }
            if ('caches' in window) {
                const keys = await caches.keys();
                await Promise.all(keys.map(k => caches.delete(k)));
            }
        } catch {}
        setTimeout(() => {
            window.location.replace(window.location.origin + window.location.pathname + '?_updated=' + Date.now());
        }, 300);
    };

    if (!hasUpdate) return null;

    return (
        <aside 
            aria-label="تنبيه تحديث التطبيق"
            className="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900/95 border border-primary/40 text-white p-4 rounded-2xl shadow-2xl backdrop-blur-md flex items-center justify-between gap-4 animate-bounce"
            dir="rtl"
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-white">تحديث جديد متوفر</h4>
                    <p className="text-xs text-slate-300">تم نشر تحسينات جديدة للموقع والكتالوج.</p>
                </div>
            </div>
            <button
                onClick={handleApplyUpdate}
                disabled={isUpdating}
                className="bg-primary hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shrink-0 active:scale-95 shadow-lg"
            >
                <RefreshCw className={`w-3.5 h-3.5 ${isUpdating ? 'animate-spin' : ''}`} />
                {isUpdating ? 'جاري التحديث...' : 'تحديث الآن'}
            </button>
        </aside>
    );
}
