const SUPABASE_URL = 'https://yrbvzxbawdjfafjieyff.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyYnZ6eGJhd2RqZmFmamlleWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5ODExNzksImV4cCI6MjA5NzU1NzE3OX0.viV6mpDuDtaJJpdWHzWffd44RhAbFY5VwLbNdwOode8';

const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Accept': 'application/json'
};

export const fetchCatalogFromDB = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    try {
        const [categoriesRes, productsRes] = await Promise.all([
            fetch(`${SUPABASE_URL}/rest/v1/ax_web_categories?select=*&is_active=eq.true&order=display_order.asc`, {
                headers,
                signal: controller.signal
            }),
            fetch(`${SUPABASE_URL}/rest/v1/ax_web_products?select=*&is_published=eq.true&order=display_order.asc`, {
                headers,
                signal: controller.signal
            })
        ]);

        clearTimeout(timeoutId);

        if (!categoriesRes.ok || !productsRes.ok) {
            throw new Error('Supabase fetch failed');
        }

        const categories = await categoriesRes.json();
        const products = await productsRes.json();

        const catalog = {};

        for (const cat of categories) {
            const catProducts = products
                .filter(p => p.category_id === cat.id)
                .map(p => ({
                    id: p.id,
                    name: p.name,
                    shortDescription: p.short_description || '',
                    images: Array.isArray(p.images) ? p.images : [],
                    image: Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : '',
                    specs: typeof p.specs === 'object' && p.specs !== null ? p.specs : {},
                    heights: Array.isArray(p.heights) ? p.heights : []
                }));

            catalog[cat.id] = {
                title: cat.title,
                description: cat.description,
                items: catProducts
            };
        }

        return catalog;
    } catch (err) {
        clearTimeout(timeoutId);
        return null;
    }
};
