import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

const MIME = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
}

function imageProxyPlugin() {
  return {
    name: 'ax-image-proxy',
    configureServer(server) {
      server.middlewares.use('/api/img', (req, res) => {
        const url = new URL(req.url, 'http://localhost')
        const k = url.searchParams.get('k')
        if (!k) { res.statusCode = 400; res.end(); return }

        let decoded
        try {
          const b64 = k.replace(/-/g, '+').replace(/_/g, '/')
          const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4)
          decoded = Buffer.from(padded, 'base64').toString('utf8')
        } catch {
          res.statusCode = 400; res.end(); return
        }

        const normalized = path.normalize(decoded).replace(/^(\.\.([/\\]|$))+/, '')
        const publicDir = path.join(process.cwd(), 'public')
        const target = path.join(publicDir, normalized)

        if (!target.startsWith(publicDir)) { res.statusCode = 403; res.end(); return }
        if (!fs.existsSync(target)) { res.statusCode = 404; res.end(); return }

        const ext = path.extname(target).toLowerCase()
        const contentType = MIME[ext] || 'application/octet-stream'

        const data = fs.readFileSync(target)
        res.setHeader('Content-Type', contentType)
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
        res.end(data)
      })
    }
  }
}

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    imageProxyPlugin(),
  ],
})


