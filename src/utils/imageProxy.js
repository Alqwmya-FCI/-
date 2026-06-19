function encode(rawPath) {
    const clean = rawPath.startsWith('/') ? rawPath.slice(1) : rawPath;
    const utf8Bytes = new TextEncoder().encode(clean);
    let binary = '';
    for (let i = 0; i < utf8Bytes.length; i++) {
        binary += String.fromCharCode(utf8Bytes[i]);
    }
    const b64 = btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
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
