import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productsData } from '../data/productsData';
import InteractiveGrid from '../components/InteractiveGrid';
import { ChevronRight, ChevronLeft, ArrowLeft, Ruler, Scale, Box, Info } from 'lucide-react';
import { img, imgArr } from '../utils/imageProxy';
import OrderPanel from '../components/OrderPanel';

const FadingProductGallery = ({ images, className = "" }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const indexRef = useRef(0);
    const squaresContainerRef = useRef(null);
    const timerRef = useRef(null);
    
    const triggerTransition = (nextIdx) => {
        if (nextIdx === indexRef.current) return;
        const currentIdx = indexRef.current;
        const oldImage = images[currentIdx];
        
        if (squaresContainerRef.current) {
            const squares = [];
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < 5; j++) {
                    const sq = document.createElement('div');
                    sq.className = 'absolute inset-0 bg-center bg-cover bg-no-repeat transition-opacity duration-1000 z-10 filter drop-shadow-[0_20px_30px_rgba(16,185,129,0.3)]';
                sq.style.backgroundImage = `url('${img(oldImage)}')`;
                    const top = i * 20, bottom = 100 - (i + 1) * 20;
                    const left = j * 20, right = 100 - (j + 1) * 20;
                    sq.style.clipPath = `inset(${top}% ${right}% ${bottom}% ${left}%)`;
                    squaresContainerRef.current.appendChild(sq);
                    squares.push(sq);
                }
            }
            
            squaresContainerRef.current.offsetHeight; // شForce reflow
            
            squares.forEach(sq => {
                setTimeout(() => {
                    sq.style.opacity = '0';
                    setTimeout(() => {
                        if (squaresContainerRef.current && sq.parentNode === squaresContainerRef.current) {
                            squaresContainerRef.current.removeChild(sq);
                        }
                    }, 1000);
                }, Math.random() * 800);
            });
        }
        
        indexRef.current = nextIdx;
        setCurrentIndex(nextIdx);
    };

    useEffect(() => {
        if (!images || images.length <= 1) return;
        
        const tick = () => {
            const nextIdx = (indexRef.current + 1) % images.length;
            triggerTransition(nextIdx);
        };

        timerRef.current = setInterval(tick, 6000);
        return () => clearInterval(timerRef.current);
    }, [images]);

    const handleNext = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (timerRef.current) clearInterval(timerRef.current);
        const nextIdx = (indexRef.current + 1) % images.length;
        triggerTransition(nextIdx);
        timerRef.current = setInterval(() => triggerTransition((indexRef.current + 1) % images.length), 6000);
    };

    const handlePrev = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (timerRef.current) clearInterval(timerRef.current);
        const nextIdx = (indexRef.current - 1 + images.length) % images.length;
        triggerTransition(nextIdx);
        timerRef.current = setInterval(() => triggerTransition((indexRef.current + 1) % images.length), 6000);
    };

    if (!images || images.length === 0) return null;
    if (images.length === 1) {
        return (
            <div className={`relative w-full aspect-square bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl ${className}`}>
                <img src={img(images[0])} alt="Product" className="w-full h-full object-cover filter drop-shadow-[0_20px_30px_rgba(16,185,129,0.3)]" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 mix-blend-overlay">
                    <img src={img('/images/factory-logo.png')} alt="Watermark" className="w-1/2 opacity-30 drop-shadow-lg" />
                </div>
            </div>
        );
    }

    return (
        <div className={`group relative w-full aspect-square bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl ${className}`}>
            <div className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-700" style={{ backgroundImage: `url('${img(images[currentIndex])}')` }}>
                <div ref={squaresContainerRef} className="absolute inset-0 pointer-events-none" />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 mix-blend-overlay">
                <img src={img('/images/factory-logo.png')} alt="Watermark" className="w-1/2 opacity-30 drop-shadow-lg" />
            </div>

            {/* Navigation Buttons */}
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-none">
                <button 
                    onClick={handlePrev} 
                    className="pointer-events-auto w-12 h-12 rounded-full bg-black/40 border border-white/20 text-white flex items-center justify-center hover:bg-primary hover:text-black hover:scale-110 transition-all backdrop-blur-md"
                >
                    <ChevronRight size={24} />
                </button>
                <button 
                    onClick={handleNext} 
                    className="pointer-events-auto w-12 h-12 rounded-full bg-black/40 border border-white/20 text-white flex items-center justify-center hover:bg-primary hover:text-black hover:scale-110 transition-all backdrop-blur-md"
                >
                    <ChevronLeft size={24} />
                </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-30">
                {images.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`transition-all duration-500 rounded-full ${idx === currentIndex ? 'w-8 h-2 bg-primary' : 'w-2 h-2 bg-white/40'}`}
                    />
                ))}
            </div>
        </div>
    );
};

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
                            <FadingProductGallery images={product.images || (product.image ? [product.image] : [])} />
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
                    
                    <div className="mb-12 border-r-4 border-primary pr-6">
                        <p className="text-xl text-slate-300 mb-4 leading-relaxed font-bold">
                            {product.shortDescription}
                        </p>
                        <p className="text-base text-slate-400 leading-relaxed font-light whitespace-pre-line">
                            {category.description}
                        </p>
                    </div>

                    {/* Chic Specs Table */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl mb-12">
                        <div className="p-6 border-b border-white/10 bg-black/40 flex items-center gap-3">
                            <Info className="text-primary" size={24} />
                            <h3 className="text-xl font-bold text-white">المواصفات الفنية والمقاسات</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-white/10">
                            {/* Left Column (Even indexes) */}
                            <div className="p-6 space-y-6">
                                {Object.entries(product.specs || {}).filter((_, idx) => idx % 2 === 0).map(([key, value]) => {
                                    const isWeight = key.includes('وزن') || key.includes('كثافة');
                                    const isStandard = key.includes('مواصفات');
                                    const isCount = key.includes('مساحة') || key.includes('عدد');
                                    const isForce = key.includes('ضغط') || key.includes('إجهاد');
                                    
                                    const iconBg = isWeight ? 'bg-orange-500/10' : isStandard ? 'bg-emerald-500/10' : isCount ? 'bg-pink-500/10' : isForce ? 'bg-red-500/10' : 'bg-primary/10';
                                    const iconBorder = isWeight ? 'border-orange-500/20' : isStandard ? 'border-emerald-500/20' : isCount ? 'border-pink-500/20' : isForce ? 'border-red-500/20' : 'border-primary/20';
                                    
                                    return (
                                        <div key={key} className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center border ${iconBorder} shrink-0`}>
                                                {isWeight ? <Scale size={24} className="text-orange-500" /> :
                                                 isStandard ? <Info size={24} className="text-emerald-500" /> :
                                                 isCount ? <Box size={24} className="text-pink-500" /> :
                                                 isForce ? <Info size={24} className="text-red-500" /> :
                                                 <Ruler size={24} className="text-primary" />}
                                            </div>
                                            <div>
                                                <p className="text-slate-400 text-sm font-bold mb-1">{key}</p>
                                                <p className="text-white font-bold text-lg" dir={isStandard ? 'ltr' : 'rtl'}>{value}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Right Column (Odd indexes) */}
                            <div className="p-6 space-y-6">
                                {Object.entries(product.specs || {}).filter((_, idx) => idx % 2 !== 0).map(([key, value]) => {
                                    const isWeight = key.includes('وزن') || key.includes('كثافة');
                                    const isStandard = key.includes('مواصفات');
                                    const isCount = key.includes('مساحة') || key.includes('عدد');
                                    const isForce = key.includes('ضغط') || key.includes('إجهاد');
                                    
                                    const iconBg = isWeight ? 'bg-orange-500/10' : isStandard ? 'bg-emerald-500/10' : isCount ? 'bg-pink-500/10' : isForce ? 'bg-red-500/10' : 'bg-primary/10';
                                    const iconBorder = isWeight ? 'border-orange-500/20' : isStandard ? 'border-emerald-500/20' : isCount ? 'border-pink-500/20' : isForce ? 'border-red-500/20' : 'border-primary/20';
                                    
                                    return (
                                        <div key={key} className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center border ${iconBorder} shrink-0`}>
                                                {isWeight ? <Scale size={24} className="text-orange-500" /> :
                                                 isStandard ? <Info size={24} className="text-emerald-500" /> :
                                                 isCount ? <Box size={24} className="text-pink-500" /> :
                                                 isForce ? <Info size={24} className="text-red-500" /> :
                                                 <Ruler size={24} className="text-primary" />}
                                            </div>
                                            <div>
                                                <p className="text-slate-400 text-sm font-bold mb-1">{key}</p>
                                                <p className="text-white font-bold text-lg" dir={isStandard ? 'ltr' : 'rtl'}>{value}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Order Panel */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl">
                        <OrderPanel product={product} categoryId={categoryId} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
