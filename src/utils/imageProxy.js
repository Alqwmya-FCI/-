function encode(rawPath) {
    const clean = rawPath.startsWith('/') ? rawPath.slice(1) : rawPath;
    const b64 = btoa(clean).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    return `/api/img?k=${b64}`;
}

export function img(path) {
    if (!path) return '';
    return encode(path);
}

export function imgArr(paths) {
    if (!Array.isArray(paths)) return [];
    return paths.map(encode);
}
