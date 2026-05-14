// JavaScript for Al-Qawmia Factory Business Cards

// Share card function - copies current URL to clipboard
function shareCard() {
    const shareBtn = event.currentTarget;
    const originalText = shareBtn.querySelector('.share-text').textContent;

    navigator.clipboard.writeText(window.location.href).then(() => {
        shareBtn.querySelector('.share-text').textContent = 'تم النسخ!';
        setTimeout(() => {
            shareBtn.querySelector('.share-text').textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Copy to clipboard with feedback
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        const originalContent = element.innerHTML;
        element.innerHTML = '<span class="text-[10px] font-bold">تم النسخ!</span>';
        element.classList.add('bg-emerald-500', 'text-white');
        setTimeout(() => {
            element.innerHTML = originalContent;
            element.classList.remove('bg-emerald-500', 'text-white');
        }, 2000);
    });
}

// Smart Copy: Copies and shows "Open App" action
function smartCopy(text, type, element) {
    navigator.clipboard.writeText(text).then(() => {
        const originalContent = element.innerHTML;
        let actionLabel = "تم نسخ الرقم";
        let appLink = "";
        
        if (type === 'instapay') {
            actionLabel = "تم النسخ.. افتح انستا باي؟";
            // Deep links are app-specific, usually just opening the app is best
            // InstaPay doesn't have a standardized universal web-to-app deep link for payments yet
        } else if (type === 'wallet') {
            actionLabel = "تم نسخ رقم المحفظة";
        }

        element.innerHTML = `<span class="text-[10px] font-bold">${actionLabel}</span>`;
        element.classList.add('bg-orange-500', 'text-white', 'border-orange-500');
        
        setTimeout(() => {
            element.innerHTML = originalContent;
            element.classList.remove('bg-orange-500', 'text-white', 'border-orange-500');
        }, 3000);
    });
}

// Financial Hub Toggle
function toggleFinancialHub(show) {
    const hub = document.getElementById('financial-hub');
    if (show) {
        hub.classList.remove('hidden');
        hub.classList.add('flex');
        document.body.style.overflow = 'hidden';
    } else {
        hub.classList.add('hidden');
        hub.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }
}

// Generate and download VCard
function generateVCard(personData) {
    const phoneNumbers = personData.phones.map(phone => `TEL;TYPE=CELL,VOICE:${phone}`).join('\n');
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${personData.name}
ORG:${personData.organization}
TITLE:${personData.title}
${phoneNumbers}
ADR;TYPE=WORK:;;${personData.organization}
URL;TYPE=Facebook:${personData.factoryFacebook}
URL;TYPE=Location:${personData.location}
NOTE:موقع المصنع على خرائط جوجل: ${personData.location}
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', personData.vcfName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}
// --- Dynamic Redirect Logic (QR Code Support) ---
// This allows you to print a single QR code pointing to yoursite.com/?user=ali
// and then change where it points from here.
function handleDynamicRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');

    if (user === 'ali') {
        window.location.href = './ali/';
    } else if (user === 'hussein') {
        window.location.href = './hussein/';
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', handleDynamicRedirect);
