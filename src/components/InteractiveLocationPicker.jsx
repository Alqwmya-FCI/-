import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Navigation, Loader2, Check, ZoomIn, ZoomOut } from 'lucide-react';
import { getReadableAddress } from '../utils/reverseGeocode';

// Quick Egyptian Governorates Centroids
const GOVERNORATES = [
    { name: 'الإسماعيلية', lat: 30.6043, lng: 32.2723, zoom: 12 },
    { name: 'السويس', lat: 29.9668, lng: 32.5498, zoom: 12 },
    { name: 'بورسعيد', lat: 31.2653, lng: 32.3019, zoom: 12 },
    { name: 'الشرقية (الزقازيق)', lat: 30.5877, lng: 31.5020, zoom: 12 },
    { name: 'القاهرة', lat: 30.0444, lng: 31.2357, zoom: 11 },
    { name: 'الجيزة', lat: 30.0131, lng: 31.2089, zoom: 11 },
    { name: 'العاشر من رمضان', lat: 30.2974, lng: 31.7455, zoom: 13 },
    { name: 'العاصمة الإدارية', lat: 30.0167, lng: 31.7500, zoom: 12 },
    { name: 'فايد (موقع المصنع)', lat: 30.2817, lng: 32.3285, zoom: 14 },
];

export default function InteractiveLocationPicker({
    coords,
    onLocationSelect,
    address,
    setAddress
}) {
    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markerRef = useRef(null);
    const [isLocating, setIsLocating] = useState(false);
    const [statusText, setStatusText] = useState('');

    // Default to factory location (Fayed, Ismailia) if no coords
    const initialLat = coords?.lat || 30.2817;
    const initialLng = coords?.lng || 32.3285;

    useEffect(() => {
        if (!mapContainerRef.current) return;

        if (!mapInstanceRef.current) {
            const map = L.map(mapContainerRef.current, {
                center: [initialLat, initialLng],
                zoom: coords?.lat ? 14 : 10,
                zoomControl: false
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors',
                maxZoom: 19,
            }).addTo(map);

            // Custom glowing pin icon
            const customIcon = L.divIcon({
                className: 'custom-map-pin',
                html: `
                    <div style="
                        width: 36px;
                        height: 36px;
                        background: #10b981;
                        border: 3px solid #ffffff;
                        border-radius: 50% 50% 50% 0;
                        transform: rotate(-45deg);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 0 20px rgba(16, 185, 129, 0.8), 0 4px 10px rgba(0,0,0,0.5);
                    ">
                        <div style="width: 10px; height: 10px; background: #0f172a; border-radius: 50%;"></div>
                    </div>
                `,
                iconSize: [36, 36],
                iconAnchor: [18, 36]
            });

            const marker = L.marker([initialLat, initialLng], {
                draggable: true,
                icon: customIcon
            }).addTo(map);

            markerRef.current = marker;
            mapInstanceRef.current = map;

            // Handle map click
            map.on('click', async (e) => {
                const { lat, lng } = e.latlng;
                marker.setLatLng([lat, lng]);
                setStatusText('جارٍ جلب العنوان...');
                const readable = await getReadableAddress(lat, lng);
                if (setAddress) setAddress(readable);
                if (onLocationSelect) {
                    onLocationSelect({
                        lat,
                        lng,
                        address: readable,
                        mapsUrl: `https://www.google.com/maps?q=${lat},${lng}`
                    });
                }
                setStatusText('');
            });

            // Handle marker drag end
            marker.on('dragend', async () => {
                const pos = marker.getLatLng();
                setStatusText('جارٍ جلب العنوان...');
                const readable = await getReadableAddress(pos.lat, pos.lng);
                if (setAddress) setAddress(readable);
                if (onLocationSelect) {
                    onLocationSelect({
                        lat: pos.lat,
                        lng: pos.lng,
                        address: readable,
                        mapsUrl: `https://www.google.com/maps?q=${pos.lat},${pos.lng}`
                    });
                }
                setStatusText('');
            });
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    // Update marker if coords change externally
    useEffect(() => {
        if (coords && coords.lat && coords.lng && markerRef.current && mapInstanceRef.current) {
            markerRef.current.setLatLng([coords.lat, coords.lng]);
            mapInstanceRef.current.setView([coords.lat, coords.lng], 15);
        }
    }, [coords]);

    const handleGpsClick = () => {
        if (!navigator.geolocation) {
            alert('متصفحك لا يدعم تحديد الموقع');
            return;
        }

        setIsLocating(true);
        setStatusText('جارٍ قراءة إشارة الـ GPS بدقة...');

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                if (markerRef.current && mapInstanceRef.current) {
                    markerRef.current.setLatLng([lat, lng]);
                    mapInstanceRef.current.setView([lat, lng], 16);
                }
                const readable = await getReadableAddress(lat, lng);
                if (setAddress) setAddress(readable);
                if (onLocationSelect) {
                    onLocationSelect({
                        lat,
                        lng,
                        address: readable,
                        mapsUrl: `https://www.google.com/maps?q=${lat},${lng}`
                    });
                }
                setIsLocating(false);
                setStatusText('');
            },
            () => {
                setIsLocating(false);
                setStatusText('تعذر التقاط GPS، حدد موقعك بالنقر على الخريطة مباشرة.');
                setTimeout(() => setStatusText(''), 4000);
            },
            { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
        );
    };

    const handleSelectGovernorate = (gov) => {
        if (mapInstanceRef.current && markerRef.current) {
            mapInstanceRef.current.setView([gov.lat, gov.lng], gov.zoom);
            markerRef.current.setLatLng([gov.lat, gov.lng]);
            getReadableAddress(gov.lat, gov.lng).then(readable => {
                if (setAddress) setAddress(readable);
                if (onLocationSelect) {
                    onLocationSelect({
                        lat: gov.lat,
                        lng: gov.lng,
                        address: readable,
                        mapsUrl: `https://www.google.com/maps?q=${gov.lat},${gov.lng}`
                    });
                }
            });
        }
    };

    return (
        <div className="space-y-2.5 text-right" dir="rtl">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <MapPin size={14} className="text-primary" />
                    حدد أو اسحب الدبوس على الخريطة لموقعك الدقيق:
                </span>
                {statusText && (
                    <span className="text-[11px] text-primary font-bold animate-pulse">
                        {statusText}
                    </span>
                )}
            </div>

            {/* Quick Egyptian Cities Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
                <span className="text-slate-400 font-bold flex-shrink-0">انتقال سريع:</span>
                {GOVERNORATES.map((gov) => (
                    <button
                        key={gov.name}
                        type="button"
                        onClick={() => handleSelectGovernorate(gov)}
                        className="bg-white/5 hover:bg-primary/20 hover:text-primary text-slate-300 px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors border border-white/5 text-[11px] font-medium"
                    >
                        {gov.name}
                    </button>
                ))}
            </div>

            {/* Interactive Leaflet Map Container */}
            <div className="relative w-full h-56 rounded-2xl overflow-hidden border border-white/15 shadow-inner">
                <div ref={mapContainerRef} className="w-full h-full z-10" />

                {/* Floating GPS Button on Map */}
                <button
                    type="button"
                    onClick={handleGpsClick}
                    disabled={isLocating}
                    className="absolute top-3 left-3 z-[400] bg-slate-900/90 hover:bg-slate-900 border border-primary/40 text-primary hover:text-emerald-300 px-3 py-2 rounded-xl text-xs font-bold shadow-lg backdrop-blur-md flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
                    title="التقاط موقعي الحالي عبر GPS"
                >
                    {isLocating ? (
                        <>
                            <Loader2 size={14} className="animate-spin text-primary" />
                            <span>جارٍ التحديد...</span>
                        </>
                    ) : (
                        <>
                            <Navigation size={14} className="text-primary" />
                            <span>موقعي الحالي (GPS)</span>
                        </>
                    )}
                </button>

                {/* Helpful Instruction Overlay */}
                <div className="absolute bottom-2 right-2 z-[400] bg-slate-900/80 backdrop-blur-md border border-white/10 text-[10px] text-slate-300 px-2.5 py-1 rounded-lg pointer-events-none">
                    💡 انقر على أي نقطة أو اسحب الدبوس الأخضر لموقعك
                </div>
            </div>
        </div>
    );
}
