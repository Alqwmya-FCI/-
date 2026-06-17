import fs from 'fs';
import path from 'path';

const MIME = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
};

export default function handler(req, res) {
    const { k } = req.query;
    if (!k || typeof k !== 'string') return res.status(400).end();

    let decoded;
    try {
        const b64 = k.replace(/-/g, '+').replace(/_/g, '/');
        const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
        decoded = Buffer.from(padded, 'base64').toString('utf8');
    } catch {
        return res.status(400).end();
    }

    const normalized = path.normalize(decoded).replace(/^(\.\.(\/|\\|$))+/, '');
    const target = path.join(process.cwd(), 'public', normalized);
    const base = path.join(process.cwd(), 'public');

    if (!target.startsWith(base)) return res.status(403).end();
    if (!fs.existsSync(target)) return res.status(404).end();

    const ext = path.extname(target).toLowerCase();
    const contentType = MIME[ext] || 'application/octet-stream';

    const data = fs.readFileSync(target);
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('X-Robots-Tag', 'noindex, noimageindex');
    res.setHeader('Content-Disposition', 'inline');
    res.end(data);
}
