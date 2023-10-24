import cntl from "cntl";
import { FC, ReactNode } from "react";

const classes = {
  modal: cntl`
    fixed top-0 left-0 w-full h-full flex justify-center items-center
    z-modal
  `,
  shadow: cntl`
    fixed t-0 l-0 w-full h-full
    bg-stone-800/40 z-10
  `,
  title: cntl`  
    font-bold
    text-2xl
    text-center
    mb-6 text-black
  `,
  content: cntl`
    min-w-full sm:min-w-0 sm:max-w-4xl 
    min-h-screen sm:min-h-0
    relative z-20 bg-white p-6 shadow-md
    animate-fadeIn
  `,
  close: cntl`
    text-3xl cursor-pointer
    text-black
  `,
  closeHeader: cntl`
  flex flex-row-reverse h-10
  items-center justify-between
  `,
  backButton: cntl`
  bg-transparent p-0 border-0 cursor-pointer
  text-blue outline-0 hover:border-0 active:border-0
  hover:outline-0 active:outline-0 font-bold
  `,
};

export interface IModalProps {
  readonly children?: ReactNode;
  readonly isOpen?: boolean;
  readonly onClose: () => void;
  readonly title?: ReactNode;
  readonly onBack?: () => void;
}

export const Modal: FC<IModalProps> = ({
  onClose,
  title,
  children,
  isOpen,
  onBack,
}) => {
  return isOpen ? (
    <div className={classes.modal}>
      <div className={classes.shadow} onClick={onClose} />
      <div className={classes.content}>
        <div className={classes.closeHeader}>
          <div className={classes.close} onClick={onClose} aria-hidden="true">
            &times;
          </div>
          {onBack ? <button className={classes.backButton}>Back</button> : null}
        </div>
        {title ? <div className={classes.title}>{title}</div> : null}
        {children}
      </div>
    </div>
  ) : null;
};
