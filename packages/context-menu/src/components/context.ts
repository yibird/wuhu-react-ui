import { createContext } from 'react';
import type { MenuItemType } from './types';

export interface Context {
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
   * @desc 菜单项的ClassName
   * @default
   */
  itemClassName?: string;
  /**
   * @desc 菜单项的样式
   * @default
   */
  itemStyle?: React.CSSProperties;
  handleHide?: () => void;
  handleClickMenuItem?: (item: MenuItemType) => void;
}

export const ContextMenuContext = createContext<Context>({});
