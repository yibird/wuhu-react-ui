## Scrollbar(滚动条)
用于模拟原生滚动条,支持自定义。

### 基础例子
<demo react="./demos/Demo01.tsx"  />

### 滚动条类型
设置 `type` 属性改变滚动条类型，`track` 类型会显示滚动条轨道。
<demo react="./demos/Demo02.tsx"  />

## Scrollbar Api

### ScrollbarProps
| 属性名 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| type | `track \| embed` | 是 | `embed` | 滚动条类型，`track` 类型会显示滚动条轨道，`embed` 类型会嵌入到内容中 |
| disableHorizontal | `boolean` | 否 | false | 是否禁用水平滚动条 |
| disableVertical | `boolean` | 否 | false | 是否禁用垂直滚动条 |
| thumbColor | `string` | 否 | `'rgb(201,205,212)'` | 滚动条滑块颜色 |
| thumbActiveColor | `string` | 否 | `'rgb(107, 119, 133)'` | 滚动条滑块激活颜色 |
| containerClassName | `string` | 否 |  | 滚动条容器类名 |
| containerStyle | `React.CSSProperties` | 否 |  | 滚动条容器样式 |
| className | `string` | 否 |  | 滚动条类名 |
| style | `React.CSSProperties` | 否 |  | 滚动条样式 |
| onScroll | `(e: React.UIEvent<HTMLDivElement>) => void` | 否 |  | 自定义滚动回调函数。e表示滚动事件 |

### ScrollbarInstance
| 方法名 | 描述|
| --- | --- |
|`scrollTo: ( options?: \| number \| {left?: number;top?: number},y?: number) => void;`|滚动到指定位置。options:滚动位置,可以是数字(滚动到顶部或左侧)或对象(滚动到指定位置)。y:滚动到顶部或左侧的位置(仅当options为数字时有效)|
|`scrollLeft: (left: number) => void`| 水平滚动到指定位置 |
|`scrollTop: (top: number) => void`| 垂直滚动到指定位置 |