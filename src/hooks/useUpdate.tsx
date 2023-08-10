//  强制组件重新渲染，最终返回一个函数。
import {useReducer} from 'react'


//具体的做法是：搞个累加器，无关的变量，触发一次，就累加 1，这样就会强制刷新。
const useUpdate = () => {
    const [,update] = useReducer(x => x + 1, 0);
    return update;
}

export default useUpdate;