import type { ToastType } from "../types/toastTypes";

export const DEFAULT_DURATION = 1500;

export const TOAST_ICONS = {
  success: require("@/assets/images/success-icon.svg"),
  error: require("@/assets/images/warning-icon.svg"),
} satisfies Record<ToastType, NodeJS.Require>;
