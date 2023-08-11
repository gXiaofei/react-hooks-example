import {useEffect} from 'react'
import useLatest from './useLatest';
const useEventListener = (event: string, handle: ((...e: any) => void), target?: any) => {
    const handlerRef = useLatest(handle);
    useEffect(() => {

        let targetElement:any;

        if(!target) {
            targetElement = window
        } else if('current' in target) {
            targetElement = target.current;
        } else {
            targetElement = target
        }

        //  防止没有 addEventListener 这个属性
        if(!targetElement?.addEventListener) return; 

        const useEventListener = (event: Event) => {
            return handlerRef.current(event);
        }

        targetElement.addEventListener(event, useEventListener);
        return () => {
            targetElement.removeEventListener(event, useEventListener);
        }
    }, [event, target])

}

export default useEventListener;