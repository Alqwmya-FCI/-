import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCT_COLORS, QUANTITY_CONFIG } from '../data/colorsData';

export default function OrderPanel({ product, categoryId }) {
    const { addItem } = useCart();
    const colors = PRODUCT_COLORS[categoryId] || [];
    const config = QUANTITY_CONFIG[categoryId] || QUANTITY_CONFIG.blocks;
    const heights = product.heights || [];

    const [selectedColor, setSelectedColor] = useState(colors[0]?.name || '');
    const [selectedHeight, setSelectedHeight] = useState(heights[0] || null);
    const [quantity, setQuantity] = useState(config.presets?.[0] || 1);
    const [added, setAdded] = useState(false);

    const heightDescriptions = {
        6: 'سمك 6 سم: مناسب لممرات المشاة، الحدائق، والمناطق خفيفة الحركة.',
        8: 'سمك 8 سم: مناسب لمواقف السيارات، الشوارع الداخلية، والمناطق متوسطة الحركة.',
        10: 'سمك 10 سم: مصمم خصيصاً للمناطق الصناعية، محطات الوقود، وحركة النقل الثقيل (تريلات).'
    };

    const handleQuantity = (val) => {
        const n = parseInt(val, 10);
        if (!isNaN(n) && n >= config.min) setQuantity(n);
    };

    const handleAdd = () => {
        addItem({
            productId: product.id,
            productName: product.name,
            categoryId,
            color: selectedColor || null,
            colorHex: colors.find(c => c.name === selectedColor)?.hex || null,
            height: selectedHeight,
            quantity,
            unit: config.unit,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="flex flex-col gap-6 w-full">

            {heights.length > 0 && (
                <div className="flex flex-col gap-3">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">السمك (الارتفاع)</p>
                    <div className="flex flex-wrap gap-2">
                        {heights.map(h => (
                            <button
                                key={h}
                                onClick={() => setSelectedHeight(h)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 border ${
                                    selectedHeight === h
                                        ? 'bg-primary text-black border-primary'
                                        : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                                }`}
                            >
                                {h} سم
                            </button>
                        ))}
                    </div>
                    {selectedHeight && heightDescriptions[selectedHeight] && (
                        <p className="text-xs text-slate-300 font-medium leading-relaxed bg-black/20 p-3 rounded-xl border border-white/5">
                            {heightDescriptions[selectedHeight]}
                        </p>
                    )}
                </div>
            )}

            {colors.length > 0 && (
                <div className="flex flex-col gap-3">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">اللون</p>
                    <div className="flex flex-wrap gap-3">
                        {colors.map(c => (
                            <button
                                key={c.name}
                                onClick={() => setSelectedColor(c.name)}
                                title={c.name}
                                className={`relative w-9 h-9 rounded-full transition-all duration-200 ${
                                    selectedColor === c.name
                                        ? 'ring-2 ring-offset-2 ring-offset-slate-950 ring-primary scale-110'
                                        : 'hover:scale-105 opacity-80 hover:opacity-100'
                                } ${c.border ? 'border border-white/30' : ''}`}
                                style={{ backgroundColor: c.hex }}
                            >
                                {selectedColor === c.name && (
                                    <span className="absolute inset-0 flex items-center justify-center">
                                        <Check size={14} className={parseInt(c.hex.replace('#',''), 16) > 0xAAAAAA ? 'text-black' : 'text-white'} strokeWidth={3} />
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                    {selectedColor && (
                        <p className="text-xs text-primary font-bold">{selectedColor}</p>
                    )}
                </div>
            )}

            <div className="flex flex-col gap-3">
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{config.label}</p>

                {config.presets?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {config.presets.map(p => (
                            <button
                                key={p}
                                onClick={() => setQuantity(p)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 border ${
                                    quantity === p
                                        ? 'bg-primary text-black border-primary'
                                        : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                                }`}
                            >
                                {p.toLocaleString('ar-EG')} {config.unit}
                            </button>
                        ))}
                    </div>
                )}

                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-1 w-fit">
                    <button
                        onClick={() => setQuantity(q => Math.max(config.min, q - config.step))}
                        className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                    >
                        <Minus size={16} />
                    </button>
                    <input
                        type="number"
                        min={config.min}
                        step={config.step}
                        value={quantity}
                        onChange={e => handleQuantity(e.target.value)}
                        className="w-24 text-center bg-transparent text-white font-black text-lg outline-none"
                    />
                    <span className="text-slate-400 text-sm font-bold pl-1 pr-2">{config.unit}</span>
                    <button
                        onClick={() => setQuantity(q => q + config.step)}
                        className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            <button
                onClick={handleAdd}
                className={`w-full h-16 rounded-2xl text-lg font-black flex items-center justify-center gap-3 transition-all duration-300 ${
                    added
                        ? 'bg-green-500 text-white shadow-[0_10px_30px_rgba(34,197,94,0.4)]'
                        : 'bg-primary text-black hover:bg-primary/90 shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.5)] hover:-translate-y-1'
                } active:scale-95`}
            >
                {added ? (
                    <><Check size={22} strokeWidth={3} /> أُضيف للسلة</>
                ) : (
                    <><ShoppingCart size={22} /> إضافة للسلة</>
                )}
            </button>
        </div>
    );
}
