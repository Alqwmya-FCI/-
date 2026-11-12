const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const DIST_DIR = path.join(ROOT, 'dist');

const REDIRECTS = [
  {
    folder: 'ali',
    target: 'https://alqwmya.com/eng-ali-abdelshafy/',
    name: 'م/ علي عبد الشافي',
    title: 'رئيس مجلس الإدارة',
    image: 'https://alqwmya.com/images/ali.jpg'
  },
  {
    folder: 'eng-ali-abdelshafy',
    target: 'https://alqwmya.com/eng-ali-abdelshafy/',
    name: 'م/ علي عبد الشافي',
    title: 'رئيس مجلس الإدارة',
    image: 'https://alqwmya.com/images/ali.jpg'
  },
  {
    folder: 'hussein',
    target: 'https://alqwmya.com/eng-hussein-abdelshafy/',
    name: 'م/ حسين علي عبدالشافي',
    title: 'مدير الإنتاج والجودة',
    image: 'https://alqwmya.com/images/hussein.jpg'
  },
  {
    folder: 'eng-hussein-abdelshafy',
    target: 'https://alqwmya.com/eng-hussein-abdelshafy/',
    name: 'م/ حسين علي عبدالشافي',
    title: 'مدير الإنتاج والجودة',
    image: 'https://alqwmya.com/images/hussein.jpg'
  }
];

function generateRedirectHtml(item) {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=${item.target}">
    <title>${item.name} - مصنع القومية</title>
    <meta property="og:type" content="website">
    <meta property="og:url" content="${item.target}">
    <meta property="og:title" content="${item.name} - ${item.title}">
    <meta property="og:description" content="مصنع القومية للصناعات الأسمنتية. جودة، دقة، والتزام في التوريد لكافة المشاريع.">
    <meta property="og:image" content="${item.image}">
    <script>
        window.location.replace("${item.target}");
    </script>
</head>
<body style="font-family: system-ui, sans-serif; text-align: center; padding: 50px; background: #0f172a; color: #fff;">
    <h2>جاري تحويلك إلى بطاقة ${item.name}...</h2>
    <p><a href="${item.target}" style="color: #10b981; font-weight: bold;">اضغط هنا إذا لم يتم تحويلك تلقائياً</a></p>
</body>
</html>`;
}

const UNIVERSAL_404_HTML = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>مصنع القومية للصناعات الأسمنتية</title>
    <script>
      (function() {
        var path = window.location.pathname.replace(/^\\/-\\/?/, "/");
        if (!path || path === "") path = "/";
        window.location.replace("https://alqwmya.com" + path + window.location.search + window.location.hash);
      })();
    </script>
</head>
<body style="font-family: system-ui, sans-serif; text-align: center; padding: 50px; background: #0f172a; color: #fff;">
    <h2>جاري التحويل إلى موقع مصنع القومية...</h2>
    <p><a href="https://alqwmya.com/" style="color: #10b981; font-weight: bold;">اضغط هنا إذا لم يتم تحويلك تلقائياً</a></p>
</body>
</html>`;

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function lockDestination(baseDir) {
  if (!fs.existsSync(baseDir)) return;

  for (const item of REDIRECTS) {
    const dir = path.join(baseDir, item.folder);
    ensureDir(dir);
    const file = path.join(dir, 'index.html');
    fs.writeFileSync(file, generateRedirectHtml(item), 'utf8');
  }

  const notFoundFile = path.join(baseDir, '404.html');
  fs.writeFileSync(notFoundFile, UNIVERSAL_404_HTML, 'utf8');
}

console.log('[AX_QR_GUARD] Enforcing QR code redirect immutability...');
ensureDir(PUBLIC_DIR);
lockDestination(PUBLIC_DIR);

if (fs.existsSync(DIST_DIR)) {
  lockDestination(DIST_DIR);
}

console.log('[AX_QR_GUARD] SUCCESS: All 5 QR pathways and Universal 404 locked into public/ and dist/.');
