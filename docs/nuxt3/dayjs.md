# 使用DayJS作为插件

日期展示基本上在任何项目中都有，接下来我们添加时间日期库：Day.js

## 安装

- **步骤 1**: 执行安装命令:

<CodeGroup>
  <CodeGroupItem title="yarn" active>

```bash
yarn add dayjs
```

  </CodeGroupItem>

  <CodeGroupItem title="npm">

```bash
npm install dayjs
```

  </CodeGroupItem>

</CodeGroup>

- **步骤 3**: 项目plugins目录下创建 dayjs.ts:
```ts
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'

export default defineNuxtPlugin((nuxtApp) => {
  dayjs.extend(relativeTime)
  nuxtApp.provide('dayjs', dayjs)
})

declare module '#app' {
  interface NuxtApp {
    $dayjs: dayjs.Dayjs
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dayjs(date?: dayjs.ConfigType): dayjs.Dayjs
  }
}

```

## 使用
```vue
<template>
  <div>{{ $dayjs(time).format('YYYY-MM-DD') }}</div>
</template>
```
