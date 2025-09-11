import { useState, useEffect, useRef, useCallback } from "react";

export function useInfiniteScroll(queryHook: any, limit = 10) {
    const [page, setPage] = useState(1);
    const [allData, setAllData] = useState<any[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const { data, isLoading, isFetching } = queryHook({ page, limit });

    useEffect(() => {
        if (data?.data?.docs) {
            if (data.data.docs.length === 0) {
                setHasMore(false);
                return;
            }
            setAllData((prev) => (page === 1 ? data.data.docs : [...prev, ...data.data.docs]));
        }
    }, [data]);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (isFetching || isLoading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prev) => prev + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [isFetching, isLoading, hasMore]
    );

    return { allData, isLoading, isFetching, lastElementRef, hasMore };
}
