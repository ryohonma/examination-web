import IconClose from "@luna/app/_assets/images/icon-close.svg";
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

import styles from "./modal.module.scss";

type ModalProps = PropsWithChildren<{
  className?: string;
  close: () => void;
  title?: string;
  actions?: React.ReactNode;
}>;

export const Modal = ({
  className = "",
  children,
  close,
  title,
  actions,
}: ModalProps) => {
  const dom = document.getElementsByTagName("main")[0];
  if (!dom) return null;

  return createPortal(
    <div className={`${styles.root} ${className}`}>
      <button onClick={close} className={styles.maskContainer}>
        <div className={styles.mask} />
      </button>
      <div className={styles.container}>
        <button onClick={close} className={styles.close}>
          <IconClose />
        </button>

        <div className={styles.contents}>
          {title && <h4>{title}</h4>}
          {children}
        </div>

        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </div>,
    dom,
  );
};
