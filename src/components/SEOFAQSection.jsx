import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqItems = [
    {
        qAr: 'ما هي مواصفات وأسعار الطوب الأسمنتي المصمت مقاس 25 و 20؟',
        qEn: 'What are the specs and prices of solid cement bricks size 25 & 20?',
        aAr: 'يصنع الطوب الأسمنتي المصمت في مصنع القومية طبقاً للمواصفة القياسية المصرية ES 1292، بمقاسات 25×12×6 سم و 20×10×6 سم، بقوة ضغط تتجاوز 7 نيوتن/مم2 ونسبة امتصاص أقل من 7%، مما يجعله الخيار الأول لتأسيس الحوائط الحاملة والبدرومات وغرف التفتيش. تتوفر أسعار الجملة والتوريد لجميع المحافظات.',
        aEn: 'Manufactured according to Egyptian Standards ES 1292 in sizes 25x12x6 cm and 20x10x6 cm with compressive strength > 7 N/mm2 and absorption < 7%, ideal for load-bearing walls and foundations.'
    },
    {
        qAr: 'ما هي أنواع الإنترلوك المتداخل المتوفرة وأفضل سمك للاستخدام؟',
        qEn: 'What interlock types are available and what is the best thickness?',
        aAr: 'نوفر إنترلوك سداسي، إنترلوك باركيه، إنترلوك حرف H، إنترلوك حرف S، وإنترلوك شبك ديكور. سمك 6 سم مخصص للمشايات والحدائق والسيارات الملاكي، وسمك 8 سم و 10 سم صُمم خصيصاً لتحمل شاحنات النقل الثقيل، محطات الوقود، والموانئ والمناطق الصناعية.',
        aEn: 'We produce Hexagonal, Parquet, H-Shape, S-Shape, and Grass/Honeycomb interlock. 6cm for pedestrian walkways & light parking, 8cm & 10cm for heavy transport and industrial zones.'
    },
    {
        qAr: 'ما هي أنواع البردورات الخرسانية (البلدورة) واستخداماتها؟',
        qEn: 'What types of concrete kerbstones are available?',
        aAr: 'ينتج المصنع بردورات خرسانية آلية عالية المتانة تشمل: بلدورة وسط (50×15×30 سم) للشوارع والميادين، بلدورة عجالي (50×30×30 سم) للطرق السريعة والكباري، وبلدورة جناين (50×8×25 سم) لأعمال اللاندسكيب والحدائق والقرى السياحية.',
        aEn: 'We offer Medium Kerbstones (50x15x30 cm) for city roads, Jumbo/Highway Kerbstones (50x30x30 cm) for expressways, and Garden Kerbstones (50x8x25 cm) for landscaping.'
    },
    {
        qAr: 'ما هي مميزات ومقاسات البلوك الأسمنتي المفرغ؟',
        qEn: 'What are the specifications of hollow cement blocks?',
        aAr: 'يتوفر البلوك المفرغ بمقاسات 10، 12، 12 دبل، 15، 20، و 25 سم، ويتميز بخفة الوزن لتقليل الأحمال على الأعمدة والأساسات مع توفير عزل حراري وصوتي عالي وسرعة فائقة في بناء القواطع وأسوار المصانع والمنشآت.',
        aEn: 'Available in widths of 10, 12, 12-double, 15, 20, and 25 cm, providing exceptional sound & thermal insulation and fast construction for factory walls and partitions.'
    },
    {
        qAr: 'ما هي استخدامات ومميزات بلاط الموزايكو في المباني الحكومية والمدارس والسلالم؟',
        qEn: 'What are the benefits of mosaic terrazzo tiles for schools & government buildings?',
        aAr: 'يُعتبر بلاط الموزايكو الأسمنتي (مقاس 25×25 و 30×30 سم) المعيار القياسي للأرضيات الداخلية في المدارس، الجامعات، المستشفيات، والمصالح الحكومية نظراً لمقاومته الفائقة للاحتكاك الشديد وحركة الأقدام الكثيفة. كما يُستخدم كبديل اقتصادي وعملي للرخام في السلالم والممرات والبدرومات لسهولة جليه وتلميعه وتحمله للرطوبة والأحمال العالية.',
        aEn: 'Mosaic terrazzo tiles (25x25 & 30x30 cm) are the standard for high-traffic interior floors in schools, hospitals, and government facilities due to exceptional abrasion resistance, moisture durability in basements, and being a cost-effective alternative to marble on stairs.'
    },
    {
        qAr: 'كيف يتم طلب التسعير والتوريد لمواقع المشاريع؟',
        qEn: 'How to request quotation and delivery to project sites?',
        aAr: 'يمكنك طلب عرض أسعار فوري بالتواصل المباشر مع إدارة المبيعات عبر الواتساب أو الاتصال الهاتفي. يتوفر أسطول نقل مجهز لتوريد المنتجات لجميع أنحاء الجمهورية (القاهرة الجديدة، العاصمة الإدارية، العاشر من رمضان، بلبيس، الشروق، وباقي المحافظات).',
        aEn: 'You can request instant quotes directly via WhatsApp or phone call. We deliver across Cairo, New Capital, 10th of Ramadan, and all Egyptian governorates.'
    }
];

export default function SEOFAQSection({ isAr = true }) {
    const [openIdx, setOpenIdx] = useState(0);

    const toggle = (idx) => {
        setOpenIdx(prev => (prev === idx ? -1 : idx));
    };

    return (
        <section className="py-24 bg-surface-container-lowest border-t border-outline-variant/20 relative z-10" id="faq">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-primary mb-3 tracking-widest uppercase bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                        <HelpCircle size={14} />
                        {isAr ? 'المواصفات الفنية والأسئلة الشائعة' : 'Technical Specs & FAQ'}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-on-surface mb-4">
                        {isAr ? 'دليل منتجات مصنع القومية' : 'Al-Qawmia Product Guide'}
                    </h2>
                    <p className="text-on-surface-variant text-sm md:text-base max-w-2xl mx-auto">
                        {isAr 
                            ? 'إجابات شاملة حول مواصفات الطوب المصمت، الإنترلوك، البردورات، والبلوك الأسمنتي طبقاً للكود المصري.' 
                            : 'Comprehensive answers regarding cement bricks, interlock pavers, kerbstones, and blocks according to Egyptian building codes.'}
                    </p>
                </div>

                <div className="space-y-4">
                    {faqItems.map((item, idx) => {
                        const isOpen = openIdx === idx;
                        return (
                            <div 
                                key={idx}
                                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                                    isOpen 
                                        ? 'bg-surface-container border-primary/40 shadow-lg' 
                                        : 'bg-surface-container-low border-outline-variant/40 hover:border-primary/30'
                                }`}
                            >
                                <button
                                    onClick={() => toggle(idx)}
                                    className="w-full p-6 text-right flex items-center justify-between gap-4 cursor-pointer"
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-base md:text-lg font-bold text-on-surface">
                                        {isAr ? item.qAr : item.qEn}
                                    </span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                                        isOpen ? 'bg-primary text-black rotate-180' : 'bg-surface-container-high text-on-surface'
                                    }`}>
                                        <ChevronDown size={18} />
                                    </div>
                                </button>
                                
                                {isOpen && (
                                    <div className="px-6 pb-6 pt-2 text-on-surface-variant text-sm md:text-base leading-relaxed border-t border-outline-variant/10">
                                        <p>{isAr ? item.aAr : item.aEn}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
