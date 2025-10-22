export interface CopyProps extends React.PropsWithChildren {
  /**
   * @desc 要复制到剪贴板的文本
   * @default
   */
  text: string;
  /**
   * @desc 是否显示copy icon
   * @default true
   */
  showIcon?: boolean;
  /**
   * @desc 复制回调
   * @param text 复制的文本
   * @param result 是否复制成功
   * @returns
   */
  onCopy?: (text: string, result: boolean) => void;
  /**
   * @desc 自定义className
   * @default
   */
  className?: string;
  /**
   * @desc 自定义样式
   * @default
   */
  style?: React.CSSProperties;
}
