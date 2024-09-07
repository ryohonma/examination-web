"use client";
import { pagesPath } from "@luna/constants/$path";
import Link from "next/link";
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

      <div className={styles.terms}>
        <label>
          <input type="checkbox" {...register("terms")} />
          <span>
            <a
              target="_blank"
              href='https://luna-matching.notion.site/a714620bbd8740d1ac98f2326fbd0bbc?pvs=25'>利用規約</a>に同意します</span>
        </label>
        {errors.terms && <span className={styles.error}>{errors.terms.message}</span>}
      </div>

      <Link href={pagesPath.login.$url()}>すでにアカウントをお持ちの方</Link>
    </form >
  );
};
