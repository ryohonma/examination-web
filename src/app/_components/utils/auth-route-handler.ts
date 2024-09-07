"use client";
import { pagesPath } from "@luna/constants/$path";
import { protectedRoutes } from "@luna/constants/route";
import { useAuthUser } from "@luna/context/auth-user/auth-user";
import { usePathname, useRouter } from "next/navigation";

export const AuthRouteHandler = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { authUser, loading } = useAuthUser();
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

  return children;
};