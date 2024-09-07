const buildSuffix = (url?: {query?: Record<string, string>, hash?: string}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return '';
  const search = query ? `?${new URLSearchParams(query)}` : '';
  return `${search}${hash ? `#${hash}` : ''}`;
};

export const pagesPath = {
  "login": {
    $url: (url?: { hash?: string }) => ({ pathname: '/login' as const, hash: url?.hash, path: `/login${buildSuffix(url)}` })
  },
  "profile": {
    $url: (url?: { hash?: string }) => ({ pathname: '/profile' as const, hash: url?.hash, path: `/profile${buildSuffix(url)}` })
  },
  "signup": {
    $url: (url?: { hash?: string }) => ({ pathname: '/signup' as const, hash: url?.hash, path: `/signup${buildSuffix(url)}` })
  },
  "timelines": {
    $url: (url?: { hash?: string }) => ({ pathname: '/timelines' as const, hash: url?.hash, path: `/timelines${buildSuffix(url)}` })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash, path: `/${buildSuffix(url)}` })
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  images: {
    logo_png: '/images/logo.png'
  }
} as const;

export type StaticPath = typeof staticPath;
