export const PRODUCT_COLORS = {
    interlock: [
        { name: 'رمادي',   hex: '#9CA3AF' },
        { name: 'أحمر',    hex: '#DC2626' },
        { name: 'أصفر',    hex: '#CA8A04' },
        { name: 'أسود',    hex: '#1F2937' },
        { name: 'أبيض',    hex: '#F3F4F6', border: true },
        { name: 'نبيتي',   hex: '#14532D' },
        { name: 'بيج',     hex: '#D4B896' },
    ],
    tiles: [
        { name: 'كرارة',          hex: '#F5F5F0', border: true },
        { name: 'عسلي برلاتو',   hex: '#C8975A' },
        { name: 'رمادي',          hex: '#9CA3AF' },
        { name: 'أحمر',           hex: '#DC2626' },
        { name: 'أسود',           hex: '#1F2937' },
    ],
    bricks: [],
    blocks: [],
    curbs:  [],
};

export const QUANTITY_CONFIG = {
    bricks: {
        unit: 'طوبة',
        label: 'الكمية (طوبة)',
        min: 1,
        step: 1000,
        presets: [1000, 2000, 5000, 10000],
        presetLabel: 'ألف طوبة',
    },
    interlock: {
        unit: 'متر',
        label: 'الكمية (متر)',
        min: 1,
        step: 1,
        presets: [50, 100, 200, 500],
        presetLabel: 'متر',
    },
    curbs: {
        unit: 'متر',
        label: 'الكمية (متر)',
        min: 1,
        step: 1,
        presets: [10, 25, 50, 100],
        presetLabel: 'متر',
    },
    blocks: {
        unit: 'بلوكة',
        label: 'الكمية (بلوكة)',
        min: 1,
        step: 10,
        presets: [100, 500, 1000, 2000],
        presetLabel: 'بلوكة',
    },
    tiles: {
        unit: 'متر',
        label: 'الكمية (متر)',
        min: 1,
        step: 1,
        presets: [10, 25, 50, 100],
        presetLabel: 'متر',
    },
};
