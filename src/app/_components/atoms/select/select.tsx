import { useMemo } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import styles from "./select.module.scss";

interface Props {
  className?: string;
  title?: string;
  name?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  options?: {
    value: string;
    label: string;
  }[];
}

export const Select = ({
  className = "",
  title = "",
  name = "",
  register,
  error,
  options = [],
}: Props) => {
  const showOptions = useMemo(() => {
    if (options.filter((option) => option.value === "").length === 0) {
      return [{ value: "", label: "選択してください" }, ...options].map(
        (option) => (
          <option key={option.value || "emptyValue"} value={option.value}>
            {option.label}
          </option>
        ),
      );
    }

    return options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  }, [options]);

  return (
    <div className={`${styles.root} ${className}`}>
      {title && <label htmlFor={name}>{title}</label>}
      <select {...register}>{showOptions}</select>
      {error && <span>{error.message}</span>}
    </div>
  );
};
