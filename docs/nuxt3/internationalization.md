---
lang: zh-CN
title: 国际化(i18n使用) - Nuxt3实战教程
---

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

- **步骤 2**: 项目目录下创建 i18n.config.ts:
```ts
export default defineI18nConfig(() => ({
  locale: 'cn',
  messages: {
    en: {
      home: 'Homepage'
    },
    cn: {
      home: '首页'
    },
    russ: {
      home: 'Первая страница'
    }
  }
}))
```
- **步骤 3**: 将下面的代码写入你的配置文件:
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  i18n: {
    vueI18n: './i18n.config.ts'
  },
})
```

## 使用
```vue
<template>
  <el-button>{{ i18n.t('home') }}</el-button>
</template>

<script setup>
  const i18n = useI18n();
  
  console.log(i18n.t('home')); // 首页
</script>
```

## 语言切换
```vue
<template>
  <el-select v-model="locale" @change="handleLanguage">
    <el-option v-for="(item, key) in locales" :index="key" :value="key" :label="item"></el-option>
  </el-select>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const locales = ref({
  cn: '简体中文',
  en: 'English',
  russ: 'Русский'
})

/** 获取本地存储的语言 */
const language= useCookie<string>('language')
if (language.value) {
  locale.value = language.value
}

/** 语言切换 */
const handleLanguage = (value: string | null | undefined) => {
  language.value = value
}
</script>
```

