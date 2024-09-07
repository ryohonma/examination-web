import { useDialog } from "@luna/context/dialog/dialog";
import { remove } from "@luna/repository/firestore/messages";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import styles from "./message-item.module.scss";

type MessageProps = {
  id: string;
  userName: string;
  userIcon: string;
  createdAt: string;
  content: string;
  canDelete?: boolean;
};

export const MessageItem = ({
  id,
  userName,
  userIcon,
  createdAt,
  content,
  canDelete,
}: MessageProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { confirm, alert } = useDialog();

  // 投稿削除の処理
  const handleDelete = async () => {
    const res = await confirm({ body: "このメッセージを削除しますか？" });
    if (res !== "ok") {
      return;
    }

    try {
      await remove(id);
    } catch (error) {
      console.error("メッセージの削除に失敗しました:", error);
      alert({ body: "メッセージの削除に失敗しました。" });
    }
  };

  // ポップオーバーを閉じる処理
  const closePopover = useCallback(
    () => setIsPopoverOpen(false),
    [setIsPopoverOpen],
  );

  useEffect(() => {
    if (!isPopoverOpen) {
      window.removeEventListener("click", closePopover);
      return;
    }

    setTimeout(() => {
      window.addEventListener("click", closePopover);
    }, 100);

    return () => {
      window.removeEventListener("click", closePopover);
    };
  }, [isPopoverOpen, closePopover]);

  return (
    <div className={styles.messageItem}>
      <div className={styles.header}>
        <Image
          width={40}
          height={40}
          src={userIcon}
          alt={`${userName}のアイコン`}
          className={styles.userIcon}
        />
        <div>
          <span className={styles.userName}>{userName}</span>
          <span className={styles.createdAt}>{createdAt}</span>
        </div>
        {canDelete && (
          <div className={styles.menuWrapper}>
            <button
              className={styles.menuButton}
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            >
              ⋮
            </button>
            {isPopoverOpen && (
              <div className={styles.popoverMenu}>
                <button className={styles.deleteButton} onClick={handleDelete}>
                  削除する
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};
