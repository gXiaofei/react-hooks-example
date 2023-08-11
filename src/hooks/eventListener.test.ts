import { renderHook } from "@testing-library/react";
import useEventListener from "./useEventListener";


describe("useEventListener", () => {

    it('should be defined', () => {
        expect(useEventListener).toBeDefined();
    })

    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement('div'); // 创建一个div
        document.body.appendChild(container);
    })

    afterEach(() => {
        document.body.removeChild(container); // 卸载
        container.remove();
    })

    it('监听点击事件', async() => {

        let count: number = 0;

        const onClick = () => {
            count++;
        }

        const {rerender, unmount} =  renderHook(() => {
            return useEventListener('click', onClick, container)
        })

        document.body.click(); // 点击body 应该无效
        expect(count).toEqual(0);

        container.click(); // 点击container 应该有效
        expect(count).toEqual(1);

        rerender();

        container.click(); // 点击container 应该有效
        expect(count).toEqual(2);

        unmount();
        // --debug
        container.click(); // 点击container 应该无效
        expect(count).toEqual(2);
    })

})

