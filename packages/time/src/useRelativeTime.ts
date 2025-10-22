import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export type Locale = 'zh' | 'en';

export interface UseRelativeTimeOptions {
  locale?: Locale;
  interval?: number;
  immediate?: boolean;
}

export function useRelativeTime(
  value: dayjs.ConfigType,
  options?: UseRelativeTimeOptions
) {
  const [relativeTime, setRelativeTime] = useState('');
  const opts = { locale: 'zh', interval: 1000, immediate: true, ...options };

  let timer: number | undefined;

  const update = (parsedTime: dayjs.Dayjs) => {
    const now = dayjs();
    const diffSeconds = now.diff(parsedTime, 'second');
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffSeconds / 3600);
    const diffDays = Math.floor(diffSeconds / 86_400);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = now.diff(parsedTime, 'month');
    const diffYears = now.diff(parsedTime, 'year');

    if (opts.locale === 'zh') {
      if (diffSeconds < 60) setRelativeTime('刚刚');
      else if (diffMinutes < 60) setRelativeTime(`${diffMinutes}分钟前`);
      else if (diffHours < 24) setRelativeTime(`${diffHours}小时前`);
      else if (diffDays < 7) setRelativeTime(`${diffDays}天前`);
      else if (diffWeeks < 5) setRelativeTime(`${diffWeeks}周前`);
      else if (diffMonths < 12) setRelativeTime(`${diffMonths}个月前`);
      else setRelativeTime(`${diffYears}年前`);
    } else if (diffSeconds < 60) setRelativeTime('just now');
    else if (diffMinutes < 60) setRelativeTime(`${diffMinutes}minutes ago`);
    else if (diffHours < 24) setRelativeTime(`${diffHours}hours ago`);
    else if (diffDays < 7) setRelativeTime(`${diffDays}days ago`);
    else if (diffWeeks < 5) setRelativeTime(`${diffWeeks}weeks ago`);
    else if (diffMonths < 12) setRelativeTime(`${diffMonths}months ago`);
    else setRelativeTime(`${diffYears}years ago`);
  };

  const onClear = () => {
    if (timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };

  const onStart = () => {
    onClear();
    const parsedTime = dayjs.isDayjs(value) ? value : dayjs(value);
    if (opts.immediate) update(parsedTime);
    timer = window.setInterval(() => update(parsedTime), opts.interval);
  };

  useEffect(() => {
    onStart();
    return () => {
      onClear();
    };
  }, []);

  useEffect(() => {
    onStart();
  }, [value, opts]);

  return relativeTime;
}
