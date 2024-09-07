import { Timestamp } from "firebase/firestore";

export type Account = {
  id: string;
  name: string;
  uid: string;
  gender: "female" | "male" | "other";
  birthday: string; // format: "YYYY-MM-DD"
  icon: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
