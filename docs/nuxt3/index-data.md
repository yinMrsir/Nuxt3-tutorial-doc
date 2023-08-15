# 首页数据数据获取

:::tip
[焦点图接口](http://api.yinchunyu.com/swagger-ui#/%E9%A6%96%E9%A1%B5%E7%84%A6%E7%82%B9%E5%9B%BE/BannerController_list)

[友情链接即接口](http://api.yinchunyu.com/swagger-ui#/%E5%8F%8B%E6%83%85%E9%93%BE%E6%8E%A5/LinkController_all)

[首页影视数据](http://api.yinchunyu.com/swagger-ui#/%E7%94%A8%E6%88%B7%E7%AB%AF%E6%95%B0%E6%8D%AE/IndexController_index)
:::

```vue
<template>
  <div class="container index">
    <div class="banner">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="item in bannerList.rows">
          <nuxt-link :to="item.url">
            <el-image :src="item.img" fit="cover" style="background: #f0f0f0; width: 100%" />
          </nuxt-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-row :gutter="20" class="mt-20" v-for="categoryItem in movieList.data">
      <el-col :sm="18">
        <div class="panel_hd between items-center">
          <div class="panel_hd__left">
            <h3 class="title items-center">
              <nuxt-link to="/">最新{{ categoryItem.name }}</nuxt-link>
            </h3>
          </div>
          <div class="panel_hd__right items-center">
            <ul class="items-center">
              <li class="hidden-sm-and-down" v-for="item in categoryItem.genres"><nuxt-link :to="`/column/${categoryItem.value}/${item.id}`">{{ item.name }}</nuxt-link></li>
              <li>
                <nuxt-link :to="`/column/${categoryItem.value}`" class="items-center">
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
                <nuxt-link :to="`/column/${item.columnValue}/${item.id}`" class="img-box">
                  <el-image lazy class="video-list__block__img" :src="item.poster" fit="cover" />
                  <span>暂无评分</span>
                </nuxt-link>
                <div class="video-list__detail">
                  <h4 class="title text-overflow">{{ item.title }}</h4>
                  <p class="text-overflow">
                    <span style="padding-right: 5px" v-for="user in item.casts">{{ user.actor.name }}</span>
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
            {{ categoryItem.name }}榜单
          </h3>
        </div>
        <ul class="col-pd">
          <li v-for="(item, index) in categoryItem.ranks">
            <nuxt-link :to="`/column/${item.columnValue}/${item.id}`" class="between">
              <div>
                <span class="badge">{{ index + 1 }}</span>
                {{ item.title }}
              </div>
              <span class="text-muted" v-if="+item.theEnd === 1">已完结</span>
              <span class="text-muted" v-else>更新至{{ item.episodeCount || 0 }}集</span>
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
      <a v-for="item in linkList.data" :href="item.url" target="_blank">{{ item.text }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useServerRequest} from "~/composables/useServerRequest";

const [{ data: bannerList }, { data: linkList }, { data: movieList }] = await Promise.all([
  // banner数据
  useServerRequest('basic/banner/list'),
  // 获取友情链接
  useServerRequest('basic/link/all'),
  // 影视数据
  useServerRequest('web/index')
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
