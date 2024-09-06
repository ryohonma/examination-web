import { zodResolver } from "@hookform/resolvers/zod";
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

  const submit = (data: z.infer<typeof signupSchema>) => {
    console.log(data);
  };

  return {
    register,
    handleSubmit: handleSubmit(submit),
    errors,
    isSubmitting,
    isValid,
  };
};
