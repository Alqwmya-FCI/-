# سجل التحديثات (AX_Updates_Buffer)

## إصلاحات واجهة المستخدم (UI/UX Bug Fixes)
- **إصلاح الشعار:** تم استبدال أيقونة الترس بالشعار الرسمي للمصنع `logo.png` في شريط التنقل.
- **إصلاح قسم الإحصائيات (الأرقام والخبرة):** تم تعديل فئات Tailwind (من `border-l` و `pl-8` إلى `border-s` و `ps-8`) لضمان التوافق التام مع اللغتين العربية والإنجليزية وعدم تشوه التصميم (باظيط).
- **تفعيل الوضع الليلي وتغيير اللغة:** تم ربط تغيير حالة اللغة (`lang`) والوضع الليلي (`isDark`) بجذور المستند `document.documentElement` بحيث يعمل الوضع الليلي بكفاءة ويتم تبديل اتجاه الصفحة (`dir`) تلقائياً.
- **إصلاح التمرير السريع (Fast Scroll):** تمت إضافة `scroll-behavior: smooth` إلى ملف `index.css` لضمان التمرير السلس والانسيابي عند الضغط على الروابط بدلاً من القفز المفاجئ.

## نظام رصد الأخطاء الفوري عبر التلجرام وحماية الواجهة
- **إنشاء نظام التنبيه الذاتي للأخطاء ([AX_TelegramAlert.js](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/utils/AX_TelegramAlert.js)):**
  - رصد أي خطأ JavaScript غير معالج (`window.onerror` و `unhandledrejection`).
  - إرسال تفاصيل الخطأ مباشرة لحساب الأدمن على تلجرام وتشمل: (نوع الخطأ، توقيت مصر، رابط الصفحة، أبعاد الشاشة ونوع الجهاز، نص الخطأ، وتتبع الكود Stack Trace).
  - تفعيل آلية الحماية من التكرار (Throttle Cache) لمنع إغراق البوت في حال تكرار نفس الخطأ في الجلسة الواحدة.
- **تطبيق React ErrorBoundary ([ErrorBoundary.jsx](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/components/ErrorBoundary.jsx)):**
  - التقاط أي انهيار في شجرة المكونات وتنبيه التلجرام فوراً، مع إظهار شاشة استرجاع أنيقة للعميل دون ظهور شاشة بيضاء فارغة.
- **مراجعة الأمان وهيكلة الملفات:**
  - تفكيك ملف `HomePage.jsx` إلى مكونات فرعية والالتزام الكامل بسقف 500 سطر للملف.
  - تأمين ملفات البيئة في `.gitignore`.
- بناء واختبار ونشر التحديث أونلاين على الدومين بنجاح.

## ترقية الأداء الشاملة واستئصال FOUT وثقل الصور (Performance & UX Overhaul)
- **ضغط وتحويل الصور بنسبة 90.9% إلى WebP:**
  - تقليص الحجم الإجمالي للصور من 74.53 ميجابايت إلى 6.77 ميجابايت فقط.
  - خفض حجم صور الهيرو الرئيسية من 6.5 ميجابايت للصورة الواحدة إلى ~250 كيلوبايت (توفير أكثر من 96% لكل صورة).
  - ضغط صور المنتجات والإنترلوك والبردورات واستبدالها بنسخ WebP خفيفة وفورية التحميل.
- **القضاء التام على مشكلة وميض النصوص الإنجليزية (Zero-FOUT Architecture):**
  - استئصال خط أيقونات جوجل الخارجي (`Material Symbols Outlined`) المعتمد على نصوص Ligatures الإنجليزية (`precision_manufacturing` و `settings_suggest` و `arrow_forward`).
  - استبدال كافة الأيقونات بمكونات SVG أصلية وفورية من مكتبة `lucide-react` بدون أي انتظار لتحميل خطوط خارجية.
  - تعريب كامل لكافة المفاتيح المتبقية باللغة الإنجليزية في نصوص الواجهة.
- **تحسين استهلاك المعالج والذاكرة (CPU & Memory Optimization):**
  - إلغاء حلقة الرسم التكراري في الكانفاس (`canvasRef` 60fps) لتوفير طاقة المعالج وبطارية الهواتف.
  - إعادة هندسة كروت المنتجات (`FadingSquareCard` و `FadingProductGallery`) بالاعتماد على التحولات البصرية المسرعة عتادياً بالـ CSS الخالص وإلغاء إنشاء وتدمير 25 عنصر DOM متكرر.
  - توحيد الخطوط الأساسية على خط `Cairo` وإزالة التكرار في ملفات الـ CSS.

