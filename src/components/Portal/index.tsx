import { createPortal } from "react-dom";
import { ReactNode } from "react";

export const Modal = ({
  modal,
  root,
}: {
  modal: ReactNode;
  root: HTMLElement;
}) => {
  return createPortal(modal, root);
};
