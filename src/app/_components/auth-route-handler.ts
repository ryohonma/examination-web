import { pagesPath } from "@luna/constants/$path";
import { protectedRoutes } from "@luna/constants/route";
import { useAuthUser } from "@luna/context/auth-user-context";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const AuthRouteHandler = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { authUser, loading } = useAuthUser();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const isProtectedPath = protectedRoutes.includes(pathname);
    if (!authUser && isProtectedPath) {
      router.push(pagesPath.login.$url());
    }

    if (authUser && pathname === "/login") {
      router.push("");
    }
  }, [authUser, loading, router, pathname]);

  if (loading) {
    return null;
  }

  return children;
};
