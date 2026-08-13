import { useEffect, useRef, useState } from "react";

const LOAD_DELAY_MS = 600;

// Renders `items` in batches instead of all at once. The caller places an empty
// `<div ref={sentinelRef} />` after the last rendered card; once that div scrolls
// into view (200px before it's actually visible, so the next batch is ready in
// time), one more page is revealed. `items` is a plain in-memory array today, so
// "loading a page" is just widening the slice — swap that for a real fetchPage()
// call later without changing how any page component uses this hook.
//
// A short artificial delay (LOAD_DELAY_MS) stands in for that future network
// call, so `isLoadingMore` has something real to reflect in the meantime.
function useInfiniteList<T>(items: T[], pageSize: number, initialCount: number = pageSize) {
  const [visibleCount, setVisibleCount] = useState(() => Math.min(initialCount, items.length));
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    let timeoutId: number | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingRef.current) {
          isLoadingRef.current = true;
          setIsLoadingMore(true);
          timeoutId = window.setTimeout(() => {
            setVisibleCount((count) => Math.min(count + pageSize, items.length));
            setIsLoadingMore(false);
            isLoadingRef.current = false;
          }, LOAD_DELAY_MS);
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, [items.length, pageSize]);

  return {
    visibleItems: items.slice(0, visibleCount),
    hasMore: visibleCount < items.length,
    isLoadingMore,
    sentinelRef,
  };
}

export default useInfiniteList;
