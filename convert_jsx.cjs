const fs = require('fs');
const html = fs.readFileSync('website/index.html', 'utf8');
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if(bodyMatch) {
    let body = bodyMatch[1];
    // Convert to JSX
    body = body.replace(/class=/g, 'className=');
    body = body.replace(/for=/g, 'htmlFor=');
    body = body.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');
    body = body.replace(/style="([^"]*)"/g, (match, styleStr) => {
        const styles = styleStr.split(';').filter(s => s.trim());
        const styleObj = {};
        styles.forEach(s => {
            const [k, v] = s.split(':');
            if(k && v) {
                const camelK = k.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
                styleObj[camelK] = v.trim();
            }
        });
        return `style={{${Object.entries(styleObj).map(([k,v]) => `${k}: '${v}'`).join(', ')}}}`;
    });
    // Replace unclosed tags
    body = body.replace(/<img([^>]*[^\/])>/g, '<img$1 />');
    body = body.replace(/<br>/g, '<br/>');
    body = body.replace(/<hr([^>]*[^\/])>/g, '<hr$1 />');
    body = body.replace(/<input([^>]*[^\/])>/g, '<input$1 />');
    body = body.replace(/<meta([^>]*[^\/])>/g, '<meta$1 />');
    body = body.replace(/<link([^>]*[^\/])>/g, '<link$1 />');
    // Remove scripts
    body = body.replace(/<script[\s\S]*?<\/script>/g, '');
    
    // Add the slider and image replacement as requested
    body = body.replace(/<div className="w-full h-\[400px\][^>]*id="three-container"[^>]*>([\s\S]*?)<\/div>/i, 
        '<div className="w-full h-[400px] border border-outline-variant glass-panel rounded-sm relative shadow-lg overflow-hidden flex items-center justify-center p-2">\n' +
        '{/* Corner Accents */}\n' +
        '<div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/70 z-10 pointer-events-none"></div>\n' +
        '<div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/70 z-10 pointer-events-none"></div>\n' +
        '<img src="/images/اساسي1.jpg" alt="المصنع" className="w-full h-full object-cover rounded-sm" />\n' +
        '</div>'
    );
    
    body = body.replace(/<section className="relative min-h-\[90vh\][^>]*>/, 
        '<section className="relative min-h-[90vh] flex items-center pt-24 pb-32 border-b border-outline-variant/50 overflow-hidden">\n' +
        '{heroSliderImages.map((src, index) => (\n' +
        '    <div \n' +
        '        key={src}\n' +
        '        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentSlide ? \'opacity-30\' : \'opacity-0\'}`}\n' +
        '        style={{ backgroundImage: `url(\'${src}\')` }}\n' +
        '    ></div>\n' +
        '))}\n' +
        '<div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/80 to-transparent"></div>\n'
    );
    
    // Fix missing closing divs that were manually fixed before
    body = body.replace(/<\/section>([\s\S]*?)<section id="contact"/, '</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>\n</section>\n$1<section id="contact"');

    const result = `import React, { useEffect, useState } from 'react';

const heroSliderImages = [
    '/images/اساسي2.jpg',
    '/images/اساسي3.jpg',
    '/images/اساسي4.jpg',
    '/images/اساسي6.jpg',
    '/images/IMG-20250627-WA0016.jpg',
    '/images/IMG-20260113-WA0062.jpg',
    '/images/IMG-20260113-WA0055.jpg',
    '/images/IMG-20260103-WA0079 (1).jpg',
    '/images/IMG-20260103-WA0077.jpg'
];

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const sliderTimer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSliderImages.length);
        }, 4000);
        return () => clearInterval(sliderTimer);
    }, []);

    useEffect(() => {
        const reveals = document.querySelectorAll('.reveal');
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => { entry.target.classList.add('active'); }, index * 100);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        reveals.forEach(el => revealObserver.observe(el));

        return () => revealObserver.disconnect();
    }, []);

    return (
        <div className="bg-background text-on-surface concrete-texture min-h-screen flex flex-col font-body-md overflow-x-hidden selection:bg-primary selection:text-background relative" dir="rtl">
            ${body}
        </div>
    );
};
export default HomePage;
`;
    fs.writeFileSync('src/pages/HomePage.jsx', result);
    console.log('Successfully recreated HomePage.jsx');
}
