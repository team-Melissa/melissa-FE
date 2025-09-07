import { Fragment } from "react";
import type { ModalState } from "../types";
import { useModalDispatch } from "../context/ModalDispatchContext";

type Props = {
  modals: ModalState[];
};

export const Modals = ({ modals }: Props) => {
  const { closeModal, exitModal } = useModalDispatch();

  return modals.map((modal) => {
    const { renderFn, id, isOpen } = modal;
    const close = () => closeModal(id);
    const exit = () => exitModal(id);

    return <Fragment key={id}>{renderFn({ isOpen, close, exit })}</Fragment>;
  });
};
