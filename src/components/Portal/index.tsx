import { createPortal } from 'react-dom';
import React, { ReactNode } from "react";
import ReactDOM from "react-dom";


export const Modal = ({
  modal,
  root,
}: { modal: ReactNode, root: HTMLElement}) => {


  return createPortal(modal, root);
};