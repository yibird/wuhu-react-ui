import { useRelativeTime } from '../../../packages/time/src';
const value = Date.now() - 60 * 1000; // 当前时间减去 1 分钟
export default function Demo02() {
  const time1 = useRelativeTime('2025-09-28 12:00:00');
  const time2 = useRelativeTime('2026-09-28 12:00:00');
  const time3 = useRelativeTime(value, { interval: 1000 });
  const time4 = useRelativeTime(value, {
    interval: 1000,
    locale: 'en',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <span> 传入一个小于当前时间的值(2025-09-28 12:00:00):</span>
        {time1}
      </div>
      <div>
        <span> 传入一个大于当前时间的值(2026-09-28 12:00:00):</span>
        {time2}
      </div>
      <div>
        <span>每隔1000毫秒刷新一次:</span>
        {time3}
      </div>
      <div>
        <span>每隔1000毫秒刷新一次(英文):</span>
        {time4}
      </div>
    </div>
  );
}
