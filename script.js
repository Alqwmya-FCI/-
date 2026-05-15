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

// Basic copy function with toast-like feedback
function copyText(text, message) {
    navigator.clipboard.writeText(text).then(() => {
        // Create a temporary toast notification
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-20 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full text-sm font-bold z-[10000] shadow-2xl animate-bounce';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
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
    console.log("Toggling Financial Hub:", show);
    const hub = document.getElementById('financial-hub');
    if (!hub) {
        console.error("Financial Hub element not found!");
        return;
    }
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
        window.location.href = './eng-ali-abdelshafy/';
    } else if (user === 'hussein') {
        window.location.href = './eng-hussein-abdelshafy/';
    }
}

// Accordion Toggle for Bank Accounts
function toggleAccordion(id) {
    const content = document.getElementById('content-' + id);
    const icon = document.getElementById('icon-' + id);
    const allContents = document.querySelectorAll('[id^="content-bank-"]');
    const allIcons = document.querySelectorAll('[id^="icon-bank-"]');

    // Close others
    allContents.forEach(c => {
        if (c.id !== 'content-' + id) c.classList.add('hidden');
    });
    allIcons.forEach(i => {
        if (i.id !== 'icon-' + id) i.style.transform = 'rotate(0deg)';
    });

    // Toggle current
    if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
    } else {
        content.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', handleDynamicRedirect);
