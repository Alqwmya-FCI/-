import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';
import SEOFAQSection from '../components/SEOFAQSection';
import FactoryLocationSection from '../components/FactoryLocationSection';
import AboutSection from '../components/AboutSection';
import TeamSection from '../components/TeamSection';
import FadingSquareCard from '../components/FadingSquareCard';

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

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDark, setIsDark] = useState(true);
    const [lang, setLang] = useState('ar');
    const [counts, setCounts] = useState({ stat1: 0, stat2: 0, stat3: 0 });
    const statsRef = useRef(null);
    const canvasRef = useRef(null);

    const isAr = lang === 'ar';
    const t = translations[lang];

    useSEO({
        title: 'مصنع القومية للصناعات الأسمنتية | طوب أسمنتي، إنترلوك، بردورات، بلاط موزايكو',
        description: 'مصنع القومية للصناعات الأسمنتية (تأسس 1996) - أفضل مصنع لإنتاج الطوب الأسمنتي المصمت والمفرغ، بلاط الإنترلوك الآلي، البردورات الخرسانية، وبلاط الموزايكو والأسمنتي في مصر بأعلى معايير الجودة والمواصفات القياسية.',
        keywords: 'مصنع طوب اسمنتي, انترلوك اسعار, بردورات خرسانية, بلاط موزايكو, مصنع القومية, بلوك اسمنتي مفرغ, طوب اسمنتي مصمت, مصانع الاسماعيلية, اسعار الانترلوك في مصر',
        image: 'https://alqwmya.com/images/اساسي2.jpg',
        url: 'https://alqwmya.com/'
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSliderImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    useEffect(() => {
        document.documentElement.dir = isAr ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    }, [lang, isAr]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const duration = 2000;
                const steps = 50;
                const stepTime = duration / steps;
                let step = 0;

                const timer = setInterval(() => {
                    step++;
                    const progress = step / steps;
                    setCounts({
                        stat1: Math.floor(progress * 28),
                        stat2: Math.floor(progress * 50000),
                        stat3: Math.floor(progress * 1200),
                    });
                    if (step >= steps) clearInterval(timer);
                }, stepTime);

                observer.disconnect();
            }
        }, { threshold: 0.3 });

        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const gridSize = 40;
        const trails = [];

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
                ctx.fillStyle = `rgba(16, 185, 129, ${trail.life * 0.2})`;
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
        if (window.location.hash) {
            const id = window.location.hash;
            setTimeout(() => {
                const el = document.querySelector(id);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            }, 150);
        }
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
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50 opacity-40" />

            {/* ═══════════════ NAVBAR ═══════════════ */}
            <nav className="fixed top-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/50">
                <div className="max-w-screen-xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full p-1 overflow-hidden">
                            <img src="/images/logo.png" alt="القومية للصناعات الأسمنتية" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-on-surface uppercase">
                            {t.title}
                        </span>
                    </div>

                    <ul className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider">
                        <li><a className="text-on-surface-variant hover:text-primary transition-colors uppercase" href="#about">{t.aboutTitle}</a></li>
                        <li><a className="text-on-surface-variant hover:text-primary transition-colors uppercase" href="#products">{t.navProducts}</a></li>
                        <li><a className="text-on-surface-variant hover:text-primary transition-colors uppercase" href="#specs">{t.navSpecs}</a></li>
                        <li><a className="text-on-surface-variant hover:text-primary transition-colors uppercase" href="#contact">{t.navServices}</a></li>
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
                        <a href="#products" className="hidden sm:flex bg-primary text-background text-xs font-bold px-6 py-3 rounded-full hover:bg-emerald-400 transition-colors uppercase tracking-widest items-center gap-2">
                            {t.reqQuote}
                            <span className="material-symbols-outlined text-[16px]" style={{ transform: isAr ? 'scaleX(-1)' : 'scaleX(1)' }}>arrow_forward</span>
                        </a>
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

                <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 w-full py-12">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-on-surface tracking-tight mb-4 uppercase leading-none reveal">
                            {t.heroTitle1} <br />
                            <span className="text-primary">{t.heroTitle2}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-on-surface-variant font-normal mb-8 max-w-xl leading-relaxed reveal">
                            {t.heroSubtitle}
                        </p>
                        <div className="flex flex-wrap gap-4 text-xs font-mono text-on-surface-variant mb-10 reveal">
                            <span className="bg-surface-container px-3 py-1.5 border border-outline-variant">{t.heroTag1}</span>
                            <span className="bg-surface-container px-3 py-1.5 border border-outline-variant">{t.heroTag2}</span>
                            <span className="bg-surface-container px-3 py-1.5 border border-outline-variant">{t.heroTag3}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 reveal">
                            <a href="#products" className="bg-primary text-background font-bold px-8 py-4 rounded-full hover:bg-emerald-400 transition-colors uppercase tracking-widest text-sm inline-flex items-center gap-3">
                                {t.exploreProd}
                                <span className="material-symbols-outlined" style={{ transform: isAr ? 'scaleX(-1)' : 'scaleX(1)' }}>arrow_forward</span>
                            </a>
                            <a href="#contact" className="border border-outline-variant text-on-surface hover:bg-surface-container px-8 py-4 rounded-full transition-colors uppercase tracking-widest text-sm font-semibold">
                                {t.contactUs}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
            </section>

            {/* ═══════════════ STATS ═══════════════ */}
            <section ref={statsRef} className="py-20 bg-surface-container border-b border-outline-variant/50">
                <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex flex-col border-s border-outline-variant/30 ps-8 reveal">
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-6xl font-black text-on-surface tracking-tighter font-mono">+{counts.stat1}</span>
                                <span className="text-primary font-bold">/01</span>
                            </div>
                            <span className="text-xs text-on-surface-variant uppercase tracking-widest font-semibold">{t.stat1Label}</span>
                        </div>
                        <div className="flex flex-col border-s border-outline-variant/30 ps-8 reveal">
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-6xl font-black text-on-surface tracking-tighter font-mono">+{counts.stat2.toLocaleString()}</span>
                                <span className="text-primary font-bold">/02</span>
                            </div>
                            <span className="text-xs text-on-surface-variant uppercase tracking-widest font-semibold">{t.stat2Label}</span>
                        </div>
                        <div className="flex flex-col border-s border-outline-variant/30 ps-8 reveal">
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-6xl font-black text-on-surface tracking-tighter font-mono">+{counts.stat3.toLocaleString()}</span>
                                <span className="text-primary font-bold">/03</span>
                            </div>
                            <span className="text-xs text-on-surface-variant uppercase tracking-widest font-semibold">{t.stat3Label}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ ABOUT SECTION ═══════════════ */}
            <AboutSection t={t} isAr={isAr} />

            {/* ═══════════════ PRODUCTS (BENTO) ═══════════════ */}
            <section id="products" className="py-32 bg-surface border-b border-outline-variant/50">
                <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-12 gap-2 md:gap-4">
                        <FadingSquareCard 
                            className="col-span-7 md:col-span-8 bg-surface-container border border-outline-variant min-h-[200px] md:min-h-[350px]"
                            images={productImages.card1}
                            label={t.card1}
                            offset={0}
                            to="/products/bricks"
                        />
                        <FadingSquareCard 
                            className="col-span-5 md:col-span-4 bg-inverse-surface min-h-[200px] md:min-h-[350px]"
                            images={productImages.card2}
                            label={t.card2}
                            offset={1000}
                            to="/products/interlock"
                        />
                        <FadingSquareCard 
                            className="col-span-5 md:col-span-4 bg-surface min-h-[200px] md:min-h-[350px] border border-outline-variant"
                            images={productImages.card3}
                            label={t.card3}
                            offset={2000}
                            to="/products/blocks"
                        />
                        <FadingSquareCard 
                            className="col-span-7 md:col-span-8 min-h-[200px] md:min-h-[350px] border border-outline-variant"
                            images={productImages.card4}
                            label={t.card4}
                            offset={3000}
                            to="/products/curbs"
                        />
                        <FadingSquareCard 
                            className="col-span-12 min-h-[200px] md:min-h-[350px] border border-outline-variant"
                            images={productImages.card5}
                            label={t.card5}
                            to="/products/tiles"
                        />
                    </div>
                </div>
            </section>

            {/* ═══════════════ FACTORY MAP & LOCATION ═══════════════ */}
            <FactoryLocationSection isAr={isAr} />

            {/* ═══════════════ TEAM SECTION ═══════════════ */}
            <TeamSection t={t} isAr={isAr} />

            {/* ═══════════════ FAQ & TECHNICAL SPECS (SEO) ═══════════════ */}
            <SEOFAQSection isAr={isAr} />
        </div>
    );
};

export default HomePage;
