// 只在组件卸载时的 hook。
import { useEffect } from "react";
import useLatest from "./useLatest";

const useUnmount = (fn: () => void) => {

    const fnRef = useLatest(fn);

    useEffect(() => {
        return () => {
            fnRef.current?.();
        }
    }, [])

}

export default useUnmount;