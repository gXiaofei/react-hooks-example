import {useRef} from 'react';
import type {DependencyList} from 'react'

// 对比两个依赖数组是否相同
const depAreSame = (oldDeps: DependencyList, deps: DependencyList): boolean => {

        if(oldDeps === deps) return true;

        for(let i = 0;i<oldDeps.length;i++) {
                if(oldDeps[i] !== deps[i]) return false;
        }
        return true
}

const useCreation = <T,>(fn: () => T, dep: DependencyList) => {
    const {current} = useRef({
        deps: dep,
        obj: undefined as undefined | T,
        initialized: false,
    });

    if(current.initialized === false || !depAreSame(current.deps, dep)) {
        current.deps = dep;
        current.obj = fn();
        current.initialized = true;
    }

    return current.obj as T;
}

export default useCreation;

