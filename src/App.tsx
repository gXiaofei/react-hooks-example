import {useState, useEffect} from 'react'
import {Button, message} from 'antd';
import './App.css';
import useLatest from './hooks/useLatest'
import useMount from './hooks/useMount';
import useUnmount from './hooks/useUnmount';
import useUnmountedRef from './hooks/useUnmountedRef';
import useUpdate from './hooks/useUpdate';


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


  const ref = useLatest(count);

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
      <Button onClick={() => setFlag(!flag)}>切换</Button>
      {flag && <Child />}
      <p></p>
      <Button onClick={() => update()}>更新</Button>
      <div>{Date.now()}</div>
    </div>
  );
}

export default App;
