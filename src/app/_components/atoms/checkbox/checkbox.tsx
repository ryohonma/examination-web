import { PropsWithChildren } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styles from "./checkbox.module.scss";

type Props = PropsWithChildren<{
  className?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
}>;

export const Checkbox = ({
  className = "",
  register,
  error,
  children,
}: Props) => {
  return (
    <div className={`${styles.root} ${className}`}>
      <label>
        <input type="checkbox" {...register} />
        {children}
      </label>
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
};
