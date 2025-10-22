import type dayjs from 'dayjs';

type Locale = 'zh' | 'en';

export interface TimeProps {
  /**
   * @desc 传入时间值
   * @default
   */
  value: dayjs.ConfigType;
  /**
   * @desc 语言
   * @default 'zh'
   */
  locale?: Locale;
  /**
   * @desc 更新间隔(单位ms)
   * @default 1000
   */
  interval?: number;
  /**
   * @desc 是否立即更新
   * @default true
   */
  immediate?: boolean;
  /**
   * @desc className
   * @default
   */
  className?: string;
  /**
   * @desc style
   * @default
   */
  style?: React.CSSProperties;
}
