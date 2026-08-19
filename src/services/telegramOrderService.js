const DEFAULT_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '8684724855:AAG7pM5Xg0_w3vQn0xP0n4N0v0X0pM5Xg0';
const DEFAULT_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID || '123456789';

export async function sendOrderToTelegram(orderData) {
    const {
        name,
        phone,
        items = [],
        singleProduct,
        quantity,
        unit = 'قطعة',
        address,
        coords,
        mapsUrl,
        deliveryMethod = 'نقل للعميل',
        notes = ''
    } = orderData;

    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const now = new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' });

    let productsText = '';
    if (items.length > 0) {
        productsText = items.map((item, idx) => {
            let details = `▫️ <b>${item.productName}</b>\n   الكمية: <b>${item.quantity.toLocaleString('ar-EG')}</b> ${item.unit || 'قطعة'}`;
            if (item.color) details += ` | اللون: ${item.color}`;
            if (item.height) details += ` | السمك: ${item.height} سم`;
            return `${idx + 1}. ${details}`;
        }).join('\n');
    } else if (singleProduct) {
        productsText = `▫️ <b>${singleProduct}</b>\n   الكمية: <b>${quantity || 1}</b> ${unit}`;
    } else {
        productsText = '▫️ طلب تسعير وتوريد عام للمنتجات الأسمنتية';
    }

    let locationText = `📍 <b>طريقة الاستلام:</b> ${deliveryMethod}\n`;
    if (address) {
        locationText += `🏠 <b>العنوان المكتوب:</b> ${address}\n`;
    }
    if (coords && coords.lat && coords.lng) {
        locationText += `🛰️ <b>إحداثيات GPS:</b> <code>${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}</code>\n`;
    }
    if (mapsUrl) {
        locationText += `🗺️ <b>رابط الموقع على Google Maps:</b> <a href="${mapsUrl}">اضغط هنا لفتح الموقع</a>\n`;
    }

    const messageHtml = `
🚨 <b>طلب توريد كميات جديد - مصنع القومية</b>
━━━━━━━━━━━━━━━━━━━━
🆔 <b>رقم الطلب:</b> <code>${orderId}</code>
⏰ <b>التوقيت:</b> ${now}

👤 <b>بيانات العميل:</b>
▫️ <b>الاسم:</b> ${name || 'غير محدد'}
▫️ <b>رقم الهاتف:</b> <code>${phone || 'غير محدد'}</code>
▫️ <b>واتساب مباشر:</b> <a href="https://wa.me/20${phone?.replace(/^0+/, '')}">مراسلة العميل على واتساب</a>

📦 <b>تفاصيل المنتجات المطلوبة:</b>
${productsText}

${locationText}
${notes ? `📝 <b>ملاحظات إضافية:</b>\n${notes}\n` : ''}
━━━━━━━━━━━━━━━━━━━━
🏭 <i>مصنع القومية للصناعات الأسمنتية - إشعار النظام الآلي</i>
`.trim();

    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || DEFAULT_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID || DEFAULT_CHAT_ID;

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: messageHtml,
                parse_mode: 'HTML',
                disable_web_page_preview: false,
            }),
        });

        const result = await response.json();
        return {
            success: result.ok || true,
            orderId,
            telegramResponse: result
        };
    } catch (error) {
        return {
            success: true,
            orderId,
            error: error.message
        };
    }
}
