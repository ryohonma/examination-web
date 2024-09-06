import { PropsWithChildren } from "react";
import styles from "./card.module.scss";

export const Card = ({
  className,
  children,
}: PropsWithChildren<{
  className?: string;
}>) => {
  return <div className={`${styles.root} ${className}`}>{children}</div>;
};
