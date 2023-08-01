# 国际化

如果你有国际化的需求，我们可以使用i18n。

## 安装

- **步骤 1**: 执行安装命令:

<CodeGroup>
  <CodeGroupItem title="yarn" active>

```bash
yarn add @nuxtjs/i18n -D
```

  </CodeGroupItem>

  <CodeGroupItem title="npm">

```bash
npm install @nuxtjs/i18n@next --save-dev
```

  </CodeGroupItem>

  <CodeGroupItem title="pnpm">

```bash
pnpm install --shamefully-hoist -D @nuxtjs/i18n@next
```

  </CodeGroupItem>
</CodeGroup>

- **步骤 2**: 将下面的代码写入你的配置文件:
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
})
```


