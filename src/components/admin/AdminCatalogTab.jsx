import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Image, Layers, Check, X, Eye, EyeOff, Save, Sparkles } from 'lucide-react';

const SUPABASE_URL = 'https://yrbvzxbawdjfafjieyff.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyYnZ6eGJhd2RqZmFmamlleWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5ODExNzksImV4cCI6MjA5NzU1NzE3OX0.viV6mpDuDtaJJpdWHzWffd44RhAbFY5VwLbNdwOode8';

const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
};

export default function AdminCatalogTab() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCat, setSelectedCat] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState('');

    const fetchData = async () => {
        try {
            const [catRes, prodRes] = await Promise.all([
                fetch(`${SUPABASE_URL}/rest/v1/ax_web_categories?select=*&order=display_order.asc`, { headers }),
                fetch(`${SUPABASE_URL}/rest/v1/ax_web_products?select=*&order=display_order.asc`, { headers })
            ]);
            if (catRes.ok) setCategories(await catRes.json());
            if (prodRes.ok) setProducts(await prodRes.json());
        } catch {}
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateNew = () => {
        setEditingProduct({
            id: 'prod-' + Date.now().toString().slice(-5),
            name: '',
            category_id: categories[0]?.id || 'bricks',
            short_description: '',
            images: [],
            specs: { 'المقاس': '', 'مقاومة الضغط': '' },
            heights: [],
            is_published: true,
            display_order: products.length + 1
        });
        setNewImageUrl('');
    };

    const handleAddImage = () => {
        if (!newImageUrl.trim()) return;
        const currentImages = editingProduct.images || [];
        setEditingProduct({
            ...editingProduct,
            images: [...currentImages, newImageUrl.trim()]
        });
        setNewImageUrl('');
    };

    const handleRemoveImage = (index) => {
        const currentImages = editingProduct.images || [];
        setEditingProduct({
            ...editingProduct,
            images: currentImages.filter((_, i) => i !== index)
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!editingProduct.name.trim() || !editingProduct.id.trim()) return;

        setIsSaving(true);
        try {
            const payload = {
                id: editingProduct.id.trim(),
                name: editingProduct.name.trim(),
                category_id: editingProduct.category_id,
                short_description: editingProduct.short_description || '',
                images: editingProduct.images || [],
                specs: editingProduct.specs || {},
                heights: editingProduct.heights || [],
                is_published: editingProduct.is_published,
                display_order: editingProduct.display_order || 1
            };

            const isExisting = products.some(p => p.id === editingProduct.id);
            const url = isExisting
                ? `${SUPABASE_URL}/rest/v1/ax_web_products?id=eq.${editingProduct.id}`
                : `${SUPABASE_URL}/rest/v1/ax_web_products`;
            const method = isExisting ? 'PATCH' : 'POST';

            await fetch(url, {
                method,
                headers,
                body: JSON.stringify(payload)
            });

            await fetchData();
            setEditingProduct(null);
        } catch {}
        setIsSaving(false);
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) return;
        try {
            await fetch(`${SUPABASE_URL}/rest/v1/ax_web_products?id=eq.${id}`, {
                method: 'DELETE',
                headers
            });
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch {}
    };

    const handleTogglePublish = async (prod) => {
        const nextState = !prod.is_published;
        try {
            await fetch(`${SUPABASE_URL}/rest/v1/ax_web_products?id=eq.${prod.id}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ is_published: nextState })
            });
            setProducts(prev => prev.map(p => p.id === prod.id ? { ...p, is_published: nextState } : p));
        } catch {}
    };

    const filtered = selectedCat === 'all'
        ? products
        : products.filter(p => p.category_id === selectedCat);

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-slate-900/60 border border-white/5 p-6 rounded-3xl animate-pulse h-28" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-white/10 p-5 rounded-3xl shadow-xl">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                        <Layers className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-white">إدارة المنتجات والأقسام</h3>
                        <p className="text-xs text-slate-400">أي تعديل أو صورة تضيفها تسمّع في الموقع بالكامل في ثانية واحدة.</p>
                    </div>
                </div>

                <button
                    onClick={handleCreateNew}
                    className="bg-primary hover:bg-emerald-400 text-slate-950 px-5 py-2.5 rounded-full text-xs font-black transition-all flex items-center gap-2 shadow-lg active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    إضافة منتج جديد
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setSelectedCat('all')}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                        selectedCat === 'all'
                            ? 'bg-primary text-slate-950 border-primary'
                            : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                    }`}
                >
                    كل المنتجات ({products.length})
                </button>
                {categories.map(c => {
                    const count = products.filter(p => p.category_id === c.id).length;
                    return (
                        <button
                            key={c.id}
                            onClick={() => setSelectedCat(c.id)}
                            className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                                selectedCat === c.id
                                    ? 'bg-primary text-slate-950 border-primary'
                                    : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                            }`}
                        >
                            {c.title} ({count})
                        </button>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(prod => {
                    const imgs = Array.isArray(prod.images) ? prod.images : [];
                    const mainImg = imgs[0] || '/logo.png';
                    const catObj = categories.find(c => c.id === prod.category_id);

                    return (
                        <div key={prod.id} className="bg-slate-900/90 border border-white/10 rounded-3xl p-5 shadow-xl flex flex-col justify-between gap-4">
                            <div>
                                <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-800/80 mb-4 border border-white/5 flex items-center justify-center">
                                    <img src={mainImg} alt={prod.name} className="w-full h-full object-cover" />
                                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                                        <span className="bg-black/70 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/10">
                                            {imgs.length} صور
                                        </span>
                                        <span className="bg-primary/90 text-slate-950 text-[11px] font-black px-2.5 py-1 rounded-full">
                                            {catObj?.title || prod.category_id}
                                        </span>
                                    </div>
                                </div>

                                <h4 className="text-base font-black text-white mb-1.5">{prod.name}</h4>
                                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                                    {prod.short_description || 'لا يوجد وصف مختصر.'}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                <button
                                    onClick={() => handleTogglePublish(prod)}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                                        prod.is_published
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            : 'bg-slate-800 text-slate-500 border-white/5'
                                    }`}
                                >
                                    {prod.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                                    {prod.is_published ? 'منشور' : 'مخفي'}
                                </button>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => {
                                            setEditingProduct({ ...prod });
                                            setNewImageUrl('');
                                        }}
                                        className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                                        title="تعديل المنتج والصور"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteProduct(prod.id)}
                                        className="p-2 text-slate-400 hover:text-rose-400 bg-white/5 hover:bg-rose-500/10 rounded-xl transition-colors"
                                        title="حذف المنتج"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {editingProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto" dir="rtl">
                    <div className="bg-slate-900 border border-white/15 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl space-y-6 my-8">
                        <div className="flex items-center justify-between pb-4 border-b border-white/10">
                            <div>
                                <h3 className="text-xl font-black text-white">
                                    {products.some(p => p.id === editingProduct.id) ? 'تعديل بيانات وصور المنتج' : 'إضافة منتج جديد'}
                                </h3>
                                <p className="text-xs text-slate-400">إضافة صور متعددة وتحديد المواصفات.</p>
                            </div>
                            <button
                                onClick={() => setEditingProduct(null)}
                                className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-300 block mb-1.5">اسم المنتج</label>
                                    <input
                                        type="text"
                                        required
                                        value={editingProduct.name}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                        placeholder="مثال: طوب أسمنتي مصمت 25"
                                        className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-300 block mb-1.5">القسم</label>
                                    <select
                                        value={editingProduct.category_id}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, category_id: e.target.value })}
                                        className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
                                    >
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-slate-300 block mb-1.5">الوصف المختصر</label>
                                <textarea
                                    rows={2}
                                    value={editingProduct.short_description || ''}
                                    onChange={(e) => setEditingProduct({ ...editingProduct, short_description: e.target.value })}
                                    placeholder="وصف مميزات المنتج واستخداماته..."
                                    className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary resize-none"
                                />
                            </div>

                            <div className="space-y-3 bg-slate-800/40 p-4 rounded-2xl border border-white/5">
                                <label className="text-xs font-bold text-slate-300 block">إدارة صور المنتج (صور متعددة)</label>
                                
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newImageUrl}
                                        onChange={(e) => setNewImageUrl(e.target.value)}
                                        placeholder="مسار أو رابط الصورة (مثال: /images/طوب.webp)..."
                                        className="flex-1 bg-slate-800 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-primary"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddImage}
                                        className="bg-primary/20 hover:bg-primary/30 text-primary px-4 py-2 rounded-xl text-xs font-bold transition-colors shrink-0"
                                    >
                                        + إضافة صورة
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-3 pt-2">
                                    {(editingProduct.images || []).map((imgUrl, i) => (
                                        <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/10 group">
                                            <img src={imgUrl} alt={`صورة ${i + 1}`} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(i)}
                                                className="absolute inset-0 bg-rose-950/80 text-rose-300 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-300">
                                    <input
                                        type="checkbox"
                                        checked={editingProduct.is_published}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, is_published: e.target.checked })}
                                        className="rounded text-primary focus:ring-0"
                                    />
                                    نشر المنتج وظهوره للزوار في الموقع
                                </label>

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setEditingProduct(null)}
                                        className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-400 hover:text-white bg-white/5 transition-colors"
                                    >
                                        إلغاء
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="bg-primary hover:bg-emerald-400 text-slate-950 px-6 py-2.5 rounded-full text-xs font-black transition-all shadow-lg active:scale-95 flex items-center gap-2"
                                    >
                                        <Save className="w-4 h-4" />
                                        {isSaving ? 'جاري الحفظ...' : 'حفظ التعديلات في سوبابيز'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
