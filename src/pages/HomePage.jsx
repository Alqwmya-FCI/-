import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Assuming the logo is in src/assets

const HomePage = () => {
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-8 text-center" dir="rtl">
            <div className="max-w-2xl w-full">
                <img src={logo} alt="شعار مصنع القومية" className="w-32 h-32 mx-auto mb-6" />
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                    مصنع القومية للصناعات الأسمنتية
                </h1>
                <p className="text-slate-600 text-lg mb-12">
                    الجودة، الدقة، والالتزام في التوريد لكافة المشاريع.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link 
                        to="/ali" 
                        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-200"
                    >
                        <h2 className="text-2xl font-bold text-slate-800">م/ علي عبد الشافي</h2>
                        <p className="text-orange-600 mt-1">مدير المصنع</p>
                        <p className="mt-4 text-slate-900 bg-slate-100 py-2 px-4 rounded-lg inline-block font-semibold">
                            عرض البطاقة
                        </p>
                    </Link>
                    <Link 
                        to="/hussein" 
                        className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-200"
                    >
                        <h2 className="text-2xl font-bold text-slate-800">م/ حسين علي عبدالشافي</h2>
                        <p className="text-orange-600 mt-1">Civil Engineering Manager</p>
                        <p className="mt-4 text-slate-900 bg-slate-100 py-2 px-4 rounded-lg inline-block font-semibold">
                            عرض البطاقة
                        </p>
                    </Link>
                </div>

                <footer className="mt-16 text-slate-500 text-sm">
                    <p>جميع الحقوق محفوظة © مصنع القومية</p>
                </footer>
            </div>
        </div>
    );
};

export default HomePage;
