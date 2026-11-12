# دستور مشروع مصنع القومية (AL-QAWMIA FACTORY CONSTITUTION)

## 0. الحظر الدستوري الصارم لكروت الـ QR والتحويلات المطبوعة (Strict QR Redirect Invariant)
> **تنبيه دستوري حاكم (Rule #0 - Absolute & Permanent Invariant):**  
> كروت العمل الورقية واللافتات والبانرات مطبوع عليها كود QR رسمي مشفر برابط:
> `https://alqwmya-fci.github.io/-/ali/`
>
> 1. **حظر الحذف أو التجاهل:** يُحظر تماماً حذف أو تعديل أو تجاهل مجلدات التحويلات في `public/` و `dist/`:
>    - `public/ali/index.html` ➔ تحويل فوري لـ `https://alqwmya.com/eng-ali-abdelshafy/`
>    - `public/eng-ali-abdelshafy/index.html` ➔ تحويل فوري لـ `https://alqwmya.com/eng-ali-abdelshafy/`
>    - `public/hussein/index.html` ➔ تحويل فوري لـ `https://alqwmya.com/eng-hussein-abdelshafy/`
>    - `public/eng-hussein-abdelshafy/index.html` ➔ تحويل فوري لـ `https://alqwmya.com/eng-hussein-abdelshafy/`
>    - `public/404.html` ➔ صائد تحويل عام وشامل لأي رابط فرعي قديم على `github.io`
> 2. **الحارس التلقائي الإلزامي (Build Guard):** سكربت `scripts/ensure_qr_redirects.cjs` مرتبط تلقائياً بـ `prebuild` و `postbuild` وإضافة `axQrRedirectGuardPlugin()` في `vite.config.js`. أي عملية Build للمشروع تُعيد توليد وتأمين هذه المجلدات إجبارياً في `public` و `dist`.
> 3. **المزامنة مع مستودع جيت هاب:** عند أي نشر على فرع `gh-pages` في مستودع `Alqwmya-FCI/-`، يجب التأكد من تواجد هذه المجلدات في الـ root لضمان عدم ظهور صفحة 404 نهائياً للعملاء الذين يمسحون الكروت المطبوعة.
