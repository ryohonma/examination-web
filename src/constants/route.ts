import { pagesPath } from "./$path";

// 認証が必要なルート
export const protectedRoutes = [
  pagesPath.profile.$url().path,
  pagesPath.timelines.$url().path,
];
