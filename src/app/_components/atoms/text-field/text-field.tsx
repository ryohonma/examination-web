import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styles from "./text-field.module.scss";

interface Props {
  className?: string;
  title?: string;
  name?: string;
  type?: "text" | "password" | "number" | "tel" | "email" | "date";
  placeholder?: string;
  maxLength?: number;
  register?: UseFormRegisterReturn;
  error?: FieldError;
}

export const TextField = ({
  className = "",
  title = "",
  name = "",
  type = "text",
  placeholder = "",
  maxLength = 250,
  register,
  error,
}: Props) => {
  return (
    <div className={`${styles.root} ${className}`}>
      {title && <label className={styles.title}>{title}</label>}
      <input
        maxLength={maxLength}
        type={type}
        name={name}
        placeholder={placeholder}
        {...register}
      />
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
};
