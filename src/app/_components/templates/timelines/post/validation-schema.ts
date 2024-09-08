import { z } from "zod";

export const postSchema = z.object({
  text: z
    .string()
    .min(1, "テキストを入力してください")
    .max(140, "140文字以内で入力してください"),
});
