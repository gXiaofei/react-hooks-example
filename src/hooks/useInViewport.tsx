
import { useEffect } from "react";
import useSafeState from "./useSafeState";
import {getTarget} from '../utils'

interface Options {
    root?: any;
    rootMargin?: string;
    threshold?: number | number[];
}

const useViewport = (target: any, options?: Options) => {

    const [isViewport, setIsViewport] = useSafeState<boolean>()
    const [ratio, setRatio] = useSafeState<number>()

    useEffect(() => {
        const element = getTarget(target);
        const observer = new IntersectionObserver((entries) => {
            for(const entry of entries) {
                setIsViewport(entry.isIntersecting)
                setRatio(entry.intersectionRatio)
            }
        }, {
            ...options,
            root: options?.root ? getTarget(options.root) : null
        })
        observer?.observe(element)
        return () => {
            observer.disconnect();
        }
    }, [target])

    return [isViewport, ratio] as const

}

export default useViewport;
