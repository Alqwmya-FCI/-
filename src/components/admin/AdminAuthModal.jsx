import React, { useState } from 'react';
import { Lock, KeyRound, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function AdminAuthModal({ onAuthenticated }) {
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (pin === '2026' || pin === '0244') {
            sessionStorage.setItem('ax_admin_auth', 'true');
            onAuthenticated();
        } else {
            setError(true);
            setPin('');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4" dir="rtl">
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-8 h-8" />
                </div>

                <h2 className="text-2xl font-black text-white mb-2">لوحة إدارة مصنع القومية</h2>
                <p className="text-xs text-slate-400 mb-6">منطقة آمنة ومخصصة لإدارة الكتالوج ومتابعة الطلبات المباشرة.</p>

                {error && (
                    <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs py-2.5 px-4 rounded-xl mb-5 flex items-center justify-center gap-2 font-bold">
                        <ShieldAlert className="w-4 h-4" />
                        رمز الدخول غير صحيح، يرجى المحاولة ثانية.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type="password"
                            maxLength={6}
                            value={pin}
                            onChange={(e) => {
                                setPin(e.target.value);
                                setError(false);
                            }}
                            placeholder="أدخل رمز الدخول (PIN)..."
                            className="w-full bg-slate-800/80 border border-white/10 rounded-2xl px-5 py-3.5 text-center text-xl font-mono tracking-widest text-white placeholder:text-slate-500 placeholder:text-sm placeholder:tracking-normal focus:outline-none focus:border-primary transition-colors"
                            autoFocus
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!pin}
                        className="w-full bg-primary hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black py-3.5 px-6 rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                    >
                        <KeyRound className="w-4 h-4" />
                        تسجيل الدخول للوحة التحكم
                    </button>
                </form>
            </div>
        </div>
    );
}
