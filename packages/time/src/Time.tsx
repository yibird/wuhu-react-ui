import type { TimeProps } from './types';
import { useRelativeTime } from './useRelativeTime';

export default function Time({
  value,
  locale = 'zh',
  interval = 1000,
  immediate = true,
  className,
  style,
}: TimeProps) {
  const relativeTime = useRelativeTime(value, { locale, interval, immediate });
  return (
    value && (
      <span className={className} style={style}>
        {relativeTime}
      </span>
    )
  );
}
