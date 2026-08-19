# سجل التحديثات (AX_Updates_Buffer)

## تحسين تجربة طلب التوريد واستخراج العنوان العربي الفعلي بالـ GPS
- **استخراج اسم الموقع الفعلي (Arabic Reverse Geocoding):**
  - إنشاء [reverseGeocode.js](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/utils/reverseGeocode.js) لتحويل إحداثيات الـ GPS فورياً إلى اسم الشارع، الحي/المنطقة، المدينة/المركز، والمحافظة باللغة العربية بدلاً من الأرقام الصامتة.
- **إضافة أرقام هواتف متعددة:**
  - إمكانية إضافة حتى 4 أرقام هواتف للتواصل في [OrderModal.jsx](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/components/OrderModal.jsx) و [CartDrawer.jsx](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/components/CartDrawer.jsx) وتنسيقها مع روابط واتساب مباشرة في رسالة التلجرام.
- **تحسين رسائل التحقق (Modern Validation Alerts):**
  - استبدال الـ Alerts التقليدية بشريط تنبيه داخلي متحرك وأنيق عند نسيان كتابة الاسم أو الرقم.
- **تسهيل إعادة الطلب (New Order Flow):**
  - إضافة زر "إجراء طلب توريد جديد" يعيد تعيين الحقول فوراً لتمكين العميل من إجراء طلبات متتالية، وجعل زر الواتساب خياراً إضافياً وليس إجبارياً.
- **تحسين مسارات العودة للمنتجات (Smooth Navigation):**
  - توجيه زر العودة في صفحات الأقسام والمنتجات إلى قسم `#products` مباشرة مع التمرير السلس، وإضافة شريط تنقل سريع بين جميع الأقسام.
- بناء ونشر التحديثات أونلاين على الدومين بنجاح.
