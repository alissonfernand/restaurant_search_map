import React from "react";

import Portal from './Portal';

import {Overlay, Dialog} from './styles';

const Modal = ({children, open, onClose}) => {

  if (!open) return null;

  return(
    <Portal>
      <Overlay onClick={() => onClose()}>
        <Dialog onClick={(e) => e.stopPropagation()}>
          {children}
        </Dialog>
      </Overlay>
    </Portal>
  );
};

export default Modal;
