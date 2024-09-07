"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@luna/app/_components/atoms/button/button";
import { Textarea } from "@luna/app/_components/atoms/text-area/text-area";
import { useAuthUser } from "@luna/context/auth-user/auth-user";
import { post } from "@luna/repository/firestore/messages";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./message-post.module.scss";

const postSchema = z.object({
  text: z.string().min(1, "テキストを入力してください").max(140, "140文字以内で入力してください"),
});

export const MessagePostComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { authUser } = useAuthUser();

  const { watch, control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: { text: "" },
  });

  const onSubmit = (data: { text: string }) => {
    if (!authUser) return;

    post({
      content: data.text,
      uid: authUser.uid,
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* 常時表示のボタン */}
      <div className={styles.postButton} onClick={() => setIsOpen(true)}>
        <div className={styles.plusIcon} />
      </div>

      {/* スライドインの投稿コンポーネント */}
      <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h4>テキスト <span className={styles.required}>必須</span></h4>
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <div>
                <Textarea
                  {...field}
                  name='text'
                  register={control.register(field.name, { required: "テキストを入力してください" })}
                  placeholder="テキストを入力してください"
                  maxLength={400}
                />

                <div className={styles.horizontal}>
                  <span className={styles.error}>{errors.text?.message?.toString()}</span>
                  <span className={`${styles.textCounter} ${watch('text').length > 140 ? styles.error : ''}`}>
                    {`${watch('text').length} / 140`}</span>
                </div>
              </div>
            )}
          />

          <div className={styles.actions}>
            <Button type="button" shape="outline" className={styles.cancelButton} onClick={() => setIsOpen(false)}>
              キャンセル
            </Button>

            <Button type="submit" className={styles.submitButton}>
              投稿する
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};