export type ToastType = 'success' | 'error';

export type TToast = {
  id: string;
  message: string;
  options?: {
    duration?: number;
    type?: ToastType;
  };
};

export type TObserver = ({ id, message, options }: TToast) => void;
