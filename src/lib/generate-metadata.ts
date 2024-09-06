import type { Metadata } from "next";

const siteName = "ryohonma-dev";

/**
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
 */

export const generateMetadata = (
  metadata: Omit<Metadata, "title"> & {
    title?: string;
  } = {},
) => {
  const title = metadata.title || "";
  const description = metadata.description || "";

  return {
    description,
    keywords: metadata.keywords,
    openGraph: {
      description,
      locale: "ja_JP",
      siteName,
      title,
      type: "website",
      url: "https://example.com/",
      ...metadata.openGraph,
    },
    title,
    twitter: {
      card: "summary",
      creator: "",
      site: "",
      ...metadata.twitter,
    },
    verification: {
      google: "",
      ...metadata.verification,
    },
  } satisfies Metadata;
};
