import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextValue {
  showToast: (title: string, options?: { type?: ToastType; description?: string }) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((title: string, options?: { type?: ToastType; description?: string }) => {
    const id = `toast_${Date.now()}_${Math.random()}`;
    const newToast: ToastMessage = {
      id,
      title,
      type: options?.type || 'success',
      description: options?.description,
    };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#EAEAE5] shadow-lg text-left animate-in slide-in-from-bottom-2 duration-200"
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === 'success' && <CheckCircle2 className="size-4 text-[#059669]" />}
              {toast.type === 'error' && <AlertCircle className="size-4 text-[#DC2626]" />}
              {toast.type === 'info' && <Info className="size-4 text-[#4F6BFF]" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#17181C]">{toast.title}</p>
              {toast.description && (
                <p className="text-[11px] text-[#666B76] mt-0.5 leading-snug">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#9CA3AF] hover:text-[#17181C] p-0.5 rounded cursor-pointer"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: (title: string) => console.log('Toast:', title),
    };
  }
  return context;
}
