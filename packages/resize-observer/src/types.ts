type Size = { width: number; height: number };
export interface ResizeObserverProps extends React.PropsWithChildren {
  /**
   * @desc 是否立即触发(在组件挂载时触发一次 resize 事件)
   * @default true
   */
  immediate?: boolean;
  /**
   * @desc 防抖间隔（毫秒）
   * @default 10
   */
  debounce?: number;
  /**
   * 回调函数，当元素大小变化时调用
   * @param entry 包含元素大小信息的 ResizeObserverEntry 对象
   * @returns
   */
  onResize?: (size: Size) => void;
}
