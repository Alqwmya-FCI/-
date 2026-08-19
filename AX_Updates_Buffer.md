# سجل التحديثات (AX_Updates_Buffer)

## نظام طلب الكميات الذكي وإشعارات التلجرام وتحديد الموقع التلقائي (Smart Order & Telegram Bot System)
- إنشاء مكون طلب الكميات الذكي [OrderModal.jsx](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/components/OrderModal.jsx) ودمجه مع سلة الطلبات [CartDrawer.jsx](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/components/CartDrawer.jsx) ولوحة المنتج [OrderPanel.jsx](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/components/OrderPanel.jsx).
- دعم **التحديد التلقائي للموقع (GPS)** بنقرة واحدة عبر `navigator.geolocation` لتوليد رابط مباشر على Google Maps لمكان التوريد، مع خيار كتابة العنوان يدوياً.
- ربط إرسال الطلبات بخدمة [telegramOrderService.js](file:///d:/wepsit/al-qawmia-factory/al-qawmia-factory-app/src/services/telegramOrderService.js) لإرسال إشعار فوري وتفصيلي باسم العميل ورقم الهاتف والكميات والموقع المباشر على الخريطة لبوت التلجرام.
- عرض شاشة تأكيد فورية للعميل برقم الطلب وزر متابعة عبر الواتساب.
- بناء ونشر التحديثات أونلاين على الدومين بنجاح.
