import { loginSchema } from "./validation-schema";

describe("loginSchema", () => {
  it("should pass validation with valid inputs", () => {
    const validData = {
      email: "test@example.com",
      password: "password123",
    };

    const result = loginSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should fail validation with invalid email", () => {
    const invalidData = {
      email: "invalid-email",
      password: "password123",
    };

    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("無効なメールアドレスです");
    }
  });

  it("should fail validation with short password", () => {
    const invalidData = {
      email: "test@example.com",
      password: "short",
    };

    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "パスワードは6文字以上で入力してください",
      );
    }
  });

  it("should fail validation when email and password are missing", () => {
    const invalidData = {
      email: "",
      password: "",
    };

    const result = loginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("無効なメールアドレスです");
      expect(result.error.errors[1].message).toBe(
        "パスワードは6文字以上で入力してください",
      );
    }
  });
});
