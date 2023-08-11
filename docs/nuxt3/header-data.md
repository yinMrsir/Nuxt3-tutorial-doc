# 头部和首页数据对接

在数据对接前我们要处理一个跨域的问题，因为我们是前后端分离的项目，很可能接口和访问域不在同一个。

我们可以利用Nuxt3集成的服务器引擎Nitro来进行代理转发

* [Nuxt3服务器引擎](https://nuxt.com.cn/docs/guide/concepts/server-engine)

* [Nitro](https://nitro.unjs.io/config)

代理转发配置：
```ts
export default defineNuxtConfig({
  nitro: {
    // 该配置用于服务端请求转发
    routeRules: {
      '/server/**': {
        proxy: 'http://cms.yinchunyu.com/server/**'
      }
    }
  }
})
```

配置通用BaseUrl:
```ts
// nuxt-config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseUrl: '/server/'
    }
  }
})
```

封装接口请求：

```shell
mkdir composables
touch composables/useServerRequest.ts
```

```ts
// composables/useServerRequest.ts
import { useFetch, UseFetchOptions } from "#app";
import { merge } from 'lodash'

export const useServerRequest = <T= unknown>(url: string, opts: UseFetchOptions<T, unknown>) => {
  const token = useCookie('token')
  const runtimeConfig = useRuntimeConfig()

  const defaultOptions: UseFetchOptions<unknown> = {
    baseURL: runtimeConfig.public.baseUrl,
    onRequest({ options }) {
      options.headers = (options.headers || {}) as { [key: string]: string }
      if (token.value) {
        options.headers.Authorization = 'Bearer ' + token.value
      }
    },
    onResponse({ response }) {
      if (+response._data.code !== 200) {
        ElMessage.error(response._data.msg)
      }
    },
    onResponseError({ response }) {
      ElMessage.error(response._data.data.msg)
    },
  }

  return useFetch<T>( url, merge(defaultOptions, opts) as any)
}
```

AppHeader中获取栏目数据

<CodeGroup>
  <CodeGroupItem title="Javascript" active>

```vue
<script setup>
// ...
// 请求获取栏目数据接口
// http://api.yinchunyu.com/swagger-ui#/焦点图管理/ColumnController_all
const { data: navigation } = await useServerRequest<{data: any}>('column/all', {
  query: { status: 0 }
})
// ...
</script>
```

  </CodeGroupItem>

  <CodeGroupItem title="Template">

```vue
<template>
  <!-- ... -->
  <nav class="hidden-sm-and-down">
    <ul>
      <li :class="route.path === '/' ? 'active' : ''"><NuxtLink to="/">首页</NuxtLink></li>
      <li v-for="item in navigation.data" :key="item.id">
        <nuxt-link :to="`/column/${item.value}`" v-if="+item.type === 1">{{ item.name }}</nuxt-link>
        <nuxt-link :to="item.value" target="_blank" v-if="+item.type === 2">{{item.name}}</nuxt-link>
      </li>
    </ul>
  </nav>
  <!-- ... -->
  <div class="mobile-nav hidden-sm-only hidden-sm-and-up">
    <ul>
      <li v-for="item in navigation.data" :key="item.id">
        <nuxt-link :to="`/column/${item.value}`" v-if="+item.type === 1">{{ item.name }}</nuxt-link>
        <nuxt-link :to="item.value" target="_blank" v-if="+item.type === 2">{{item.name}}</nuxt-link>
      </li>
    </ul>
  </div>
  <!-- ... -->
</template>
```
  </CodeGroupItem>
</CodeGroup>





