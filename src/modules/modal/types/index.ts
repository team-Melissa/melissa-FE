export type ModalState = {
  id: string;
  isOpen: boolean;
  renderFn: ModalRenderFn;
};

type ModalProps = {
  isOpen: boolean;
  close: () => void;
  exit: () => void;
};

export type ModalRenderFn = (props: ModalProps) => JSX.Element;

export type ModalsDispatch = {
  openModal: (renderFn: ModalRenderFn, id: string) => void;
  closeModal: (id: string) => void;
  exitModal: (id: string) => void;
};
