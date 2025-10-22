import { Copy } from '@zhouchengfeng/wuhu-react-ui-copy';

export default function Demo01() {
  const handleCopy1 = (text: string) => {
    console.log(`复制成功,复制内容:${text}`);
  };
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <Copy text="hello world01">点我复制</Copy>
      <Copy text="hello world02" showIcon onCopy={handleCopy1}>
        点我复制
      </Copy>
      {/* <Ripple>
				<button
					type="button"
					style={{
						border: '1px solid #ddd',
						padding: '4px 10px',
						borderRadius: 4,
					}}
				>
					点我
				</button>
			</Ripple>

			<Ripple color="red">
				<button
					type="button"
					style={{
						border: '1px solid #ddd',
						padding: '4px 10px',
						borderRadius: 4,
					}}
				>
					自定义颜色
				</button>
			</Ripple> */}
    </div>
  );
}
