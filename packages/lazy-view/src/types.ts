export interface LazyViewProps extends React.PropsWithChildren {
  /**
   * @desc 根元素,用于计算可见性。如果未指定，则使用 document 作为根元素。
   */
  root?: Element | null;
  /**
   * @desc 根元素的外边距,用于计算可见性。
   */
  rootMargin?: string;
  /**
   * @desc 触发回调的阈值。可以是单个数字或数字数组。
   * @default 0.1
   */
  threshold?: number | number[];
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
  /**
   * 元素可见时触发
   * @param entry 可见时的 IntersectionObserverEntry 对象
   * @returns
   */
  onVisible?: (entry: IntersectionObserverEntry) => void;
  /**
   * 元素不可见时触发
   * @param entry 不可见时的 IntersectionObserverEntry 对象
   * @returns
   */
  onInvisible?: (entry: IntersectionObserverEntry) => void;
}
