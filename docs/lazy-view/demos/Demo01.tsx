import { useState } from 'react';
import { LazyView } from '../../../packages/lazy-view/src';

export default function Demo01() {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      {visible ? '可见' : '不可见'}
      <div style={{ height: 400, overflow: 'auto' }}>
        <LazyView
          style={{ marginTop: 800 }}
          onVisible={() => setVisible(true)}
          onInvisible={() => setVisible(false)}
        >
          123123123123
        </LazyView>
      </div>
    </div>
  );
}
