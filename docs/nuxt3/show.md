# 筛选页实现

## 创建路由

```shell
# 路由地址：/column/movie/show
touch pages/column/\[column\]/show.vue
```
## 筛选页代码
```vue
<template>
  <div class="container mt-20 show">
    <Head>
      <Title>{{ title }}{{ info.data.name }}</Title>
      <Meta name="description" :content="`最新最全的${title}${info.data.name}尽在淳渔影视。`" />
    </Head>

    <el-row :gutter="40">
      <el-col :span="18" :xs="24">
        <div class="panel_hd between items-center">
          <div class="panel_hd__left">
            <h3 class="title items-center">
              <el-icon><ElIconVideoCamera /></el-icon><a href="/">筛选</a>
            </h3>
          </div>
        </div>
        <el-form>
          <el-form-item label="按类型">
            <ul class="show__type-filter">
              <li :class="route.query.t === '' || route.query.t === undefined ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, t: '' } }">全部</nuxt-link>
              </li>
              <li v-for="(item, index) in genreList.data" :class="route.query.t === item.name ? 'active' : ''" :key="index">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, t: item.name } }">{{ item.name }}</nuxt-link>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="按地区">
            <ul class="show__type-filter">
              <li :class="route.query.c === '' || route.query.c === undefined ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, c: '' } }">全部</nuxt-link>
              </li>
              <li v-for="(item, index) in countryList.data" :class="+route.query.c === +item.id ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, c: item.id } }">{{ item.name }}</nuxt-link>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="按年份">
            <ul class="show__type-filter">
              <li :class="route.query.y === '' || route.query.y === undefined ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, y: '' } }">全部</nuxt-link>
              </li>
              <li v-for="(item, index) in yearList" :class="+route.query.y === item ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, y: item } }">{{ item }}</nuxt-link>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="按语言">
            <ul class="show__type-filter">
              <li :class="route.query.l === '' || route.query.l === undefined ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, l: '' } }">全部</nuxt-link>
              </li>
              <li v-for="(item, index) in languageList.data" :class="route.query.l === item.name ? 'active' : ''">
                <nuxt-link :to="{ path: route.path, query: { ...route.query, l: item.name } }">{{ item.name }}</nuxt-link>
              </li>
            </ul>
          </el-form-item>
        </el-form>
        <el-tabs v-model="orderBy" @tab-change="handleTabChange">
          <el-tab-pane label="按时间" name="createTime" :disabled="pending"></el-tab-pane>
          <el-tab-pane label="按人气" name="pv" :disabled="pending"></el-tab-pane>
          <el-tab-pane label="按评分" name="rate" :disabled="pending"></el-tab-pane>
        </el-tabs>
        <div class="video-list" v-loading="pending">
          <el-row :gutter="20" v-if="movieList.total !== 0">
            <el-col :sm="4" :xs="8" v-for="item in movieList.rows">
              <div class="video-list__block">
                <nuxt-link :to="`/column/${item.columnValue}/movie/${item.id}`" class="img-box">
                  <el-image class="video-list__block__img" :src="item.poster" fit="cover" />
                  <span v-if="item.movieRate">{{ +item.movieRate.rate === 0 ? '暂无评分' : item.movieRate.rate.toFixed(1) }}</span>
                </nuxt-link>
                <div class="video-list__detail">
                  <h4 class="title text-overflow">{{ item.title }}</h4>
                  <p class="text-overflow">
                    <template v-for="actor in item.casts">
                      {{ actor.actor.name }}
                    </template>
                  </p>
                </div>
              </div>
            </el-col>
          </el-row>
          <div class="pagination" v-if="movieList.total !== 0">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page="currentPage"
                :page-size="30"
                :pager-count="5"
                :total="movieList.total"
                @current-change="handleCurrentChange"
            />
          </div>
          <el-empty description="未找到相关数据" v-if="movieList.total === 0"></el-empty>
        </div>
      </el-col>
      <el-col :span="6" class="hidden-sm-and-down">
        <!--   周榜单     -->
        <div class="panel_hd items-center">
          <h3 class="title items-center">
            周榜单
          </h3>
        </div>
        <ul class="col-pd mb-20">
          <li v-for="(item, index) in weekList.rows">
            <nuxt-link :to="`/column/${item.columnValue}/movie/${item.id}`" class="between">
              <div>
                <span class="badge">{{ index + 1 }}</span>
                {{ item.title }}
              </div>
              <span class="text-muted">{{ +item.theEnd === 0 ? '未完结' : '已完结' }}</span>
            </nuxt-link>
          </li>
        </ul>
        <!--   月榜单     -->
        <div class="panel_hd items-center">
          <h3 class="title items-center">
            月榜单
          </h3>
        </div>
        <ul class="col-pd">
          <li v-for="(item, index) in monthList.rows">
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
</template>

<script setup lang="ts">
import {useServerRequest} from "~/composables/useServerRequest";

const route = useRoute()
const { query, params } = route
const currentPage = ref<number>((route.query.page && +route.query.page) || 1)
const orderBy = ref(route.query.orderBy || 'createTime')
const yearList = ref<number[]>([])
const y = new Date().getFullYear();
for (let i = 0 ; i <= 15; i++){
  yearList.value.push(y-i)
}

const title = computed(() => {
  let html = ''
  if (route.query.y) {
    html += route.query.y
    html += '_'
  }
  if (route.query.t) {
    html += route.query.t
    html += '_'
  }
  return html
})

const genreList = ref([])
const countryList = ref([])
const languageList = ref([])
const weekList = ref([])
const monthList = ref([])

const [
  { data: info },
  { data: movieList, pending, refresh }
] = await Promise.all([
  useServerRequest<any>(`column`, {
    query: {
      value: params.column
    }
  }),
  // 此处代码后面修改
  useServerRequest('movie/list', {
    query: {
      columnValue: params.column,
      genres: query.t,
      country: query.c,
      language: query.l,
      year: query.y,
      pageNum: query.page || 1,
      pageSize: 30,
      orderBy: orderBy.value
    }
  })
])

async function handleCurrentChange(page: number) {
  await navigateTo({
    path: route.path,
    query: {
      ...route.query,
      orderBy: orderBy.value,
      page
    }
  })
  if (process.client) {
    window.scrollTo(0, 0)
  }
}

async function handleTabChange() {
  // 此处代码后面修改
  refresh()
}

</script>

<style lang="scss" scoped>
.show {
  .title {
    .el-icon {
      margin-right: 15px;
    }
  }
  &__type-filter {
    li {
      display: inline-block;
      margin-right: 15px;
      padding: 0 10px;
      height: 24px;
      line-height: 24px;
      &.active {
        background: #FF9900;
        a {
          color: #ffffff;
        }
      }
    }
  }
  @media (max-width: 768px) {
    &__type-filter {
      white-space: nowrap;
      width: 300px;
      overflow-x: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  .pagination {
    padding: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>

```

