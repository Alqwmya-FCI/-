import React, { useState } from 'react';
import { X, Copy, ChevronDown, Check } from 'lucide-react';

const FinancialHub = ({ isOpen, onClose }) => {
    const [copiedStates, setCopiedStates] = useState({});
    const [expandedBanks, setExpandedBanks] = useState({});

    if (!isOpen) return null;

    const copyText = async (text, id) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedStates(prev => ({ ...prev, [id]: true }));
            setTimeout(() => {
                setCopiedStates(prev => ({ ...prev, [id]: false }));
            }, 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const toggleBank = (id) => {
        setExpandedBanks(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4 z-[9999]" dir="rtl">
            <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
                
                {/* Header */}
                <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                        <div className="bg-slate-900 p-2 rounded-xl text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                        </div>
                        ملخص الحسابات
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors" title="إغلاق">
                        <X size={24} />
                    </button>
                </div>

                {/* Content Area */}
                <div className="p-6 overflow-y-auto space-y-8 text-right">
                    
                    {/* Section 1: Digital Wallets */}
                    <div className="space-y-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">المحافظ الرقمية والتحويل السريع</p>
                        
                        {/* InstaPay */}
                        <div onClick={() => copyText('01283191597', 'instapay')} className="group bg-gradient-to-br from-[#8A6C9D]/5 to-white p-5 rounded-3xl border border-[#8A6C9D]/20 cursor-pointer hover:shadow-lg transition-all active:scale-[0.98]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center p-2">
                                        <img src="/انستا.png" alt="InstaPay" className="w-full h-full object-contain" onError={(e) => e.target.style.display='none'} />
                                        <span className="font-black text-xs text-[#8A6C9D]" style={{display: "none"}}>InstaPay</span>
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-900">InstaPay</h3>
                                        <p className="font-mono text-xl font-bold text-[#8A6C9D]" dir="ltr">01283191597</p>
                                    </div>
                                </div>
                                <span className={`text-[10px] px-3 py-1.5 rounded-full font-bold shadow-sm transition-colors ${copiedStates['instapay'] ? 'bg-green-500 text-white' : 'bg-[#8A6C9D] text-white'}`}>
                                    {copiedStates['instapay'] ? 'تم النسخ' : 'اضغط للنسخ'}
                                </span>
                            </div>
                        </div>

                        {/* Vodafone Cash */}
                        <div onClick={() => copyText('01009763656', 'vodafone')} className="group bg-gradient-to-br from-red-50 to-white p-5 rounded-3xl border border-red-100 cursor-pointer hover:shadow-lg transition-all active:scale-[0.98]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center p-2">
                                        <img src="/فودافن.png" alt="Vodafone Cash" className="w-full h-full object-contain" onError={(e) => e.target.style.display='none'} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-900">Vodafone Cash</h3>
                                        <p className="text-red-600 font-mono text-xl font-bold" dir="ltr">01009763656</p>
                                    </div>
                                </div>
                                <span className={`text-[10px] px-3 py-1.5 rounded-full font-bold transition-colors ${copiedStates['vodafone'] ? 'bg-green-500 text-white' : 'bg-red-100 text-red-700'}`}>
                                    {copiedStates['vodafone'] ? 'تم النسخ' : 'اضغط للنسخ'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Bank Accounts */}
                    <div className="space-y-3">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">الحسابات البنكية (اضغط للتفاصيل)</p>
                        
                        {/* Bank Misr */}
                        <div className="border border-slate-100 rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                            <button onClick={() => toggleBank('misr')} className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center p-2">
                                        <img src="/مصر.png" alt="بنك مصر" className="w-full h-full object-contain" onError={(e) => e.target.style.display='none'} />
                                    </div>
                                    <span className="font-black text-slate-900">بنك مصر</span>
                                </div>
                                <ChevronDown className={`text-slate-400 transition-transform duration-300 ${expandedBanks['misr'] ? 'rotate-180' : ''}`} />
                            </button>
                            {expandedBanks['misr'] && (
                                <div className="p-5 bg-slate-50 border-t border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-2">
                                    <div className="grid grid-cols-3 gap-2 mb-2 text-right">
                                        <div className="bg-white p-3 rounded-2xl border border-slate-100">
                                            <p className="text-[9px] text-slate-400 font-black">📍 فرع الحساب</p>
                                            <p className="text-[11px] font-black text-slate-900">493</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-2xl border border-slate-100">
                                            <p className="text-[9px] text-slate-400 font-black">💳 النوع</p>
                                            <p className="text-[11px] font-black text-slate-900">جاري</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-2xl border border-slate-100">
                                            <p className="text-[9px] text-slate-400 font-black">💰 العملة</p>
                                            <p className="text-[11px] font-black text-slate-900" dir="ltr">EGP</p>
                                        </div>
                                    </div>
                                    <div onClick={() => copyText('4930001000012036', 'misr_acc')} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm cursor-pointer active:scale-95 transition relative">
                                        <p className="text-[10px] text-slate-400 font-black mb-1 text-right">رقم الحساب</p>
                                        <div className="flex justify-between items-center">
                                            <p className="font-mono text-slate-900 font-black text-lg text-left tracking-wider" dir="ltr">4930001000012036</p>
                                            {copiedStates['misr_acc'] ? <Check size={16} className="text-green-500"/> : <Copy size={16} className="text-slate-400"/>}
                                        </div>
                                    </div>
                                    <div onClick={() => copyText('EG110002049304930001000012036', 'misr_iban')} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm cursor-pointer active:scale-95 transition relative">
                                        <p className="text-[10px] text-slate-400 font-black mb-1 text-right">رقم الآيبان (IBAN)</p>
                                        <div className="flex justify-between items-center">
                                            <p className="font-mono text-slate-900 font-black text-[10px] break-all text-left" dir="ltr">EG110002049304930001000012036</p>
                                            {copiedStates['misr_iban'] ? <Check size={16} className="text-green-500"/> : <Copy size={16} className="text-slate-400"/>}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* NBE */}
                        <div className="border border-slate-100 rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                            <button onClick={() => toggleBank('nbe')} className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center p-2">
                                        <img src="/الاهلي.png" alt="البنك الأهلي" className="w-full h-full object-contain" onError={(e) => e.target.style.display='none'} />
                                    </div>
                                    <span className="font-black text-slate-900">البنك الأهلي المصري</span>
                                </div>
                                <ChevronDown className={`text-slate-400 transition-transform duration-300 ${expandedBanks['nbe'] ? 'rotate-180' : ''}`} />
                            </button>
                            {expandedBanks['nbe'] && (
                                <div className="p-5 bg-slate-50 border-t border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-2">
                                    <div className="grid grid-cols-2 gap-3 mb-2 text-right">
                                        <div className="bg-white p-3 rounded-2xl border border-slate-100">
                                            <p className="text-[9px] text-slate-400 font-black">📍 الفرع</p>
                                            <p className="text-[11px] font-black text-slate-900">فايد</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-2xl border border-slate-100">
                                            <p className="text-[9px] text-slate-400 font-black">💳 النوع</p>
                                            <p className="text-[11px] font-black text-slate-900">جاري</p>
                                        </div>
                                    </div>
                                    <div onClick={() => copyText('3023060728130000018', 'nbe_acc')} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm cursor-pointer active:scale-95 transition relative">
                                        <p className="text-[10px] text-slate-400 font-black mb-1 text-right">رقم الحساب</p>
                                        <div className="flex justify-between items-center">
                                            <p className="font-mono text-slate-900 font-black text-lg text-left tracking-wider" dir="ltr">3023060728130000018</p>
                                            {copiedStates['nbe_acc'] ? <Check size={16} className="text-green-500"/> : <Copy size={16} className="text-slate-400"/>}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Alex Bank */}
                        <div className="border border-slate-100 rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                            <button onClick={() => toggleBank('alex')} className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center p-2">
                                        <img src="/الاسكندريه.png" alt="بنك الإسكندرية" className="w-full h-full object-contain" onError={(e) => e.target.style.display='none'} />
                                    </div>
                                    <span className="font-black text-slate-900">بنك الإسكندرية</span>
                                </div>
                                <ChevronDown className={`text-slate-400 transition-transform duration-300 ${expandedBanks['alex'] ? 'rotate-180' : ''}`} />
                            </button>
                            {expandedBanks['alex'] && (
                                <div className="p-5 bg-slate-50 border-t border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-2">
                                    <div className="grid grid-cols-3 gap-2 mb-2 text-right">
                                        <div className="bg-white p-3 rounded-2xl border border-slate-100">
                                            <p className="text-[9px] text-slate-400 font-black">📍 الفرع</p>
                                            <p className="text-[11px] font-black text-slate-900">الرئيسي</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-2xl border border-slate-100">
                                            <p className="text-[9px] text-slate-400 font-black">💳 النوع</p>
                                            <p className="text-[11px] font-black text-slate-900">جاري</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-2xl border border-slate-100">
                                            <p className="text-[9px] text-slate-400 font-black">💰 العملة</p>
                                            <p className="text-[11px] font-black text-slate-900" dir="ltr">EGP</p>
                                        </div>
                                    </div>
                                    <div onClick={() => copyText('515045494002', 'alex_acc')} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm cursor-pointer active:scale-95 transition relative">
                                        <p className="text-[10px] text-slate-400 font-black mb-1 text-right">رقم الحساب</p>
                                        <div className="flex justify-between items-center">
                                            <p className="font-mono text-slate-900 font-black text-lg text-left tracking-wider" dir="ltr">515045494002</p>
                                            {copiedStates['alex_acc'] ? <Check size={16} className="text-green-500"/> : <Copy size={16} className="text-slate-400"/>}
                                        </div>
                                    </div>
                                    <div onClick={() => copyText('EG150005501500000515045494002', 'alex_iban')} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm cursor-pointer active:scale-95 transition relative">
                                        <p className="text-[10px] text-slate-400 font-black mb-1 text-right">رقم الآيبان (IBAN)</p>
                                        <div className="flex justify-between items-center">
                                            <p className="font-mono text-slate-900 font-black text-[10px] break-all text-left" dir="ltr">EG150005501500000515045494002</p>
                                            {copiedStates['alex_iban'] ? <Check size={16} className="text-green-500"/> : <Copy size={16} className="text-slate-400"/>}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="mt-8 p-6 bg-slate-900 rounded-3xl text-center shadow-xl">
                        <p className="text-white text-[11px] font-black uppercase tracking-[0.2em] mb-1">AL-QAWMIA FACTORY</p>
                        <p className="text-slate-400 text-[9px] font-bold">OFFICIAL FINANCIAL DOCUMENT • {new Date().getFullYear()}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialHub;
