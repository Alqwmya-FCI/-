# موقع مصنع القومية للصناعات الأسمنتية

موقع بطاقات تعريف للعاملين في مصنع القومية.

## الملفات

- `index.html` - الصفحة الرئيسية
- `ali.html` - بطاقة م/ علي عبد الشافي
- `hussein.html` - بطاقة م/ حسين علي عبدالشافي
- `styles.css` - ملف الأنماط المخصص
- `script.js` - وظائف JavaScript (مشاركة، VCard)
- `images/` - مجلد الصور

## خطوات الإعداد

### 1. إنشاء مجلد الصور ونسخ الملفات

قم بتشغيل الأوامر التالية في PowerShell:

```powershell
# إنشاء مجلد images
mkdir images -Force

# نسخ الصور من المجلد الحالي
copy "public\logo.png" "images\logo.png"
copy "src\assets\manager.png" "images\manager.png"
```

### 2. اختبار الموقع محلياً

افتح `index.html` في المتصفح مباشرة أو استخدم خادم محلي بسيط:

```powershell
# استخدم Python إذا كان متوفراً
python -m http.server 8000

# أو استخدام Node.js
npx http-server -p 8000
```

ثم افتح المتصفح على `http://localhost:8000`

### 3. النشر على GitHub Pages

```powershell
# إضافة الملفات الجديدة
git add index.html ali.html hussein.html styles.css script.js images/ README.md

# عمل commit
git commit -m "Convert to vanilla HTML/CSS/JS - remove React dependencies"

# رفع على GitHub
git push
```

انتظر 2-5 دقائق ثم افتح الموقع على GitHub Pages.

## الوظائف المتوفرة

- ✅ عرض بطاقات تعريفية للموظفين
- ✅ مشاركة البطاقة عبر نسخ الرابط
- ✅ تحميل جهة الاتصال بصيغة VCF
- ✅ روابط لوسائل التواصل الاجتماعي وموقع المصنع
- ✅ تصميم متجاوب مع جميع الأجهزة
- ✅ استخدام خط Cairo العربي

## ملاحظات

- الموقع لا يحتاج React أو Node.js للعمل
- يعمل مباشرة عبر فتح ملفات HTML
- يستخدم Tailwind CSS عبر CDN
- جميع الأيقونات مضمنة كـ SVG inline

## حذف الملفات القديمة (اختياري)

بعد التأكد من عمل الموقع الجديد، يمكنك حذف ملفات React القديمة:

```powershell
# احذف المجلدات والملفات غير المستخدمة
Remove-Item -Recurse -Force src, dist, node_modules
Remove-Item package.json, package-lock.json, vite.config.js, tailwind.config.js, eslint.config.js, vercel.json
```

**تحذير:** تأكد من عمل الموقع الجديد قبل حذف الملفات القديمة!
