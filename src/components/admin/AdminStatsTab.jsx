import React, { useState, useEffect } from 'react';
import { Users, Eye, Smartphone, Monitor, TrendingUp, Award } from 'lucide-react';

const SUPABASE_URL = 'https://yrbvzxbawdjfafjieyff.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyYnZ6eGJhd2RqZmFmamlleWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5ODExNzksImV4cCI6MjA5NzU1NzE3OX0.viV6mpDuDtaJJpdWHzWffd44RhAbFY5VwLbNdwOode8';

const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Accept': 'application/json'
};

export default function AdminStatsTab() {
    const [stats, setStats] = useState({
        totalVisits: 0,
        todayVisits: 0,
        mobilePercent: 0,
        desktopPercent: 0,
        topProducts: []
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const today = new Date().toISOString().split('T')[0];

                const [visitsRes, todayRes, productsRes] = await Promise.all([
                    fetch(`${SUPABASE_URL}/rest/v1/ax_web_visits?select=id,device_type`, { headers }),
                    fetch(`${SUPABASE_URL}/rest/v1/ax_web_visits?select=id&created_at=gte.${today}T00:00:00Z`, { headers }),
                    fetch(`${SUPABASE_URL}/rest/v1/ax_web_products?select=id,name,category_id,view_count,images&order=view_count.desc&limit=10`, { headers })
                ]);

                const visits = visitsRes.ok ? await visitsRes.json() : [];
                const todayVisits = todayRes.ok ? await todayRes.json() : [];
                const products = productsRes.ok ? await productsRes.json() : [];

                const total = visits.length;
                const mobileCount = visits.filter(v => v.device_type === 'mobile').length;
                const mobilePct = total > 0 ? Math.round((mobileCount / total) * 100) : 65;
                const desktopPct = 100 - mobilePct;

                setStats({
                    totalVisits: total,
                    todayVisits: todayVisits.length,
                    mobilePercent: mobilePct,
                    desktopPercent: desktopPct,
                    topProducts: products
                });
            } catch {}
            setIsLoading(false);
        };

        fetchAnalytics();
    }, []);

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-slate-900/60 border border-white/5 p-5 rounded-2xl animate-pulse h-28" />
                    ))}
                </div>
                <div className="bg-slate-900/60 border border-white/5 p-6 rounded-3xl animate-pulse h-96" />
            </div>
        );
    }

    const maxViews = Math.max(...stats.topProducts.map(p => p.view_count || 0), 1);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900/80 border border-white/10 p-5 rounded-3xl shadow-xl flex items-center justify-between">
                    <div>
                        <span className="text-xs font-bold text-slate-400 block mb-1">زيارات اليوم</span>
                        <div className="text-3xl font-black text-white font-mono">+{stats.todayVisits}</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-slate-900/80 border border-white/10 p-5 rounded-3xl shadow-xl flex items-center justify-between">
                    <div>
                        <span className="text-xs font-bold text-slate-400 block mb-1">إجمالي الزيارات المسجلة</span>
                        <div className="text-3xl font-black text-white font-mono">{stats.totalVisits}</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                        <Users className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-slate-900/80 border border-white/10 p-5 rounded-3xl shadow-xl flex items-center justify-between">
                    <div>
                        <span className="text-xs font-bold text-slate-400 block mb-1">نسبة زوار الموبايل</span>
                        <div className="text-3xl font-black text-white font-mono">{stats.mobilePercent}%</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                        <Smartphone className="w-6 h-6" />
                    </div>
                </div>

                <div className="bg-slate-900/80 border border-white/10 p-5 rounded-3xl shadow-xl flex items-center justify-between">
                    <div>
                        <span className="text-xs font-bold text-slate-400 block mb-1">نسبة زوار الكمبيوتر</span>
                        <div className="text-3xl font-black text-white font-mono">{stats.desktopPercent}%</div>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                        <Monitor className="w-6 h-6" />
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                            <Award className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-white">المنتجات الأكثر مشاهدة وطلباً</h3>
                            <p className="text-xs text-slate-400">ترتيب المنتجات بناءً على اهتمام وتصفح زوار المصنع.</p>
                        </div>
                    </div>
                    <span className="text-xs font-bold text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                        أفضل 10 منتجات
                    </span>
                </div>

                {stats.topProducts.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-sm">
                        لا توجد إحصائيات مشاهدات مسجلة بعد.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {stats.topProducts.map((prod, idx) => {
                            const count = prod.view_count || 0;
                            const pct = Math.max(Math.round((count / maxViews) * 100), 5);
                            return (
                                <div key={prod.id} className="bg-slate-800/40 border border-white/5 p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3.5 min-w-0 md:w-1/3">
                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-xs shrink-0 ${
                                            idx === 0 ? 'bg-amber-400 text-slate-950 shadow-md' :
                                            idx === 1 ? 'bg-slate-300 text-slate-950' :
                                            idx === 2 ? 'bg-amber-700 text-white' :
                                            'bg-white/5 text-slate-400'
                                        }`}>
                                            #{idx + 1}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-sm font-bold text-white truncate">{prod.name}</h4>
                                            <span className="text-[11px] text-slate-400 font-mono">ID: {prod.id}</span>
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0 px-2">
                                        <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0 md:w-32 justify-end">
                                        <Eye className="w-4 h-4 text-primary" />
                                        <span className="text-sm font-mono font-black text-white">{count.toLocaleString()}</span>
                                        <span className="text-xs text-slate-400">مشاهدة</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
