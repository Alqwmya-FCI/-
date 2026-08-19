import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Send, Navigation, CheckCircle, MapPin, User, Phone, Loader2, ExternalLink, Plus, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { sendOrderToTelegram } from '../services/telegramOrderService';
import { getReadableAddress } from '../utils/reverseGeocode';

const HUSSEIN_WHATSAPP = '201286084444';

export default function CartDrawer() {
    const { items, removeItem, clearCart, isOpen, setIsOpen, totalCount } = useCart();
    const [name, setName] = useState('');
    const [phones, setPhones] = useState(['']);
    const [deliveryMethod, setDeliveryMethod] = useState('نقل للعميل');
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const [coords, setCoords] = useState(null);
    const [mapsUrl, setMapsUrl] = useState('');
    const [isLocating, setIsLocating] = useState(false);
    const [locationSuccess, setLocationSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [lastOrderId, setLastOrderId] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handlePhoneChange = (index, value) => {
        const updated = [...phones];
        updated[index] = value;
        setPhones(updated);
        if (errorMsg) setErrorMsg('');
    };

    const handleAddPhone = () => {
        if (phones.length < 4) {
            setPhones([...phones, '']);
        }
    };

    const handleRemovePhone = (index) => {
        if (phones.length > 1) {
            setPhones(phones.filter((_, i) => i !== index));
        }
    };

    const handleDetectLocation = () => {
        if (!navigator.geolocation) {
            setErrorMsg('متصفحك لا يدعم تحديد الموقع التلقائي');
            return;
        }

        setIsLocating(true);
        setErrorMsg('');
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;
                const url = `https://www.google.com/maps?q=${lat},${lng}`;
                setCoords({ lat, lng });
                setMapsUrl(url);
                setLocationSuccess(true);
                const readable = await getReadableAddress(lat, lng);
                setDeliveryLocation(readable);
                setIsLocating(false);
            },
            () => {
                setIsLocating(false);
                setErrorMsg('تعذر الوصول للموقع تلقائياً، يمكنك كتابة العنوان يدوياً.');
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    const handleSendOrder = async () => {
        setErrorMsg('');
        const validPhones = phones.filter(p => p.trim());

        if (!name.trim()) {
            setErrorMsg('يرجى كتابة الاسم أو اسم الشركة للمتابعة.');
            return;
        }

        if (validPhones.length === 0) {
            setErrorMsg('يرجى إدخال رقم هاتف واحد على الأقل للتواصل.');
            return;
        }

        setIsSubmitting(true);
        const orderData = {
            name: name.trim(),
            phones: validPhones,
            phone: validPhones[0],
            items,
            deliveryMethod: deliveryMethod === 'مصنع' ? 'تسليم أرض المصنع' : 'نقل للعميل',
            address: deliveryLocation,
            coords,
            mapsUrl
        };

        const result = await sendOrderToTelegram(orderData);
        setIsSubmitting(false);
        setLastOrderId(result.orderId);
        setIsSubmitted(true);
        clearCart();
    };

    const primaryPhone = phones.find(p => p.trim()) || '';

    return (
        <>
            <button
                onClick={() => { setIsSubmitted(false); setIsOpen(true); }}
                className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-primary text-black rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(16,185,129,0.5)] hover:scale-110 active:scale-95 transition-all duration-200"
                aria-label="السلة"
            >
                <ShoppingBag size={22} strokeWidth={2.5} />
                {totalCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                        {items.length}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-[200] flex">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="relative mr-auto w-full max-w-md h-full bg-slate-900 border-r border-white/10 shadow-2xl flex flex-col animate-slide-in-right text-white" dir="rtl">
                        <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <ShoppingBag size={22} className="text-primary" />
                                <h2 className="text-xl font-black text-white">سلة طلب التوريد</h2>
                                {items.length > 0 && (
                                    <span className="bg-primary/20 text-primary text-sm font-bold px-2 py-0.5 rounded-full">
                                        {items.length} منتج
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {isSubmitted ? (
                                <div className="py-12 text-center space-y-5 animate-fade-in">
                                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                                        <CheckCircle size={36} />
                                    </div>
                                    <div>
                                        <span className="text-xs font-mono text-primary font-bold">{lastOrderId}</span>
                                        <h3 className="text-xl font-black text-white mt-1">تم إرسال طلبك بنجاح!</h3>
                                        <p className="text-xs text-slate-400 mt-2 px-4">
                                            وصلت بيانات طلبك لإدارة المبيعات وسيتم التواصل معك مباشرة لتأكيد التوريد.
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2.5 px-4 pt-2">
                                        <button
                                            onClick={() => {
                                                setIsSubmitted(false);
                                                setDeliveryLocation('');
                                                setCoords(null);
                                                setMapsUrl('');
                                                setLocationSuccess(false);
                                                setErrorMsg('');
                                            }}
                                            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-black text-xs font-black py-3 px-6 rounded-full shadow-lg hover:bg-primary/90 transition-all active:scale-95"
                                        >
                                            <ShoppingBag size={14} />
                                            إجراء طلب توريد جديد
                                        </button>
                                        {primaryPhone && (
                                            <a
                                                href={`https://wa.me/${HUSSEIN_WHATSAPP}?text=${encodeURIComponent(`مرحباً مصنع القومية، قمت بطلب توريد كميات برقم ${lastOrderId} وأرغب في المتابعة معكم.`)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-emerald-300 text-xs font-bold py-3 px-6 rounded-full border border-emerald-500/30 transition-all"
                                            >
                                                <Send size={14} />
                                                متابعة على واتساب (اختياري)
                                            </a>
                                        )}
                                        <button
                                            onClick={() => setIsOpen(false)}
                                            className="w-full inline-flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold py-2.5 px-6 rounded-full transition-all"
                                        >
                                            إغلاق
                                        </button>
                                    </div>
                                </div>
                            ) : items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500">
                                    <ShoppingBag size={48} strokeWidth={1} />
                                    <p className="font-bold">السلة فارغة</p>
                                    <p className="text-sm text-center">أضف منتجات من صفحات الكتالوج لطلب توريدها</p>
                                </div>
                            ) : (
                                items.map(item => (
                                    <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3">
                                        {item.colorHex && (
                                            <div
                                                className="w-8 h-8 rounded-full flex-shrink-0 border border-white/20 mt-0.5"
                                                style={{ backgroundColor: item.colorHex }}
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white font-bold text-sm leading-tight">{item.productName}</p>
                                            {item.color && (
                                                <p className="text-slate-400 text-xs mt-0.5">اللون: {item.color}</p>
                                            )}
                                            {item.height && (
                                                <p className="text-slate-400 text-xs mt-0.5">السمك: {item.height} سم</p>
                                            )}
                                            <p className="text-primary font-black text-base mt-1">
                                                {item.quantity.toLocaleString('ar-EG')} {item.unit}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="w-8 h-8 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 flex items-center justify-center flex-shrink-0 transition-all"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {!isSubmitted && items.length > 0 && (
                            <div className="p-4 border-t border-white/10 flex-shrink-0 space-y-4 max-h-[50vh] overflow-y-auto">
                                {errorMsg && (
                                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-2xl text-xs font-bold animate-fade-in">
                                        <AlertCircle size={16} className="flex-shrink-0" />
                                        <span>{errorMsg}</span>
                                    </div>
                                )}

                                <div className="space-y-2.5">
                                    <input
                                        type="text"
                                        required
                                        placeholder="الاسم بالكامل / اسم الشركة *"
                                        value={name}
                                        onChange={(e) => { setName(e.target.value); if (errorMsg) setErrorMsg(''); }}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary"
                                    />

                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[11px] font-bold text-slate-400">أرقام الهاتف للتواصل *</span>
                                            {phones.length < 3 && (
                                                <button
                                                    type="button"
                                                    onClick={handleAddPhone}
                                                    className="text-[11px] font-bold text-primary hover:underline flex items-center gap-0.5"
                                                >
                                                    <Plus size={12} />
                                                    رقم إضافي
                                                </button>
                                            )}
                                        </div>
                                        <div className="space-y-1.5">
                                            {phones.map((phoneVal, idx) => (
                                                <div key={idx} className="flex items-center gap-1.5">
                                                    <input
                                                        type="tel"
                                                        dir="ltr"
                                                        placeholder={idx === 0 ? "رقم الهاتف الأساسي *" : `رقم إضافي ${idx + 1}`}
                                                        value={phoneVal}
                                                        onChange={(e) => handlePhoneChange(idx, e.target.value)}
                                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary text-right font-mono"
                                                    />
                                                    {phones.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemovePhone(idx)}
                                                            className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-all flex-shrink-0"
                                                        >
                                                            <Trash2 size={12} />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 bg-white/5 p-3 rounded-2xl border border-white/10 text-xs">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-white">طريقة الاستلام:</span>
                                        <div className="flex gap-1.5">
                                            <button
                                                type="button"
                                                onClick={() => setDeliveryMethod('مصنع')}
                                                className={`px-3 py-1 rounded-full font-bold transition-all ${
                                                    deliveryMethod === 'مصنع' ? 'bg-primary text-black' : 'bg-white/5 text-slate-400'
                                                }`}
                                            >
                                                أرض المصنع
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDeliveryMethod('عميل')}
                                                className={`px-3 py-1 rounded-full font-bold transition-all ${
                                                    deliveryMethod === 'عميل' ? 'bg-primary text-black' : 'bg-white/5 text-slate-400'
                                                }`}
                                            >
                                                نقل للعميل
                                            </button>
                                        </div>
                                    </div>

                                    {deliveryMethod === 'عميل' && (
                                        <div className="space-y-2 pt-1">
                                            <button
                                                type="button"
                                                onClick={handleDetectLocation}
                                                disabled={isLocating}
                                                className="w-full flex items-center justify-center gap-1.5 bg-primary/10 border border-primary/30 text-primary py-2 px-3 rounded-xl text-xs font-bold hover:bg-primary/20 transition-all"
                                            >
                                                {isLocating ? <Loader2 size={14} className="animate-spin" /> : <Navigation size={14} />}
                                                تحديد موقعي التلقائي (GPS)
                                            </button>
                                            {locationSuccess && (
                                                <div className="flex justify-between text-[11px] text-emerald-400">
                                                    <span>تم التقاط إحداثيات الموقع</span>
                                                    <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="underline">عرض على الخريطة</a>
                                                </div>
                                            )}
                                            <input
                                                type="text"
                                                placeholder="العنوان التفصيلي أو علامة مميزة..."
                                                value={deliveryLocation}
                                                onChange={(e) => setDeliveryLocation(e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={handleSendOrder}
                                    disabled={isSubmitting}
                                    className="w-full h-12 bg-gradient-to-r from-primary to-emerald-400 hover:from-emerald-400 hover:to-primary text-black rounded-full text-sm font-extrabold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            جارٍ إرسال الطلب...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={16} />
                                            إرسال طلب التوريد الآن
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={clearCart}
                                    className="w-full h-8 text-slate-500 hover:text-red-400 text-xs font-bold flex items-center justify-center gap-1 transition-all"
                                >
                                    <Trash2 size={12} />
                                    مسح السلة
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
