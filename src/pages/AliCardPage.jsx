import React from 'react';
import BusinessCard from '../BusinessCard';
import InteractiveGrid from '../components/InteractiveGrid';
import { useSEO } from '../hooks/useSEO';

const AliCardPage = () => {
    useSEO({
        title: 'م/ علي عبد الشافي | مدير مصنع القومية للصناعات الأسمنتية',
        description: 'بطاقة التواصل المهنية للمهندس علي عبد الشافي - مدير مصنع القومية للصناعات الأسمنتية. طوب أسمنتي، إنترلوك، بردورات، وبلوك خرساني.',
        keywords: 'علي عبد الشافي, مصنع القومية, مدير مصنع القومية للصناعات الاسمنتية',
        image: '/images/ali.jpg',
        url: 'https://alqwmya.com/eng-ali-abdelshafy'
    });
    const aliData = {
        name: 'م/ علي عبد الشافي',
        title: 'مدير المصنع',
        organization: 'مصنع القومية للصناعات الأسمنتية',
        bio: 'مصنع القومية للصناعات الأسمنتية. جودة، دقة، والتزام في التوريد لكافة المشاريع.',
        phones: ['+201283191597', '+201009763656', '+201110006097'],
        whatsapp: '+201283191597',
        personalFacebook: 'https://www.facebook.com/share/1YSq96V2M7/',
        factoryFacebook: 'https://www.facebook.com/Alslamcompany/',
        location: 'https://maps.app.goo.gl/QneojizzF3fJqKrz6',
        image: '/images/ali.jpg',
        financialHub: true,
        vcfName: 'Ali_Abdelshafy.vcf'
    };

    return (
        <div className="bg-slate-900 min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
            <InteractiveGrid />
            <div className="relative z-10 w-full max-w-md">
                <BusinessCard person={aliData} />
            </div>
        </div>
    );
};

export default AliCardPage;
