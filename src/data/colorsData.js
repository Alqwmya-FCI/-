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
        unit: 'قطعة',
        label: 'الكمية',
        min: 1,
        step: 1,
        presets: [1000, 2000, 5000, 10000],
        presetLabel: 'ألف قطعة',
    },
    interlock: {
        unit: 'م²',
        label: 'الكمية (م²)',
        min: 1,
        step: 1,
        presets: [50, 100, 200, 500],
        presetLabel: 'م²',
    },
    curbs: {
        unit: 'م.ط',
        label: 'الكمية (م.ط)',
        min: 1,
        step: 1,
        presets: [10, 25, 50, 100],
        presetLabel: 'م.ط',
    },
    blocks: {
        unit: 'قطعة',
        label: 'الكمية (قطعة)',
        min: 1,
        step: 10,
        presets: [100, 500, 1000, 2000],
        presetLabel: 'قطعة',
    },
    tiles: {
        unit: 'م²',
        label: 'الكمية (م²)',
        min: 1,
        step: 1,
        presets: [10, 25, 50, 100],
        presetLabel: 'م²',
    },
};
