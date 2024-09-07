import IconClose from '@luna/app/_assets/images/icon-close.svg';
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
  className = '',
  children,
  close,
  title,
  actions,
}: ModalProps) => {

  const dom = document.getElementsByTagName('main')[0];
  if (!dom) return null;

  return createPortal(
    <div className={`${styles.root} ${className}`} >
      <div onClick={close} className={styles.maskContainer}>
        <div className={styles.mask} />
      </div>
      <div className={styles.container} >
        <div onClick={close} className={styles.close}>
          <IconClose />
        </div>

        <div className={styles.contents}>
          {title && <h4 className={styles.title}>{title}</h4>}
          {children}
        </div>

        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
    </div>,
    dom,
  );
};
