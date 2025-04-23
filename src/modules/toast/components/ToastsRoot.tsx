import { useToastSubscribe } from "../hooks/useToastSubscribe";
import { Toast } from "./Toast";

export const ToastsRoot = () => {
  const toasts = useToastSubscribe();

  return toasts.map(({ id, message, options }) => <Toast key={id} message={message} options={options} />);
};
