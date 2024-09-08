"use client";
import { useEffect } from "react";
import styles from "./snackbar.module.scss";

type SnackbarProps = {
  message: string;
  type?: "success" | "error" | "warning";
  onClose: () => void;
  duration?: number;
};

export const Snackbar = ({
  message,
  type = "success",
  onClose,
  duration = 3000,
}: SnackbarProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`${styles.snackbar} ${styles[type]}`}>
      <span>{message}</span>
      <button className={styles.closeBtn} onClick={onClose}>
        ×
      </button>
    </div>
  );
};
