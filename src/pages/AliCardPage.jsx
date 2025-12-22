import React from 'react';
import BusinessCard from '../BusinessCard';
import aliPhoto from '../assets/manager.png';

const AliCardPage = () => {
    const aliData = {
        name: 'م/ علي عبد الشافي',
        title: 'مدير المصنع',
        organization: 'مصنع القومية للصناعات الأسمنتية',
        bio: 'مصنع القومية للصناعات الأسمنتية. جودة، دقة، والتزام في التوريد لكافة المشاريع.',
        phones: ['+201283191597', '+201009763656', '+201110006097'],
        personalFacebook: 'https://www.facebook.com/ali.abd.elshafy',
        factoryFacebook: 'https://www.facebook.com/Alslamcompany/',
        location: 'https://maps.app.goo.gl/QneojizzF3fJqKrz6',
        image: aliPhoto,
        vcfName: 'Ali_Abdelshafy.vcf'
    };

    return (
        <div className="bg-slate-100 min-h-screen w-full flex items-center justify-center p-4">
            <BusinessCard person={aliData} />
        </div>
    );
};

export default AliCardPage;
