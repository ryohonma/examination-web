'use client'
import { Account } from "@luna//repository/firestore//model/account";
import { getByUID } from "@luna/repository/firestore/account";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useAuthUser } from "../auth-user/auth-user";

type AccountContextType = {
  account: Account | null;
  setAccount: (account: Account) => void;
  loadAccount: (uid: string) => Promise<void>;
};

const defaultAccountContext: AccountContextType = {
  account: null,
  setAccount: () => { },
  loadAccount: async () => { },
};

const AccountContext = createContext<AccountContextType>(defaultAccountContext);

export const AccountProvider = ({ children }: { children: React.ReactNode }) => {
  const { authUser } = useAuthUser();
  const [account, setAccountState] = useState<Account | null>(null);

  const setAccount = useCallback((newAccount: Account) => {
    setAccountState(newAccount);
  }, []);

  const loadAccount = useCallback(async (uid: string) => {
    try {
      const loadedAccount = await getByUID(uid);
      if (loadedAccount) {
        setAccount(loadedAccount);
      }
    } catch (error) {
      console.error("Accountのロード中にエラーが発生しました", error);
    }
  }, [setAccount]);

  useEffect(() => {
    if (authUser) {
      loadAccount(authUser.uid);
    }
  }, [authUser, loadAccount]);

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        loadAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  return useContext(AccountContext);
};