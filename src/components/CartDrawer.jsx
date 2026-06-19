import React from 'react';
import { X, Trash2, ShoppingBag, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';

const HUSSEIN_WHATSAPP = '201286084444';

export default function CartDrawer() {
    const { items, removeItem, clearCart, isOpen, setIsOpen, totalCount } = useCart();
    const [deliveryMethod, setDeliveryMethod] = React.useState('مصنع'); // 'مصنع' or 'عميل'
    const [deliveryLocation, setDeliveryLocation] = React.useState('');

    function buildWhatsAppMessage() {
        if (items.length === 0) return '';
        let msg = 'مرحباً، أريد الاستفسار عن تسعير الطلب التالي:\n\n';
        items.forEach((item, i) => {
            msg += `${i + 1}. ${item.productName}`;
            if (item.color) msg += ` - اللون: ${item.color}`;
            if (item.height) msg += ` - الارتفاع (سمك): ${item.height} سم`;
            msg += ` - الكمية: ${item.quantity.toLocaleString('ar-EG')} ${item.unit}\n`;
        });
        
        msg += '\n📍 تفاصيل الاستلام:\n';
        if (deliveryMethod === 'مصنع') {
            msg += 'طريقة الاستلام: تسليم أرض المصنع\n';
        } else {
            msg += 'طريقة الاستلام: نقل للعميل\n';
            msg += `العنوان / الموقع: ${deliveryLocation || 'لم يتم التحديد'}\n`;
        }

        msg += '\nشكراً';
        return encodeURIComponent(msg);
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
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

                    <div className="relative mr-auto w-full max-w-md h-full bg-slate-900 border-r border-white/10 shadow-2xl flex flex-col animate-slide-in-right" dir="rtl">

                        <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <ShoppingBag size={22} className="text-primary" />
                                <h2 className="text-xl font-black text-white">سلة الطلب</h2>
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
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full gap-4 text-slate-500">
                                    <ShoppingBag size={48} strokeWidth={1} />
                                    <p className="font-bold">السلة فارغة</p>
                                    <p className="text-sm text-center">أضف منتجات من صفحات المنتجات</p>
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

                        {items.length > 0 && (
                            <div className="p-4 border-t border-white/10 flex-shrink-0 space-y-4">
                                <div className="space-y-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                                    <p className="text-sm font-bold text-white">📍 طريقة الاستلام:</p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setDeliveryMethod('مصنع')}
                                            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all border ${
                                                deliveryMethod === 'مصنع' 
                                                ? 'bg-primary text-black border-primary' 
                                                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                                            }`}
                                        >
                                            أرض المصنع
                                        </button>
                                        <button
                                            onClick={() => setDeliveryMethod('عميل')}
                                            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all border ${
                                                deliveryMethod === 'عميل' 
                                                ? 'bg-primary text-black border-primary' 
                                                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                                            }`}
                                        >
                                            نقل للعميل
                                        </button>
                                    </div>
                                    
                                    {deliveryMethod === 'عميل' && (
                                        <div className="mt-3 animate-fade-in">
                                            <input
                                                type="text"
                                                placeholder="اكتب العنوان بالتفصيل أو رابط الخريطة..."
                                                value={deliveryLocation}
                                                onChange={(e) => setDeliveryLocation(e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                            />
                                        </div>
                                    )}
                                </div>

                                <a
                                    href={`https://wa.me/${HUSSEIN_WHATSAPP}?text=${buildWhatsAppMessage(items)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full h-14 bg-[#25D366] hover:bg-[#1fb356] text-white rounded-2xl text-base font-black flex items-center justify-center gap-3 transition-all shadow-[0_8px_25px_rgba(37,211,102,0.3)] hover:shadow-[0_12px_30px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 active:scale-95"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.12 1.524 5.857L.057 23.5l5.82-1.527A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.488-5.19-1.345l-.372-.22-3.453.906.922-3.37-.241-.389A9.961 9.961 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                                    </svg>
                                    إرسال الطلب عبر واتساب
                                </a>
                                <button
                                    onClick={clearCart}
                                    className="w-full h-10 bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all border border-white/10 hover:border-red-500/20"
                                >
                                    <Trash2 size={14} />
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
