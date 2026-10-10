import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, BarChart3, Layers, ArrowLeft, LogOut, ShieldCheck } from 'lucide-react';
import AdminAuthModal from '../components/admin/AdminAuthModal';
import AdminOrdersTab from '../components/admin/AdminOrdersTab';
import AdminStatsTab from '../components/admin/AdminStatsTab';
import AdminCatalogTab from '../components/admin/AdminCatalogTab';
import { useSEO } from '../hooks/useSEO';

export default function AdminDashboardPage() {
    const [isAuthed, setIsAuthed] = useState(false);
    const [activeTab, setActiveTab] = useState('orders');

    useSEO({
        title: 'لوحة التحكم وإدارة المصنع | مصنع القومية',
        description: 'إدارة طلبات الأسمنت والإنترلوك ومتابعة إحصائيات الزوار.',
        url: 'https://alqwmya.com/admin'
    });

    useEffect(() => {
        if (sessionStorage.getItem('ax_admin_auth') === 'true') {
            setIsAuthed(true);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem('ax_admin_auth');
        setIsAuthed(false);
    };

    if (!isAuthed) {
        return <AdminAuthModal onAuthenticated={() => setIsAuthed(true)} />;
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans" dir="rtl">
            <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white p-1 overflow-hidden shrink-0 shadow">
                            <img src="/logo-white.png" alt="القومية" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-base font-black text-white">لوحة تحكم مصنع القومية</h1>
                                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3" />
                                    مؤمّن
                                </span>
                            </div>
                            <span className="text-[11px] text-slate-400">حساب عبد الشافي - إدارة الكتالوج والطلبات</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Link
                            to="/"
                            className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-4 py-2 rounded-full text-xs font-bold transition-all border border-white/10 flex items-center gap-1.5"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            الموقع الرئيسي
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-full transition-colors"
                            title="تسجيل الخروج"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-2 border-t border-white/5 py-2 overflow-x-auto hide-scrollbar">
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                            activeTab === 'orders'
                                ? 'bg-primary text-slate-950 font-black shadow-md'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        طلبات التسعير والشراء الحية
                    </button>

                    <button
                        onClick={() => setActiveTab('stats')}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                            activeTab === 'stats'
                                ? 'bg-primary text-slate-950 font-black shadow-md'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <BarChart3 className="w-3.5 h-3.5" />
                        الزيارات والمنتجات الأكثر مشاهدة
                    </button>

                    <button
                        onClick={() => setActiveTab('catalog')}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                            activeTab === 'catalog'
                                ? 'bg-primary text-slate-950 font-black shadow-md'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        <Layers className="w-3.5 h-3.5" />
                        إدارة المنتجات والصور المتعددة
                    </button>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
                {activeTab === 'orders' && <AdminOrdersTab />}
                {activeTab === 'stats' && <AdminStatsTab />}
                {activeTab === 'catalog' && <AdminCatalogTab />}
            </main>
        </div>
    );
}
