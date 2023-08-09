---
lang: zh-CN
title: 首页编写 - Nuxt3实战教程
---

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

- 首页完整代码(**此处建议根据情况把焦点图,影视区块,友情链接单独拆分为组件引用**)
```vue
<template>
  <div class="container index">
    <div class="banner">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in bannerList">
          <nuxt-link :to="item.url">
            <el-image :src="item.img" fit="cover" style="background: #f0f0f0; width: 100%" />
          </nuxt-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-row :gutter="20" class="mt-20" v-for="categoryItem in movieList">
      <el-col :sm="18">
        <div class="panel_hd between items-center">
          <div class="panel_hd__left">
            <h3 class="title items-center">
              <nuxt-link to="/">最新电影</nuxt-link>
            </h3>
          </div>
          <div class="panel_hd__right items-center">
            <ul class="items-center">
              <li class="hidden-sm-and-down"><nuxt-link :to="`/c`">动作片</nuxt-link></li>
              <li class="hidden-sm-and-down"><nuxt-link :to="`/c`">科幻片</nuxt-link></li>
              <li>
                <nuxt-link :to="`/c-`" class="items-center">
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
                <nuxt-link :to="`/c-`" class="img-box">
                  <el-image lazy class="video-list__block__img" :src="'/default.jpg'" fit="cover" />
                  <span>暂无评分</span>
                </nuxt-link>
                <div class="video-list__detail">
                  <h4 class="title text-overflow">封神</h4>
                  <p class="text-overflow">
                    <template>张三</template>
                  </p>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="6" class="hidden-sm-and-down">
        <div class="panel_hd items-center">
          <h3 class="title items-center">
            电影榜单
          </h3>
        </div>
        <ul class="col-pd">
          <li v-for="(item, index) in categoryItem.ranks">
            <nuxt-link :to="`/c-`" class="between">
              <div>
                <span class="badge">{{ index + 1 }}</span>
                封神
              </div>
              <span class="text-muted">更新至1集</span>
            </nuxt-link>
          </li>
        </ul>
      </el-col>
    </el-row>
    <div class="friendly-link flex items-center mt-20">
      <el-icon><ElIconLink/></el-icon>
      友情链接
    </div>
    <div class="friendly-link__content">
      <a v-for="item in linkList" :href="item.url" target="_blank">{{ item.text }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
// banner数据
const bannerList = ref([{}])
// 影视数据
const movieList = ref([
  {
    rows: [{}],
    ranks: [{}]
  }
])
// 获取友情链接
const linkList = ref([
  { text: 'Nuxt3教程', url: 'http://www.yinchunyu.com' }
])

</script>

<style lang="scss">
.index {
  padding-top: 20px;

  .banner {
    .el-carousel__container {
      height: 380px;
    }

    .el-image {
      height: 380px;
    }

    @media (max-width: 768px){
      .el-carousel__container {
        height: 200px;
      }

      .el-image {
        height: 200px;
      }
    }
  }

  .friendly-link {
    border-bottom: #eee solid 1px;
    padding: 10px 0;
    font-size: 18px;
    > img {
      margin-right: 10px;
    }
    &__content {
      padding: 20px 0;
      a {
        padding-right: 15px;
      }
    }
  }
}

.demonstration {
  color: var(--el-text-color-secondary);
}

.col-pd {
  li {
    a {
      font-size: 14px;
      padding: 10px 0 10px;
      border-bottom: dotted 1px #eeeeee;

      .badge {
        display: inline-block;
        margin-right: 10px;
        width: 18px;
        height: 18px;
        text-align: center;
        line-height: 18px;
        border-radius: 2px;
        font-size: 12px;
        background-color: #eee;
        color: #333;
      }

      .text-muted {
        color: #999;
      }
    }

    &:nth-child(1) {
      .badge {
        background-color: #ff4a4a;
        color: #fff;
      }
    }

    &:nth-child(2) {
      .badge {
        background-color: #ff7701;
        color: #fff;
      }
    }

    &:nth-child(3) {
      .badge {
        background-color: #ffb400;
        color: #fff;
      }
    }
  }
}

.panel_hd {
  border-bottom: #eeeeee solid 1px;
  height: 46px;
  margin-bottom: 15px;
  .title {
    font-size: 18px;
    line-height: 24px;

    img {
      margin-right: 10px;
    }
  }
  &__right {
    li {
      position: relative;
      &::before {
        content: '';
        display: block;
        width: 1px;
        height: 10px;
        background: #eee;
        position: absolute;
        top: 50%;
        transform: translateY(-30%);
        right: 0;
      }
      &:last-child::before {
        display: none;
      }
      a {
        padding: 0 10px;
        color: #999;
        font-size: 14px;
      }
    }
  }
}

.video-list {
  &__block {
    padding: 10px 0;
    &__img {
      width: 100%;
      height: 218px;
    }
    .img-box {
      position: relative;
      height: 218px;
      display: block;
      span {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 30px;
        line-height: 30px;
        left: 0;
        display: inline-block;
        background-image: linear-gradient(transparent,rgba(0,0,0,.5));
        color: #fff;
        font-size: 12px;
        text-align: right;
        padding-right: 10px;
        box-sizing: border-box;
      }
    }
  }

  &__detail {
    .title {
      font-size: 14px;
      color: #333;
      padding-top: 10px;
    }

    p {
      min-height: 19px;
      font-size: 12px;
      margin-bottom: 0;
      margin-top: 5px;
      color: #999;
    }
  }
}

@media only screen and (max-width:991px){
  .video-list {
    &__block {
      &__img, .img-box {
        height: 170px;
      }
    }
  }
}
</style>
```

接下来访问`http://localhost:3000`将会完整的展示我们的首页效果。按F12选择手机模式查看你会发现，页面可以横向滚动，为了解决此问题，在Nuxt.config.ts中设置一下视口（viewport）以兼容移动端。

```ts
// Nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
    }
  },
})
```

到此，我们首页代码编写就已经完成，接下来我们开始数据联调对接。
