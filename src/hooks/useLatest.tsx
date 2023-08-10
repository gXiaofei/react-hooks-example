//永远返回最新的值，可以避免闭包问题。

import {useRef} from 'react'

const useLatest = <T,>(value: T): {readonly current: T} => {

    const ref = useRef(value);
    ref.current = value;
    return ref;
}

export default useLatest;