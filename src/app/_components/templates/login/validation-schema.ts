import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("無効なメールアドレスです"),
  password: z.string().min(6, "パスワードは6文字以上で入力してください"),
});