我们会发现上面代码存在几个问题：

* 分页切换无效（url地址确改变了）
```ts
definePageMeta({
  key: route => route.fullPath
})
```

* 按时间/按人气/按评分切换无效

页面中我们使用`useAsyncData`来获取数据，先封装一个使用fetch请求的方法

```shell
# 创建文件
touch composables/useClientRequest.ts
```

```ts
type FetchType = typeof $fetch
type FetchOptions = Parameters<FetchType>[1]

// 判断是不是数组的方法在useServerRequest中也有，
// 所以我可以创建一个文件`mkdir utils && touch utils/tool.ts`放到其中
function isArray(str: unknown) {
  return Object.prototype.toString.call(str) === '[object Array]'
}

export const useClientRequest = <T= unknown>(url: string, opts?: FetchOptions) => {
  const userInfo = useCookie<{ token: string }>('userInfo')
  const runtimeConfig = useRuntimeConfig()

  const defaultOptions: FetchOptions = {
    baseURL: runtimeConfig.public.baseUrl,
    onRequest({ options }) {
      options.headers = (options.headers || {}) as { [key: string]: string }
      if (userInfo.value?.token) {
        options.headers.Authorization = 'Bearer ' + userInfo.value.token
      }
    },
    onResponse({ response }) {
      if (+response._data.statusCode === 200 && +response._data.code !== 200) {
        ElMessage.error(response._data.msg)
      }
    },
    onResponseError({ response }) {
      ElMessage.error(isArray(response._data.data.msg) ? response._data.data.msg[0] : response._data.data.msg)
    },
  }

  return $fetch<T>( url, {...defaultOptions, ...opts})
}
```

