import { createContext, useContext } from "react";
import type { ModalsDispatch } from "../types";

export const ModalDispatchContext = createContext<ModalsDispatch | null>(null);

export const useModalDispatch = () => {
  const context = useContext(ModalDispatchContext);
  if (!context) throw new Error("<ModalsProvider> 내부에서만 사용 가능합니다.");

  const { openModal, closeModal, exitModal } = context;
  return { openModal, closeModal, exitModal };
};
