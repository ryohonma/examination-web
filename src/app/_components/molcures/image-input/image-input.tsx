import Image from "next/image";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from "react-hook-form";
import styles from "./image-input.module.scss";

type ImageInputProps = {
  className?: string;
  title?: string;
  name?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl>;
  defaultSrc?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ImageInput = ({
  className = "",
  title = "",
  name = "",
  register,
  error,
  defaultSrc,
  onChange,
}: ImageInputProps) => {
  return (
    <div className={`${styles.root} ${className}`}>
      {title && <label htmlFor={name}>{title}</label>}
      <div className={styles.selectImage}>
        {!defaultSrc && (
          <label htmlFor={name}>ファイルを選択してください</label>
        )}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          {...register}
          onChange={onChange}
        />

        {defaultSrc && (
          <div className={styles.imagePreview}>
            <Image width={80} height={80} src={defaultSrc} alt="プレビュー" />
          </div>
        )}
      </div>
      {error && <span className={styles.error}>{error.message?.toString()}</span>}
    </div>
  );
};
