import { useEffect } from 'react';

const SUPABASE_URL = 'https://yrbvzxbawdjfafjieyff.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyYnZ6eGJhd2RqZmFmamlleWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5ODExNzksImV4cCI6MjA5NzU1NzE3OX0.viV6mpDuDtaJJpdWHzWffd44RhAbFY5VwLbNdwOode8';

const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
};

const getSessionId = () => {
    try {
        let sess = sessionStorage.getItem('ax_visitor_session');
        if (!sess) {
            sess = 'sess_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now();
            sessionStorage.setItem('ax_visitor_session', sess);
        }
        return sess;
    } catch {
        return 'sess_anon';
    }
};

const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'tablet';
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated/i.test(ua)) return 'mobile';
    return 'desktop';
};

export const trackProductView = async (productId) => {
    if (!productId) return;
    try {
        await fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_web_product_view`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ p_id: productId })
        });
    } catch {}
};

export const useAnalytics = (path) => {
    useEffect(() => {
        const currentPath = path || window.location.pathname;
        const loggedKey = `ax_logged_${currentPath}`;

        if (sessionStorage.getItem(loggedKey)) return;

        const recordVisit = async () => {
            try {
                const sessionId = getSessionId();
                const deviceType = getDeviceType();
                const referrer = document.referrer || null;

                sessionStorage.setItem(loggedKey, 'true');

                await fetch(`${SUPABASE_URL}/rest/v1/ax_web_visits`, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        session_id: sessionId,
                        path: currentPath,
                        device_type: deviceType,
                        referrer
                    })
                });
            } catch {}
        };

        recordVisit();
    }, [path]);
};
