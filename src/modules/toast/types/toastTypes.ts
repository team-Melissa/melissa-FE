export type ToastType = "success" | "error";

export type TToast = {
  id: string;
  message: string;
  subMessage?: string;
  options?: {
    duration?: number;
    type?: ToastType;
  };
};

export type TObserver = ({ id, message, subMessage, options }: TToast) => void;
