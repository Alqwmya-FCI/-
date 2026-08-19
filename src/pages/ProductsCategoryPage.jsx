import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productsData } from '../data/productsData';
import InteractiveGrid from '../components/InteractiveGrid';
import { ChevronRight, ArrowRight, Layers, ArrowLeft } from 'lucide-react';
import { img } from '../utils/imageProxy';
import { useSEO } from '../hooks/useSEO';

const CATEGORY_TABS = [
    { id: 'bricks', title: 'طوب أسمنتي' },
    { id: 'interlock', title: 'إنترلوك متداخل' },
    { id: 'curbs', title: 'بردورات خرسانية' },
    { id: 'blocks', title: 'بلوك مفرغ' },
    { id: 'tiles', title: 'بلاط موزايكو' },
];

const ProductsCategoryPage = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const category = productsData[categoryId];

    useSEO({
        title: `${category?.title || 'المنتجات'} | مصنع القومية للصناعات الأسمنتية`,
        description: category?.description || 'تصفح أفضل منتجات مصنع القومية للصناعات الأسمنتية: طوب أسمنتي، إنترلوك آلي، بردورات خرسانية، بلوك أسمنتي مفرغ وبلاط موزايكو.',
        keywords: `${category?.title || ''}, مصنع القومية, اسعار ${category?.title || ''}, مواصفات ${category?.title || ''}`,
        url: `https://alqwmya.com/products/${categoryId}`
    });

    useEffect(() => {
        if (!category) {
            navigate('/#products');
        }
        window.scrollTo(0, 0);
    }, [category, navigate]);

    if (!category) return null;

    return (
        <div className="bg-slate-900 min-h-screen w-full relative overflow-hidden text-right" dir="rtl">
            <InteractiveGrid />
            
            {/* Header */}
            <div className="relative z-10 p-6 md:p-12 border-b border-white/10 bg-black/40 backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <Link 
                        to="/#products" 
                        className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors font-bold text-sm bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full border border-white/10 w-fit"
                    >
                        <ChevronRight size={18} />
                        العودة لدليل المنتجات الكامل
                    </Link>

                    {/* Category Switcher Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {CATEGORY_TABS.map(tab => (
                            <Link
                                key={tab.id}
                                to={`/products/${tab.id}`}
                                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                                    tab.id === categoryId
                                        ? 'bg-primary text-black border-primary shadow-lg'
                                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                {tab.title}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight">{category.title}</h1>
                    <p className="text-slate-400 text-sm md:text-base max-w-3xl leading-relaxed">{category.description}</p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="relative z-10 container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {category.items.map((product, idx) => (
                        <Link 
                            key={product.id} 
                            to={`/products/${categoryId}/${product.id}`}
                            className="group relative bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.3)] flex flex-col"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            {/* Product Image Area */}
                            <div className="relative h-64 md:h-80 w-full bg-white/5 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl rounded-full scale-150 mix-blend-screen" />
                                <img
                                    src={img(product.image || product.images?.[0])}
                                    alt={product.name}
                                    className="w-full h-full object-cover filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-700 relative z-10"
                                />
                            </div>
                            
                            {/* Product Info */}
                            <div className="p-8 border-t border-white/10 flex flex-col flex-grow bg-black/20 backdrop-blur-sm">
                                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{product.name}</h2>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{product.shortDescription}</p>
                                
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                        عرض التفاصيل والطلب
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-primary group-hover:text-black flex items-center justify-center transition-colors text-white">
                                        <ArrowLeft size={16} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductsCategoryPage;
