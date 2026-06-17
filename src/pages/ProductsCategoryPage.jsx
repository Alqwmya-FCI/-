import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productsData } from '../data/productsData';
import InteractiveGrid from '../components/InteractiveGrid';
import { ChevronRight } from 'lucide-react';

const ProductsCategoryPage = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const category = productsData[categoryId];

    useEffect(() => {
        if (!category) {
            navigate('/');
        }
        window.scrollTo(0, 0);
    }, [category, navigate]);

    if (!category) return null;

    return (
        <div className="bg-slate-900 min-h-screen w-full relative overflow-hidden text-right" dir="rtl">
            <InteractiveGrid />
            
            {/* Header */}
            <div className="relative z-10 p-6 md:p-12 border-b border-white/10 bg-black/40 backdrop-blur-md">
                <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors mb-6 font-bold text-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <ChevronRight size={16} />
                    العودة للرئيسية
                </Link>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">{category.title}</h1>
                <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">{category.description}</p>
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
                                    src={product.image || product.images[0]} 
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
                                        عرض التفاصيل
                                    </span>
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-colors border border-white/10">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="m15 18-6-6 6-6"/></svg>
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
