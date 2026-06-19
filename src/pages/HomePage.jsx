import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
const heroSliderImages = [
    '/images/اساسي2.jpg',
    '/images/اساسي3.jpg',
    '/images/اساسي4.jpg',
    '/images/اساسي6.jpg',
    '/images/IMG-20250627-WA0016.jpg',
    '/images/IMG-20260113-WA0062.jpg',
    '/images/IMG-20260113-WA0055.jpg',
    '/images/IMG-20260103-WA0079 (1).jpg',
    '/images/IMG-20260103-WA0077.jpg',
];

const productImages = {
    card1: ['/images/طوب اسمنتي مصمط.png', '/images/طوب اسمنتي مصمط 25.png'],
    card2: ['/images/انترلوك سداسي احمر 8 سم.png', '/images/انترولك اتش 6 سم رمادي.png'],
    card3: ['/images/بلوك 12 مفرغ.png', '/images/بلوك 25 استي مفرغ.png', '/images/طوب كلستر مفرغ شبك.png'],
    card4: ['/images/بلدورة وسط.png', '/images/بلودورة عجالي.png'],
    card5: ['/images/بلاط موزايكو كرارة.png']
};

const translations = {
    ar: {
        title: 'القومية للصناعات',
        navProducts: 'المنتجات',
        navProjects: 'مشاريعنا',
        navSpecs: 'المواصفات',
        navServices: 'الخدمات',
        reqQuote: 'طلب تسعير',
        sysGrade: 'النظام يعمل // درجة صناعية',
        heroTitle1: 'مصنع القومية',
        heroTitle2: 'للصناعات الأسمنتية',
        heroSubtitle: 'متخصصون في صناعة المنتجات الأسمنتية عالية الجودة',
        heroTag1: '🏗️ جودة عالمية',
        heroTag2: 'دقة في التصنيع',
        heroTag3: 'التزام في المواعيد',
        exploreProd: 'استكشف منتجاتنا',
        contactUs: 'تواصل معنا',
        stat1Label: 'سنة خبرة',
        stat2Label: 'طن إنتاج شهري',
        stat3Label: 'عملاء',
        corpProfile: 'Corporate Profile',
        aboutTitle: 'عن المصنع',
        aboutSub: 'منذ 1996: خبرة عريقة في صناعة المنتجات الأسمنتية',
        aboutDesc: 'مصنع القومية للصناعات الأسمنتية تأسس عام 1996، ويُعد من المصانع الرائدة في مجال إنتاج المنتجات الأسمنتية عالية الجودة. نتخصص في صناعة الطوب والبلوك الأسمنتي بجميع أنواعه ومقاساته، الإنترلوك الآلي بأنواعه، البردورات، وبلاط المزايكو.',
        f1: 'مصنع متخصص ومتطور',
        f2: 'معدات آلية حديثة',
        f3Title: 'جودة مطابقة للمواصفات',
        f3Desc: 'جميع منتجاتنا تخضع لاختبارات جودة صارمة لضمان المتانة والعمر الافتراضي الطويل.',
        imgData: 'بيانات: CON-1996',
        card1: 'طوب أسمنتي',
        card2: 'إنترلوك آلي',
        card3: 'بلوك أسمنتي',
        card4: 'بردورات',
        card5: 'بلاط موزايكو وأسمنتي',
        teamSection: 'OUR_TEAM',
        teamTitle: 'فريق الإدارة',
        teamSub: 'فريق الإدارة في خدمتك',
        roleAli: 'رئيس مجلس الإدارة',
        roleHussein: 'مدير الإنتاج والجودة',
        whatsapp: 'واتساب متاح',
        viewCV: 'عرض السيرة الذاتية ←'
    },
    en: {
        title: 'Al-Qawmia',
        navProducts: 'Products',
        navProjects: 'Projects',
        navSpecs: 'Specs',
        navServices: 'Services',
        reqQuote: 'Get Quote',
        sysGrade: 'System Active // Industrial Grade',
        heroTitle1: 'Al-Qawmia Factory',
        heroTitle2: 'For Cement Industries',
        heroSubtitle: 'Specialized in manufacturing high quality cement products',
        heroTag1: '🏗️ Global Quality',
        heroTag2: 'Precision Manufacturing',
        heroTag3: 'Punctual Delivery',
        exploreProd: 'Explore Products',
        contactUs: 'Contact Us',
        stat1Label: 'Years Experience',
        stat2Label: 'Tons Monthly',
        stat3Label: 'Happy Clients',
        corpProfile: 'Corporate Profile',
        aboutTitle: 'About Factory',
        aboutSub: 'Since 1996: Deep expertise in cement products',
        aboutDesc: 'Al-Qawmia Factory for Cement Industries was established in 1996 and is a pioneer in high-quality concrete products. We specialize in automated interlock, cement bricks, blocks, curbs, and mosaic tiles.',
        f1: 'Specialized & Advanced Factory',
        f2: 'Modern Automated Equipment',
        f3Title: 'Standard-Compliant Quality',
        f3Desc: 'All products undergo rigorous quality tests to ensure durability and long lifespan.',
        imgData: 'Data: CON-1996',
        card1: 'Cement Bricks',
        card2: 'Automated Interlock',
        card3: 'Cement Blocks',
        card4: 'Curbs',
        card5: 'Mosaic & Cement Tiles',
        teamSection: 'OUR_TEAM',
        teamTitle: 'Management Team',
        teamSub: 'Our team is at your service',
        roleAli: 'Chairman',
        roleHussein: 'Production & Quality Manager',
        whatsapp: 'WhatsApp Available',
        viewCV: 'View Profile →'
    }
};

