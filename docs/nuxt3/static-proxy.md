# 静态文件代理

下面是一个静态视频地址和一个图片地址:

```vue
<template>
  <div>
    <img src="http://api.yinchunyu.com/upload/2023-08-28/1693209164735-622305634-1861693209095_.pic.jpg" alt="">
  </div>
</template>
```

我们之前在`Nuxt3.config.ts`中配置代理, 按正常情况下下面的代码页可以正常访问

```vue
<template>
  <div>
    <img src="/server/upload/2023-08-28/1693209164735-622305634-1861693209095_.pic.jpg" alt="">
  </div>
</template>
```

可是确和我们想要的结果不一样.

我们配置的代理最终是由`h3`这个库来代理的

**方法一(不推荐)** 我们找到`node_modules/h3/dist/index.mjs`这个文件中的:

```ts
if (response._data !== void 0) {
  return response._data;
}
// 替换成
if (response._data !== undefined) {
  if (response._data && response._data.arrayBuffer) {
    const data = new Uint8Array(await response._data.arrayBuffer());
    return event.node.res.end(data);
  }
  return response._data;
}
```

** 方法二 ** 安装最新`h3`
```shell
yarn add h3
```

** 方法三 通过`nitro`: devProxy 配置代理:
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    devProxy: {
      '/server': {
        target: 'http://api.yinchunyu.com',
        changeOrigin: true
      },
    }
  }
});
```
