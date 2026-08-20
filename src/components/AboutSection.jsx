import React from 'react';

export default function AboutSection({ t, isAr }) {
    return (
        <section id="about" className="py-16 md:py-24 bg-background border-b border-outline-variant/50">
            <div className="max-w-screen-xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <div>
                        <div className="flex items-center gap-4 mb-4 md:mb-6 reveal">
                            <div className="h-px w-8 md:w-12 bg-primary" />
                            <span className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-widest">{t.corpProfile}</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-on-surface mb-3 md:mb-4 leading-tight reveal">{t.aboutTitle}</h2>
                        <h3 className="text-lg sm:text-xl md:text-2xl text-primary mb-6 md:mb-8 font-semibold reveal leading-snug">{t.aboutSub}</h3>
                        <p className="text-on-surface-variant mb-8 md:mb-10 text-sm md:text-base lg:text-lg leading-[1.8] md:leading-[2] max-w-xl reveal text-justify sm:text-start">
                            {t.aboutDesc}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 reveal">
                            {[
                                { icon: 'precision_manufacturing', title: t.f1 },
                                { icon: 'settings_suggest', title: t.f2 },
                            ].map(f => (
                                <div key={f.title} className="bg-surface-container py-4 px-2 sm:p-5 rounded-[1.5rem] border border-outline-variant hover:border-primary/50 transition-colors flex flex-col items-center justify-center text-center gap-2 group shadow-sm">
                                    <span className="material-symbols-outlined text-3xl sm:text-4xl text-primary group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 block">{f.icon}</span>
                                    <h4 className="font-bold text-xs sm:text-sm text-on-surface leading-snug">{f.title}</h4>
                                </div>
                            ))}
                            <div className="bg-surface-container py-4 px-2 sm:p-5 rounded-[1.5rem] border border-outline-variant hover:border-primary/50 transition-colors flex flex-col items-center justify-center text-center gap-2 group shadow-sm col-span-2 md:col-span-1">
                                <div className="flex flex-col items-center">
                                    <span className="material-symbols-outlined text-3xl sm:text-4xl text-primary group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300 mb-2">verified</span>
                                    <h4 className="font-bold text-xs sm:text-sm text-on-surface mb-1 leading-snug">{t.f3Title}</h4>
                                    <p className="text-[10px] sm:text-xs text-on-surface-variant max-w-[250px] mx-auto leading-relaxed hidden sm:block">{t.f3Desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative h-[500px] w-full rounded-sm overflow-hidden shadow-xl group reveal">
                        <img
                            alt="مصنع القومية للصناعات الأسمنتية"
                            className="w-full h-full object-cover filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                            src="/images/اساسي2.jpg"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                        <div className={`absolute top-6 ${isAr ? 'left-6' : 'right-6'} text-xs font-bold text-primary bg-surface/90 backdrop-blur-sm px-3 py-1 border border-primary/30 rounded-sm shadow-sm`}>
                            {t.imgData}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
