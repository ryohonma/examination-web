"use client";
import { Snackbar } from "@luna/app/_components/atoms/snackbar/snackbar";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

type SnackbarContextType = {
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showWarning: (message: string) => void;
  closeSnackbar: () => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<"success" | "error" | "warning">("success");

  const closeSnackbar = useCallback(() => {
    setMessage(null);
  }, []);

  const showSuccess = (msg: string) => {
    setMessage(msg);
    setType("success");
  };

  const showError = (msg: string) => {
    setMessage(msg);
    setType("error");
  };

  const showWarning = (msg: string) => {
    setMessage(msg);
    setType("warning");
  };

  return (
    <SnackbarContext.Provider
      value={{ showSuccess, showError, showWarning, closeSnackbar }}
    >
      {children}
      {message && (
        <Snackbar message={message} type={type} onClose={closeSnackbar} />
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
