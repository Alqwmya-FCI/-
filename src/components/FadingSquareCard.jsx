import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FadingSquareCard({ images, label, className = '', offset = 0, to }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!images || images.length <= 1) return;

        let timer;
        const initialDelay = setTimeout(() => {
            timer = setInterval(() => {
                setCurrentIndex(prev => (prev + 1) % images.length);
            }, 4000);
        }, offset);

        return () => {
            clearTimeout(initialDelay);
            if (timer) clearInterval(timer);
        };
    }, [images, offset]);

    const cardContent = (
        <div className={`group relative reveal overflow-hidden flex flex-col justify-end rounded-2xl w-full h-full ${className}`}>
            {images.map((imgSrc, idx) => (
                <div
                    key={imgSrc}
                    className="absolute inset-0 bg-center bg-cover transition-opacity duration-1000 ease-in-out group-hover:scale-105"
                    style={{
                        backgroundImage: `url('${encodeURI(imgSrc)}')`,
                        opacity: idx === currentIndex ? 1 : 0,
                    }}
                />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-20 pointer-events-none" />
            <div className="relative z-30 p-4 md:p-6 pointer-events-none">
                <h3 className="text-lg md:text-2xl text-white font-bold inline-block bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-lg">
                    {label}
                </h3>
            </div>
        </div>
    );

    if (to) {
        return (
            <Link to={to} className={`block ${className}`} style={{ textDecoration: 'none' }}>
                {cardContent}
            </Link>
        );
    }

    return cardContent;
}
