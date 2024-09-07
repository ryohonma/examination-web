import { FirebaseError } from "firebase/app";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth } from "./firebase";

export const signOut = async (): Promise<void> => {
  await auth.signOut();
};

export const login = async (
  email: string,
  password: string,
): Promise<string> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    return "";
  } catch (e) {
    const err = isFirebaseError(e);
    if (!err) throw new Error("failed to handle email login error");

    return new Promise<string>((resolve) => {
      const msg = getAuthErrorMessage(err, "signin/popup");
      resolve(msg || "");
    });
  }
};

type CreateUserResult = {
  user: User | null;
  message: string;
};

export const createUser = async (
  email: string,
  password: string,
): Promise<CreateUserResult> => {
  try {
    const c = await createUserWithEmailAndPassword(auth, email, password);
    if (!c.user?.uid) {
      throw new Error("failed create user with email");
    }

    return { message: "", user: c.user };
  } catch (e) {
    const err = isFirebaseError(e);
    if (!err) {
      throw new Error("failed to handle create user error");
    }

    return new Promise<CreateUserResult>((resolve) => {
      const message = getAuthErrorMessage(err, "signup") || "";
      resolve({ message, user: null });
    });
  }
};

export const getAuthErrorMessage = (e: FirebaseError, method: string) => {
  switch (e.code) {
    case AuthErrorCodes.EXPIRED_POPUP_REQUEST:
    case AuthErrorCodes.POPUP_CLOSED_BY_USER:
      return null;
    case AuthErrorCodes.EMAIL_EXISTS:
      if (method.indexOf("signup") !== -1) {
        return "このメールアドレスは使用されています";
      }

      return "メールアドレスまたはパスワードが違います";

    case AuthErrorCodes.NEED_CONFIRMATION:
      return "他のSNSアカウントで登録されています。";
    case AuthErrorCodes.INVALID_EMAIL:
      return "メールアドレスの形式が正しくありません";
    case AuthErrorCodes.USER_DISABLED:
      return "サービスの利用が停止されています";
    case AuthErrorCodes.USER_DELETED:
      return "メールアドレスまたはパスワードが違います";
    case AuthErrorCodes.USER_MISMATCH:
      if (method === "signin/popup") {
        return "認証されているユーザーと異なるアカウントが選択されました";
      }

      return "メールアドレスまたはパスワードが違います";

    case AuthErrorCodes.WEAK_PASSWORD:
      return "パスワードは6文字以上にしてください";
    case AuthErrorCodes.INVALID_PASSWORD:
    case "auth/invalid-login-credentials":
    case AuthErrorCodes.INVALID_IDP_RESPONSE:
      return "メールアドレスまたはパスワードが違います";
    case AuthErrorCodes.POPUP_BLOCKED:
      return "認証ポップアップがブロックされました。ポップアップブロックをご利用の場合は設定を解除してください";
    case AuthErrorCodes.OPERATION_NOT_SUPPORTED:
    case AuthErrorCodes.MISSING_AUTH_DOMAIN:
    case AuthErrorCodes.OPERATION_NOT_ALLOWED:
    case AuthErrorCodes.INVALID_ORIGIN:
      return "現在この認証方法はご利用頂けません";
    case AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN:
      return "認証の有効期限が切れています。ログインしなおしてください。";
    default:
      if (method.indexOf("signin") !== -1) {
        return "認証に失敗しました。しばらく時間をおいて再度お試しください";
      }

      return "エラーが発生しました。しばらく時間をおいてお試しください";
  }
};

const isFirebaseError = (e: unknown | FirebaseError): FirebaseError | false => {
  if ("code" in (e as FirebaseError)) {
    return e as FirebaseError;
  }

  return false;
};
