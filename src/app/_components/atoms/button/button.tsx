import IconLoading from "@luna/app/_assets/loading.svg";
import { emptyFunction } from "@luna/utils/utils";
import { PropsWithChildren } from "react";
import styles from "./button.module.scss";

interface Props {
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  shape?: "fill" | "outline";
  type?: "submit" | "button";
  color?: "primary" | "secondary";
  showAllow?: boolean;
}

export const Button = ({
  className = "",
  onClick,
  shape = "fill",
  type = "button",
  color = "primary",
  disabled = false,
  loading = false,
  showAllow,
  children,
}: PropsWithChildren<Props>) => {
  const baseClass = () => {
    if (shape === "fill" && color === "primary") {
      return styles.primaryFill;
    }
    if (shape === "outline" && color === "primary") {
      return styles.primaryOutline;
    }
    if (shape === "fill" && color === "secondary") {
      return styles.secondaryFill;
    }
    if (shape === "outline" && color === "secondary") {
      return styles.secondaryOutline;
    }

    return "";
  };

  return (
    <button
      className={`${styles.root} ${baseClass()} ${className}`}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        if (!loading && onClick) {
          onClick(event);
        }
      }}
      disabled={disabled || loading}
      type={type}
      onTouchStart={emptyFunction}
    >
      <div className={styles.content}>
        <div className={styles.label}>
          {loading && <IconLoading />}
          {!loading && children}
        </div>
        {showAllow && (
          <svg width="10" height="16" viewBox="0 0 10 16">
            <path
              d="M14.788,9l-1.9,1.88L19.066,17l-6.181,6.12,1.9,1.88,8.1-8Z"
              transform="translate(-12.885 -9)"
            />
          </svg>
        )}
      </div>
    </button>
  );
};
