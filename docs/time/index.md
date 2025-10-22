## Time

Time组件用于显示相对时间。

### 基础例子

<demo react="./demos/Demo01.tsx"  />

### 组合式Api

<demo react="./demos/Demo02.tsx"  />

## Time Api

### TimeProps

| 属性名    | 类型               | 必填 | 默认值 | 说明                  |
| --------- | ------------------ | ---- | ------ | --------------------- |
| value     | `dayjs.ConfigType` | 是   |        | 要复制到剪贴板的文本  |
| locale    | `'zh' \| 'en'`     | 否   | `'zh'` | 语言                  |
| interval  | `number`           | 否   | `1000` | 刷新时间间隔,单位毫秒 |
| immediate | `boolean`          | 否   | `true` | 是否立即刷新          |
