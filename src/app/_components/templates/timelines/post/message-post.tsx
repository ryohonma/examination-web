"use client";
import { Button } from "@luna/app/_components/atoms/button/button";
import { Textarea } from "@luna/app/_components/atoms/text-area/text-area";
import { Controller } from "react-hook-form";
import { useMessagePost } from "./message-post.hooks";
import styles from "./message-post.module.scss";

export const MessagePost = () => <MessagePostComponent {...useMessagePost()} />;

const MessagePostComponent = ({
  isOpen,
  setIsOpen,
  watch,
  control,
  handleSubmit,
  errors,
  onSubmit,
}: ReturnType<typeof useMessagePost>) => {
  return (
    <>
      {/* 投稿ボタン */}
      <button className={styles.postButton} onClick={() => setIsOpen(true)} />

      {/* スライドインの投稿コンポーネント */}
      <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h4>
            テキスト <span className={styles.required}>必須</span>
          </h4>
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <div>
                <Textarea
                  {...field}
                  name="text"
                  register={control.register(field.name, {
                    required: "テキストを入力してください",
                  })}
                  placeholder="テキストを入力してください"
                  maxLength={400}
                />

                <div className={styles.horizontal}>
                  <span className={styles.error}>
                    {errors.text?.message?.toString()}
                  </span>
                  <span
                    className={`${styles.textCounter} ${watch("text").length > 140 ? styles.error : ""}`}
                  >
                    {`${watch("text").length} / 140`}
                  </span>
                </div>
              </div>
            )}
          />

          <div className={styles.actions}>
            <Button
              type="button"
              shape="outline"
              onClick={() => setIsOpen(false)}
            >
              キャンセル
            </Button>

            <Button type="submit">投稿する</Button>
          </div>
        </form>
      </div>
    </>
  );
};
