export interface CollapsibleProps {
  /**
   * @desc 折叠方向
   * @default 'top'
   */
  direction?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * @desc 自定义trigger
   * @default
   */
  trigger?: React.ReactNode;
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
   * @desc 折叠状态改变时触发
   * @param collapsed 折叠状态
   * @returns
   */
  onCollapsed?: (collapsed: boolean) => void;
}

export interface LayoutProps extends React.PropsWithChildren {
  /**
   * @desc 布局方向
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * @desc 元素间距
   * @default 10
   */
  gutter?: number | string;
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

export interface LayoutHeaderProps extends React.PropsWithChildren {
  /**
   * @desc 是否允许开启缩放
   * @default false
   */
  collapsible?: boolean;
  /**
   * @desc 高度,用于缩放和展开
   * @default
   */
  height?: number | string;
  /**
   * @desc 自定义收缩/展开触发器
   * @default
   */
  trigger?: CollapsibleProps['trigger'];
  /**
   * @desc 包装类className
   * @default
   */
  wrapperClassName?: string;
  /**
   * @desc 包装类style
   * @default
   */
  wrapperStyle?: React.CSSProperties;
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
   * @desc 头部折叠状态改变时触发
   * @param collapsed 折叠状态
   * @returns
   */
  onCollapsed?: (collapsed: boolean) => void;
}

export interface LayoutSiderProps extends React.PropsWithChildren {
  /**
   * @desc 是否允许开启缩放
   * @default false
   */
  collapsible?: boolean;
  /**
   * @desc 宽度,用于缩放
   * @default
   */
  width?: number | string;
  /**
   * @desc 自定义收缩/展开触发器
   * @default
   */
  trigger?: CollapsibleProps['trigger'];
  /**
   * @desc 包装类className
   * @default
   */
  wrapperClassName?: string;
  /**
   * @desc 包装类style
   * @default
   */
  wrapperStyle?: React.CSSProperties;
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
   * @desc 头部折叠状态改变时触发
   * @param collapsed 折叠状态
   * @returns
   */
  onCollapsed?: (collapsed: boolean) => void;
}

export interface LayoutContext {
  gutter: number | string;
}

export interface LayoutContentProps extends React.PropsWithChildren {
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
