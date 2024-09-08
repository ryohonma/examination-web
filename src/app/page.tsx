import { pagesPath } from "@luna/constants/$path";
import { redirect } from "next/navigation";

export default function Home() {
  // homeで表示するコンテンツが現状はないためリダイレクト
  redirect(pagesPath.timelines.$url().path);
}
