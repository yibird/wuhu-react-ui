export interface HighlightProps {
  /**
   * @desc 全局高亮显示匹配字符串/正则表达式的联合
   * @default
   */
  queries?: string | RegExp | Array<string | RegExp>;
  /**
   * @desc 匹配内容
   * @default
   */
  content?: string;
  /**
   * @desc 是否区分大小写
   * @default false
   */
  caseSensitive?: boolean;
  /**
   * @desc 正在搜索的字符串是否对音调符号敏感
   * @default false
   */
  diacriticsSensitive?: boolean;
  /**
   * @desc 是否将整个字符串作为整个单词进行搜索
   * @default true
   */
  wholeWordMatch?: boolean;
  /**
   * @desc 是否转义正则特殊字符
   * @default true
   */
  escapeSpecial?: boolean;
  /**
   * @desc 是否支持多个关键字同时匹配
   * @default true
   */
  multiple?: boolean;
  /**
   * @desc 是否使用 Unicode 边界匹配
   * @default false
   */
  unicodeBoundary?: boolean;
  /**
   * @desc 高亮样式
   * @default
   */
  highlightStyle?: React.CSSProperties;
  /**
   * @desc 高亮class
   * @default
   */
  highlightClass?: string;
  /**
   * @desc 高亮包装标签,默认mark标签
   * @default 'mark'
   */
  highlightTag?: string;
  /**
   * 匹配时触发的事件
   * @param str 匹配的字符串
   * @param count 出现字符串数量
   * @param offset 匹配字符串的偏移量
   */
  onMatch?: (str: string, count: number, offset: number) => void;
}
