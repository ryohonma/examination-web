import { db } from "@luna/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { Account } from "./model/account";

// コレクションの参照
const accountsCollection = collection(db, "accounts");

// 新規アカウントを作成 (POST)
export const post = async (
  account: Omit<Account, "id" | "createdAt" | "updatedAt">,
): Promise<Account> => {
  try {
    const newAccount = {
      ...account,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    const docRef = await addDoc(accountsCollection, newAccount);
    return {
      id: docRef.id,
      ...newAccount,
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create account:" + error);
  }
};

// アカウントを更新 (PUT)
export const put = async (
  accountId: string,
  account: Omit<Account, "id" | "createdAt" | "updatedAt">,
): Promise<void> => {
  try {
    const accountDocRef = doc(accountsCollection, accountId);
    const updatedAccount = {
      ...account,
      updatedAt: Timestamp.now(),
    };
    await setDoc(accountDocRef, updatedAccount, { merge: true }); // 部分更新
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update account" + error);
  }
};

// UIDに基づいてアカウントを取得 (GET)
export const getByUID = async (UID: string): Promise<Account | null> => {
  try {
    const q = query(accountsCollection, where("uid", "==", UID));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
    } as Account;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get account by UID:" + error);
  }
};

// IDのリストに基づいてアカウントを取得 (listByUIDs)
export const listByUIDs = async (UIDs: string[]): Promise<Account[]> => {
  try {
    if (UIDs.length === 0) return [];

    const q = query(accountsCollection, where("uid", "in", UIDs));
    const querySnapshot = await getDocs(q);

    const accounts: Account[] = [];
    querySnapshot.forEach((doc) => {
      accounts.push({
        id: doc.id,
        ...doc.data(),
      } as Account);
    });

    return accounts;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to list accounts by UIDs:" + error);
  }
};
