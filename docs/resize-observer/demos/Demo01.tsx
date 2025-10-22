import { useState } from 'react';
import { ResizeObserver } from '../../../packages/resize-observer/src';
export default function Demo01() {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 100,
    height: 100,
  });
  const changeSize = () => {
    setSize({ width: 200, height: 200 });
  };
  const handleResize = (size: { width: number; height: number }) => {
    console.log('触发onResize:', size);
  };
  return (
    <div>
      <ResizeObserver onResize={handleResize}>
        <div style={{ ...size, border: '1px solid red' }}>xxx</div>
        <button
          type="button"
          style={{ marginTop: 10, border: '1px solid red' }}
          onClick={changeSize}
        >
          修改大小为400px
        </button>
      </ResizeObserver>
    </div>
  );
}
