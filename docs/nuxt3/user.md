# 用户中心和中间件

我们先在`components`文件夹中创建一个`user`目录, 存在和用户中心相关的组件

```shell
# 创建目录
mkdir components/user
# 创建用户信息组件
touch components/user/UserInfoData.vue
# 创建收藏列表组件
touch components/user/CollectData.vue
```


<CodeGroup>
  <CodeGroupItem title="UserInfo.vue" active>

```vue
<template>
  <div class="bg-fff user-index__head flex">
    <img src="https://cms.yinchunyu.com/_nuxt/toux.f851fd9d.png" alt="">
    <div>
      {{ userData.data?.email }}
      <p class="grey">ID: {{ userData.data?.userId }}</p>
      <a class="lv lv1"></a>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useServerRequest } from "~/composables/useServerRequest";

  // 获取用户信息
  const { data: userData } = await useServerRequest<{ data: { email: string; userId: number } }>('web/user/info')
</script>

<style lang="scss">
  .user-index {
    .over-avatar {
      width: 160px;
      height: 160px;
      background: #666;
      border-radius: 50%;
      color: #FFFFFF;
      text-align: center;
      line-height: 160px;
      font-size: 60px;
      margin: 0 auto;
    }
    &__personal-name {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      padding: 10px 0;
    }
    &__head {
      padding: 20px;
      > img {
        width: 80px;
        margin-right: 20px;
      }
      .lv {
        background: url('https://cms.yinchunyu.com/_nuxt/jlt.54f87470.png') no-repeat 0 0;
        display: inline-block;
        width: 42px;
        height: 22px;
        vertical-align: middle;
        margin-top: 15px;
        &.lv1 {
          background-position: 0 -373px;
        }
      }
    }
    .el-card.is-always-shadow {
      box-shadow: none;
      border-radius: 0;
      border: 0;
    }
  }
  @media (max-width: 768px){
    .user-index {
      margin-top: -60px;
      &__head {
        margin: 0 -15px;
      }
    }
  }
</style>

```

  </CodeGroupItem>

  <CodeGroupItem title="CollectData.vue">

```vue
<template>
  <div>
    <ClientOnly>
      <el-empty description="您还未收藏视频噢~" v-if="movieList.length === 0" />
      <div class="video-list" v-else>
        <el-row :gutter="20">
          <el-col :sm="4" :xs="8" v-for="item in movieList">
            <div class="video-list__block">
              <nuxt-link :to="`/column/${item.movie.columnValue}/${item.movie.id}`">
                <el-image class="video-list__block__img" :src="item.movie.poster" fit="cover" />
              </nuxt-link>
              <div class="video-list__detail">
                <h4 class="title text-overflow">{{ item.movie.title }}</h4>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="pagination">
          <el-pagination
              background
              layout="prev, pager, next"
              :current-page="currentPage"
              :page-size="12"
              :pager-count="5"
              :total="total"
              @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
  import { useServerRequest } from "~/composables/useServerRequest";

  const movieList = ref<any[]>([])
  const currentPage = ref<number>(1)
  const total = ref(0)

  async function getList() {
    const { data: collectData, error } = await useServerRequest<ResPage<MovieItem[]>>('user-collect/findByPage', {
      query: {
        pageNum: currentPage.value,
        pageSize: 12
      }
    })
    if (!error.value && collectData.value?.code === 200) {
      movieList.value = collectData.value.rows
      total.value = collectData.value.total
    }
  }
  getList()

  function handleCurrentChange(page: number) {
    currentPage.value = page
    getList()
  }
</script>

<style scoped>
  .pagination {
    padding: 20px;
    display: flex;
    justify-content: center;
  }
</style>

```

  </CodeGroupItem>
</CodeGroup>

## 创建路由
```shell
mkdir pages/user
# 路由地址 /user
touch pages/user/index.vue
```

个人中心页面:

```vue
<template>
  <div class="container user-index">
    <Head>
      <Title>个人中心</Title>
      <Style type="text/css" children="body { background-color: #f7f7f7; }"></Style>
    </Head>
    <el-row :gutter="30" class="mt-20">
      <el-col :md="6" :xs="24">
        <UserInfoData />
        <el-card class="integral">
          <template #header>
            <div class="card-header">
              <div>
                金币
                <span>{{ goldData.data?.gold || 0 }}</span>
              </div>
              <el-button class="button" text size="small" @click="handleGoWalletLog">
                详情
                <el-icon><ElIconArrowRight /></el-icon>
              </el-button>
            </div>
          </template>
          <el-button type="primary" @click="handleBuy">购买</el-button>
          <el-button type="primary" @click="handleSign">{{ signData.data ? '已签到' : '签到领金币' }}</el-button>
        </el-card>
      </el-col>
      <el-col :md="18" :xs="24" class="bg-fff">
        <el-tabs v-model="activeName">
          <el-tab-pane label="我的收藏" name="collect">
            <collect-data/>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
  import CollectData from '@/components/user/CollectData.vue'
  import UserInfoData from "~/components/user/UserInfoData.vue";
  import { useServerRequest } from "~/composables/useServerRequest";
  import { useClientRequest } from "~/composables/useClientRequest";

  const activeName = ref<string>('collect')

  const [
    { data: signData, refresh },
    { data: goldData, refresh: refreshGold }
  ] = await Promise.all([
    // 获取用户是否签到
    useServerRequest<{ data: null | number }>('user-sign/getSign'),
    // 获取用户金币数量
    useServerRequest<{ data: { gold: number } }>('user-wallet/findGold')
  ])

  // 用户签到
  async function handleSign() {
    if (signData.value?.data) return;
    const { code, data } = await useClientRequest<{ code: number; msg: string; data: any }>('user-sign/sign')
    if (code === 200) {
      refresh();
      refreshGold()
      ElMessage({
        message: `签到成功, ${data.signReward}`,
        type: 'success'
      })
    }
  }

  function handleBuy() {
    ElMessage({
      message: '支付功能正在开发,敬请期待...',
      type: 'info'
    })
  }

  function handleGoWalletLog() {
    navigateTo({ path: '/user/wallet-log' })
  }
</script>

<style lang="scss" scoped>
  .user-index {
    .integral {
      margin: 10px 0;
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          color: #F66C25;
          font-weight: bold;
          font-size: 18px;
        }
      }
    }
  }
  @media (max-width: 768px){
    .user-index {
      .integral {
        margin: 10px -15px;
      }
    }
  }
</style>
```
**我们还需要处理一下 当未登录输入用户中心地址访问时应该去首页而不是直接进入**

1. 创建中间件

```shell
mkdir middleware
touch middleware/auth.ts
```
auth.ts
```ts
export default defineNuxtRouteMiddleware(() => {
  const token = useToken()
  if (!token?.value) {
    return navigateTo('/')
  }
})
```

2. 使用中间件
```vue
<script setup lang="ts">
  definePageMeta({
    middleware: ["auth"]
  })
</script>
```

**用户中心头部不显示导航栏**

AppHeader.vue
```vue
<template>
  <nav class="hidden-sm-and-down" v-if="route.path.indexOf('/user') === -1">
    <ul>
      <!--   ...   -->
    </ul>
  </nav>
  
  <div class="mobile-nav hidden-sm-only hidden-sm-and-up" v-if="route.path.indexOf('/user') === -1">
    <!--  ...  -->
  </div>
</template>
```



