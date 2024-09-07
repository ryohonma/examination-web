import { zodResolver } from "@hookform/resolvers/zod";
import { pagesPath } from "@luna/constants/$path";
import { useAuthUser } from "@luna/context/auth-user/auth-user";
import { useDialog } from "@luna/context/dialog/dialog";
import { getByUID, post, put } from '@luna/repository/firestore/account';
import { upload } from "@luna/repository/storage/upload";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { profileSchema } from "./validation-schema";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const useProfileRegister = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
  });

  const [accountId, setAccountId] = useState("");
  const { replace, push: navigate } = useRouter();
  const { authUser } = useAuthUser();
  const { alert } = useDialog();

  useEffect(() => {
    if (!authUser?.uid) {
      replace(pagesPath.login.$url().path);
      return;
    }

    getByUID(authUser.uid).then((data) => {
      if (data) {
        setAccountId(data.id);
        reset({
          name: data.name,
          birthday: data.birthday,
          gender: data.gender,
          profileIcon: data.icon,
        });
        if (data.icon) {
          setImagePreview(data.icon);
        }
      }
    });
  }, [authUser, reset]);


  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];


    if (file) {
      // ファイルサイズのチェック
      if (file.size > MAX_FILE_SIZE) {
        setError("profileIcon", {
          type: "manual",
          message: "ファイルサイズが大きすぎます。5MB以下のファイルを選択してください。",
        });
        setImagePreview(null); // 画像プレビューをクリア
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submit = async ({
    profileIcon,
    gender,
    name,
    birthday,
  }: z.infer<typeof profileSchema>) => {
    if (!authUser || !authUser.uid) {
      alert({
        title: "認証エラー",
        body: "認証エラーが発生しました。再度ログインしてください。",
      });
      return;
    }

    let iconURL = profileIcon;
    if (profileIcon instanceof FileList && profileIcon.length > 0) {
      const file = profileIcon[0];

      try {
        // Firebase Storageにファイルをアップロード
        const path = `avatars/${authUser.uid}/${file.name}`;
        iconURL = await upload(path, file); // アップロード後、ダウンロードURLを取得

      } catch (error) {
        alert({
          title: "プロフィール登録失敗",
          body: "プロフィールアイコンのアップロードに失敗しました。",
        });
        return;
      }
    }

    try {
      const payload = {
        birthday,
        gender,
        name,
        icon: iconURL,
        uid: authUser.uid,
      }
      accountId ? await put(accountId, payload) : await post(payload);
      // navigate(pagesPath.timeline.$url().path);

    } catch (error) {
      alert({
        title: "プロフィール登録失敗",
        body: "プロフィールの登録に失敗しました。",
      });
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(submit),
    errors,
    isSubmitting,
    handleFileChange,
    imagePreview,
    isEditing: !!accountId,
  };
};
