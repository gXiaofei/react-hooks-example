import { renderHook, act} from "@testing-library/react";
import useViewport from "./useInViewport";


describe('useViewport', () => {


    it('should be defined', () => {
        expect(useViewport).toBeDefined()
    })


    let container: HTMLDivElement;
    let mockIntersectionObserver: jest.Mock<any, any>;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.append(container);

        mockIntersectionObserver = jest.fn();
        mockIntersectionObserver.mockReturnValue({
            observe: () => null,
            disconnect: () => null,
        })
        window.IntersectionObserver = mockIntersectionObserver;
    })


    afterEach(() => {
        document.body.removeChild(container)
    })


    it('测试基础功能', () => {
        const {result} = renderHook(() => useViewport(container))

        const calls = mockIntersectionObserver.mock.calls;

        const [onChange] = calls[calls.length - 1]

        act(() => {
            onChange([{
                container,
                isIntersecting: true,
                intersectionRatio: 0.5,
            }])
        })

        const [inViewport, ratio] = result.current
        expect(inViewport).toBeTruthy();
        expect(ratio).toBe(0.5);
    })

    it('测试第二参数节点', () => {
        const {result} = renderHook(() => useViewport(container, {root: container}))

        const calls = mockIntersectionObserver.mock.calls;

        const [onChange] = calls[calls.length - 1]
        act(() => {
            onChange([
                {
                    container,
                    isIntersecting: true,
                }
            ])
        })
        const [inViewport] = result.current;
        expect(inViewport).toBeTruthy();
    })
})
