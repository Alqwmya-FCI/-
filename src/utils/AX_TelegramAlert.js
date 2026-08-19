const AX_ADMIN_CHAT_ID = '5807594024';
const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '7251180380:AAH3l0WxqG0neeAM3M34RU--uq_pNdxetK0';

const errorThrottleCache = new Set();

export const AX_alertTelegram = async (label, errorObj, extraContext = {}) => {
    try {
        const time = new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' });
        const url = typeof window !== 'undefined' ? window.location.href : 'Unknown URL';
        const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown Device';
        const screenRes = typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'N/A';

        let errMessage = '';
        let errStack = '';

        if (errorObj instanceof Error) {
            errMessage = errorObj.message || String(errorObj);
            errStack = errorObj.stack || '';
        } else if (typeof errorObj === 'object') {
            errMessage = errorObj.message || JSON.stringify(errorObj);
            errStack = errorObj.stack || '';
        } else {
            errMessage = String(errorObj || 'Unknown Error');
        }

        // Throttle identical errors within the same session to prevent spamming
        const throttleKey = `${label}:${errMessage.slice(0, 100)}`;
        if (errorThrottleCache.has(throttleKey)) {
            return;
        }
        errorThrottleCache.add(throttleKey);
        setTimeout(() => errorThrottleCache.delete(throttleKey), 60000);

        let contextText = '';
        if (Object.keys(extraContext).length > 0) {
            contextText = `\n📋 <b>سياق إضافي:</b> <code>${JSON.stringify(extraContext, null, 2).substring(0, 300)}</code>\n`;
        }

        const messageHtml = `
🚨 <b>تنبيه عطل برمجى - مصنع القومية</b>
━━━━━━━━━━━━━━━━━━━━
🔴 <b>نوع الخطأ:</b> ${label}
⏰ <b>التوقيت:</b> ${time}
📍 <b>الصفحة:</b> <code>${url}</code>
📱 <b>الجهاز والشاشة:</b> <code>${screenRes} | ${userAgent.slice(0, 120)}</code>
${contextText}
❌ <b>نص الخطأ:</b>
<code>${errMessage.substring(0, 400)}</code>

${errStack ? `🔍 <b>تتبع الكود (Stack):</b>\n<pre>${errStack.substring(0, 600)}</pre>` : ''}
━━━━━━━━━━━━━━━━━━━━
🏭 <i>نظام الرصد الذاتي للأخطاء - مصنع القومية</i>
`.trim();

        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: AX_ADMIN_CHAT_ID,
                text: messageHtml,
                parse_mode: 'HTML',
                disable_web_page_preview: true,
            }),
        });
    } catch (err) {
        console.error("Failed to dispatch Telegram error alert:", err);
    }
};
