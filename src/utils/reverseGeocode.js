export async function getReadableAddress(lat, lng) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=ar`, {
            headers: {
                'User-Agent': 'AlQwmyaCementFactoryApp/1.0'
            }
        });
        const data = await response.json();
        if (data && data.display_name) {
            const addr = data.address || {};
            const parts = [
                addr.amenity || addr.building || addr.landmark || addr.leisure,
                addr.road,
                addr.neighbourhood || addr.suburb || addr.quarter,
                addr.city || addr.town || addr.village || addr.municipality,
                addr.state
            ].filter(Boolean);

            if (parts.length > 0) {
                return parts.join('، ');
            }
            return data.display_name;
        }
    } catch (error) {
        // Fallback silently if offline or rate limited
    }
    return `موقع محدد عبر GPS (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
}
