# 安装和使用Element Plus组件库

现在我们完成了第一步，启动了一个项目，接下来我们为了快速编写我们的网站界面，需要引入UI组件库，我们这里选择ElementUI，接下来我们安装并使用它。

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

- **步骤 3**: 安装用于用于Nuxt的Element Plus模块:

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

- **步骤 4**: 将下面的代码写入你的配置文件:
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

我们发现上述代码并没有导入组件也没有引入样式，也没安装图标模块，可是却正确显示了我们需要的效果。这些都是Nuxt的Element Plus模块帮我们完成的：

* 根据需要自动导入组件和样式。
* 根据需要自动导入指令和样式。
* 自动从@element-plus/icons-vue导入图标。
* 自动导入ElMessage、ElNotification等方法。

::: tip
我们还可以动态导入一个组件，你所需要做的就是在组件名称前添加Lazy前缀， 例如上方代码中的：LazyElButton，可以延迟加载组件代码，直到合适的时刻，这有助于优化你的JavaScript包大小。
:::
