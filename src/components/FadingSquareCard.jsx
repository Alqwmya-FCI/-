import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FadingSquareCard({ images, label, className, offset = 0, to }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const indexRef = useRef(0);
    const squaresContainerRef = useRef(null);

    useEffect(() => {
        if (!images || images.length <= 1) return;

        let timer;
        const tick = () => {
            const currentIdx = indexRef.current;
            const nextIdx = (currentIdx + 1) % images.length;
            const oldImage = images[currentIdx];

            if (squaresContainerRef.current) {
                const squares = [];
                for (let i = 0; i < 5; i++) {
                    for (let j = 0; j < 5; j++) {
                        const sq = document.createElement('div');
                        sq.className = 'absolute inset-0 bg-center bg-cover transition-opacity duration-500 z-10';
                        sq.style.backgroundImage = `url('${oldImage}')`;
                        const top = i * 20, bottom = 100 - (i + 1) * 20;
                        const left = j * 20, right = 100 - (j + 1) * 20;
                        sq.style.clipPath = `inset(${top}% ${right}% ${bottom}% ${left}%)`;
                        squaresContainerRef.current.appendChild(sq);
                        squares.push(sq);
                    }
                }

                squaresContainerRef.current.offsetHeight;

                squares.forEach(sq => {
                    setTimeout(() => {
                        sq.style.opacity = '0';
                        setTimeout(() => {
                            if (squaresContainerRef.current && sq.parentNode === squaresContainerRef.current) {
                                squaresContainerRef.current.removeChild(sq);
                            }
                        }, 500);
                    }, Math.random() * 400);
                });
            }

            indexRef.current = nextIdx;
            setCurrentIndex(nextIdx);
        };

        const initialDelay = setTimeout(() => {
            tick();
            timer = setInterval(tick, 4000);
        }, offset);

        return () => {
            clearTimeout(initialDelay);
            clearInterval(timer);
        };
    }, [images, offset]);

    const cardContent = (
        <div className={`group relative reveal overflow-hidden flex flex-col justify-end rounded-sm w-full h-full ${className}`}>
            <div className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${images[currentIndex]}')` }}>
                <div ref={squaresContainerRef} className="absolute inset-0 pointer-events-none" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-20 pointer-events-none" />
            <div className="relative z-30 p-4 md:p-6 pointer-events-none">
                <h3 className="text-lg md:text-2xl text-white font-bold inline-block bg-black/40 backdrop-blur-md px-4 py-2 rounded-sm border border-white/10">{label}</h3>
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
