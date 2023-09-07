# 视频详情-购买影视

添加查询用户是否购买影片

```vue
<script setup lang="ts">
  const token = useToken()
  const loginDialogVisible = useLoginDialogVisible()
  // 是否购买了影片
  const isUserBuy = ref(false)
  
  /** 查询用户是否购买影片 */
  getUserMovie()
  async function getUserMovie() {
    if (!token.value) {
      isUserBuy.value = false
    } else {
      const { data } = await useClientRequest<ResData<UserMovieBase>>(`user-movie`, {
        query: { movieId: detail.movieId }
      })
      isUserBuy.value = !!data
    }
  }
</script>
```

接下来处理一下用户点击支付按钮的操作, 如果用户未登录显示登录弹层

```
clickButton () {
    if (!token.value) {
        loginDialogVisible.value = true
    } else {
        player && buyMovie(player)
    }
}
```

监听一下用户登录情况, 用户登录后重新获取支付状态

```ts
watch(token, async () => {
  // 重新获取购买状态
  await getUserMovie()
  // 隐藏支付弹层
  payTipInstance?.hide()
  // 继续播放
  player?.play()
})
```
