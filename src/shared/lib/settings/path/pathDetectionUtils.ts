/**
 * Normalize path:
 * - removes trailing slash
 * - keeps root as '/'
 */
export const normalizePath = (path: string) => {
  if (!path) return '/';
  if (path === '/') return '/';

  return path.endsWith('/') ? path.slice(0, -1) : path;
};

/**
 * Check if item path matches current pathname:
 * - exact match
 * - or parent route match for nested pages
 */
const isMatchingPath = (pathname: string, itemPath: string) => {
  if (itemPath === '/') return pathname === '/';

  return pathname === itemPath || pathname.startsWith(`${itemPath}/`);
};

/**
 * Find the most specific active link:
 * - exact match first
 * - otherwise longest parent match
 */
type LinkItem = {
  link: string;
};

export const getActiveLink = <T extends LinkItem>(
  pathname: string,
  items: T[],
) => {
  const currentPath = normalizePath(pathname);

  const normalizedItems = items.map((item) => ({
    ...item,
    normalizedLink: normalizePath(item.link),
  }));

  // Exact route match has the highest priority
  const exactMatch = normalizedItems.find(
    (item) => item.normalizedLink === currentPath,
  );

  if (exactMatch) {
    return exactMatch.link;
  }

  // Fallback to the deepest parent route
  const parentMatch = normalizedItems
    .filter((item) => isMatchingPath(currentPath, item.normalizedLink))
    .sort((a, b) => b.normalizedLink.length - a.normalizedLink.length)[0];

  return parentMatch?.link ?? null;
};

/**
 * Flatten nested menu items into a single array
 */
export const flattenItems = <T extends { link: string; items?: T[] }>(
  items: T[],
): T[] => {
  return items.flatMap((item) => [
    item,
    ...(item.items ? flattenItems(item.items) : []),
  ]);
};
