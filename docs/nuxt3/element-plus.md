# 安装和使用Element Plus组件库

## 安装组件库:

- **步骤 1**: 在终端中进入nuxt-app文件夹:

```bash
cd nuxt-app
```

- **步骤 2**: 执行安装命令:

<CodeGroup>
  <CodeGroupItem title="yarn" active>

```bash
yarn add element-plus
```

  </CodeGroupItem>

  <CodeGroupItem title="npm">

```bash
npm install element-plus --save
```

  </CodeGroupItem>

  <CodeGroupItem title="pnpm">

```bash
pnpm install element-plus
```

  </CodeGroupItem>
</CodeGroup>

- **步骤 3**: 安装图标:

<CodeGroup>
  <CodeGroupItem title="yarn" active>

```bash
yarn add @element-plus/icons-vue
```

  </CodeGroupItem>

  <CodeGroupItem title="npm">

```bash
npm install @element-plus/icons-vue
```

  </CodeGroupItem>

  <CodeGroupItem title="pnpm">

```bash
pnpm install @element-plus/icons-vue
```

  </CodeGroupItem>
</CodeGroup>

- **步骤 4**: 安装用于用于Nuxt的Element Plus模块:

<CodeGroup>
  <CodeGroupItem title="yarn" active>

```bash
yarn add @element-plus/nuxt -D
```

  </CodeGroupItem>

  <CodeGroupItem title="npm">

```bash
npm install @element-plus/nuxt -D
```

  </CodeGroupItem>

  <CodeGroupItem title="pnpm">

```bash
pnpm install @element-plus/nuxt -D
```

  </CodeGroupItem>
</CodeGroup>

- **步骤 5**: 将下面的代码写入你的配置文件:
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@element-plus/nuxt'],
})
```

## 使用

```vue
<template>
  <el-button @click="ElMessage('hello')">button</el-button>
  <ElButton :icon="ElIconEditPen" type="success">button</ElButton>
  <LazyElButton type="warning">lazy button</LazyElButton>
</template>
```
