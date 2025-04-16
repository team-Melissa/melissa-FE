import { useEffect, useState } from "react";
import { ToastSubject } from "../class/ToastSubject";
import type { TToast } from "../types/toastTypes";

/**
 * @description ToastSubject 클래스에 옵저버 함수를 등록/해제하는 side effect 훅입니다
 */
export const useToastSubscribe = () => {
  const [toasts, setToasts] = useState<TToast[]>([]);

  useEffect(() => {
    const timerList: NodeJS.Timeout[] = [];
    const toastInstance = ToastSubject.getInstance();

    const toastObserver = (toast: TToast) => {
      const duration = toast.options?.duration ?? 2000;
      setToasts((prev) => [...prev, toast]);
      const timer = setTimeout(() => {
        setToasts((prev) => prev.filter(({ id }) => id !== toast.id));
      }, duration);
      timerList.push(timer);
    };

    toastInstance.subscribe(toastObserver);

    return () => {
      toastInstance.unsubscribe(toastObserver);
      timerList.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return toasts;
};
