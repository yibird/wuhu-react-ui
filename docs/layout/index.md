Layout(视图布局)组件提供常用布局,包含侧栏、头部、内容三部分:

- Layout.Sider(侧栏): 布局左侧区域,一般用于显示分组、树结构(如组织结构)等等。
- Layout.Header(头部): 布局顶部区域,此区域一般用于显示查询Form,操作按钮等。
- Layout.Content(内容): 布局主体区域,此区域一般用于显示主要内容,例如表格、卡片、列表等信息。

### 基础例子

<demo react="./demos/demo01.tsx"  />

### 自定义高度

<demo react="./demos/demo02.tsx"  />

### 自定义触发器

<demo react="./demos/demo03.tsx"  />

## Layout Api

### LayoutProps
| 属性名 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| direction|`'horizontal' \| 'vertical'`| 否|`'horizontal'` | 布局方向,水平或垂直 |
| gutter|`string \| number`| 否|`10` | 布局元素间距 |
| className | `string \| undefined` | 否 | `''` | className |
| style | `CSSProperties \| undefined` | 否 | {} | style |

### LayoutSiderProps

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| collapsible | `boolean \| undefined` | 否 | false | 是否允许开启缩放 |
| width | `number \| string \| undefined` | 否 |  | 侧边栏宽度,如果不指定宽度将使用grid布局实现过渡效果 |
| trigger|`React.ReactNode \| undefined`| 否 |  | 自定义收缩/展开触发器 |
| wrapperClassName | `string \| undefined` | 否 | `''` | 侧栏包装类名 |
| wrapperStyle | `CSSProperties \| undefined` | 否 | {} | 侧栏包装样式 |
| className | `string \| undefined` | 否 | `''` | className |
| style | `CSSProperties \| undefined` | 否 | {} | style |

### LayoutHeaderProps

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| collapsible | `boolean \| undefined` | 否 | false | 是否允许开启缩放 |
| height | `number \| string \| undefined` | 否 |  | 头部高度,用于缩放和展开 |
| trigger|`React.ReactNode \| undefined`| 否 |  | 自定义收缩/展开触发器 |
| wrapperClassName | `string \| undefined` | 否 | `''` | 头部包装类名 |
| wrapperStyle | `CSSProperties \| undefined` | 否 | {} | 头部包装样式 |
| className | `string \| undefined` | 否 | `''` | className |
| style | `CSSProperties \| undefined` | 否 | {} | style |

### LayoutContentProps
| 属性名 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| className | `string \| undefined` | 否 | `''` | className |
| style | `CSSProperties \| undefined` | 否 | {} | style |