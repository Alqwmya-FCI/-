import React, { useState } from 'react';
import { Phone, Briefcase, Share2, Facebook, Building2, Save, MapPin, User, Instagram } from 'lucide-react';
import FinancialHub from './components/FinancialHub';
const BusinessCard = ({ person }) => {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: person.name,
                    url: window.location.href
                });
            } catch (err) {
                console.error("Share failed", err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const [showFinancialHub, setShowFinancialHub] = useState(false);

    const generateVCard = () => {
        const phoneNumbers = person.phones.map(phone => `TEL;TYPE=CELL,VOICE:${phone}`).join('\n');
        
        let vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${person.name}
ORG:${person.organization}
TITLE:${person.title}
${phoneNumbers}
ADR;TYPE=WORK:;;${person.organization}
URL;TYPE=Facebook:${person.factoryFacebook}
URL;TYPE=Location:${person.location}
NOTE:موقع المصنع على خرائط جوجل: ${person.location}
END:VCARD`;

        const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', person.vcfName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="h-32 bg-slate-800 relative">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>
                <div className="absolute top-4 left-4">
                    <Building2 className="text-orange-500 w-8 h-8" />
                </div>
            </div>

            <div className="px-6 relative">
                <div className="w-32 h-32 mx-auto -mt-16 rounded-full border-4 border-white shadow-lg bg-slate-200 flex items-center justify-center overflow-hidden">
                    {person.image ? (
                        <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                    ) : (
                        <User size={64} className="text-slate-400" />
                    )}
                </div>

                <div className="text-center mt-4 mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">{person.name}</h1>
                    <p className="text-orange-600 font-semibold mt-1 flex items-center justify-center gap-1">
                        <Briefcase size={16} />
                        {person.title}
                    </p>
                    <p className="text-slate-500 text-sm mt-2 font-bold">
                        {person.organization}
                    </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6 text-center">
                    <p className="text-slate-600 text-sm leading-relaxed">
                        {person.bio}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                    <a href={`tel:${person.phones[0]}`} className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl hover:bg-slate-800 transition shadow-md active:scale-95">
                        <Phone size={18} />
                        <span>اتصل بي</span>
                    </a>
                    <button onClick={handleShare} className="flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition shadow-md active:scale-95">
                        <Share2 size={18} />
                        <span>{copied ? 'تم النسخ!' : 'مشاركة'}</span>
                    </button>
                </div>

                <div className="space-y-3 mb-8">
                    {person.financialHub && (
                        <button onClick={() => setShowFinancialHub(true)} className="w-full flex items-center justify-between p-4 bg-black border border-black rounded-xl hover:bg-slate-900 hover:shadow-md transition group text-right">
                            <div className="flex items-center gap-3">
                                <div className="bg-orange-500 p-2 rounded-full text-white shadow-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                                </div>
                                <div>
                                    <p className="font-black text-white text-sm">ملخص الحسابات البنكية الموحد</p>
                                    <p className="text-[10px] text-orange-400 font-black">بنوك - انستا باي - محافظ</p>
                                </div>
                            </div>
                            <div className="text-orange-300 group-hover:text-orange-500">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                            </div>
                        </button>
                    )}
                    {person.whatsapp && (
                        <a href={`https://wa.me/${person.whatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-green-500 hover:shadow-md transition group">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 p-2 rounded-full text-green-600 group-hover:bg-green-600 group-hover:text-white transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                                        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">تواصل عبر واتساب</p>
                                    <p className="text-xs text-slate-500">{person.whatsapp.replace('+2', '')}</p>
                                </div>
                            </div>
                            <div className="text-slate-300 group-hover:text-green-500">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                            </div>
                        </a>
                    )}

                    {person.personalFacebook && (
                        <a href={person.personalFacebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition group">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 p-2 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                                    <Facebook size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">حسابي الشخصي</p>
                                    <p className="text-xs text-slate-500">تواصل معي على فيسبوك</p>
                                </div>
                            </div>
                            <div className="text-slate-300 group-hover:text-blue-500">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                            </div>
                        </a>
                    )}

                    {person.instagram && (
                         <a href={person.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-pink-500 hover:shadow-md transition group">
                            <div className="flex items-center gap-3">
                                <div className="bg-pink-100 p-2 rounded-full text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition">
                                    <Instagram size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 text-sm">حسابي على انستغرام</p>
                                    <p className="text-xs text-slate-500">تابعني على انستغرام</p>
                                </div>
                            </div>
                            <div className="text-slate-300 group-hover:text-pink-500">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                            </div>
                        </a>
                    )}

                    <a href={person.factoryFacebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-orange-500 hover:shadow-md transition group">
                        <div className="flex items-center gap-3">
                            <div className="bg-orange-100 p-2 rounded-full text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition">
                                <Building2 size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-slate-800 text-sm">صفحة المصنع الرسمية</p>
                                <p className="text-xs text-slate-500">Alqwmay for cement industry</p>
                            </div>
                        </div>
                        <div className="text-slate-300 group-hover:text-orange-500">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                        </div>
                    </a>

                    <a href={person.location} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-green-500 hover:shadow-md transition group">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-full text-green-600 group-hover:bg-green-600 group-hover:text-white transition">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-slate-800 text-sm">موقع المصنع</p>
                                <p className="text-xs text-slate-500">عرض على خرائط جوجل</p>
                            </div>
                        </div>
                        <div className="text-slate-300 group-hover:text-green-500">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                        </div>
                    </a>

                </div>

                <div className="text-center pb-8 px-4">
                    <button
                        onClick={generateVCard}
                        className="w-full bg-slate-800 text-white font-semibold py-3 px-4 rounded-xl hover:bg-slate-700 transition flex items-center justify-center gap-2 shadow-lg active:scale-95"
                    >
                        <Save size={20} />
                        حفظ جهة الاتصال vcf
                    </button>

                    <div className="mt-6 flex justify-center gap-4 text-slate-400 text-xs">
                        {person.phones.map((phone, index) => (
                            <React.Fragment key={phone}>
                                <span>{phone.replace('+20', '0')}</span>
                                {index < person.phones.length - 1 && <span className="mx-1">•</span>}
                            </React.Fragment>
                        ))}
                    </div>

                    <p className="text-slate-400 text-[10px] mt-4 font-bold">
                        جميع الحقوق محفوظة © مصنع القومية
                    </p>
                </div>

            </div>
        </div>
        <FinancialHub isOpen={showFinancialHub} onClose={() => setShowFinancialHub(false)} />
        </>
    );
};

export default BusinessCard;
