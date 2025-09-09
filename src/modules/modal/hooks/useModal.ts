import { useId } from "react";
import { useModalDispatch } from "../context/ModalDispatchContext";
import type { ModalRenderFn } from "../types";

/**
 * @description 하나의 모달 당 하나의 훅을 매칭해서 사용해야 합니다.
 */
export const useModal = () => {
  const { openModal, closeModal, exitModal } = useModalDispatch();
  const id = useId();

  return {
    open: (renderFn: ModalRenderFn) => openModal(renderFn, id),
    close: () => closeModal(id),
    exit: () => exitModal(id),
  };
};
