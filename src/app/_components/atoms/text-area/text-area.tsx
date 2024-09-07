import { UseFormRegisterReturn } from "react-hook-form";
import style from "./text-area.module.scss";

interface Props {
  className?: string;
  name: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  maxLength?: number;
}

export const Textarea = ({
  className = "",
  placeholder = "",
  name = "",
  register,
  maxLength = 140,
}: Props) => {
  return (
    <textarea
      id={name}
      name={name}
      className={`${style.root} ${className}`}
      placeholder={placeholder}
      maxLength={maxLength}
      {...register}
    />
  );
};
