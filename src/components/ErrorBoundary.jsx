import React from 'react';
import { AX_alertTelegram } from '../utils/AX_TelegramAlert';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        AX_alertTelegram('REACT_RENDER_CRASH', error, { componentStack: errorInfo?.componentStack?.slice(0, 300) });
    }

    handleReload = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 text-right" dir="rtl">
                    <div className="max-w-md w-full bg-slate-900 border border-white/10 rounded-3xl p-8 text-center space-y-6 shadow-2xl animate-fade-in">
                        <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30">
                            <AlertTriangle size={36} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white mb-2">عذراً، حدث خطأ غير متوقع</h2>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                تم إرسال تفاصيل هذا الخطأ تلقائياً لفريق الدعم الفني لمصنع القومية وجارٍ العمل على حله فوراً.
                            </p>
                        </div>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={this.handleReload}
                                className="inline-flex items-center gap-2 bg-primary hover:bg-emerald-400 text-black text-xs font-black py-3 px-5 rounded-full transition-all shadow-lg active:scale-95"
                            >
                                <RefreshCw size={14} />
                                إعادة المحاولة
                            </button>
                            <button
                                onClick={this.handleGoHome}
                                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white text-xs font-bold py-3 px-5 rounded-full transition-all"
                            >
                                <Home size={14} />
                                الصفحة الرئيسية
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
