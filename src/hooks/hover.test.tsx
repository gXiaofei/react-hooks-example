import {screen, render, renderHook, act, fireEvent} from '@testing-library/react';
import useHover from './useHover'

describe('useHover', () => {

    it('should be defined', () => {
        expect(useHover).toBeDefined();
    })


    it('测试hover', () => {
        // 加载一个div
        render(<div>Hover</div>)
        const { result } = renderHook(() => useHover(screen.getByText('Hover')))
        // void 的目的是告诉fireEvent方法返回的是undefined
        act(() => void fireEvent.mouseEnter(screen.getByText('Hover')))
        expect(result.current).toBe(true);

        act(() => void fireEvent.mouseLeave(screen.getByText('Hover')))
        expect(result.current).toBe(false)
    })

    it('测试功能', () => {
        render(<div>Hover</div>)

        let count = 0;
        let flag = false;

        const { result } = renderHook(() => useHover(screen.getByText('Hover'), {
            onEnter: () => {
                count++;
            },
            onLeave: () => {
                count++;
            },
            onChange: (isHover) => {
                flag = isHover
            }
        }))

        expect(result.current).toBe(false)

        // 鼠标移入
        act(() => void fireEvent.mouseEnter(screen.getByText('Hover')))
        expect(result.current).toBe(true);
        expect(count).toBe(1);
        expect(flag).toBe(true)

        // 鼠标移出
        act(() => void fireEvent.mouseLeave(screen.getByText('Hover')))
        expect(result.current).toBe(false)
        expect(count).toBe(2);
        expect(flag).toBe(false)
    })
})