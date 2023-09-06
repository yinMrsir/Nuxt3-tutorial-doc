# 常见问题汇总

- **问题 一** 同一个页面跳转，参数发生了变化却页面数据未更新

```vue
<script setup>
definePageMeta({
    key: route => route.fullPath
})
</script>
```

- **问题 二** 页面中提交表单出现重复提交的问题，并且每次修改表单中的值都会发送请求，可以尝试将`useFetch`替换成`$fetch`解决此问题！

```vue
<script setup>
const data = await $fetch('/api/submit', {
  method: 'post',
  body: form
})
</script> 
```

**问题 三** nuxt3里面可以使用像vue一样的路由机制吗?

1. 创建: `app/router.options.ts`

2. 写入以下代码:
```ts
import type { RouterConfig } from '@nuxt/schema'
export default <RouterConfig> {
    routes: (_routes) => [
        {
            name: 'home',
            path: '/',
            component: () => import('~/pages/index.vue')
        }
    ],
}
```
