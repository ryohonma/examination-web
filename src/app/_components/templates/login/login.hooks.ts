import { zodResolver } from "@hookform/resolvers/zod";
import { useDialog } from "@luna/context/dialog/dialog";
import { login } from "@luna/lib/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "./validation-schema";

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const { alert } = useDialog();

  const submit = async ({ email, password }: z.infer<typeof loginSchema>) => {
    const result = await login(email, password);
    if (result) {
      alert({ title: "エラー", body: result });
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(submit),
    errors,
    isSubmitting,
    isValid,
  };
};
