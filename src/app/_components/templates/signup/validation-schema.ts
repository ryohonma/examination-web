import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email("無効なメールアドレスです"),
  password: z.string().min(6, "パスワードは6文字以上で入力してください"),
  terms: z.boolean().refine((value) => value === true, {
    message: "利用規約への同意が必要です",
  }),
});
