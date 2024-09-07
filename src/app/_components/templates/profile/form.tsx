"use client";
import { Button } from "../../atoms/button/button";
import { TextField } from "../../atoms/text-field/text-field";
import styles from "./form.module.scss";
import { useProfileRegister } from "./profile-register.hooks";

export const ProfileRegistrationForm = () => {
  const { isEditing, handleFileChange, imagePreview, handleSubmit, register, errors, isSubmitting } = useProfileRegister();

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <h2>{`プロフィール${isEditing ? '編集' : '登録'}`}</h2>
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
        <label>性別</label>
        <select {...register("gender")}>
          <option value="">選択してください</option>
          <option value="male">男性</option>
          <option value="female">女性</option>
          <option value="other">その他</option>
        </select>
        {errors.gender && <span>{errors.gender.message}</span>}
      </div>

      <div>
        <label>プロフィールアイコン</label>
        <div className={styles.profileIconSelect}>
          {!imagePreview && <label>ファイルを選択してください</label>}
          <input
            type="file"
            accept="image/*"
            {...register("profileIcon")}
            onChange={handleFileChange}
          />

          {imagePreview && (
            <div className={styles.imagePreview}>
              <img src={imagePreview} alt="プロフィールアイコンのプレビュー" />
            </div>
          )}
        </div>
        {errors.profileIcon && <span>{errors.profileIcon.message?.toString()}</span>}

      </div>

      <Button
        loading={isSubmitting}
        type="submit"
        showAllow
      >
        登録
      </Button>

    </form>
  );
};