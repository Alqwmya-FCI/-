const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '7251180380:AAH3l0WxqG0neeAM3M34RU--uq_pNdxetK0';

const ADMIN_CHAT_IDS = [
    '5807594024',
    '1952591672',
    '6806028712',
    '837246270',
    '1250807364'
];

export async function sendOrderToTelegram(orderData) {
    const {
        name,
        phone,
        phones = [],
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
        locationText += `🗺️ <b>رابط الموقع على Google Maps:</b> <a href="${mapsUrl}">اضغط هنا لفتح الموقع على الخريطة</a>\n`;
    }

    const phonesList = (phones.length > 0 ? phones : (phone ? [phone] : [])).filter(p => p && p.trim());
    const phonesFormatted = phonesList.map((p, i) => {
        const clean = p.replace(/[^0-9]/g, '');
        const wa = clean ? `https://wa.me/2${clean.startsWith('0') ? clean : '0' + clean}` : '';
        return `▫️ <b>الهاتف ${phonesList.length > 1 ? `(${i + 1})` : ''}:</b> <code>${p}</code> ${wa ? `👉 <a href="${wa}">واتساب مباشر</a>` : ''}`;
    }).join('\n') || '▫️ <b>رقم الهاتف:</b> غير محدد';

    const messageHtml = `
🚨 <b>طلب توريد كميات جديد - مصنع القومية</b>
━━━━━━━━━━━━━━━━━━━━
🆔 <b>رقم الطلب:</b> <code>${orderId}</code>
⏰ <b>التوقيت:</b> ${now}

👤 <b>بيانات العميل:</b>
▫️ <b>الاسم:</b> ${name || 'غير محدد'}
${phonesFormatted}

📦 <b>تفاصيل المنتجات المطلوبة:</b>
${productsText}

${locationText}
${notes ? `📝 <b>ملاحظات إضافية:</b>\n${notes}\n` : ''}
━━━━━━━━━━━━━━━━━━━━
🏭 <i>مصنع القومية للصناعات الأسمنتية - نظام الإشعارات الفورية</i>
`.trim();

    const sendPromises = ADMIN_CHAT_IDS.map(chatId =>
        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
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
        }).then(res => res.json()).catch(err => ({ ok: false, error: err.message }))
    );

    try {
        const results = await Promise.all(sendPromises);
        return {
            success: true,
            orderId,
            results
        };
    } catch (error) {
        return {
            success: true,
            orderId,
            error: error.message
        };
    }
}
