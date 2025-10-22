export interface MenuItemType {
  /**
   * @desc 菜单项的id(唯一),用于区分点击菜单项
   * @default
   */
  id?: string;
  /**
   * @desc icon
   * @default
   */
  icon?: (item: MenuItemType) => React.ReactNode;
  /**
   * @desc 菜单项label,如果为空则使用children
   * @default
   */
  label?: React.ReactNode | ((item: MenuItemType) => React.ReactNode);
  /**
   * @desc 渲染元素的类型,'divider'表示渲染分割线
   * @default
   */
  type?: 'divider';
  /**
   * @desc 是否禁用菜单项
   * @default false
   */
  disabled?: boolean;
  /**
   * @desc 菜单项后缀,子菜单该配置无效
   * @default
   */
  suffix?: React.ReactNode | ((item: MenuItemType) => React.ReactNode);
}

export interface SubMenuType {
  /**
   * @desc 菜单项的id(唯一),用于区分点击菜单项
   * @default
   */
  id?: string;
  /**
   * @desc icon
   * @default
   */
  icon?: React.ReactNode | ((item: MenuItemType) => React.ReactNode);
  /**
   * @desc 菜单项label,如果为空则使用children
   * @default
   */
  label?: React.ReactNode | ((item: MenuItemType) => React.ReactNode);
  /**
   * @desc 是否禁用菜单项
   * @default false
   */
  disabled?: boolean;
  /**
   * @desc 子菜单
   * @default
   */
  children?: MenuItemType[];
}

export interface MenuDividerType {
  /**
   * @desc 渲染元素的类型,'divider'表示渲染分割线
   * @default
   */
  type: 'divider';
  /**
   * @desc 是否渲染虚线分割线
   * @default false
   */
  dashed?: boolean;
}

export type ItemType = MenuItemType | SubMenuType | MenuDividerType;

export interface MenuItemProps extends MenuItemType {
  /**
   * @desc 激活(悬浮)菜单项的ClassName
   * @default
   */
  activeClassName?: string;
  /**
   * @desc 激活(悬浮)菜单项的样式
   * @default
   */
  activeStyle?: React.CSSProperties;
}

export interface SubMenuProps extends SubMenuType {}

export interface ContextMenuProps extends React.PropsWithChildren {
  /**
   * @desc 菜单渲染数据项
   * @default []
   */
  items?: ItemType[];
  /**
   * @desc 是否阻止滚动隐藏菜单
   * @default false
   */
  preventHideOnScroll?: boolean;
  /**
   * @desc 是否阻止窗口尺寸变化隐藏菜单
   * @default false
   */
  preventHideOnResize?: boolean;
  /**
   * @desc 菜单项的ClassName
   * @default
   */
  itemClassName?: string;
  /**
   * @desc 菜单项的样式
   * @default
   */
  itemStyle?: React.CSSProperties;
  /**
   * @desc 激活(悬浮)菜单项的ClassName
   * @default
   */
  activeClassName?: string;
  /**
   * @desc 激活(悬浮)菜单项的样式
   * @default
   */
  activeStyle?: React.CSSProperties;
  /**
   * @desc menuClassName
   * @default
   */
  menuClassName?: string;
  /**
   * @desc menu样式
   * @default
   */
  menuStyle?: React.CSSProperties;
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
   * @desc 点击菜单项的回调函数
   * @default
   */
  onClick?: (item: MenuItemType) => void;
}

export interface MenuProps {
  /**
   * @desc 菜单是否可见
   * @default false
   */
  visible: boolean;
  /**
   * @desc 菜单渲染数据项
   * @default []
   */
  items?: ItemType[];
  /**
   * @desc 菜单位置
   * @default { top: 0, left: 0 }
   */
  position?: { top: number; left: number };
  /**
   * @desc 菜单DOM引用
   * @default
   */
  contextMenuRef: React.RefObject<HTMLUListElement | null>;
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
