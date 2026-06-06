import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export const Toast = ({ open, type = 'success', title, message, onClose }) => {
  useEffect(() => {
    if (!open) return undefined;
    const timer = window.setTimeout(() => onClose?.(), 4500);
    return () => window.clearTimeout(timer);
  }, [open, onClose]);

  if (!open) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed right-4 top-24 z-[80] w-[calc(100vw-2rem)] max-w-sm">
      <div className={`rounded-lg border bg-white p-4 shadow-xl shadow-slate-900/15 dark:bg-gray-900 ${
        isSuccess ? 'border-emerald-200 dark:border-emerald-700' : 'border-red-200 dark:border-red-700'
      }`}>
        <div className="flex items-start gap-3">
          {isSuccess ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
          ) : (
            <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
          )}
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-slate-900 dark:text-white">{title}</p>
            {message && <p className="mt-1 text-sm text-slate-600 dark:text-gray-300">{message}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            aria-label="Đóng thông báo"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
