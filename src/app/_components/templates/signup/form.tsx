"use client";
import { Button } from "../../atoms/button/button";
import { TextField } from "../../atoms/text-field/text-field";
import styles from "./form.module.scss";
import { useSignup } from "./signup.hooks";

export const SignupForm = () => {
  const { handleSubmit, register, errors, isSubmitting, isValid } = useSignup();

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
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
      <Button
        loading={isSubmitting}
        disabled={!isValid}
        type="submit"
        showAllow
      >
        登録
      </Button>
    </form>
  );
};
