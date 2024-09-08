import { postSchema } from "./validation-schema";

describe("PostValidationSchema", () => {
  it("should pass validation with valid inputs", () => {
    const validData = {
      text: "Hello, World!",
    };

    const result = postSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should fail validation with empty text", () => {
    const invalidData = {
      text: "",
    };

    const result = postSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe("テキストを入力してください");
    }
  });

  it("should fail validation with long text", () => {
    const invalidData = {
      text: "a".repeat(401),
    };

    const result = postSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        "140文字以内で入力してください",
      );
    }
  });
});
