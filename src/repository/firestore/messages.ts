import { db } from "@luna/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  startAfter,
  Timestamp,
} from "firebase/firestore";
import { Message } from "./model/message";

const messagesCollection = collection(db, "messages");

// 新規メッセージを作成 (POST)
export const post = async (
  message: Omit<Message, "id" | "createdAt" | "updatedAt">,
): Promise<Message> => {
  try {
    const newMessage = {
      ...message,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    const docRef = await addDoc(messagesCollection, newMessage);
    return {
      id: docRef.id,
      ...newMessage,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create message: " + error);
  }
};

// メッセージを更新 (PUT)
export const put = async (
  messageId: string,
  message: Omit<Message, "id" | "createdAt" | "updatedAt">,
): Promise<void> => {
  try {
    const messageDocRef = doc(messagesCollection, messageId);
    const updatedMessage = {
      ...message,
      updatedAt: Timestamp.now(),
    };
    await setDoc(messageDocRef, updatedMessage, { merge: true }); // 部分更新
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update message: " + error);
  }
};

// メッセージを削除 (DELETE)
export const remove = async (messageId: string): Promise<void> => {
  try {
    const messageDocRef = doc(messagesCollection, messageId);
    await deleteDoc(messageDocRef);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete message: " + error);
  }
};

// メッセージをlimitとoffsetを指定して取得 (LIST)
export const list = async (
  limitCount: number,
  offset: number = 0,
): Promise<Message[]> => {
  try {
    const q = query(
      messagesCollection,
      orderBy("createdAt", "desc"),
      limit(limitCount),
    );

    const querySnapshot = await getDocs(q);

    if (offset > 0) {
      const lastVisible = querySnapshot.docs[offset - 1];
      if (lastVisible) {
        const paginatedQuery = query(
          messagesCollection,
          orderBy("createdAt", "desc"),
          startAfter(lastVisible),
          limit(limitCount),
        );
        const paginatedSnapshot = await getDocs(paginatedQuery);
        return paginatedSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[];
      }
    }

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Message[];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to list messages: " + error);
  }
};

// メッセージをリアルタイム更新で取得 (LIST with Snapshots)
export const listBySnapshot = (
  callback: (messages: Message[]) => void,
  limitCount: number,
  offset: number = 0,
) => {
  try {
    const q = query(
      messagesCollection,
      orderBy("createdAt", "desc"),
      limit(limitCount),
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages: Message[] = [];

      if (offset > 0) {
        const lastVisible = querySnapshot.docs[offset - 1];
        if (lastVisible) {
          const paginatedQuery = query(
            messagesCollection,
            orderBy("createdAt", "desc"),
            startAfter(lastVisible),
            limit(limitCount),
          );

          onSnapshot(paginatedQuery, (paginatedSnapshot) => {
            paginatedSnapshot.forEach((doc) => {
              messages.push({
                id: doc.id,
                ...doc.data(),
              } as Message);
            });
            callback(messages);
          });
        }
      } else {
        querySnapshot.forEach((doc) => {
          messages.push({
            id: doc.id,
            ...doc.data(),
          } as Message);
        });
        callback(messages);
      }
    });

    return unsubscribe;
  } catch (error) {
    console.error("Failed to list messages with realtime updates: ", error);
    throw new Error("Failed to list messages with realtime updates");
  }
};
