import React from 'react';
import { MapPin, Navigation, Clock, Phone, Star, ExternalLink, ShieldCheck } from 'lucide-react';

export default function FactoryLocationSection({ isAr = true }) {
    const mapLocationUrl = 'https://maps.app.goo.gl/QneojizzF3fJqKrz6';
    const mapEmbedUrl = 'https://maps.google.com/maps?q=%D9%85%D8%B5%D9%86%D8%B9+%D8%A7%D9%84%D9%82%D9%88%D9%85%D9%8A%D8%A9+%D9%84%D9%84%D8%B5%D9%86%D8%A7%D8%B9%D8%A7%D8%AA+%D8%A7%D9%84%D8%A3%D8%B3%D9%85%D9%86%D8%AA%D9%8A%D8%A9&hl=ar&z=14&output=embed';

    return (
        <section className="py-24 bg-surface relative z-10 border-t border-outline-variant/30 overflow-hidden" id="location">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-primary mb-3 tracking-widest uppercase bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
                        <MapPin size={14} />
                        {isAr ? 'الموقع الجغرافي والزيارات' : 'Location & Factory Visit'}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-on-surface mb-4">
                        {isAr ? 'موقع المصنع على الخريطة' : 'Visit Our Factory'}
                    </h2>
                    <p className="text-on-surface-variant text-sm md:text-base max-w-2xl mx-auto">
                        {isAr 
                            ? 'نسعد باستقبالكم في مقر مصنع القومية للصناعات الأسمنتية لمعاينة جودة المنتجات وخطوط الإنتاج الآلية.' 
                            : 'We welcome your visit to inspect our automated production lines and concrete product quality.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-surface-container-low border border-outline-variant/50 rounded-[2.5rem] p-4 md:p-8 shadow-2xl backdrop-blur-xl relative">
                    <div className="lg:col-span-5 flex flex-col justify-between p-4 md:p-6 space-y-6">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-2xl p-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} fill="currentColor" />
                                        ))}
                                    </div>
                                    <span className="text-xs md:text-sm font-bold text-on-surface">5.0 (Google Reviews)</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs font-bold text-primary">
                                    <ShieldCheck size={16} />
                                    <span>{isAr ? 'نشاط موثق' : 'Verified'}</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-black text-on-surface mb-2">
                                    {isAr ? 'مصنع القومية للصناعات الأسمنتية' : 'Al-Qawmia Cement Factory'}
                                </h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed flex items-start gap-2">
                                    <MapPin size={18} className="text-primary flex-shrink-0 mt-1" />
                                    <span>{isAr ? 'طريق بلبيس - الزقازيق، محافظة الشرقية، مصر' : 'Belbeis - Zagazig Road, Ash Sharqia, Egypt'}</span>
                                </p>
                            </div>

                            <div className="space-y-3 border-t border-outline-variant/20 pt-6 text-sm">
                                <div className="flex items-center gap-3 text-on-surface-variant">
                                    <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-on-surface">{isAr ? 'مواعيد العمل:' : 'Working Hours:'}</div>
                                        <div className="text-xs">{isAr ? 'يومياً من 8:00 صباحاً حتى 8:00 مساءً' : 'Daily 8:00 AM - 8:00 PM'}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 text-on-surface-variant">
                                    <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-on-surface">{isAr ? 'هواتف الإدارة والمبيعات:' : 'Contact:'}</div>
                                        <div className="text-xs font-mono" dir="ltr">+20 128 319 1597 | +20 128 608 4444</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row gap-3">
                            <a 
                                href={mapLocationUrl}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-black font-bold text-sm py-3.5 px-6 rounded-full hover:shadow-[0_10px_25px_-5px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                            >
                                <Navigation size={18} />
                                {isAr ? 'الاتجاهات عبر Google Maps' : 'Get Directions'}
                            </a>
                            <a 
                                href={mapLocationUrl}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-surface-container border border-outline-variant text-on-surface font-bold text-sm py-3.5 px-5 rounded-full hover:bg-surface-container-high hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <ExternalLink size={16} />
                                {isAr ? 'عرض التقييمات' : 'View Reviews'}
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-7 h-[350px] md:h-[450px] rounded-[2rem] overflow-hidden border border-outline-variant/60 relative group shadow-inner">
                        <iframe
                            title="Google Maps Location - Al-Qawmia Factory"
                            src={mapEmbedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full filter contrast-[1.05] brightness-95"
                        />
                        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white text-xs font-bold pointer-events-none flex items-center gap-2 shadow-lg">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                            {isAr ? 'المصنع مفتوح للاستقبال' : 'Factory Open'}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
