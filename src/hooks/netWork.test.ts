import {renderHook, act} from '@testing-library/react'
import useNetWork from "./useNetWork";

describe('useNetWork', () => {

    it('should be defined', () => {
        expect(useNetWork).toBeDefined();
    })

    it('切换网络', () => {

        const {result} = renderHook(() => useNetWork())
        expect(result.current.online).toBeTruthy();

        act(() => {
            window.dispatchEvent(new Event('offline'))  // 关闭
        })
        expect(result.current.online).toBeFalsy();

        act(() => {
            window.dispatchEvent(new Event('online')) // 开启
        })
        expect(result.current.online).toBeTruthy()
    })

})