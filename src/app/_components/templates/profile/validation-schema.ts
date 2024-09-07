import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "ユーザー名を入力してください"),
  profileIcon: z
    .any()
    .refine(
      (files) => files && files.length > 0,
      "プロフィールアイコンを選択してください",
    )
    .refine(
      (files) => typeof files === "string" || files[0] instanceof File,
      "プロフィールアイコンが正しくありません",
    ),

  birthday: z.string().refine(
    (date) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(date) && !isNaN(new Date(date).getTime());
    },
    {
      message: "生年月日はYYYY-MM-DD形式で、正しい日付を入力してください",
    },
  ),
  gender: z
    .union([z.enum(["male", "female", "other"]), z.literal("")])
    .refine((val) => val !== "", {
      message: "性別を選択してください",
    }),
});
