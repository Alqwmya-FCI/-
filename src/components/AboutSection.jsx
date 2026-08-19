import React from 'react';

export default function AboutSection({ t, isAr }) {
    return (
        <section id="about" className="py-32 bg-background border-b border-outline-variant/50">
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
                            alt="مصنع القومية للصناعات الأسمنتية"
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
    );
}
