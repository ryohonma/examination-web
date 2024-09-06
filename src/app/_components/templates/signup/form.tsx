import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../atoms/button/button";
import { TextField } from "../../atoms/text-field/text-field";
import { signupSchema } from "./validation-schema";

type SignupFormData = z.infer<typeof signupSchema>;

export const SignupForm = ({
  onSubmit,
}: {
  onSubmit: (v: SignupFormData) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        title="メールアドレス"
        name="email"
        type="email"
        error={errors.email}
        register={register("email")}
      />
      <TextField
        title="パスワード"
        name="password"
        type="password"
        register={register("password")}
        error={errors.password}
      />
      <Button loading={isSubmitting} disabled={!isValid} type="submit">
        登録
      </Button>
    </form>
  );
};
