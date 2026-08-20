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
                <div className="grid grid-cols-2 gap-2 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
                    {teamMembers.map(member => (
                        <a
                            key={member.name}
                            href={member.href}
                            className="bg-surface-container-low border border-outline-variant text-on-surface p-3 sm:p-6 md:p-8 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group block"
                        >
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-start gap-3 sm:gap-6 mb-4 sm:mb-8 border-b border-outline-variant pb-4 sm:pb-6">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-surface-container flex items-center justify-center overflow-hidden border-2 border-primary flex-shrink-0 rounded-full lg:rounded-none">
                                        <img src={member.img} alt={member.name} className={`w-full h-full object-cover transition-all duration-500 ${member.name.includes('حسين') || member.name.includes('Hussein') ? 'object-top' : 'object-center'}`} loading="lazy" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-center">
                                        <h3 className="text-xs min-[400px]:text-sm sm:text-xl lg:text-2xl font-bold text-primary mb-1">{member.name}</h3>
                                        <p className="text-[9px] sm:text-xs text-on-surface-variant font-bold">{member.role}</p>
                                    </div>
                                </div>
                                <div className="space-y-2 sm:space-y-4 text-on-surface flex-1 flex flex-col justify-center">
                                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-1 sm:gap-4 text-center lg:text-start">
                                        <span className="material-symbols-outlined text-primary text-[16px] sm:text-[24px]">call</span>
                                        <span dir="ltr" className="text-[10px] sm:text-sm font-mono">{member.phone}</span>
                                    </div>
                                    <div className="flex flex-col lg:flex-row items-center lg:items-start gap-1 sm:gap-4 text-center lg:text-start">
                                        <span className="material-symbols-outlined text-green-400 text-[16px] sm:text-[24px]">chat</span>
                                        <span className="text-green-400 text-[10px] sm:text-sm font-bold">{t.whatsapp}</span>
                                    </div>
                                </div>
                                <div className="mt-4 sm:mt-8 text-center border border-primary text-primary py-1.5 sm:py-3 text-[10px] sm:text-sm font-bold group-hover:bg-primary group-hover:text-on-primary transition-colors">
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
