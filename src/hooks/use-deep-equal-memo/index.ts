import { useMemo, useRef } from "react";
import { dequal } from "dequal";

export function useDeepEqualMemo<T>(next: T) {
    const cache = useRef<T>();

    return useMemo(() => {
        if (cache.current == null || !dequal(cache.current, next))
            cache.current = next;

        return cache.current;
    }, [next]);
}