页面中代码修改：

```ts
const [
  { data: info },
  { data: movieList, pending, refresh }
] = await Promise.all([
  useServerRequest<any>(`column`, {
    query: {
      value: params.column
    }
  }),
  useAsyncData<any>('data', () => useClientRequest('movie/list', {
    query: {
      columnValue: params.column,
      genres: query.t,
      country: query.c,
      language: query.l,
      year: query.y,
      pageNum: query.page || 1,
      pageSize: 30,
      orderBy: orderBy.value
    }
  })),
])
```

**接下来处理筛选条件的数据和左侧的榜单数据相关代码如下：**

```ts
const [
  { data: genreList },
  { data: countryList },
  { data: languageList },
  { data: rank },
  { data: info },
  { data: movieList, pending, refresh }
] = await Promise.all([
  // 类型
  useServerRequest<IResData<{name: string; id: number}[]>>('basic/genre/all', {
    query: {
      columnValue: params.column
    }
  }),
  // 国家
  useServerRequest<IResData<{name: string; id: number}[]>>('basic/country/all'),
  // 语言
  useServerRequest<IResData<{name: string; id: number}[]>>('basic/language/all'),
  // 榜单
  useServerRequest<IResData<any>>('movie/leaderboard', {
    query: {
      columnValue: params.column,
      pageNum: query.page || 1,
      pageSize: 20,
    }
  }),
  // 栏目信息
  useServerRequest<any>(`column`, {
    query: {
      value: params.column
    }
  }),
  // 影视数据
  useAsyncData<any>('data', () => useClientRequest('movie/list', {
    query: {
      columnValue: params.column,
      genres: query.t,
      country: query.c,
      language: query.l,
      year: query.y,
      pageNum: query.page || 1,
      pageSize: 30,
      orderBy: orderBy.value
    }
  })),
])

export interface IResOptions {
  code: number
  msg: string
}

export interface IResPage<T> extends IResOptions {
  rows: T
  total: number
}

export interface IResData<T> extends IResOptions {
  data: T
}
```

替换`template`中的内容
```vue
<template>
  <!-- ...  -->
  <el-col :span="6" class="hidden-sm-and-down">
    <!--   周榜单     -->
    <div class="panel_hd items-center">
      <h3 class="title items-center">
        周榜单
      </h3>
    </div>
    <ul class="col-pd mb-20">
      <li v-for="(item, index) in rank.data.weekRank">
        <nuxt-link :to="`/column/${item.columnValue}/movie/${item.id}`" class="between">
          <div>
            <span class="badge">{{ index + 1 }}</span>
            {{ item.title }}
          </div>
          <span class="text-muted">{{ +item.theEnd === 0 ? '未完结' : '已完结' }}</span>
        </nuxt-link>
      </li>
    </ul>
    <!--   月榜单     -->
    <div class="panel_hd items-center">
      <h3 class="title items-center">
        月榜单
      </h3>
    </div>
    <ul class="col-pd">
      <li v-for="(item, index) in rank.data.mouthRank">
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
  <!--  ... -->
</template>
```

修复分页后切换类型后出现的bug:
```ts
async function handleCurrentChange(page: number) {
  // 此处重新获取route 
  const route = useRoute()
  await navigateTo({
    path: route.path,
    query: {
      ...route.query,
      orderBy: orderBy.value,
      page
    }
  })
  if (process.client) {
    window.scrollTo(0, 0)
  }
}
```
