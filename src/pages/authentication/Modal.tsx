// Modal.tsx
import Button from "@components/ui/Button";
import React, { ReactNode } from "react";
import { RxCross1 } from "react-icons/rx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-85"></div>
      <div className="relative bg-background-base w-full max-w-md p-6 rounded-md">
        {children}
        <Button
          className="absolute top-2 right-2 p-2 bg-transparent"
          onClick={onClose}
        >
          <RxCross1 />
        </Button>
      </div>
    </div>
  );
};

export default Modal;
