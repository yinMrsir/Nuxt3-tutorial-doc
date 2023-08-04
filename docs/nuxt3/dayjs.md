---
lang: zh-CN
title: 使用DayJS - Nuxt3实战教程
---

# 使用DayJS

日期展示基本上在任何项目中都有，接下来我们添加时间日期库：Day.js

## 安装

### 方法一：作为插件使用

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

- **步骤 2**: 项目plugins目录下创建 dayjs.ts:
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

#### 使用
```vue
<template>
  <div>{{ $dayjs(1691025478849).format('YYYY-MM-DD') }}</div>
</template>

<script setup>
const nuxtApp = useNuxtApp()

console.log(nuxtApp.$dayjs(1691025478849).format('YYYY-MM-DD HH:mm:ss'))
</script>
```

### 方法二：使用dayjs-nuxt模块

- **步骤 1**: 执行安装命令:

<CodeGroup>
  <CodeGroupItem title="yarn" active>

```bash
yarn add --dev dayjs-nuxt
```

  </CodeGroupItem>

  <CodeGroupItem title="npm">

```bash
npm install --save-dev dayjs-nuxt
```

  </CodeGroupItem>

</CodeGroup>

- **步骤 2**: nuxt.config.ts配置module:
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    'dayjs-nuxt'
  ]
})
```

#### 使用
```vue
<template>
  <div>
    {{ dayjs(1691025478849).format('YYYY-MM-DD') }}
  </div>
</template>

<script setup>
const dayjs = useDayjs()

console.log(dayjs(1691025478849).format('YYYY-MM-DD'))
</script>
```