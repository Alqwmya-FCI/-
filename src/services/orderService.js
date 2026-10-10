import { sendOrderToTelegram } from './telegramOrderService';

const SUPABASE_URL = 'https://yrbvzxbawdjfafjieyff.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyYnZ6eGJhd2RqZmFmamlleWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5ODExNzksImV4cCI6MjA5NzU1NzE3OX0.viV6mpDuDtaJJpdWHzWffd44RhAbFY5VwLbNdwOode8';

const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
};

export async function submitOrder(orderData) {
    const orderCode = `QWM-${Date.now().toString().slice(-6)}`;

    let savedOrder = null;
    try {
        const payload = {
            order_code: orderCode,
            customer_name: orderData.name,
            phone: orderData.phone,
            phones: orderData.phones || [orderData.phone],
            single_product: orderData.singleProduct || null,
            items: orderData.items || [],
            quantity: orderData.quantity || 1,
            unit: orderData.unit || 'قطعة',
            delivery_method: orderData.deliveryMethod || 'نقل للعميل',
            address: orderData.address || '',
            coords: orderData.coords || null,
            maps_url: orderData.mapsUrl || '',
            notes: orderData.notes || '',
            status: 'new'
        };

        const res = await fetch(`${SUPABASE_URL}/rest/v1/ax_web_orders`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            const data = await res.json();
            savedOrder = data[0];
        }
    } catch {}

    try {
        sendOrderToTelegram({ ...orderData, orderCode }).catch(() => {});
    } catch {}

    return {
        success: true,
        orderId: orderCode,
        data: savedOrder
    };
}
