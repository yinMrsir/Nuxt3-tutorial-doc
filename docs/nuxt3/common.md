# 公共部分提取和定义ts类型

## 工具函数

```shell
# 新建目录
mkdir utils
# 创建文件
touch utils/tools.ts
```

写入公用的函数

```ts
// 判断是否是数组
export function isArray(str: unknown) {
  return Object.prototype.toString.call(str) === '[object Array]'
}
```

通过import导入：

```ts
// composables/useClientRequest.ts, composables/useServerRequest.ts 
import { isArray } from "~/utils/tool";
```

## 分离公用模块

页面中榜单区块分离出组件
```shell
# 创建组件
touch components/Ranking.vue
```

组件代码：

```vue
<template>
  <div class="panel_hd items-center">
    <h3 class="title items-center">
      {{ title }}
    </h3>
  </div>
  <ul class="col-pd">
    <li v-for="(item, index) in list" :key="item.id">
      <nuxt-link :to="`/column/${item.columnValue}/movie/${item.id}`" class="between">
        <div>
          <span class="badge">{{ index + 1 }}</span>
          {{ item.title }}
        </div>
        <span class="text-muted">{{ processingState(item) }}</span>
      </nuxt-link>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  list: {
    type: Array,
    default: () => []
  }
})

function processingState(data: {
  currentSeason: number;
  columnValue: string;
  theEnd: string | number;
  currentEpisode: any;
}) {
  if (+data.theEnd === 1) {
    return '已完结'
  }
  return data.columnValue === 'tv' ? `更新至${data.currentEpisode || 0}集` : `更新至${data.currentSeason || 0}季`
}
</script>
```

使用

```vue
<template>
  <Ranking title="榜单" :list="[]" />
</template>
```


## 公用ts类型

```shell
mkdir types
touch types/global.d.ts
```

```ts
// global.d.ts
export {};

declare global {
  interface ResOptions<T> {
    code: number;
    msg: string;
    data: T;
    rows: T;
    total: number;
  }

  type ResPage<T> = Omit<ResOptions<T>, 'data'>

  type ResData<T> = Omit<ResOptions<T>, 'rows' | 'total'>
  
  interface ResBase {
    createTime: string;
    updateTime: string;
    createBy: string;
    updateBy: string;
    remark: string;
  }
}
```

## 其他页面ts类型定义

我们接口数据返回的数据复杂， 这里推荐一个工具把我们返回的接口数据进行转换：[JsonToAny](http://xiets.gitee.io/json-to-any-web/)

* 以首页为例
```shell
mkdir types/index
touch types/index/index.d.ts
```

通过工具我们转换生成接口类型：

```ts
export interface LinkItem extends ResBase {
  id: number;
  text: string;
  url: string;
}

export type BasicLinkAll = ResData<LinkItem[]>

export interface BannerItem extends ResBase {
  id: number;
  img: string;
  title: string;
  url: string;
  urlType: string;
}

export type BasicBannerList = ResPage<BannerItem[]>

export interface GenreItem {
  id: number;
  name: string;
}

export interface MoviePv {
  pv: number;
}

export interface RankItem {
  id: number;
  title: string;
  columnValue: string;
  episodeCount?: any;
  theEnd: number;
  moviePv: MoviePv;
}

export interface MovieItem extends Pick<ResBase, 'updateBy'| 'updateTime'>{
  id: number;
  title: string;
  poster: string;
  columnValue: string;
  casts?: any[];
  movieRate?: any;
}

export interface ColumnItem {
  name: string;
  type: string;
  value: string;
  genres: GenreItem[];
  ranks: RankItem[];
  rows: MovieItem[];
}

export type WebIndex = ResData<ColumnItem[]>
```
