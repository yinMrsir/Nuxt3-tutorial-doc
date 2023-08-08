# 首页编写

- 创建首页

```shell
# 删除app.vue
rm -rf app.vue

# 创建首页
mkdir pages && touch pages/index.vue
```

- 首页写入一下代码
```vue
<template>
  <div>首页</div>
</template>
```

**重启启动**后，将会正常的展示我们的头部、底部和首页中间区域的内容。