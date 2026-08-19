import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary';
import { AX_alertTelegram } from './utils/AX_TelegramAlert';

// Global error handlers
if (typeof window !== 'undefined') {
    window.addEventListener('error', (event) => {
        AX_alertTelegram('GLOBAL_JS_ERROR', event.error || event.message, {
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
        });
    });

    window.addEventListener('unhandledrejection', (event) => {
        AX_alertTelegram('UNHANDLED_ASYNC_REJECTION', event.reason);
    });
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ErrorBoundary>
    </StrictMode>
);
