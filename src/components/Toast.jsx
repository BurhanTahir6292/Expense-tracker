import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        if (toast.type === 'error' || toast.type === 'warning') Icon = AlertCircle;
        if (toast.type === 'info') Icon = Info;

        return (
          <div key={toast.id} className={`toast toast-${toast.type || 'success'} animate-slide-in`}>
            <div className="toast-icon">
              <Icon size={18} />
            </div>
            <div className="toast-content">
              <p className="toast-message">{toast.message}</p>
              {toast.action && (
                <button
                  type="button"
                  className="toast-action-btn"
                  onClick={() => {
                    toast.action.onClick();
                    onDismiss(toast.id);
                  }}
                >
                  {toast.action.label}
                </button>
              )}
            </div>
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => onDismiss(toast.id)}
              aria-label="Close notification"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
