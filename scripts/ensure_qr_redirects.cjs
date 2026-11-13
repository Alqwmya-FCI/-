const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const DIST_DIR = path.join(ROOT, 'dist');

const UNIVERSAL_404_HTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>مصنع القومية للصناعات الأسمنتية</title>
    <script>
      (function() {
        var host = window.location.hostname;
        var path = window.location.pathname.replace(/^\\/-\\/?/, "/");
        if (!path || path === "") path = "/";

        var clean = path.replace(/^\\/+|\\/+$/g, "").toLowerCase();

        var cardMap = {
          "ali": "/eng-ali-abdelshafy",
          "eng-ali-abdelshafy": "/eng-ali-abdelshafy",
          "hussein": "/eng-hussein-abdelshafy",
          "eng-hussein-abdelshafy": "/eng-hussein-abdelshafy",
          "mohamed": "/mohamed-ali-abdelshafy",
          "mohamed-ali-abdelshafy": "/mohamed-ali-abdelshafy",
          "eng-mohamed-abdelshafy": "/mohamed-ali-abdelshafy"
        };

        var targetPath = cardMap[clean] || path;
        var destination = "https://alqwmya.com" + targetPath + window.location.search + window.location.hash;

        if (host.includes("github.io")) {
          window.location.replace(destination);
        } else {
          window.location.replace("https://alqwmya.com/");
        }
      })();
    </script>
</head>
<body style="font-family: system-ui, sans-serif; text-align: center; padding: 50px; background: #0f172a; color: #fff;">
    <h2>جاري التحويل إلى موقع مصنع القومية...</h2>
    <p><a href="https://alqwmya.com/" style="color: #10b981; font-weight: bold;">اضغط هنا إذا لم يتم تحويلك تلقائياً</a></p>
</body>
</html>`;

function lockRedirects() {
  console.log('[AX_QR_GUARD] Enforcing smart SPA 404 router without shadow folder collision...');
  fs.writeFileSync(path.join(PUBLIC_DIR, '404.html'), UNIVERSAL_404_HTML, 'utf8');
  if (fs.existsSync(DIST_DIR)) {
    fs.writeFileSync(path.join(DIST_DIR, '404.html'), UNIVERSAL_404_HTML, 'utf8');
  }

  // Ensure shadow folders are purged to allow SPA index.html routing on alqwmya.com
  const folders = ['ali', 'eng-ali-abdelshafy', 'hussein', 'eng-hussein-abdelshafy', 'mohamed', 'mohamed-ali-abdelshafy', 'eng-mohamed-abdelshafy'];
  [PUBLIC_DIR, DIST_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) return;
    folders.forEach(f => {
      const p = path.join(dir, f);
      if (fs.existsSync(p)) {
        fs.rmSync(p, { recursive: true, force: true });
        console.log(`[AX_QR_GUARD] Purged shadow directory: ${p}`);
      }
    });
  });

  console.log('[AX_QR_GUARD] SUCCESS: SPA routes protected.');
}

lockRedirects();
