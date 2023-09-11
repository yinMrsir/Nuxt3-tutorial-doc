# 细节优化

## 细节优化

**1.** 添加加载进度组件

```vue
<template>
  <NuxtLoadingIndicator />
</template>
```

**2.** 添加回顶部组件
```vue
<template>
  <el-backtop />
</template>
```

**3.** 首页标题,描述,关键词 ico图标配置

```
head: {
    viewport: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
    title: '淳渔影视CMS-Nodejs快速搭建影视类网站',
    meta: [
        { name: 'keywords', content: '淳渔影视,最新电影，最新电视剧' },
        { name: 'description', content: '淳渔影视更新最快的影视网站之一，收集了全网最新高分电影,电视剧,综艺,动漫等热播剧目免费在线观看！' }
    ],
    link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
}
```

**4.** 全局标题

创建`titleRender`插件

```shell
touch plugins/titleRender.ts
```
```ts
export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  return {
    provide: {
      titleRender: (msg: string) => `${msg} - ${runtimeConfig.public.globalTitle}`
    }
  }
})

declare module '#app' {
  interface NuxtApp {
    $titleRender: string
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $titleRender(msg: string): string
  }
}
```
使用: 
```vue
<template>
  <span>{{ $titleRender(`最新电影在线观看`) }}</span>
</template>
```

**5.** 百度统计

创建`baidu`插件(.client只会在客户端加载)

```shell
touch plugins/baidu.client.ts
```

```ts
export default defineNuxtPlugin(() => {
  const hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?xxxxxx";
  const s = document.getElementsByTagName("script")[0];
  s.parentNode?.insertBefore(hm, s);
})

```


**6.** Css单独文件引入,不实用内联

```
experimental: {
  inlineSSRStyles: false,
}
```
