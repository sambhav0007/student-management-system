import { useState } from 'react';

export default function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  const ToastComponent = toast ? (
    <div>
      <toast.component />
    </div>
  ) : null;

  return {
    toast,
    showToast,
    clearToast: () => setToast(null),
  };
}
