const CACHE_NAME = 'alqwmya-cache-v1.2.0';

self.addEventListener('install', (e) => {
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (e) => {
    const url = new URL(e.request.url);

    if (
        url.pathname.includes('version.json') ||
        url.hostname.includes('supabase.co') ||
        e.request.method !== 'GET'
    ) {
        return;
    }

    e.respondWith(
        caches.match(e.request).then((cached) => {
            const networked = fetch(e.request).then((response) => {
                if (response && response.status === 200 && response.type === 'basic') {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
                }
                return response;
            }).catch(() => cached);

            return cached || networked;
        })
    );
});

self.addEventListener('push', (e) => {
    let payload = {};
    if (e.data) {
        try {
            payload = e.data.json();
        } catch {
            payload = { title: 'مصنع القومية', body: e.data.text() };
        }
    }

    const title = payload.title || 'طلب جديد في مصنع القومية';
    const body = payload.body || payload.message || 'تم استلام طلب تسعير وتوريد جديد.';
    const origin = self.location.origin;

    const options = {
        body,
        icon: `${origin}/logo-white.png`,
        badge: `${origin}/badge-mono.png`,
        dir: 'rtl',
        lang: 'ar',
        tag: payload.tag || ('ax-order-' + Date.now()),
        renotify: true,
        vibrate: [300, 150, 300, 150, 300],
        data: {
            link: payload.link || '/admin',
            timestamp: Date.now()
        },
        actions: [
            { action: 'open', title: '🔍 فتح لوحة التحكم' },
            { action: 'dismiss', title: '✕ إغلاق' }
        ]
    };

    e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (e) => {
    e.notification.close();
    if (e.action === 'dismiss') return;

    const link = e.notification.data?.link || '/admin';

    e.waitUntil(
        self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    if ('navigate' in client && link) {
                        client.navigate(link);
                    }
                    return client.focus();
                }
            }
            if (self.clients.openWindow) {
                return self.clients.openWindow(link);
            }
        })
    );
});
