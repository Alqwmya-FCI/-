import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productsData } from '../data/productsData';
import InteractiveGrid from '../components/InteractiveGrid';
import { ChevronRight, ArrowLeft, Ruler, Scale, Box, Info } from 'lucide-react';

const ProductDetailPage = () => {
    const { categoryId, productId } = useParams();
    const navigate = useNavigate();
    
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const imageRef = useRef(null);

    const category = productsData[categoryId];
    const product = category?.items.find(item => item.id === productId);

    useEffect(() => {
        if (!product) {
            navigate(`/products/${categoryId}`);
        }
        window.scrollTo(0, 0);
    }, [product, categoryId, navigate]);

    const handleMouseMove = (e) => {
        if (!imageRef.current) return;
        const rect = imageRef.current.getBoundingClientRect();
        
        // Calculate mouse position relative to the center of the image container (-1 to 1)
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        
        setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: 0, y: 0 });
    };

    if (!product) return null;

    // 3D Transform based on mouse movement
    const transformStyle = {
        transform: `perspective(1000px) rotateY(${mousePos.x * 15}deg) rotateX(${-mousePos.y * 15}deg) scale3d(1.05, 1.05, 1.05)`,
        transition: mousePos.x === 0 && mousePos.y === 0 ? 'transform 0.5s ease-out' : 'transform 0.1s ease-out'
    };

    return (
        <div className="bg-slate-950 min-h-screen w-full relative overflow-x-hidden text-right" dir="rtl">
            <InteractiveGrid />
            
            {/* Top Navigation */}
            <div className="absolute top-0 left-0 right-0 z-50 p-6 md:p-12 flex justify-between items-center pointer-events-none">
                <Link to={`/products/${categoryId}`} className="pointer-events-auto inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-bold text-sm bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 hover:bg-white/10">
                    <ChevronRight size={18} />
                    رجوع للمنتجات
                </Link>
            </div>

            <div className="relative z-10 container mx-auto px-6 py-24 min-h-screen flex flex-col lg:flex-row items-center gap-16">
                
                {/* 3D Image Showcase (Left Side on Desktop, but RTL makes it Right Side) */}
                <div className="w-full lg:w-1/2 flex items-center justify-center relative perspective-1000 mt-12 lg:mt-0">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full scale-110 mix-blend-screen opacity-50 animate-pulse" />
                    
                    <div 
                        ref={imageRef}
                        className="relative w-full max-w-lg aspect-square flex items-center justify-center cursor-crosshair group"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* 3D Floating Image */}
                        <div 
                            className="relative w-full h-full flex items-center justify-center will-change-transform drop-shadow-[0_40px_50px_rgba(0,0,0,0.8)]"
                            style={transformStyle}
                        >
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(16,185,129,0.3)]"
                            />
                        </div>
                    </div>
                </div>

                {/* Product Details & Specs (Right Side on Desktop, but RTL makes it Left Side) */}
                <div className="w-full lg:w-1/2 flex flex-col text-right z-20">
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-2 rounded-full w-max mb-6">
                        <Box size={16} />
                        <span className="text-sm font-bold tracking-widest uppercase">{category.title}</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-l from-white to-slate-400">
                        {product.name}
                    </h1>
                    
                    <p className="text-xl text-slate-300 mb-12 leading-relaxed font-light border-r-4 border-primary pr-6">
                        {product.shortDescription}
                    </p>

                    {/* Chic Specs Table */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl mb-12">
                        <div className="p-6 border-b border-white/10 bg-black/40 flex items-center gap-3">
                            <Info className="text-primary" size={24} />
                            <h3 className="text-xl font-bold text-white">المواصفات الفنية والمقاسات</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-white/10">
                            {/* Dimensions */}
                            <div className="p-6 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                        <Ruler size={24} />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-sm font-bold mb-1">الأبعاد (طول × عرض × ارتفاع)</p>
                                        <p className="text-white font-mono text-xl font-black" dir="ltr">
                                            {product.specs.length} × {product.specs.width} × {product.specs.height}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
                                        <Scale size={24} />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-sm font-bold mb-1">الوزن التقريبي</p>
                                        <p className="text-white font-bold text-lg">{product.specs.weight}</p>
                                    </div>
                                </div>
                                {product.specs.strength && (
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 border border-red-500/20">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14.5 2-5 5"/><path d="m4 12 5-5"/><path d="M20 18v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2"/><path d="M12 12v6"/></svg>
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-sm font-bold mb-1">إجهاد الكسر</p>
                                            <p className="text-white font-bold text-lg">{product.specs.strength}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Material, Usage, Absorption */}
                            <div className="p-6 space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20 shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-sm font-bold mb-1">المادة الخام</p>
                                        <p className="text-white font-bold">{product.specs.material}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20 shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-sm font-bold mb-1">الاستخدام الموصى به</p>
                                        <p className="text-white font-bold">{product.specs.usage}</p>
                                    </div>
                                </div>
                                {product.specs.absorption && (
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-500 border border-teal-500/20 shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-sm font-bold mb-1">نسبة الامتصاص</p>
                                            <p className="text-white font-bold">{product.specs.absorption}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a 
                            href={`https://wa.me/201283191597?text=مرحباً، أريد الاستفسار عن منتج: ${product.name}`}
                            target="_blank" rel="noopener noreferrer"
                            className="bg-primary hover:bg-primary/90 text-black font-black text-lg px-8 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.5)] hover:-translate-y-1 active:scale-95"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /></svg>
                            طلب تسعير عبر واتساب
                        </a>
                        <Link 
                            to="/#contact"
                            className="bg-white/5 hover:bg-white/10 text-white font-bold text-lg px-8 py-5 rounded-2xl flex items-center justify-center gap-3 border border-white/10 transition-all duration-300 hover:-translate-y-1"
                        >
                            <ArrowLeft size={20} />
                            تواصل معنا
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
