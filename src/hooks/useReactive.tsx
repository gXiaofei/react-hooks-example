import useCreation from "./useCreation";
import useLatest from "./useLatest";
import useUpdate from "./useUpdate";


const observer = <T extends Record<string, any>>(initVal: T, cb: () => void): T => {

    const proxy = new Proxy<T>(initVal, {
        get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver);
            return typeof res === "object"
            ? observer(res, cb)
            : Reflect.get(target, key);
        },
        set(target, key, val){
            const ret = Reflect.set(target, key, val);
            cb();
            return ret;
        }
    })

    return proxy
}

const useReactive = <T extends Record<string, any>>(initialized: T): T => {

    const ref = useLatest<T>(initialized);

    const update = useUpdate();

    const state = useCreation(() => {
        return observer(ref.current, () => {
            update();
        })
    }, [])

    return state as T;
}

export default useReactive;