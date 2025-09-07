import { useMemo, useState, type PropsWithChildren } from "react";
import { ModalState, type ModalsDispatch } from "../types";
import { ModalDispatchContext } from "../context/ModalDispatchContext";
import { Modals } from "../components/Modals";

type OpenModal = ModalsDispatch["openModal"];
type CloseModal = ModalsDispatch["closeModal"];
type ExitModal = ModalsDispatch["exitModal"];

export const ModalsProvider = ({ children }: PropsWithChildren) => {
  const [modals, setModals] = useState<ModalState[]>([]);

  /**
   * @description 비활성화된 모달을 활성화하거나, 새 모달을 추가합니다.
   */
  const openModal: OpenModal = (renderFn, id) => {
    setModals((modals) => {
      const idx = modals.findIndex((modal) => modal.id === id);
      if (idx === -1) return [...modals, { renderFn, id, isOpen: true }];

      const newModal = { ...modals[idx], isOpen: true };
      return modals.map((modal, i) => (i === idx ? newModal : modal));
    });
  };

  /**
   * @description 모달을 비활성화합니다. 내부 state는 유지합니다.
   */
  const closeModal: CloseModal = (id) => {
    setModals((modals) => {
      const idx = modals.findIndex((modal) => modal.id === id);
      if (idx === -1) return modals;

      const newModal = { ...modals[idx], isOpen: false };
      return modals.map((modal, i) => (i === idx ? newModal : modal));
    });
  };

  /**
   * @description 모달 내부 state를 제거하며 닫습니다. 메모리 누수를 막기 위해 반드시 사용이 필요합니다.
   */
  const exitModal: ExitModal = (id) => {
    setModals((modals) => modals.filter((modal) => modal.id !== id));
  };

  const dispatch = useMemo(() => ({ openModal, closeModal, exitModal }), []);

  return (
    <ModalDispatchContext.Provider value={dispatch}>
      {children}
      <Modals modals={modals} />
    </ModalDispatchContext.Provider>
  );
};
