import cntl from "cntl";
import { FC, ReactNode } from "react";

const classes = {
  modal: cntl`
    fixed top-0 left-0 w-full 
    h-full flex justify-center 
    items-center z-10
  `,
  shadow: cntl`
    fixed t-0 l-0 w-full h-full
    bg-black/80 z-10
  `,
  content: cntl`
    w-full sm:max-w-[600px] 
    min-h-screen sm:min-h-0
    relative z-20 bg-white p-6 shadow-md
    animate-fadeIn
  `,
  close: cntl`
    absolute top-3 right-6
    text-[27px] cursor-pointer
    text-black font-sm
  `,
};

export interface IModalProps {
  readonly children?: ReactNode;
  readonly isOpen?: boolean;
  readonly onClose: () => void;
}

export const Modal: FC<IModalProps> = ({ onClose, children, isOpen }) => {
  return isOpen ? (
    <div className={classes.modal}>
      <div className={classes.shadow} onClick={onClose} />
      <div className={classes.content}>
        <div className={classes.close} onClick={onClose} aria-hidden="true">
          &times;
        </div>
        {children}
      </div>
    </div>
  ) : null;
};
