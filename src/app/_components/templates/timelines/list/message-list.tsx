"use client";

import LoadingIcon from "@luna/app/_assets/images/icon-loading.svg";
import { useCallback, useEffect, useRef } from "react";
import { MessageItem } from "./message-item";
import { useMessages } from "./message-list.hooks";

export const MessageListComponent = () => {
  const { messages, loadMoreMessages, hasMore, isLoading } = useMessages(1000);
  const lastReloadedPosition = useRef(-1);

  // スクロール位置が一番下になったら、loadMoreMessagesを呼び出す
  const handleScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.offsetHeight;

    if (
      scrollTop + windowHeight >= fullHeight - 100 &&
      !isLoading &&
      hasMore &&
      // スクロール位置が下に200px以上移動した場合のみリロード
      scrollTop - lastReloadedPosition.current > 100
    ) {
      loadMoreMessages();
      lastReloadedPosition.current = scrollTop;
    }
  }, [isLoading, hasMore, loadMoreMessages]);

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
          id={message.id}
          userName={message.userName}
          userIcon={message.userIcon}
          createdAt={message.createdAt.toDate().toLocaleString()}
          content={message.content}
          canDelete={message.isMyMessage}
        />
      ))}

      {isLoading && (
        <div style={{ textAlign: "center" }}>
          <LoadingIcon />
        </div>
      )}
    </div>
  );
};