## ربط الموقع السحابي بقاعدة بيانات المصنع (Supabase Real-Time Catalog Integration)
- **إنشاء وتأمين جداول الكتالوج العامة (`ax_web_categories` و `ax_web_products`):**
  - تأسيس جدول الأقسام `ax_web_categories` وجدول المنتجات `ax_web_products` على سوبابيز المصنع (`supabase_alqwmya`).
  - عزل كامل لبيانات الإنتاج والتكاليف والوصفات السرية للمصنع (`ax_products`) عن كتالوج الموقع العام لضمان سيادة مبدأ Zero-Trust.
  - تفعيل سياسات الأمان الصارمة على مستوى الصفوف (Row Level Security - RLS):
    - قراءة عامة للزوار للمنتجات والأقسام النشطة والمنشورة فقط.
    - حظر كامل لأي عمليات إضافة أو تعديل أو حذف وحصرها حصرياً ومطلقاً على حساب عبد الشافي (`axsonid@gmail.com` / `abdalshafybakr@gmail.com`).
  - حقن بيانات الكتالوج بالكامل لجميع المنتجات (20 منتجاً عبر 5 أقسام رئيسية: طوب أسمنتي، إنترلوك متداخل، بردورات خرسانية، بلوك أسمنتي مفرغ، وبلاط موزايكو).
- **بناء عميل الربط الذكي والخطاف الديناميكي ([supabaseClient.js](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/utils/supabaseClient.js) و [useCatalogData.js](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/hooks/useCatalogData.js)):**
  - استدعاء ديناميكي مباشر ومحمي عبر PostgREST API بدون مكتبات خارجية متضخمة للحفاظ على أعلى سرعة ممكنة.
  - نظام كاش محلي فوري (Zero-Downtime Guarantee) مع Fallback تلقائي للبيانات المحلية في حال انقطاع الشبكة أو بطء الاستجابة لضمان تشغيل الموقع بنسبة 100% دون أي توقف أو شاشات بيضاء.
## ترقية الـ PWA، الإشعارات الفورية، لوحة التحكم الحية، وتتبع الزيارات (PWA, Push & Admin Dashboard)
- **تثبيت PWA الأصيل وتحديث فوري بدون مسح التطبيق (`ax_pwa_native_installer`):**
  - توليد الأيقونات القياسية `192x192` و `512x512` وشارة أندرويد المفرغة `badge-mono.png` وأيقونة الخلفية البيضاء `logo-white.png`.
  - التقاط حدث `beforeinstallprompt` مبكراً في `<head>` عبر `window.__deferredPwaPrompt`.
  - إضافة ملف البيان `manifest.json` وتفعيل وضع التطبيق المستقل (Standalone).
  - تثبيت Service Worker (`sw.js`) مع عزل صريح لملف `version.json` لمنع تجميد الكاش.
  - إضافة شريط التحديث الفوري التفاعلي ([AppUpdateNotifier.jsx](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/components/AppUpdateNotifier.jsx)) لتطهير الكاش بنقرة واحدة `caches.delete`.
  - إضافة لافتة التثبيت بنقرة واحدة ([PWAInstallBanner.jsx](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/components/PWAInstallBanner.jsx)).
- **الإشعارات الفورية وتنبيهات الصوت والهزة (`ax_web_push_craft`):**
  - تركيب نافذة التفعيل الإلزامي للإشعارات ([AX_MandatoryPushModal.jsx](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/components/AX_MandatoryPushModal.jsx)).
  - تأسيس جدول الاشتراكات `public.ax_push_subscriptions` في سوبابيز.
  - محرك توليد نغمة الرنين الفورية عبر الويب ([audioChime.js](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/utils/audioChime.js)) واهتزاز هاتف حقيقي `[300, 150, 300, 150, 300]`.
- **رصد حركة الزيارات والمنتجات الأكثر مشاهدة (Live Traffic Analytics):**
  - إنشاء جدول الزيارات `public.ax_web_visits` وعمود عداد المشاهدات `view_count` في `ax_web_products`.
  - دالة سحابية ذرية `increment_web_product_view(p_id)` لزيادة عداد مشاهدات كل منتج لحظياً دون تعارض.
  - خطاف رصد الزيارات الذاتي ([useAnalytics.js](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/hooks/useAnalytics.js)) لتسجيل الجلسات ونوع الجهاز (موبايل/كمبيوتر) مع منع التكرار في الجلسة الواحدة.
- **لوحة تحكم الموقع والطلبات المباشرة (Admin Dashboard `/admin`):**
  - بوابة دخول آمنة برمز مرور خاص للمدير ([AdminAuthModal.jsx](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/components/admin/AdminAuthModal.jsx)).
  - بث مباشر للطلبات مع تنبيه صوتي فوري ([AdminOrdersTab.jsx](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/components/admin/AdminOrdersTab.jsx)) وتواصل بنقرة واحدة عبر واتساب أو الاتصال الهاتفي ورابط الخريطة وتغيير حالة الطلب.
  - تحليلات الزيارات والمنتجات الأكثر طلباً ([AdminStatsTab.jsx](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/components/admin/AdminStatsTab.jsx)).
  - إدارة الكتالوج وإضافة منتجات جديدة مع صور متعددة ومواصفات تفصيلية ونشر فوري بالوقت الفعلي ([AdminCatalogTab.jsx](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/components/admin/AdminCatalogTab.jsx)).
  - ربط حفظ الطلبات من سلة المشتريات ومودال الطلب مباشرة في قاعدة البيانات ([orderService.js](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/services/orderService.js)) مع استمرار التليجرام كنسخة احتياطية آمنة.


