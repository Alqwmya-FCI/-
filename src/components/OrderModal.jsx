import React, { useState } from 'react';
import { X, CheckCircle, Navigation, MapPin, Phone, User, Package, Send, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import { sendOrderToTelegram } from '../services/telegramOrderService';

export default function OrderModal({ isOpen, onClose, initialProduct = null }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [productName, setProductName] = useState(initialProduct?.name || 'طوب أسمنتي مصمت 25');
    const [quantity, setQuantity] = useState('1000');
    const [unit, setUnit] = useState(initialProduct?.unit || 'ألف طوبة');
    const [deliveryMethod, setDeliveryMethod] = useState('نقل للعميل');
    const [address, setAddress] = useState('');
    const [coords, setCoords] = useState(null);
    const [mapsUrl, setMapsUrl] = useState('');
    const [notes, setNotes] = useState('');

    const [isLocating, setIsLocating] = useState(false);
    const [locationStatus, setLocationStatus] = useState(null); // 'success' | 'error' | null
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedOrder, setSubmittedOrder] = useState(null);

    if (!isOpen) return null;

    const handleDetectLocation = () => {
        if (!navigator.geolocation) {
            setLocationStatus('error');
            return;
        }

        setIsLocating(true);
        setLocationStatus(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const url = `https://www.google.com/maps?q=${lat},${lng}`;
                setCoords({ lat, lng });
                setMapsUrl(url);
                setLocationStatus('success');
                setIsLocating(false);
                if (!address) {
                    setAddress(`موقع محدد عبر GPS (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
                }
            },
            () => {
                setLocationStatus('error');
                setIsLocating(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !phone.trim()) {
            return;
        }

        setIsSubmitting(true);
        const orderData = {
            name,
            phone,
            singleProduct: productName,
            quantity,
            unit,
            deliveryMethod,
            address,
            coords,
            mapsUrl,
            notes
        };

        const result = await sendOrderToTelegram(orderData);
        setIsSubmitting(false);
        setSubmittedOrder(result);
    };

    const handleReset = () => {
        setName('');
        setPhone('');
        setAddress('');
        setCoords(null);
        setMapsUrl('');
        setNotes('');
        setLocationStatus(null);
        setSubmittedOrder(null);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4" dir="rtl">
            <div 
                className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity" 
                onClick={handleReset} 
            />

            <div className="relative w-full max-w-xl bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10 animate-fade-in text-white">
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                            <Package size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white">طلب توريد كميات</h2>
                            <p className="text-xs text-slate-400">احصل على أفضل تسعير وتوريد مباشر للمشروع</p>
                        </div>
                    </div>
                    <button
                        onClick={handleReset}
                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {submittedOrder ? (
                        <div className="py-8 text-center space-y-6 animate-fade-in">
                            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                                <CheckCircle size={44} />
                            </div>
                            <div>
                                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-mono font-bold rounded-full mb-2 border border-primary/20">
                                    {submittedOrder.orderId}
                                </span>
                                <h3 className="text-2xl font-black text-white mb-2">تم استلام طلب التوريد بنجاح!</h3>
                                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                                    تم إرسال كافة تفاصيل الطلب والموقع لإدارة مصنع القومية. سيتواصل معك أحد مسؤولي المبيعات فوراً لتأكيد أفضل سعر وموعد التوريد.
                                </p>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-right text-xs space-y-2 max-w-md mx-auto">
                                <div className="flex justify-between text-slate-400">
                                    <span>العميل:</span>
                                    <span className="text-white font-bold">{name}</span>
                                </div>
                                <div className="flex justify-between text-slate-400">
                                    <span>رقم الهاتف:</span>
                                    <span className="text-white font-mono font-bold">{phone}</span>
                                </div>
                                <div className="flex justify-between text-slate-400">
                                    <span>المنتج:</span>
                                    <span className="text-primary font-bold">{productName} ({quantity} {unit})</span>
                                </div>
                                {mapsUrl && (
                                    <div className="flex justify-between text-slate-400 pt-1 border-t border-white/5">
                                        <span>الموقع الجغرافي:</span>
                                        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline flex items-center gap-1">
                                            معاينة على الخريطة <ExternalLink size={12} />
                                        </a>
                                    </div>
                                )}
                            </div>

                            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    onClick={() => {
                                        setSubmittedOrder(null);
                                        setAddress('');
                                        setCoords(null);
                                        setMapsUrl('');
                                        setNotes('');
                                        setLocationStatus(null);
                                    }}
                                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-black font-extrabold text-sm py-3.5 px-6 rounded-full shadow-lg transition-all active:scale-95"
                                >
                                    <Package size={16} />
                                    إجراء طلب توريد جديد
                                </button>
                                <a
                                    href={`https://wa.me/201286084444?text=${encodeURIComponent(`مرحباً مصنع القومية، قمت بطلب توريد برقم ${submittedOrder.orderId} لمنتج ${productName} كمية ${quantity} ${unit}.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-300 font-bold text-sm py-3.5 px-6 rounded-full border border-emerald-500/30 transition-all"
                                >
                                    <Send size={16} />
                                    متابعة على واتساب (اختياري)
                                </a>
                                <button
                                    onClick={handleReset}
                                    className="inline-flex items-center justify-center bg-white/10 hover:bg-white/15 text-white font-bold text-sm py-3.5 px-6 rounded-full transition-all"
                                >
                                    إغلاق
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                                        <User size={14} className="text-primary" />
                                        الاسم بالكامل / اسم الشركة *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="مثال: م. أحمد عبد العزيز"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                                        <Phone size={14} className="text-primary" />
                                        رقم الهاتف / الواتساب *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        dir="ltr"
                                        placeholder="010xxxxxxxx"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-right"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                                <div className="sm:col-span-7">
                                    <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                                        <Package size={14} className="text-primary" />
                                        نوع المنتج المطلوب
                                    </label>
                                    <input
                                        type="text"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        placeholder="اسم المنتج (مثال: طوب أسمنتي، إنترلوك سداسي...)"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>

                                <div className="sm:col-span-3">
                                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                                        الكمية
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-3 py-3 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                                        الوحدة
                                    </label>
                                    <select
                                        value={unit}
                                        onChange={(e) => setUnit(e.target.value)}
                                        className="w-full bg-slate-800 border border-white/10 rounded-2xl px-2 py-3 text-xs text-white focus:outline-none focus:border-primary"
                                    >
                                        <option value="متر مربع">م2</option>
                                        <option value="ألف طوبة">ألف</option>
                                        <option value="قطعة">قطعة</option>
                                        <option value="متر طولي">م.ط</option>
                                    </select>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                                        <MapPin size={14} className="text-primary" />
                                        موقع التوريد والاستلام
                                    </label>
                                    <div className="flex bg-black/40 rounded-full p-0.5 border border-white/10">
                                        <button
                                            type="button"
                                            onClick={() => setDeliveryMethod('نقل للعميل')}
                                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                                                deliveryMethod === 'نقل للعميل' ? 'bg-primary text-black' : 'text-slate-400'
                                            }`}
                                        >
                                            توصيل للموقع
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setDeliveryMethod('تسليم أرض المصنع')}
                                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                                                deliveryMethod === 'تسليم أرض المصنع' ? 'bg-primary text-black' : 'text-slate-400'
                                            }`}
                                        >
                                            أرض المصنع
                                        </button>
                                    </div>
                                </div>

                                {deliveryMethod === 'نقل للعميل' && (
                                    <div className="space-y-2 pt-1">
                                        <button
                                            type="button"
                                            onClick={handleDetectLocation}
                                            disabled={isLocating}
                                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500/20 to-primary/20 hover:from-emerald-500/30 hover:to-primary/30 border border-primary/40 text-primary hover:text-white py-3 px-4 rounded-2xl text-xs font-black transition-all shadow-sm active:scale-98"
                                        >
                                            {isLocating ? (
                                                <>
                                                    <Loader2 size={16} className="animate-spin" />
                                                    جارٍ قراءة موقعك عبر GPS...
                                                </>
                                            ) : (
                                                <>
                                                    <Navigation size={16} />
                                                    تحديد موقعي التلقائي الآن (GPS)
                                                </>
                                            )}
                                        </button>

                                        {locationStatus === 'success' && (
                                            <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-3 py-2 text-xs text-emerald-400">
                                                <span className="flex items-center gap-1.5 font-bold">
                                                    <CheckCircle size={14} />
                                                    تم تحديد الموقع بنجاح
                                                </span>
                                                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="underline flex items-center gap-1">
                                                    فتح الخريطة <ExternalLink size={10} />
                                                </a>
                                            </div>
                                        )}

                                        {locationStatus === 'error' && (
                                            <p className="text-[11px] text-amber-400">
                                                تعذر تحديد الموقع تلقائياً، يمكنك كتابة العنوان يدوياً في الخانة بالأسفل.
                                            </p>
                                        )}

                                        <input
                                            type="text"
                                            placeholder="أو اكتب العنوان يدوياً (المدينة - المنطقة - المشروع)..."
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-all"
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                                    ملاحظات إضافية (اختياري)
                                </label>
                                <textarea
                                    rows="2"
                                    placeholder="أي تفاصيل خاصة بالمقاسات أو جدول التوريد..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-emerald-400 hover:from-emerald-400 hover:to-primary text-black font-extrabold text-base py-4 px-8 rounded-full shadow-[0_10px_25px_-5px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        جارٍ إرسال الطلب...
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        إرسال طلب التوريد الآن
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
