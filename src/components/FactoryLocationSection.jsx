import React from 'react';
import { MapPin, Navigation, Clock, Phone, Star, ExternalLink, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function FactoryLocationSection({ isAr = true }) {
    const mapLocationUrl = 'https://maps.app.goo.gl/QneojizzF3fJqKrz6';
    const directReviewUrl = 'https://search.google.com/local/writereview?placeid=ChIJDepGXGZ9-BQRnIPxxvJGgJo';
    const mapEmbedUrl = 'https://maps.google.com/maps?q=30.2817526,32.3285137&hl=ar&z=15&output=embed';

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
                            <a 
                                href={directReviewUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/review flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-primary/10 to-amber-500/10 border border-amber-500/30 hover:border-amber-500/60 rounded-2xl p-4 transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] block"
                            >
                                <div>
                                    <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={18} fill="currentColor" className="group-hover/review:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
                                        ))}
                                    </div>
                                    <span className="text-xs md:text-sm font-black text-on-surface">5.0 (تقييمات Google)</span>
                                </div>
                                <div className="text-left flex flex-col items-end">
                                    <span className="text-xs font-black text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30 group-hover/review:bg-amber-400 group-hover/review:text-black transition-colors">
                                        {isAr ? 'أضف تقييمك الآن ⭐' : 'Rate Us 5-Stars'}
                                    </span>
                                    <span className="text-[10px] text-on-surface-variant mt-1">{isAr ? 'تقييم فوري بنقرة واحدة' : '1-Click Direct Rating'}</span>
                                </div>
                            </a>

                            <div>
                                <h3 className="text-2xl font-black text-on-surface mb-2">
                                    {isAr ? 'مصنع القومية للصناعات الأسمنتية' : 'Al-Qawmia Cement Factory'}
                                </h3>
                                <p className="text-on-surface-variant text-sm leading-relaxed flex items-start gap-2">
                                    <MapPin size={18} className="text-primary flex-shrink-0 mt-1" />
                                    <span className="font-medium">
                                        {isAr 
                                            ? 'الإسماعيلية، مركز فايد، طريق الإسماعيلية - السويس الصحراوي (بعد كلية ضباط الاحتياط)' 
                                            : 'Ismailia, Fayed Center, Ismailia - Suez Desert Road (After Reserve Officers College)'}
                                    </span>
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

                        <div className="pt-4 space-y-3">
                            <a 
                                href={directReviewUrl}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-extrabold text-sm py-3.5 px-6 rounded-full shadow-[0_10px_25px_-5px_rgba(245,158,11,0.4)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                            >
                                <Star size={18} fill="currentColor" />
                                {isAr ? 'تقييم المصنع 5 نجوم على Google' : 'Rate Factory 5 Stars on Google'}
                            </a>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <a 
                                    href={mapLocationUrl}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-black font-bold text-sm py-3 px-5 rounded-full hover:shadow-[0_10px_25px_-5px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                                >
                                    <Navigation size={16} />
                                    {isAr ? 'الاتجاهات (Google Maps)' : 'Get Directions'}
                                </a>
                                <a 
                                    href={mapLocationUrl}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-surface-container border border-outline-variant text-on-surface font-bold text-sm py-3 px-5 rounded-full hover:bg-surface-container-high hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <ExternalLink size={16} />
                                    {isAr ? 'عرض الموقع بالكامل' : 'View Full Profile'}
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 h-[350px] md:h-[480px] rounded-[2rem] overflow-hidden border border-outline-variant/60 relative group shadow-inner">
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
