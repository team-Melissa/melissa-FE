import { useToastSubscribe } from "../hooks/useToastSubscribe";
import { Toast } from "./Toast";

export const ToastsRoot = () => {
  const toasts = useToastSubscribe();

  return toasts.map(({ id, message, subMessage, options }) => (
    <Toast key={id} message={message} subMessage={subMessage} options={options} />
  ));
};
