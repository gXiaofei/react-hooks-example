import useEventListener from "./useEventListener";
import useSafeState from "./useSafeState";

interface NetWorkProps {
    online?: boolean; // 网络是否在线
    rtt?: number; // 当前链接下的评估的往返延迟
    type?:     | "bluetooth"
    | "cellular"
    | "ethernet"
    | "none"
    | "wifi"
    | "wimax"
    | "other"
    | "unknown"; // 设备使用与所述网络进行通信的连接的类型
    saveData?: boolean; // 用户代理是否设置了减少数据使用的选项
    downlinkMax?: number; // 最大下行速度（单位：兆比特/秒）
    effectiveType?: "slow-2g" | "2g" | "3g" | "4g"; // 网络连接的类型
}


const getConnection = (): NetWorkProps | undefined => {
    if (navigator && typeof navigator === "object") {
      const nav = navigator as any;
      return {
        rtt: nav.connection?.rtt,
        type: nav.connection?.type,
        saveData: nav.connection?.saveData,
        downlinkMax: nav.connection?.downlinkMax,
        effectiveType: nav.connection?.effectiveType,
      };
    }
  };

  const useNetWork = (): NetWorkProps => {
    const [net, setNet] = useSafeState(() => ({
      online: navigator?.onLine,
      ...getConnection(),
    }));
  
    useEventListener("online", () => {
      setNet((v) => ({
        ...v,
        online: true,
      }));
    });
  
    useEventListener("offline", () => {
      setNet((v) => ({
        ...v,
        online: false,
      }));
    });
  
    return net;
  };

  export default useNetWork;