## Highlight(高亮)

Highlight组件常用于长文本搜索高亮。

<demo react="./demos/Demo01.tsx"  />

### HighlightProps

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| queries | `string \| RegExp \| Array<string \| RegExp>` | 是 |  | 全局高亮显示匹配字符串/正则表达式的联合 |
| content | `string` | 是 |  | 匹配内容 |
| caseSensitive | `boolean` | 否 | false | 是否区分大小写 |
| diacriticsSensitive | `boolean` | 否 | false | 正在搜索的字符串是否对音调符号敏感 |
| wholeWordMatch | `boolean` | 否 | true | 是否将整个字符串作为整个单词进行搜索 |
| escapeSpecial | `boolean` | 否 | true | 是否转义正则特殊字符 |
| multiple | `boolean` | 否 | true | 是否支持多个关键字同时匹配 |
| unicodeBoundary | `boolean` | 否 | false | 是否使用 Unicode 边界匹配 |
| highlightStyle | `CSSProperties` | 否 | {} | 自定义高亮样式 |
| highlightClass | `string` | 否 | '' | 自定义高亮类名 |
| highlightTag | `string` | 否 | `'mark'` | 自定义高亮标签 |
| onMatch | `(str: string, count: number, offset: number) => void` | 否 |  | 自定义匹配回调函数。str表示匹配的字符串;count表示出现字符串数量,offset表示匹配字符串的偏移量 |
