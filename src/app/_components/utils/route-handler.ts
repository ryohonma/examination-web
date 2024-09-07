"use client";
import { pagesPath } from "@luna/constants/$path";
import { protectedRoutes } from "@luna/constants/route";
import { useAccount } from "@luna/context/account/account";
import { useAuthUser } from "@luna/context/auth-user/auth-user";
import { usePathname, useRouter } from "next/navigation";

export const RouteHandler = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { authUser, loading } = useAuthUser();
  const { account } = useAccount();
  const pathname = usePathname();
  const router = useRouter();

  if (loading) {
    return null;
  }

  const isProtectedPath = protectedRoutes.includes(pathname);

  // 認証されていない場合、保護されたルートへのアクセスを制限しログインページへリダイレクト
  if (!authUser && isProtectedPath) {
    router.replace(pagesPath.login.$url().path);
    return null;
  }

  // 認証済みのユーザーがログインまたはサインアップページにアクセスした場合、プロファイルページへリダイレクト
  if (authUser && (pathname === pagesPath.login.$url().path || pathname === pagesPath.signup.$url().path)) {
    router.replace(pagesPath.profile.$url().path);
    return null;
  }

  // ユーザーが登録を完了していない場合、プロフィールページへリダイレクト
  if (authUser && !account && pathname !== pagesPath.profile.$url().path) {
    router.replace(pagesPath.profile.$url().path);
    return null;
  }

  return children;
};