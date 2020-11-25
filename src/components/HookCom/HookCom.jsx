import React, {useState, useEffect} from 'react';
import './HookCom.scss';

function HookCom() {
  
  const [count, setCount] = useState(0);

  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });

  const handleResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  };
  //useEffect是每次渲染后都执行，但可通过第二个参数限定
  //只要使用 useEffect 第二个参数，并传入一个空数组即可。
  //第二个参数是一个可选的数组参数，只有数组的每一项都不变的情况下，useEffect 才不会执行
  useEffect(() => {
    document.title = count;
    window.addEventListener("resize", handleResize, false);
  }); //第二个参数undefined

  //第二个参数我们传入 [count], 表示只有 count 的变化时，
  //我才打印 count 值，resize 变化不会打印
  useEffect(() => {
    console.log("count:" + count);
  }, [count]); //第二个参数非空数组

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    console.log("size:");
    console.log(size);
    //及时卸载掉设置宽高的事件，避免重复绑定，很耗性能
    return () => {
      window.removeEventListener("resize", handleResize, false);
    };
  }, [size]);

  return (
    <div className="hook-com">
      <div className="wrap">
        <div>这是Hooks组件</div>
        <div>{count}</div>
        <button type="button" onClick={() => setCount(count + 1)}>
          按钮
          Click({count})size:{size.width}x{size.height}
        </button>
      </div>
    </div>
  );
}

export default HookCom;