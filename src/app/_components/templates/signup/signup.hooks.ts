import { zodResolver } from "@hookform/resolvers/zod";
import { useDialog } from "@luna/context/dialog/dialog";
import { useSnackbar } from "@luna/context/snackbar/snackbar";
import { createUser } from "@luna/lib/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signupSchema } from "./validation-schema";

export const useSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
  });

  const { alert } = useDialog();
  const { showSuccess } = useSnackbar();

  const submit = async (data: z.infer<typeof signupSchema>) => {
    const res = await createUser(data.email, data.password);

    if (res.message) {
      await alert({ body: res.message });
      return;
    }

    showSuccess("登録が完了しました。\nあなたのプロフィールを設定してください");
  };

  return {
    register,
    handleSubmit: handleSubmit(submit),
    errors,
    isSubmitting,
    isValid,
  };
};
