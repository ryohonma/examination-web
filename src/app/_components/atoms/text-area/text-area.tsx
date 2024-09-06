import { UseFormRegisterReturn } from "react-hook-form";
import style from "./text-area.module.scss";

interface Props {
  className?: string;
  name: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
}

export const Textarea = ({
  className = "",
  placeholder = "",
  name = "",
  register,
}: Props) => {
  return (
    <textarea
      id={name}
      name={name}
      className={`${style.root} ${className}`}
      placeholder={placeholder}
      {...register}
    />
  );
};
