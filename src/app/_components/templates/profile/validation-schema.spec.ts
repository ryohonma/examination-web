import { profileSchema } from "./validation-schema";

describe("Profile Schema", () => {
  it("should pass validation with valid inputs", () => {
    const validData = {
      profileIcon: new File([""], "icon.png", { type: "image/png" }),
      birthdate: "1990-01-01",
      gender: "male",
    };

    const result = profileSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should fail validation when profileIcon is missing", () => {
    const invalidData = {
      profileIcon: null, // プロフィールアイコンがnull
      birthdate: "1990-01-01",
      gender: "male",
    };

    const result = profileSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "プロフィールアイコンを選択してください",
      );
    }
  });

  it("should fail validation when birthdate is in an invalid format", () => {
    const invalidData = {
      profileIcon: new File([""], "icon.png", { type: "image/png" }),
      birthdate: "01/01/1990", // 不正な日付形式
      gender: "male",
    };

    const result = profileSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "生年月日はYYYY-MM-DD形式で、正しい日付を入力してください",
      );
    }
  });

  it("should fail validation when gender is not selected", () => {
    const invalidData = {
      profileIcon: new File([""], "icon.png", { type: "image/png" }),
      birthdate: "1990-01-01",
      gender: "", // 性別が選択されていない
    };

    const result = profileSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("性別を選択してください");
    }
  });
});