const FadingSquareCard = ({ images, label, className, offset = 0, to }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const indexRef = useRef(0);
    const squaresContainerRef = useRef(null);
    
    useEffect(() => {
        if (!images || images.length <= 1) return;
        
        let timer;
        const tick = () => {
            const currentIdx = indexRef.current;
            const nextIdx = (currentIdx + 1) % images.length;
            const oldImage = images[currentIdx];
            
            if (squaresContainerRef.current) {
                const squares = [];
                for (let i = 0; i < 5; i++) {
                    for (let j = 0; j < 5; j++) {
                        const sq = document.createElement('div');
                        sq.className = 'absolute inset-0 bg-center bg-cover transition-opacity duration-500 z-10';
                        sq.style.backgroundImage = `url('${oldImage}')`;
                        const top = i * 20, bottom = 100 - (i + 1) * 20;
                        const left = j * 20, right = 100 - (j + 1) * 20;
                        sq.style.clipPath = `inset(${top}% ${right}% ${bottom}% ${left}%)`;
                        squaresContainerRef.current.appendChild(sq);
                        squares.push(sq);
                    }
                }
                
                // Force reflow
                squaresContainerRef.current.offsetHeight;
                
                squares.forEach(sq => {
                    setTimeout(() => {
                        sq.style.opacity = '0';
                        setTimeout(() => {
                            if (squaresContainerRef.current && sq.parentNode === squaresContainerRef.current) {
                                squaresContainerRef.current.removeChild(sq);
                            }
                        }, 500);
                    }, Math.random() * 400);
                });
            }
            
            indexRef.current = nextIdx;
            setCurrentIndex(nextIdx);
        };

        const initialDelay = setTimeout(() => {
            tick();
            timer = setInterval(tick, 4000);
        }, offset);

        return () => {
            clearTimeout(initialDelay);
            clearInterval(timer);
        };
    }, [images, offset]);

    const cardContent = (
        <div className={`group relative reveal overflow-hidden flex flex-col justify-end rounded-sm w-full h-full ${className}`}>
            <div className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${images[currentIndex]}')` }}>
                <div ref={squaresContainerRef} className="absolute inset-0 pointer-events-none" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20 pointer-events-none" />
            <div className="relative z-30 p-4 md:p-6 pointer-events-none">
                <h3 className="text-lg md:text-2xl text-white font-bold inline-block bg-black/40 backdrop-blur-md px-4 py-2 rounded-sm border border-white/10">{label}</h3>
            </div>
        </div>
    );

    if (to) {
        return (
            <Link to={to} className={`block ${className}`} style={{ textDecoration: 'none' }}>
                {cardContent}
            </Link>
        );
    }

    return cardContent;
};

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDark, setIsDark] = useState(true);
    const [lang, setLang] = useState('ar');

    const t = translations[lang];
    const isAr = lang === 'ar';

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % heroSliderImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const canvas = document.getElementById('global-grid-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const gridSize = 40;
        let trails = [];
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const onMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;
            
            const gridX = Math.floor(x / gridSize) * gridSize;
            const gridY = Math.floor(y / gridSize) * gridSize;
            
            const existing = trails.find(t => t.x === gridX && t.y === gridY);
            if (existing) {
                existing.life = 1;
            } else {
                trails.push({ x: gridX, y: gridY, life: 1 });
            }
        };
        window.addEventListener('mousemove', onMove);

        const animateCanvas = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = trails.length - 1; i >= 0; i--) {
                const trail = trails[i];
                ctx.fillStyle = `rgba(16, 185, 129, ${trail.life * 0.2})`; // Lighter green for global overlay
                ctx.fillRect(trail.x, trail.y, gridSize, gridSize);
                
                trail.life -= 0.02;
                if (trail.life <= 0) {
                    trails.splice(i, 1);
                }
            }
            animationFrameId = requestAnimationFrame(animateCanvas);
        };
        animateCanvas();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
        };
    }, []);

    useEffect(() => {
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('active'), i * 100);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        reveals.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div
            className="bg-background text-on-surface min-h-screen flex flex-col overflow-x-hidden"
            dir={isAr ? 'rtl' : 'ltr'}
        >
            <canvas id="global-grid-canvas" />

            {/* Grid Overlay */}
            <div className="fixed inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-10 z-0 pointer-events-none" />

            {/* ═══════════════ NAV ═══════════════ */}
            <nav className="bg-background/90 backdrop-blur-xl sticky top-0 z-50 border-b border-outline-variant/50 shadow-sm">
                <div className="flex justify-between items-center w-full px-6 md:px-12 py-4 max-w-screen-xl mx-auto">
                    <a className="font-bold text-xl tracking-tight text-on-surface flex items-center gap-3 group" href="#">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-shadow overflow-hidden">
                            <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain p-1" />
                        </div>
                        {t.title}
                    </a>

                    <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <li><a className="text-on-surface-variant hover:text-primary transition-colors uppercase" href="#">{t.navProducts}</a></li>
                        <li><a className="text-primary border-b-2 border-primary pb-1 uppercase" href="#">{t.navProjects}</a></li>
                        <li><a className="text-on-surface-variant hover:text-primary transition-colors uppercase" href="#">{t.navSpecs}</a></li>
                        <li><a className="text-on-surface-variant hover:text-primary transition-colors uppercase" href="#">{t.navServices}</a></li>
                    </ul>

                    <div className="flex items-center gap-4 text-on-surface-variant">
                        <button
                            onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')}
                            className="hover:text-primary transition-colors"
                            title="تغيير اللغة"
                        >
                            <span className="material-symbols-outlined">language</span>
                        </button>
                        <button
                            onClick={() => setIsDark(d => !d)}
                            className="hover:text-primary transition-colors"
                            title="الوضع الليلي"
                        >
                            <span className="material-symbols-outlined">{isDark ? 'light_mode' : 'dark_mode'}</span>
                        </button>
                        <div className="hidden md:block w-px h-4 bg-outline-variant" />
                        <button className="hidden sm:flex bg-primary text-background text-xs font-bold px-6 py-3 rounded-sm hover:bg-primary-fixed transition-colors uppercase tracking-widest items-center gap-2">
                            {t.reqQuote}
                            <span className="material-symbols-outlined text-[16px]" style={{ transform: isAr ? 'scaleX(-1)' : 'scaleX(1)' }}>arrow_forward</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* ═══════════════ HERO ═══════════════ */}
            <section className="relative min-h-[90vh] flex items-center pt-24 pb-32 border-b border-outline-variant/50 overflow-hidden">
                {heroSliderImages.map((src, index) => (
                    <div
                        key={src}
                        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                        style={{
                            backgroundImage: `url(${src})`,
                            opacity: index === currentSlide ? 0.3 : 0,
                        }}
                    />
                ))}
                <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/40 to-transparent" />

                <div className="max-w-screen-xl mx-auto px-6 md:px-12 w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 flex flex-col justify-center">
                        <h1 className="text-5xl md:text-7xl font-black text-on-surface mb-6 leading-tight reveal mt-4">
                            {t.heroTitle1}<br />
                            <span className="text-primary">{t.heroTitle2}</span>
                        </h1>
                        <p className="text-xl text-on-surface-variant mb-8 max-w-2xl border-primary/50 py-2 reveal" style={{ borderRightWidth: isAr ? '2px' : '0', borderLeftWidth: isAr ? '0' : '2px', paddingRight: isAr ? '1.5rem' : '0', paddingLeft: isAr ? '0' : '1.5rem' }}>
                            {t.heroSubtitle}
                        </p>
                        <div className="flex flex-wrap gap-4 mb-12 text-sm text-on-surface-variant reveal">
                            <span className="bg-surface-container py-2 px-4 border border-outline-variant/50 rounded-sm hover:border-primary transition-colors">{t.heroTag1}</span>
                            <span className="bg-surface-container py-2 px-4 border border-outline-variant/50 rounded-sm hover:border-primary transition-colors">{t.heroTag2}</span>
                            <span className="bg-surface-container py-2 px-4 border border-outline-variant/50 rounded-sm hover:border-primary transition-colors">{t.heroTag3}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-6 reveal">
                            <a className="bg-primary text-background text-lg px-8 py-4 rounded-sm hover:bg-primary-fixed transition-colors shadow-[0_4px_15px_rgba(16,185,129,0.2)] flex items-center gap-3 group relative overflow-hidden font-bold" href="#">
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative z-10">{t.exploreProd}</span>
                                <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform" style={{ transform: isAr ? 'scaleX(-1)' : 'scaleX(1)' }}>arrow_forward</span>
                            </a>
                            <a className="border border-outline-variant text-on-surface text-lg px-8 py-4 rounded-sm hover:border-primary hover:text-primary transition-all flex items-center gap-3 group bg-surface/50 backdrop-blur-sm font-bold" href="#contact">
                                <span>{t.contactUs}</span>
                                <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-all text-primary">chat_bubble</span>
                            </a>
                        </div>
                    </div>

                    <div className="hidden lg:flex lg:col-span-4 justify-end items-center relative reveal">
                        <div className="w-full h-[400px] border border-outline-variant rounded-sm relative shadow-lg overflow-hidden">
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/70 z-10 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/70 z-10 pointer-events-none" />
                            <img src="/images/اساسي1.jpg" alt="المصنع" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ STATISTICS ═══════════════ */}
            <section className="py-8 bg-surface border-b border-outline-variant/50">
                <div className="max-w-screen-xl mx-auto px-4 md:px-12">
                    <div className="grid grid-cols-3 gap-px bg-outline-variant rounded-sm overflow-hidden border border-outline-variant shadow-sm">
                        {[
                            { icon: 'history', value: '٢٨+', label: t.stat1Label },
                            { icon: 'factory', value: '+٢٠,٠٠٠', label: t.stat2Label },
                            { icon: 'handshake', value: '+١٥٠٠', label: t.stat3Label },
                        ].map(stat => (
                            <div key={stat.label} className="bg-surface-container-lowest p-4 md:p-6 flex flex-col items-center justify-center text-center group hover:bg-surface-container transition-all duration-300 relative overflow-hidden hover:shadow-lg hover:z-10 cursor-default">
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <span className="material-symbols-outlined text-[24px] md:text-[32px] text-primary/70 mb-2 group-hover:text-primary transition-colors group-hover:scale-110 duration-300">{stat.icon}</span>
                                <h3 className="text-xl md:text-3xl font-black text-on-surface mb-1">{stat.value}</h3>
                                <p className="text-[10px] md:text-sm text-on-surface-variant font-bold">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ ABOUT ═══════════════ */}
            <section className="py-32 bg-background border-b border-outline-variant/50">
                <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div>
                            <div className="flex items-center gap-4 mb-6 reveal">
                                <div className="h-px w-12 bg-primary" />
                                <span className="text-xs font-bold text-primary uppercase tracking-widest">{t.corpProfile}</span>
                            </div>
                            <h2 className="text-5xl font-black text-on-surface mb-4 reveal">{t.aboutTitle}</h2>
                            <h3 className="text-2xl text-primary mb-8 font-normal reveal">{t.aboutSub}</h3>
                            <p className="text-on-surface-variant mb-10 text-lg leading-relaxed max-w-xl reveal">
                                {t.aboutDesc}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 reveal">
                                {[
                                    { icon: 'precision_manufacturing', title: t.f1 },
                                    { icon: 'settings_suggest', title: t.f2 },
                                ].map(f => (
                                    <div key={f.title} className="bg-surface-container p-6 rounded-sm border border-outline-variant hover:border-primary/50 transition-colors group">
                                        <span className="material-symbols-outlined text-[32px] text-primary mb-4 group-hover:scale-110 transition-transform duration-300 block">{f.icon}</span>
                                        <h4 className="font-bold text-lg text-on-surface mb-2">{f.title}</h4>
                                        <div className="h-1 w-8 bg-outline-variant group-hover:bg-primary transition-colors" />
                                    </div>
                                ))}
                                <div className="bg-surface-container p-6 rounded-sm border border-outline-variant hover:border-primary/50 transition-colors group sm:col-span-2">
                                    <div className="flex items-start gap-4">
                                        <span className="material-symbols-outlined text-[32px] text-primary mt-1 group-hover:scale-110 transition-transform duration-300">verified</span>
                                        <div>
                                            <h4 className="font-bold text-lg text-on-surface mb-2">{t.f3Title}</h4>
                                            <p className="text-sm text-on-surface-variant">{t.f3Desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[500px] w-full rounded-sm overflow-hidden shadow-xl group reveal">
                            <img
                                alt="مصنع القومية"
                                className="w-full h-full object-cover filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                src="/images/اساسي2.jpg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                            <div className={`absolute top-6 ${isAr ? 'left-6' : 'right-6'} text-xs font-bold text-primary bg-surface/90 backdrop-blur-sm px-3 py-1 border border-primary/30 rounded-sm shadow-sm`}>
                                {t.imgData}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ PRODUCTS (BENTO) ═══════════════ */}
            <section className="py-32 bg-surface border-b border-outline-variant/50">
                <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-12 gap-2 md:gap-4">
                        {/* Card 1 — Large (8 cols) */}
                        <FadingSquareCard 
                            className="col-span-7 md:col-span-8 bg-surface-container border border-outline-variant min-h-[200px] md:min-h-[350px]"
                            images={productImages.card1}
                            label={t.card1}
                            offset={0}
                            to="/products/bricks"
                        />

                        {/* Card 2 — Medium (4 cols) */}
                        <FadingSquareCard 
                            className="col-span-5 md:col-span-4 bg-inverse-surface min-h-[200px] md:min-h-[350px]"
                            images={productImages.card2}
                            label={t.card2}
                            offset={1000}
                            to="/products/interlock"
                        />

                        {/* Card 3 — Medium (4 cols) */}
                        <FadingSquareCard 
                            className="col-span-5 md:col-span-4 bg-surface min-h-[200px] md:min-h-[350px] border border-outline-variant"
                            images={productImages.card3}
                            label={t.card3}
                            offset={2000}
                            to="/products/blocks"
                        />

                        {/* Card 4 — Large (8 cols) */}
                        <FadingSquareCard 
                            className="col-span-7 md:col-span-8 min-h-[200px] md:min-h-[350px] border border-outline-variant"
                            images={productImages.card4}
                            label={t.card4}
                            offset={3000}
                            to="/products/curbs"
                        />

                        {/* Card 5 — Full Width (12 cols) */}
                        <FadingSquareCard 
                            className="col-span-12 min-h-[200px] md:min-h-[350px] border border-outline-variant"
                            images={productImages.card5}
                            label={t.card5}
                            to="/products/tiles"
                        />
                    </div>
                </div>
            </section>

            {/* ═══════════════ TEAM ═══════════════ */}
            <section id="contact" className="py-24 bg-surface border-t border-outline-variant/10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="text-xs font-bold text-primary mb-2 tracking-widest uppercase">{t.teamSection}</div>
                        <h2 className="text-5xl font-black text-on-surface mb-4">{t.teamTitle}</h2>
                        <p className="text-xl text-on-surface-variant">{t.teamSub}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                name: isAr ? 'م/ علي عبد الشافي' : 'Eng. Ali Abdelshafy',
                                role: t.roleAli,
                                phone: '01283191597',
                                img: '/images/ali.jpg',
                                href: './eng-ali-abdelshafy/',
                            },
                            {
                                name: isAr ? 'م/ حسين علي عبدالشافي' : 'Eng. Hussein Abdelshafy',
                                role: t.roleHussein,
                                phone: '01286084444',
                                img: '/images/hussein.jpg',
                                href: './eng-hussein-abdelshafy/',
                            },
                        ].map(member => (
                            <a
                                key={member.name}
                                href={member.href}
                                className="bg-surface-container-low border border-outline-variant text-on-surface p-8 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group block"
                            >
                                <div className="relative z-10">
                                    <div className="flex items-center gap-6 mb-8 border-b border-outline-variant pb-6">
                                        <div className="w-24 h-24 bg-surface-container flex items-center justify-center overflow-hidden border-2 border-primary flex-shrink-0">
                                            <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-primary mb-1">{member.name}</h3>
                                            <p className="text-xs text-on-surface-variant">{member.role}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4 text-on-surface">
                                        <div className="flex items-center gap-4">
                                            <span className="material-symbols-outlined text-primary">call</span>
                                            <span dir="ltr">{member.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="material-symbols-outlined text-green-400">chat</span>
                                            <span className="text-green-400">{t.whatsapp}</span>
                                        </div>
                                    </div>
                                    <div className="mt-8 text-center border border-primary text-primary py-3 font-bold group-hover:bg-primary group-hover:text-on-primary transition-colors">
                                        {t.viewCV}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
