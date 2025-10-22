export type RippleType = 'out' | 'inset';
export type RippleTrigger = 'click' | 'hover' | 'always';

export interface RippleProps extends React.PropsWithChildren {
  /**
   * @desc 涟漪类型,out表示向外扩散,inset表示向内扩散
   * @default 'out'
   */
  type?: RippleType;
  /**
   * @desc 触发方式
   * @default 'click'
   */
  trigger?: RippleTrigger;
  /**
   * @desc 涟漪颜色
   * @default ''
   */
  color?: string;
  /**
   * @desc 涟漪圆角,仅使用type为'out'
   * @default '50%'
   */
  borderRadius?: string | number;
  /**
   * @desc 扩散宽度,单位 px,仅适用 out 类型
   * @default '6px'
   */
  spreadWidth?: string | number;
  /**
   * @desc 扩散大小，单位 px,仅适用 inset 类型
   * @default
   */
  spreadSize?: string | number;
  /**
   * @desc 是否在元素中心扩散，设置为 true 时，波纹将在元素中心生成并扩散
   * @default false
   */
  center?: boolean;
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
