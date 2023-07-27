# 下载和安装Nuxt3

## 依赖环境
- [Node.js v16.11.0+](https://nodejs.org/)

## 创建项目
- **步骤 1**: 打开一个终端，并使用以下命令创建一个新的启动项目(这里项目名以nuxt-app为例):

<CodeGroup>
  <CodeGroupItem title="npx" active>

```bash
npx nuxi init nuxt-app
```

  </CodeGroupItem>

  <CodeGroupItem title="pnpm">

```bash
pnpm dlx nuxi init nuxt-app
```

  </CodeGroupItem>
</CodeGroup>

- **步骤 2**: 在终端中进入nuxt-app文件夹:

```bash
cd nuxt-app
```

- **步骤 3**: 安装依赖项:

<CodeGroup>
  <CodeGroupItem title="yarn" active>

```bash
yarn install
```

  </CodeGroupItem>

  <CodeGroupItem title="npm">

```bash
npm install
```

  </CodeGroupItem>

  <CodeGroupItem title="pnpm">

```bash
pnpm install
```

  </CodeGroupItem>
</CodeGroup>

## 开发服务器
现在你可以在开发模式下启动你的Nuxt应用了:

<CodeGroup>
  <CodeGroupItem title="yarn" active>

```bash
yarn dev
```

  </CodeGroupItem>

  <CodeGroupItem title="npm">

```bash
npm run dev
```

  </CodeGroupItem>

  <CodeGroupItem title="pnpm">

```bash
pnpm dev
```

  </CodeGroupItem>
</CodeGroup>

::: tip
浏览器窗口将自动打开 [http://localhost:3000](http://localhost:8080).
:::