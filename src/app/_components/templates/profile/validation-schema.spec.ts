import { profileSchema } from "./validation-schema";

describe("Profile Schema", () => {
  it("should pass validation with valid inputs", () => {
    const validData = {
      name: "test user",
      profileIcon: [new File([""], "icon.png", { type: "image/png" })],
      birthday: "1990-01-01",
      gender: "male",
    };

    const result = profileSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should fail validation when name is missing", () => {
    const invalidData = {
      name: "", // ユーザー名が空
      profileIcon: [new File([""], "icon.png", { type: "image/png" })],
      birthday: "1990-01-01",
      gender: "male",
    };

    const result = profileSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "ユーザー名を入力してください",
      );
    }
  });

  it("should fail validation when profileIcon is missing", () => {
    const invalidData = {
      name: "test user",
      profileIcon: null, // プロフィールアイコンがnull
      birthday: "1990-01-01",
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

  it("should fail validation when birthday is in an invalid format", () => {
    const invalidData = {
      name: "test user",
      profileIcon: [new File([""], "icon.png", { type: "image/png" })],
      birthday: "01/01/1990", // 不正な日付形式
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
      name: "test user",
      profileIcon: [new File([""], "icon.png", { type: "image/png" })],
      birthday: "1990-01-01",
      gender: "", // 性別が選択されていない
    };

    const result = profileSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("性別を選択してください");
    }
  });
});
