
import useCounter from "./useCounter";
import {act, renderHook} from '@testing-library/react'


describe("useCounter", () => {

    it('数字加1', () => {
        // 这是因为在 useCounter 中运用了 useState，但 useState 等 Hooks 只能在 React 中才行，
        // 在其他地方引用都会有这个问题，因此我们需要引入 renderHook 和 act 来解决测试问题。
        // const [counter, { add }] = useCounter(7);
        // expect(counter).toEqual(7);
        // add();
        // expect(counter).toEqual(8);

        const { result } = renderHook(() => useCounter(7));

        expect(result.current[0]).toEqual(7);

        act(() => {
            result.current[1].add();
        })

        expect(result.current[0]).toEqual(8);
    })
});