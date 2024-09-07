"use client";
import Image from "next/image";
import { Button } from "../../atoms/button/button";
import { TextField } from "../../atoms/text-field/text-field";
import styles from "./form.module.scss";
import { useProfileRegister } from "./profile-register.hooks";

export const ProfileRegistrationForm = () => {
  const {
    isEditing,
    handleFileChange,
    imagePreview,
    handleSubmit,
    register,
    errors,
    isSubmitting,
  } = useProfileRegister();

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <h2>{`プロフィール${isEditing ? "編集" : "登録"}`}</h2>
      <TextField
        title="ユーザー名"
        name="name"
        type="text"
        error={errors.name}
        register={register("name")}
      />
      <TextField
        title="生年月日"
        name="birthday"
        type="date"
        error={errors.birthday}
        register={register("birthday")}
      />

      <div className={styles.gender}>
        <label htmlFor="gender">性別</label>
        <select {...register("gender")}>
          <option value="">選択してください</option>
          <option value="male">男性</option>
          <option value="female">女性</option>
          <option value="other">その他</option>
        </select>
        {errors.gender && <span>{errors.gender.message}</span>}
      </div>

      <div>
        <label htmlFor="fileInput">プロフィールアイコン</label>
        <div className={styles.profileIconSelect}>
          {!imagePreview && (
            <label htmlFor="fileInput">ファイルを選択してください</label>
          )}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            {...register("profileIcon")}
            onChange={handleFileChange}
          />

          {imagePreview && (
            <div className={styles.imagePreview}>
              <Image
                width={80}
                height={80}
                src={imagePreview}
                alt="プロフィールアイコンのプレビュー"
              />
            </div>
          )}
        </div>
        {errors.profileIcon && (
          <span>{errors.profileIcon.message?.toString()}</span>
        )}
      </div>

      <Button loading={isSubmitting} type="submit" showAllow>
        登録
      </Button>
    </form>
  );
};
