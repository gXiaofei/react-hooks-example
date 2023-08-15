import {useState, useEffect} from 'react'
import {Button, message} from 'antd';
import './App.css';
import useLatest from './hooks/useLatest'
import useMount from './hooks/useMount';
import useUnmount from './hooks/useUnmount';
import useUnmountedRef from './hooks/useUnmountedRef';
import useUpdate from './hooks/useUpdate';
import useCreation from './hooks/useCreation';
import useHover from './hooks/useHover';
import useNetWork from './hooks/useNetWork';
import useCss from './hooks/useCss';


const Child = () => {
  const unmountedRef = useUnmountedRef();

  useMount(() => {
    console.log("初始化：", unmountedRef);
    message.info('mount')
  })

  useUnmount(() => {
    console.log("卸载：", unmountedRef);
    message.info('unmount')
  })

  return <div>
      child
  </div>

}

function App() {

  const [count, setCount] = useState(0);

  const [flag, setFlag] = useState(false)

  const update = useUpdate();

  const isHover = useHover(document.getElementById('toggle'))

  const getNowData = () => {
    return Math.random();
  };

  const nowData = useCreation(() => getNowData(), []);

  const ref = useLatest(count);
  

  const net = useNetWork();

  console.log('net', net);

  const classDiv = useCss({
    color: "red",
    "&:hover": {
      color: "blue",
    },
  });

  const classP = useCss({
    p: {
      color: "green",
      "&:nth-of-type(2)": {
        color: "rebeccapurple",
      },
    },
  });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("count:", count);
  //     console.log("ref:", ref);
  //     setCount(ref.current + 1);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="App">
      <div>自定义Hooks：useLatestt</div>
      <div>count: {count}</div>
      <Button id='toggle' onClick={() => setFlag(!flag)}>切换</Button>
      {
        isHover ? 'hover' : 'not hover'
      }
      {flag && <Child />}
      <p></p>
      <Button onClick={() => update()}>更新</Button>
      <div>{Date.now()}</div>

      <div>正常的函数： {getNowData()}</div>
      <div>useCreation包裹后的： {nowData}</div>
      <Button
        type="primary"
        onClick={() => {
          setFlag((v) => !v);
        }}
      >
        切换状态{JSON.stringify(flag)}
      </Button>

      <div className={classDiv}>
        鼠标放上来
      </div>
      <div className={classP}>
        <p>CSS-in-JS</p>
        <p>控制div下p标签的字体颜色</p>
        <p style={{ color: "pink" }}>我是行内样式</p>
      </div>
    </div>
  );
}

export default App;
