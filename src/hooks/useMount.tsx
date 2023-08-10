//只在组件初始化执行的 hook。
import {useEffect} from 'react'

const useMount = (fn: () => void) => {

    useEffect(() => {
        fn?.();
    }, []);

}

export default useMount;