import React from 'react';
import BusinessCard from '../BusinessCard';
import InteractiveGrid from '../components/InteractiveGrid';
import { useSEO } from '../hooks/useSEO';

const HusseinCardPage = () => {
    useSEO({
        title: 'م/ حسين علي عبدالشافي | مدير مبيعات مصنع القومية للصناعات الأسمنتية',
        description: 'بطاقة التواصل المهنية للمهندس حسين علي عبدالشافي - مدير مبيعات مصنع القومية للصناعات الأسمنتية. طوب أسمنتي، إنترلوك، بردورات، وبلوك خرساني.',
        keywords: 'حسين علي عبدالشافي, مبيعات مصنع القومية, مصنع القومية للصناعات الاسمنتية',
        image: '/images/hussein.jpg',
        url: 'https://alqwmya.com/eng-hussein-abdelshafy'
    });
    const husseinData = {
        name: 'م/ حسين علي عبدالشافي',
        title: 'مدير المبيعات',
        organization: 'مصنع القومية للصناعات الأسمنتية',
        bio: 'مصنع القومية للصناعات الأسمنتية. جودة، دقة، والتزام في التوريد لكافة المشاريع.',
        phones: ['+201286084444', '+201017528757'],
        whatsapp: '+201286084444',
        personalFacebook: 'https://www.facebook.com/share/17yykZ4Ucf/',
        instagram: 'https://www.instagram.com/hussein_ali_abdelshafi?igsh=MXV5eTVhMDEybGF5eA==',
        factoryFacebook: 'https://www.facebook.com/Alslamcompany/',
        location: 'https://maps.app.goo.gl/QneojizzF3fJqKrz6',
        image: '/images/hussein.jpg',
        vcfName: 'Hussein_Ali.vcf'
    };

    return (
        <div className="bg-slate-900 min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
            <InteractiveGrid />
            <div className="relative z-10 w-full max-w-md">
                <BusinessCard person={husseinData} />
            </div>
        </div>
    );
};

export default HusseinCardPage;
