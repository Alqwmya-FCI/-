import React from 'react';

// العملاء اللي ليهم لوجو (هيتعرضوا في الشريط اللي فوق)
const clientsWithLogos = [
    { name: "مصر للبترول", logo: "/images/logos/شركة مصر للبترول.png" },
    { name: "بتروجت", logo: "/images/logos/شركة بترو جت.png" },
    { name: "المقاولون العرب", logo: "/images/logos/المقاولون العرب.png" },
    { name: "الهيئة الهندسية للقوات المسلحة", logo: "/images/logos/الهئية الهندسية للقوات المسلحة.png" },
    { name: "هيئة قناة السويس", logo: "/images/logos/هئية قناة السويس الاسماعلية السويس بورسعيد.png" },
    { name: "الهيئة العامة للأبنية التعليمية", logo: "/images/logos/الهئية العامة للابنية التعليمية الاسماعيلية السويس الشرقية.png" },
    { name: "الشركة المصرية للمقاولات", logo: "/images/logos/الشركة المصرية للمقاولات مختار سابقا.png" },
    { name: "جامعة قناة السويس", logo: "/images/logos/جامعة قناة السويس.png" },
    { name: "الجمعية التعاونية المشتركة", logo: "/images/logos/الجمعية التعاونية المشتركة للبناء والتشيد الفردان.png" }
];

// العملاء اللي ملهمش لوجو (هيتعرضوا في الشريط اللي تحت)
const clientsWithoutLogos = [
    { name: "الشعبة الهندسية للقوات الجوية" },
    { name: "الشعبة الهندسية لعمليات الجيش الثاني الميداني" },
    { name: "الشعبة الهندسية للجيش الثالث الميداني" },
    { name: "المجمع الصناعي بأبو خليفة" }
];

const ClientsMarquee = () => {
    return (
        <section className="py-12 bg-surface overflow-hidden border-y border-outline-variant/30">
            <div className="max-w-screen-xl mx-auto px-6 md:px-12 mb-8">
                <h3 className="text-xl md:text-2xl font-bold text-on-surface text-center uppercase tracking-wider">
                    أبرز المشاريع والعملاء
                </h3>
            </div>
            
            {/* الشريط اللي فوق (للعملاء اللي ليهم لوجو) */}
            <div className="relative flex overflow-hidden group w-full bg-surface" dir="ltr">
                <div className="flex whitespace-nowrap animate-marquee-css items-center flex-shrink-0 min-w-full">
                    {clientsWithLogos.map((client, index) => (
                        <span key={`client-1-${index}`} className="mx-4 text-sm sm:text-lg md:text-xl font-bold text-on-surface-variant hover:text-primary transition-colors bg-surface-container pr-2 pl-6 py-2 rounded-full border border-outline-variant shadow-sm inline-flex items-center gap-3" dir="rtl">
                            {client.logo && (
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0 border border-outline-variant/30 shadow-sm overflow-hidden p-1.5">
                                    <img src={client.logo} alt={client.name} className="w-full h-full object-contain" loading="lazy" />
                                </div>
                            )}
                            <span>{client.name}</span>
                        </span>
                    ))}
                </div>
                <div className="flex whitespace-nowrap animate-marquee-css items-center flex-shrink-0 min-w-full" aria-hidden="true">
                    {clientsWithLogos.map((client, index) => (
                        <span key={`client-2-${index}`} className="mx-4 text-sm sm:text-lg md:text-xl font-bold text-on-surface-variant hover:text-primary transition-colors bg-surface-container pr-2 pl-6 py-2 rounded-full border border-outline-variant shadow-sm inline-flex items-center gap-3" dir="rtl">
                            {client.logo && (
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0 border border-outline-variant/30 shadow-sm overflow-hidden p-1.5">
                                    <img src={client.logo} alt={client.name} className="w-full h-full object-contain" loading="lazy" />
                                </div>
                            )}
                            <span>{client.name}</span>
                        </span>
                    ))}
                </div>
            </div>
            
            {/* الشريط اللي تحت (للعملاء اللي ملهمش لوجو) - Reverse Marquee */}
            <div className="relative flex overflow-hidden group mt-6 w-full bg-surface" dir="ltr">
                <div className="flex whitespace-nowrap animate-marquee-css-reverse items-center flex-shrink-0 min-w-full">
                    {clientsWithoutLogos.slice().reverse().map((client, index) => (
                        <span key={`client-rev1-${index}`} className="mx-4 text-sm sm:text-lg md:text-xl font-bold text-on-surface-variant hover:text-primary transition-colors bg-surface-container pr-2 pl-6 py-2 rounded-full border border-outline-variant shadow-sm inline-flex items-center gap-3" dir="rtl">
                            {client.logo && (
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0 border border-outline-variant/30 shadow-sm overflow-hidden p-1.5">
                                    <img src={client.logo} alt={client.name} className="w-full h-full object-contain" loading="lazy" />
                                </div>
                            )}
                            <span>{client.name}</span>
                        </span>
                    ))}
                </div>
                <div className="flex whitespace-nowrap animate-marquee-css-reverse items-center flex-shrink-0 min-w-full" aria-hidden="true">
                    {clientsWithoutLogos.slice().reverse().map((client, index) => (
                        <span key={`client-rev2-${index}`} className="mx-4 text-sm sm:text-lg md:text-xl font-bold text-on-surface-variant hover:text-primary transition-colors bg-surface-container pr-2 pl-6 py-2 rounded-full border border-outline-variant shadow-sm inline-flex items-center gap-3" dir="rtl">
                            {client.logo && (
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0 border border-outline-variant/30 shadow-sm overflow-hidden p-1.5">
                                    <img src={client.logo} alt={client.name} className="w-full h-full object-contain" loading="lazy" />
                                </div>
                            )}
                            <span>{client.name}</span>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ClientsMarquee;
