import { Scrollbar } from '@zhouchengfeng/wuhu-react-ui-scrollbar';

export default function Demo01() {
  return (
    <div>
      <Scrollbar
        type="track"
        containerStyle={{ height: 200, overflow: 'auto' }}
      >
        <div style={{ height: 800, width: 2000, backgroundColor: '#f5f5f5' }}>
          阿达阿达是的
        </div>
      </Scrollbar>
    </div>
  );
}
