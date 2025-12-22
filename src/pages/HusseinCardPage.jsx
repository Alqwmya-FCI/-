import React from 'react';
import BusinessCard from '../BusinessCard';

const HusseinCardPage = () => {
    const husseinData = {
        name: 'م/ حسين علي عبدالشافي',
        title: 'مدير الهندسة المدنية',
        organization: 'مصنع القومية للصناعات الأسمنتية',
        bio: 'مصنع القومية للصناعات الأسمنتية. جودة، دقة، والتزام في التوريد لكافة المشاريع.',
        phones: ['+201286084444', '+201017528757'],
        personalFacebook: 'https://www.facebook.com/share/17yykZ4Ucf/',
        instagram: 'https://www.instagram.com/hussein_ali_abdelshafi?igsh=MXV5eTVhMDEybGF5eA==',
        factoryFacebook: 'https://www.facebook.com/Alslamcompany/',
        location: 'https://maps.app.goo.gl/QneojizzF3fJqKrz6',
        image: null, // No photo provided, will use placeholder
        vcfName: 'Hussein_Ali.vcf'
    };

    return (
        <div className="bg-slate-100 min-h-screen w-full flex items-center justify-center p-4">
            <BusinessCard person={husseinData} />
        </div>
    );
};

export default HusseinCardPage;
