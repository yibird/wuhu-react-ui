import { Time } from '../../../packages/time/src';

export default function Demo01() {
  const value = Date.now() - 60 * 1000;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <span> 传入一个小于当前时间的值(2025-09-28 12:00:00):</span>
        <Time value="2025-09-28 12:00:00" />
      </div>
      <div>
        <span> 传入一个大于当前时间的值(2026-09-28 12:00:00):</span>
        <Time value="2026-09-28 12:00:00" />
      </div>
      <div>
        <span>每隔1000毫秒刷新一次:</span>
        <Time value={value} interval={1000} />
      </div>
      <div>
        <span>每隔1000毫秒刷新一次(英文):</span>
        <Time value={value} interval={1000} locale="en" />
      </div>
    </div>
  );
}
