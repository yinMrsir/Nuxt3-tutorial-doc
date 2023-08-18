# 栏目页实现

Nuxt是根据pages/目录中创建的目录名和文件名生成路由。

## 创建栏目路由

```shell
mkdir -p pages/column/\[column\]

# 创建栏目页
touch pages/column/\[column\]/index.vue
```

上述操作后我们就已经创建了我们的栏目页路由，页面中我们可以通过route.params.column获取栏目的value值

```vue
<template>
  <div>{{ route.params.column }}</div>
</template>

<script setup>
const route = useRoute()
</script>
```

## 页面实现代码

栏目页渲染数据和首页类似，可参考[首页数据渲染](https://www.bilibili.com/video/BV1D8411X7nj/?vd_source=9dbe815ca79d8528e02be1a51583912a)

```vue
<template>
  <div>
    <div class="container">
      <!-- 用于 seo 标题 描述    -->
      <Head>
        <Title>最新{{ info.data.name }}在线观看</Title>
        <Meta name="description" :content="`最新最全的${info.data.name}在线观看尽在淳渔影视。`" />
      </Head>

      <el-row :gutter="20" class="mt-20" v-for="categoryItem in res.data">
        <el-col :sm="18">
          <div class="panel_hd between items-center">
            <div class="panel_hd__left">
              <h3 class="title items-center">
                <i class="icon-movie-box"></i>
                <a href="/">最新{{ categoryItem.name }}</a>
              </h3>
            </div>
            <div class="panel_hd__right items-center">
              <ul class="items-center">
                <li>
                  <nuxt-link :to="`/column/${route.params.column}/show?t=${categoryItem.name}`" class="items-center">
                    更多 <el-icon><ElIconArrowRight /></el-icon>
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="video-list">
            <el-row :gutter="20">
              <el-col :sm="4" :xs="8" v-for="item in categoryItem.rows">
                <div class="video-list__block">
                  <nuxt-link :to="`/column/${item.columnValue}/movie/${item.id}`" class="img-box">
                    <el-image lazy class="video-list__block__img" :src="item.poster" fit="cover" />
                    <span v-if="item.movieRate">{{ +item.movieRate.rate === 0 ? '暂无评分' : item.movieRate.rate.toFixed(1) }}</span>
                  </nuxt-link>
                  <div class="video-list__detail">
                    <h4 class="title text-overflow">{{ item.title }}</h4>
                    <p class="text-overflow">
                      <template v-for="actor in item.casts">
                        {{ actor.actor.name }}&nbsp;
                      </template>
                    </p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :sm="6" class="hidden-sm-and-down">
          <div class="panel_hd items-center">
            <h3 class="title items-center">
              <img src="../../../assets/images/icon_12.png" alt="">
              {{ categoryItem.name }}榜单
            </h3>
          </div>
          <ul class="col-pd">
            <li v-for="(item, index) in categoryItem.ranks">
              <nuxt-link :to="`/column/${item.columnValue}/movie/${item.id}`" class="between">
                <div>
                  <span class="badge">{{ index + 1 }}</span>
                  {{ item.title }}
                </div>
                <span class="text-muted">{{ +item.theEnd === 0 ? '未完结' : '已完结' }}</span>
              </nuxt-link>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const columnValue = route.params.column

const [{data: res}, { data: info }] = await Promise.all([
  // 获取当前栏目下的所有类型数据
  useServerRequest( `web/type/${columnValue}`),
  // 获取当前栏目的信息
  useServerRequest(`column?value=${columnValue}`)
])

// 如果未找到栏目数据就返回404页面
if (!info.value.data) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found+99',
    fatal: true
  })
}
</script>

```

## 优化导航栏

根据当前访问的栏目，设置选中状态。

```vue
<!-- component/AppHeader.vue -->
<template>
  <!--  ... -->
  <nav class="hidden-sm-and-down">
    <ul>
      <li :class="route.path === '/' ? 'active' : ''"><NuxtLink to="/">首页</NuxtLink></li>
      <!--  根据路由参数判断设置选中状态    -->
      <li v-for="item in navigation.data" :key="item.id" :class="route.params.column === item.value ? 'active' : ''">
        <nuxt-link :to="`/column/${item.value}`" v-if="+item.type === 1">{{ item.name }}</nuxt-link>
        <nuxt-link :to="item.value" target="_blank" v-if="+item.type === 2">{{item.name}}</nuxt-link>
      </li>
    </ul>
  </nav>
  <!--  ... -->
  <div class="mobile-nav hidden-sm-only hidden-sm-and-up">
    <ul>
      <!--  根据路由参数判断设置选中状态    -->
      <li v-for="item in navigation.data" :key="item.id" :class="route.params.column === item.value ? 'active' : ''">
        <nuxt-link :to="`/column/${item.value}`" v-if="+item.type === 1">{{ item.name }}</nuxt-link>
        <nuxt-link :to="item.value" target="_blank" v-if="+item.type === 2">{{item.name}}</nuxt-link>
      </li>
    </ul>
  </div>
</template>
```

