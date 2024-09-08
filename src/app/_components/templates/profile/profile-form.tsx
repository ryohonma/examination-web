"use client";
import { Button } from "../../atoms/button/button";
import { Select } from "../../atoms/select/select";
import { TextField } from "../../atoms/text-field/text-field";
import { ImageInput } from "../../molcures/image-input/image-input";
import styles from "./profile-form.module.scss";
import { useProfileRegister } from "./profile-register.hooks";

export const ProfileRegistrationForm = () => (
  <ProfileRegistrationFormComponent {...useProfileRegister()} />
);

const ProfileRegistrationFormComponent = ({
  isEditing,
  handleFileChange,
  imagePreview,
  handleSubmit,
  register,
  errors,
  isSubmitting,
}: ReturnType<typeof useProfileRegister>) => {
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

      <Select
        title="性別"
        name="gender"
        error={errors.gender}
        register={register("gender")}
        options={[
          { value: "male", label: "男性" },
          { value: "female", label: "女性" },
          { value: "other", label: "その他" },
        ]}
      />

      <ImageInput
        title="プロフィールアイコン"
        name="profileIcon"
        register={register("profileIcon")}
        error={errors.profileIcon}
        onChange={handleFileChange}
        defaultSrc={imagePreview}
      />

      <Button loading={isSubmitting} type="submit" showAllow>
        登録
      </Button>
    </form>
  );
};
