import React, { useState, useEffect } from 'react';
import { ShoppingCart, Phone, MessageSquare, MapPin, ExternalLink, CheckCircle, Clock, Trash2, Volume2, AlertCircle } from 'lucide-react';
import { playOrderChime } from '../../utils/audioChime';

const SUPABASE_URL = 'https://yrbvzxbawdjfafjieyff.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyYnZ6eGJhd2RqZmFmamlleWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5ODExNzksImV4cCI6MjA5NzU1NzE3OX0.viV6mpDuDtaJJpdWHzWffd44RhAbFY5VwLbNdwOode8';

const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export default function AdminOrdersTab() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const fetchOrders = async () => {
        try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/ax_web_orders?select=*&order=created_at.desc&limit=50`, { headers });
            if (res.ok) {
                const data = await res.json();
                setOrders(prev => {
                    if (prev.length > 0 && data.length > prev.length) {
                        if (soundEnabled) playOrderChime();
                    }
                    return data;
                });
            }
        } catch {}
        setIsLoading(false);
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 8000);
        return () => clearInterval(interval);
    }, [soundEnabled]);

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            await fetch(`${SUPABASE_URL}/rest/v1/ax_web_orders?id=eq.${orderId}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ status: newStatus })
            });
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        } catch {}
    };

    const handleDeleteOrder = async (orderId) => {
        if (!window.confirm('هل أنت متأكد من حذف هذا الطلب نهائياً؟')) return;
        try {
            await fetch(`${SUPABASE_URL}/rest/v1/ax_web_orders?id=eq.${orderId}`, {
                method: 'DELETE',
                headers
            });
            setOrders(prev => prev.filter(o => o.id !== orderId));
        } catch {}
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed':
                return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold">تم التنفيذ</span>;
            case 'contacted':
                return <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold">تم التواصل</span>;
            case 'cancelled':
                return <span className="bg-rose-500/10 text-rose-400 border border-rose-500/20 px-3 py-1 rounded-full text-xs font-bold">ملغي</span>;
            default:
                return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold animate-pulse">جديد</span>;
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-slate-900/60 border border-white/5 p-6 rounded-3xl animate-pulse h-36" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-white/10 p-5 rounded-3xl shadow-xl">
                <div>
                    <h3 className="text-lg font-black text-white">طلبات التسعير والشراء الحية</h3>
                    <p className="text-xs text-slate-400">تصل الطلبات هنا مباشرة في الوقت الفعلي مع جرس تنبيه صوتي.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => {
                            setSoundEnabled(s => !s);
                            playOrderChime();
                        }}
                        className={`px-4 py-2 rounded-full text-xs font-bold border transition-all flex items-center gap-2 ${
                            soundEnabled
                                ? 'bg-primary/20 text-primary border-primary/30'
                                : 'bg-white/5 text-slate-400 border-white/10'
                        }`}
                    >
                        <Volume2 className="w-4 h-4" />
                        {soundEnabled ? 'صوت التنبيه مفعل' : 'صوت التنبيه صامت'}
                    </button>
                    <span className="bg-white/5 text-white px-3.5 py-2 rounded-full text-xs font-mono font-bold border border-white/10">
                        {orders.length} طلب
                    </span>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-16 text-center">
                    <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <h4 className="text-base font-bold text-slate-300">لا توجد طلبات واردة حتى الآن</h4>
                    <p className="text-xs text-slate-500 mt-1">أي طلب يرسله زائر من الموقع سيظهر هنا فوراً.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map(order => {
                        const cleanPhone = (order.phone || '').replace(/[^0-9]/g, '');
                        const waUrl = cleanPhone ? `https://wa.me/2${cleanPhone.startsWith('0') ? cleanPhone : '0' + cleanPhone}` : null;
                        const dateFormatted = new Date(order.created_at).toLocaleString('ar-EG', {
                            dateStyle: 'short',
                            timeStyle: 'short'
                        });

                        return (
                            <div key={order.id} className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 shadow-xl space-y-4 hover:border-primary/30 transition-all">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-xs font-black bg-white/5 text-primary px-3 py-1 rounded-full border border-primary/20">
                                            {order.order_code}
                                        </span>
                                        <h4 className="text-base font-black text-white">{order.customer_name}</h4>
                                        {getStatusBadge(order.status)}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                                        <Clock className="w-3.5 h-3.5" />
                                        {dateFormatted}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                                    <div className="bg-slate-800/40 border border-white/5 p-4 rounded-2xl space-y-2">
                                        <span className="font-bold text-slate-400 block">تفاصيل المطلوب:</span>
                                        {Array.isArray(order.items) && order.items.length > 0 ? (
                                            <ul className="space-y-1.5 text-slate-200">
                                                {order.items.map((it, idx) => (
                                                    <li key={idx} className="flex justify-between border-b border-white/5 pb-1">
                                                        <span>{it.productName} {it.color ? `(${it.color})` : ''}</span>
                                                        <span className="font-bold text-primary font-mono">{it.quantity} {it.unit || 'متر'}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="text-slate-200 font-bold">
                                                {order.single_product || 'طلب تسعير عام'}
                                                <span className="text-primary font-mono block mt-1">الكمية: {order.quantity} {order.unit || 'قطعة'}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="bg-slate-800/40 border border-white/5 p-4 rounded-2xl space-y-2">
                                        <span className="font-bold text-slate-400 block">بيانات التوصيل والموقع:</span>
                                        <p className="text-slate-300"><strong>الاستلام:</strong> {order.delivery_method || 'نقل للعميل'}</p>
                                        {order.address && <p className="text-slate-300 truncate"><strong>العنوان:</strong> {order.address}</p>}
                                        {order.maps_url && (
                                            <a
                                                href={order.maps_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold mt-1"
                                            >
                                                <MapPin className="w-3.5 h-3.5" />
                                                فتح موقع العميل على الخريطة
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                        {order.notes && <p className="text-slate-400 italic">"{order.notes}"</p>}
                                    </div>

                                    <div className="bg-slate-800/40 border border-white/5 p-4 rounded-2xl flex flex-col justify-between gap-3">
                                        <div>
                                            <span className="font-bold text-slate-400 block mb-2">التواصل الفوري:</span>
                                            <div className="flex flex-wrap gap-2">
                                                {waUrl && (
                                                    <a
                                                        href={waUrl}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow"
                                                    >
                                                        <MessageSquare className="w-3.5 h-3.5" />
                                                        واتساب ({order.phone})
                                                    </a>
                                                )}
                                                <a
                                                    href={`tel:${order.phone}`}
                                                    className="bg-slate-700 hover:bg-slate-600 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                                                >
                                                    <Phone className="w-3.5 h-3.5" />
                                                    اتصال
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                            <select
                                                value={order.status || 'new'}
                                                onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                                className="bg-slate-900 border border-white/10 text-white text-xs rounded-xl px-3 py-1.5 font-bold focus:outline-none focus:border-primary"
                                            >
                                                <option value="new">جديد</option>
                                                <option value="contacted">تم التواصل</option>
                                                <option value="completed">تم التنفيذ</option>
                                                <option value="cancelled">ملغي</option>
                                            </select>

                                            <button
                                                onClick={() => handleDeleteOrder(order.id)}
                                                className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                                                title="حذف الطلب"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
