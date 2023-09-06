# 细节优化和打包

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

**5.** 百度统计

**6.** Css单独文件引入,不实用内联

```
experimental: {
  inlineSSRStyles: false,
}
```

## 打包

```shell
yarn build
```
