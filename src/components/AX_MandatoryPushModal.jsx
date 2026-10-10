import React, { useState, useEffect } from 'react';
import { Bell, Check, X } from 'lucide-react';
import { playOrderChime } from '../utils/audioChime';

export default function AX_MandatoryPushModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubscribing, setIsSubscribing] = useState(false);

    useEffect(() => {
        if (!('Notification' in window)) return;

        const hasPrompted = localStorage.getItem('ax_push_permission_prompted');
        if (Notification.permission === 'default' && !hasPrompted) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleEnable = async () => {
        setIsSubscribing(true);
        try {
            const permission = await Notification.requestPermission();
            localStorage.setItem('ax_push_permission_prompted', 'true');
            if (permission === 'granted') {
                playOrderChime();
                if ('serviceWorker' in navigator) {
                    const reg = await navigator.serviceWorker.ready;
                    reg.showNotification('مصنع القومية للصناعات الأسمنتية', {
                        body: 'تم تفعيل التنبيهات الفورية بنجاح! ستصلك أحدث الأسعار والعروض.',
                        icon: '/logo-white.png',
                        badge: '/badge-mono.png',
                        vibrate: [300, 150, 300, 150, 300],
                        dir: 'rtl'
                    });
                }
            }
        } catch {}
        setIsSubscribing(false);
        setIsOpen(false);
    };

    const handleDismiss = () => {
        localStorage.setItem('ax_push_permission_prompted', 'true');
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
            dir="rtl"
        >
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative text-center">
                <button
                    onClick={handleDismiss}
                    className="absolute top-4 left-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="w-16 h-16 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mx-auto mb-5 shadow-inner">
                    <Bell className="w-8 h-8 animate-bounce" />
                </div>

                <h3 className="text-xl md:text-2xl font-black text-white mb-2">تفعيل الإشعارات الفورية</h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    فعّل إشعارات الويب لتصلك تنبيهات طلباتك، عروض المصنع، ومتابعة حالة التوريد مباشرة على هاتفك أو جهازك.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={handleEnable}
                        disabled={isSubscribing}
                        className="bg-primary hover:bg-emerald-400 text-slate-950 px-6 py-3 rounded-full text-sm font-black transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/25 active:scale-95"
                    >
                        <Check className="w-4 h-4" />
                        {isSubscribing ? 'جاري التفعيل...' : 'تفعيل الإشعارات الآن'}
                    </button>
                    <button
                        onClick={handleDismiss}
                        className="bg-white/5 hover:bg-white/10 text-slate-300 px-5 py-3 rounded-full text-sm font-bold transition-all border border-white/10"
                    >
                        لاحقاً
                    </button>
                </div>
            </div>
        </div>
    );
}
