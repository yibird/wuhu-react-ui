export interface ThumbData {
  ratio: number;
  thumbSize: number;
  max: number;
}
export interface ThumbMap {
  size: 'width' | 'height';
  direction: 'left' | 'top';
  offset: 'offsetWidth' | 'offsetHeight';
  client: 'clientX' | 'clientY';
}

export interface ThumbProps {
  /**
   * @desc 滚动条数据
   * @default
   */
  data?: ThumbData | null;
  /**
   * @desc 滚动条是否垂直显示
   * @default true
   */
  vertical?: boolean;
  /**
   * @desc 是否同时显示水平和垂直滚动条
   * @default false
   */
  both?: boolean;
  /**
   * @desc 滚动条块颜色
   * @default
   */
  thumbColor?: string;
  /**
   * @desc 滚动条块激活(悬浮或拖拽)颜色
   * @default
   */
  thumbActiveColor?: string;
  /**
   * @desc 是否总是显示滚动条
   * @default false
   */
  alwaysShow?: boolean;
  /**
   * @desc 滚动条实例Ref
   * @default
   */
  ref?: React.RefObject<ThumbInstance | null>;
  /**
   * @desc 滚动回调函数
   * @param offset 滚动位置
   * @returns
   */
  onScroll?: (offset: number) => void;
}

export interface ThumbInstance {
  setThumbOffset: (offset: number) => void;
}

export interface ScrollbarProps extends React.PropsWithChildren {
  /**
   * @desc 滚动条类型,type为track时会显示轨道,type为embed时仅显示滚动Thumb
   * @default 'embed'
   */
  type?: 'track' | 'embed';
  /**
   * @desc 是否禁用水平滚动条
   * @default false
   */
  disableHorizontal?: boolean;
  /**
   * @desc 是否禁用垂直滚动条
   * @default false
   */
  disableVertical?: boolean;
  /**
   * @desc 滚动条块颜色
   * @default 'rgb(201,205,212)'
   */
  thumbColor?: string;
  /**
   * @desc 滚动条块激活(悬浮或拖拽)颜色
   * @default 'rgb(107, 119, 133)'
   */
  thumbActiveColor?: string;
  /**
   * @desc 滚动条宽度
   * @default 8
   */
  thumbWidth?: number;
  /**
   * @desc 滚动条实例Ref
   * @default
   */
  ref?: React.RefObject<ScrollbarInstance | null>;
  /**
   * @desc 内部容器className
   * @default
   */
  containerClassName?: string;
  /**
   * @desc 内部容器样式
   * @default
   */
  containerStyle?: React.CSSProperties;
  /**
   * @desc 外层className
   * @default
   */
  className?: string;
  /**
   * @desc 外层样式
   * @default
   */
  style?: React.CSSProperties;
  /**
   * @desc 滚动回调函数
   * @param e 滚动事件
   * @returns
   */
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

export interface ScrollbarInstance {
  /**
   * @desc 滚动到指定位置
   * @param options 滚动位置,可以是数字(滚动到顶部或左侧)或对象(滚动到指定位置)
   * @param y 滚动到顶部或左侧的位置(仅当options为数字时有效)
   * @returns
   */
  scrollTo: (
    options?:
      | number
      | {
          left?: number;
          top?: number;
        },
    y?: number
  ) => void;
  /**
   * @desc 水平滚动到指定位置
   * @param left 左侧位置
   * @returns
   */
  scrollLeft: (left: number) => void;
  /**
   * @desc 滚动到指定顶部位置
   * @param top 顶部位置
   * @returns
   */
  scrollTop: (top: number) => void;
}
