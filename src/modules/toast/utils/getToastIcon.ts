import { TOAST_ICONS } from "../constants/toastConstants";
import type { ToastType } from "../types/toastTypes";

export const getToastIcon = (type: ToastType) => {
  return TOAST_ICONS[type];
};
