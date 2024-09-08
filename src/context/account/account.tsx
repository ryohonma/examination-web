"use client";
import { Account } from "@luna//repository/firestore//model/account";
import { captureException } from "@luna/lib/error";
import { getByUID } from "@luna/repository/firestore/account";
import { emptyFunction, emptyFunctionWithPromise } from "@luna/utils/utils";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthUser } from "../auth-user/auth-user";

type AccountContextType = {
  account: Account | null;
  setAccount: (account: Account) => void;
  loadAccount: (uid: string) => Promise<void>;
  loading: boolean;
};

const defaultAccountContext: AccountContextType = {
  account: null,
  setAccount: emptyFunction,
  loadAccount: emptyFunctionWithPromise,
  loading: true,
};

const AccountContext = createContext<AccountContextType>(defaultAccountContext);

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { authUser } = useAuthUser();
  const [account, setAccountState] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  const setAccount = useCallback((newAccount: Account) => {
    setAccountState(newAccount);
  }, []);

  const loadAccount = useCallback(
    async (uid: string) => {
      try {
        const loadedAccount = await getByUID(uid);
        if (loadedAccount) {
          setAccount(loadedAccount);
        }
        setLoading(false);
      } catch (error) {
        captureException("failed to load account", error);
      }
    },
    [setAccount],
  );

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
        loading,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  return useContext(AccountContext);
};
