import { useRef } from 'react';
import { Copy, useCopy } from '@zhouchengfeng/wuhu-react-ui-copy';

export default function Demo01() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy1 = (text: string) => {
    console.log(`复制成功,复制内容:${text}`);
  };
  const handleCopy2 = (text: string) => {
    console.log(`复制成功,复制内容:${text}`);
  };

  const { copyText } = useCopy();

  const handleCopy3 = async () => {
    if (inputRef.current) {
      const copied = await copyText(inputRef.current.value);
      console.log(
        `${copied ? '复制成功' : '复制失败'},复制内容:${inputRef.current.value}`
      );
    }
  };
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <Copy text="hello world01" onCopy={handleCopy1}>
        点我复制
      </Copy>
      <Copy text="hello world02" showIcon onCopy={handleCopy2}>
        点我复制
      </Copy>

      <div>
        <input ref={inputRef} style={{ border: '1px solid #ccc' }} />
        <button type="button" onClick={handleCopy3}>
          使用useCopy Hook
        </button>
      </div>
    </div>
  );
}
