import Image from "next/image";
import { useState } from "react";
import styles from "./message-item.module.scss";

type MessageProps = {
  userName: string;
  userIcon: string;
  createdAt: string;
  content: string;
  canDelete?: boolean;
};

export const MessageItem = ({
  userName,
  userIcon,
  createdAt,
  content,
  canDelete,
}: MessageProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // 投稿削除の処理
  const handleDelete = async () => {
    try {
      //  await deleteMessage(messageId);
      alert("投稿を削除しました。");
    } catch (error) {
      console.error("メッセージの削除に失敗しました:", error);
      alert("メッセージの削除に失敗しました。");
    }
  };

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
