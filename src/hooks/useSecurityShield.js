import { useEffect } from 'react';

export function useSecurityShield() {
    useEffect(() => {
        const blockContextMenu = (e) => e.preventDefault();

        const blockKeyboard = (e) => {
            const key = e.key?.toLowerCase();
            const ctrl = e.ctrlKey || e.metaKey;
            const shift = e.shiftKey;

            if (ctrl && key === 's') { e.preventDefault(); return; }
            if (ctrl && key === 'u') { e.preventDefault(); return; }
            if (ctrl && key === 'p') { e.preventDefault(); return; }
            if (ctrl && shift && key === 'i') { e.preventDefault(); return; }
            if (ctrl && shift && key === 'j') { e.preventDefault(); return; }
            if (ctrl && shift && key === 'c') { e.preventDefault(); return; }
            if (e.key === 'F12') { e.preventDefault(); return; }
            if (e.key === 'PrintScreen') { e.preventDefault(); return; }
        };

        const blockDrag = (e) => e.preventDefault();

        const blockCopy = (e) => {
            const sel = window.getSelection();
            if (sel && sel.toString().length > 0) {
                e.clipboardData?.setData('text/plain', '');
                e.preventDefault();
            }
        };

        document.addEventListener('contextmenu', blockContextMenu);
        document.addEventListener('keydown', blockKeyboard);
        document.addEventListener('dragstart', blockDrag);
        document.addEventListener('copy', blockCopy);

        return () => {
            document.removeEventListener('contextmenu', blockContextMenu);
            document.removeEventListener('keydown', blockKeyboard);
            document.removeEventListener('dragstart', blockDrag);
            document.removeEventListener('copy', blockCopy);
        };
    }, []);
}
