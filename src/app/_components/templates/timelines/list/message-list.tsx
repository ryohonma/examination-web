"use client";

import LoadingIcon from "@luna/app/_assets/images/icon-loading.svg";
import { useEffect } from "react";
import { MessageItem } from "./message-item";
import { useMessages } from "./message-list.hooks";

export const MessageListComponent = () => {
  const { messages, loadMoreMessages, hasMore, isLoading } = useMessages(20);

  // スクロール位置が一番下になったら、loadMoreMessagesを呼び出す
  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.offsetHeight;

    if (scrollTop + windowHeight >= fullHeight - 100 && !isLoading && hasMore) {
      loadMoreMessages();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div>
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          userName={message.userName}
          userIcon={message.userIcon}
          createdAt={message.createdAt.toDate().toLocaleString()}
          content={message.content}
        />
      ))}

      {isLoading && <div><LoadingIcon /></div>}
    </div>
  );
};