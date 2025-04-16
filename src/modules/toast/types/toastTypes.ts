export type TToast = {
  id: string;
  message: string;
  options?: {
    duration?: number;
  };
};

export type TObserver = ({ id, message, options }: TToast) => void;
