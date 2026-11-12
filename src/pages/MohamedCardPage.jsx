import React from 'react';
import BusinessCard from '../BusinessCard';
import InteractiveGrid from '../components/InteractiveGrid';
import { useSEO } from '../hooks/useSEO';

const MohamedCardPage = () => {
    useSEO({
        title: 'أ/ محمد علي عبد الشافي | مدير تسويق مصنع القومية للصناعات الأسمنتية',
        description: 'بطاقة التواصل المهنية للأستاذ محمد علي عبد الشافي - مدير تسويق مصنع القومية للصناعات الأسمنتية. طوب أسمنتي، إنترلوك، بردورات، وبلوك خرساني.',
        keywords: 'محمد علي عبد الشافي, تسويق مصنع القومية, مصنع القومية للصناعات الاسمنتية',
        image: '/images/mohamed.webp',
        url: 'https://alqwmya.com/mohamed-ali-abdelshafy'
    });

    const mohamedData = {
        name: 'أ/ محمد علي عبد الشافي',
        title: 'مدير التسويق',
        organization: 'مصنع القومية للصناعات الأسمنتية',
        bio: 'مصنع القومية للصناعات الأسمنتية. حلول تسويقية متكاملة وتوريد لكافة المشاريع الكبرى بأعلى مواصفات الجودة.',
        phones: ['+201272926037', '+201039791921'],
        whatsapp: '+201272926037',
        personalFacebook: 'https://www.facebook.com/share/1DwAgdJSab/?mibextid=wwXIfr',
        instagram: 'https://www.instagram.com/mohamed_aly.33?vrfl=Z3JhdTVuaDFjcm80&utm_source=qr',
        factoryFacebook: 'https://www.facebook.com/Alslamcompany/',
        location: 'https://maps.app.goo.gl/QneojizzF3fJqKrz6',
        image: '/images/mohamed.webp',
        vcfName: 'Mohamed_Ali_Abdelshafy.vcf'
    };

    return (
        <div className="bg-slate-900 min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
            <InteractiveGrid />
            <div className="relative z-10 w-full max-w-md">
                <BusinessCard person={mohamedData} />
            </div>
        </div>
    );
};

export default MohamedCardPage;
