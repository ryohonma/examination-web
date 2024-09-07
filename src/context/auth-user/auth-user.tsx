'use client';
import { auth } from "@luna/lib/firebase";
import { emptyFunction } from "@luna/utils/utils";
import { User, onAuthStateChanged } from "firebase/auth";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type AuthUserContextValue = {
  loading: boolean;
  authUser: User | null;
  clearAuthUser: () => void;
};

export const AuthUserContext = createContext<AuthUserContextValue>({
  authUser: null,
  loading: true,
  clearAuthUser: emptyFunction,
});

export const AuthUserProvider = ({ children }: PropsWithChildren) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const clearAuthUser = useCallback(() => {
    setAuthUser(null);
  }, [setAuthUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u: User | null) => {
      setAuthUser(u);
      setLoading(false);
    });

    return unsubscribe;
  }, [clearAuthUser]);

  const value = useMemo(
    () => ({ authUser, loading, clearAuthUser }),
    [authUser, loading, clearAuthUser],
  );

  if (loading) {
    return null;
  }

  return (
    <AuthUserContext.Provider value={value}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUser = () => {
  return useContext(AuthUserContext);
};
