export type TToastParams = {
  id: string;
  message: string;
  options?: {
    duration?: number;
  };
};

export type TObserver = ({ id, message, options }: TToastParams) => void;
