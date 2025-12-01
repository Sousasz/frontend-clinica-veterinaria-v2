export type ToastType = 'success' | 'error' | 'info';

export function showToast(message: string, type: ToastType = 'info', ttl: number = 3500): void {
  if (typeof window === 'undefined') return;
  try {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    const containerId = 'global-toasts-container';
    let container = document.getElementById(containerId) as HTMLDivElement | null;
    if (!container) {
      container = document.createElement('div');
      container.id = containerId;
      container.style.position = 'fixed';
      container.style.right = '20px';
      container.style.top = '20px';
      container.style.zIndex = '9999';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '8px';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.id = id;
    toast.textContent = message;
    toast.style.padding = '10px 14px';
    toast.style.borderRadius = '8px';
    toast.style.color = '#fff';
    toast.style.boxShadow = '0 6px 18px rgba(0,0,0,0.15)';
    toast.style.fontSize = '14px';

    if (type === 'success') toast.style.backgroundColor = '#16a34a';
    else if (type === 'error') toast.style.backgroundColor = '#dc2626';
    else toast.style.backgroundColor = '#334155';

    if (container) container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 250ms ease, transform 250ms ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(10px)';
      setTimeout(() => {
        toast.remove();
        if (container && container.childElementCount === 0) container.remove();
      }, 300);
    }, ttl);
  } catch (err) {
    // fallback
    // eslint-disable-next-line no-console
    console.error('showToast error', err);
  }
}
