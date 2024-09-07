import Image from "next/image";
import styles from "./message-item.module.scss";

type MessageProps = {
  userName: string;
  userIcon: string;
  createdAt: string;
  content: string;
};

export const MessageItem = ({
  userName,
  userIcon,
  createdAt,
  content,
}: MessageProps) => {
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
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};
