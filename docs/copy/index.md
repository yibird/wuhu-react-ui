## Copy
Copy用于复制文本到剪贴板。Copy支持组件和Hooks两种使用方式。

### 基本例子

<demo react="./demos/demo01.tsx"  />


## Copy Api

### CopyProps

| 属性名 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| text | `string` | 是 |  | 要复制到剪贴板的文本 |
| showIcon | `boolean` | 否 | true | 是否显示复制图标 |
| copyText | `(text: string, result: boolean) => void` | 否 |  | 复制回调 | 
|className|string| 否| | 自定义className |
|style|`React.CSSProperties`| 否| | 自定义样式 |