"use client";
import { pagesPath } from "@luna/constants/$path";
import Link from "next/link";
import { Button } from "../../atoms/button/button";
import { TextField } from "../../atoms/text-field/text-field";
import styles from "./login-form.module.scss";
import { useLogin } from "./login.hooks";

export const LoginForm = () => <FormComponent {...useLogin()} />;

const FormComponent = ({
  handleSubmit,
  register,
  errors,
  isSubmitting,
  isValid,
}: ReturnType<typeof useLogin>) => {
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
        ログイン
      </Button>

      <Link href={pagesPath.signup.$url()}>新規登録はこちら</Link>
    </form>
  );
};
