import { Timestamp } from "firebase/firestore";

export type Message = {
  id: string;
  uid: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
