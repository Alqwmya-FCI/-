import React from 'react';

export default function TeamSection({ t, isAr }) {
    const teamMembers = [
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
    ];

    return (
        <section id="contact" className="py-24 bg-surface border-t border-outline-variant/10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <div className="text-xs font-bold text-primary mb-2 tracking-widest uppercase">{t.teamSection}</div>
                    <h2 className="text-5xl font-black text-on-surface mb-4">{t.teamTitle}</h2>
                    <p className="text-xl text-on-surface-variant">{t.teamSub}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {teamMembers.map(member => (
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
    );
}
