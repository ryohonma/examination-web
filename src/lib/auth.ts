import { auth } from "./firebase";

export const signOut = async (): Promise<void> => {
  await auth.signOut();
};
