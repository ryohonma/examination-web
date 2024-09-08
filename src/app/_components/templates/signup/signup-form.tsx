"use client";
import { pagesPath } from "@luna/constants/$path";
import Link from "next/link";
import { Button } from "../../atoms/button/button";
import { Checkbox } from "../../atoms/checkbox/checkbox";
import { TextField } from "../../atoms/text-field/text-field";
import styles from "./signup-form.module.scss";
import { useSignup } from "./signup.hooks";

export const SignupForm = () => <SignupFormComponent {...useSignup()} />;

const SignupFormComponent = ({
  handleSubmit,
  register,
  errors,
  isSubmitting,
  isValid,
}: ReturnType<typeof useSignup>) => {
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

      <Checkbox register={register("terms")} error={errors.terms}>
        <span>
          <a
            target="_blank"
            href="https://luna-matching.notion.site/a714620bbd8740d1ac98f2326fbd0bbc?pvs=25"
            rel="noreferrer"
          >
            利用規約
          </a>
          に同意します
        </span>
      </Checkbox>

      <Link href={pagesPath.login.$url()}>すでにアカウントをお持ちの方</Link>
    </form>
  );
};
