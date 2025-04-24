import { generateRandomId } from "@/src/utils/generateRandomId";
import { ToastSubject } from "../class/ToastSubject";
import type { TToast } from "../types/toastTypes";

export const toast = ({ message, subMessage, options }: Omit<TToast, "id">) => {
  const toastInstance = ToastSubject.getInstance();
  const id = generateRandomId();
  toastInstance.notify({ id, message, subMessage, options });
};
