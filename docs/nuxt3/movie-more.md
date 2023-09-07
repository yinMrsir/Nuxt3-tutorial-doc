# 影视详情-收藏和评分

## 用户收藏
```vue
<template>
  <el-button :loading="collectLoading" :icon="isCollect ? ElIconStarFilled : ElIconStar" @click="handleCollect">
    {{ isCollect ? '已收藏' : '收藏' }}
  </el-button>
</template>
<script setup lang="ts">
  import { FetchOptions, useClientRequest } from "~/composables/useClientRequest";
  
  const token = useToken()
  const loginDialogVisible = useLoginDialogVisible()
  // 是否收藏
  const isCollect = ref<boolean>(false)
  // 收藏动作Loading
  const collectLoading = ref<boolean>(false)
  
  /** 获取用户收藏状态 */
  getUserCollect()
  async function getUserCollect() {
    if (!token.value) {
      isCollect.value = false
    } else {
      const { data } = await useClientRequest<ResData<UserMovieBase>>('user-collect/find', {
        query: { movieId: id }
      })
      isCollect.value = !!data
    }
  }

  /** 收藏 */
  async function handleCollect() {
    if (!token.value) {
      loginDialogVisible.value = true
    } else {
      const requestUrl: string = !isCollect.value ? '/user-collect' : `/user-collect/cancel?movieId=${id}`
      const requestOpts: FetchOptions = !isCollect.value ? {
        body: { movieId: id },
        method: 'POST'
      } : {}
      collectLoading.value = true
      try {
        let { code } = await useClientRequest<Pick<ResOptions<unknown>, 'code' | 'msg'>>(requestUrl, requestOpts)
        if (code === 200) {
          isCollect.value = !isCollect.value
        }
      } finally {
        collectLoading.value = false
      }
    }
  }

</script>
```

## 评分

```vue
<template>
  <ClientOnly>
    <el-popover v-if="!isUserRate" placement="right" trigger="click">
      <template #reference>
        <el-button :icon="ElIconEdit">评分</el-button>
      </template>
      <el-rate allow-half v-model="rate" @change="onRatechange"/>
    </el-popover>
  </ClientOnly>
</template>
<script lang="ts" setup>
  // 当前影视用户是否有评分记录
  const isUserRate = ref<boolean>(false)
  // 评分组件的分值
  const rate = ref<number>()
  
  /** 获取用户评分状态 */
  getUserRate()
  async function getUserRate() {
    if (!token.value) {
      isUserRate.value = false
    } else {
      const { data } = await useClientRequest<ResData<UserRate>>('user-rate', {
        query: { movieId: id },
      })
      isUserRate.value = !!data
    }
  }

  /** 设置评分 */
  async function onRatechange(value: number) {
    if (!value) return
    if (!token.value) {
      loginDialogVisible.value = true
      rate.value = 0
    } else {
      const { code } = await useClientRequest<Pick<ResOptions<unknown>, 'code'>>('user-rate', {
        method: 'post',
        body: { movieId: id, rate: rate.value }
      })
      if (code === 200) {
        // 重新获取影视数据
        await refresh()
        // 用户是否评分修改为true
        isUserRate.value = true
      }
    }
  }
</script>
```

## ts类型
```ts
export type UserMovieBase = { movieId: number; userId: number } | null

export type UserRate = { rate: number } & NonNullable<UserMovieBase> | null
```

这块交互处理完成后, 我们还要做一个事, 就是当我们用户登录或者退出后我们需要重新获取收藏和评分的状态

```ts
/** 登录状态发生改变 重新获取收藏和评分状态 */
watch(token, () => {
  getUserCollect()
  getUserRate()
})
```
