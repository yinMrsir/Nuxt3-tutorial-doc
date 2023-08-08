# 公共部分(头部、底部)编写

大多数组件是用户界面的可重用部分，如按钮和菜单。在Nuxt中，您可以在components/ 目录中创建这些组件，它们将在整个应用程序中自动可用，而无需显式地导入它们。

现在正式开始我们的页面开发阶段

- **第一步** 我们先创建头部和底部组件：

```shell
# 创建组件目录
mkdir components

# 创建公用的头部和底部组件
touch components/AppHeader.vue components/AppFooter.vue

# 创建公用布局页面
mkdir layouts && touch layouts/default.vue

```

- **第二步** 编写我们的布局，将以下代码写入对于文件：

<CodeGroup>
  <CodeGroupItem title="layouts/default.vue" active>

```vue
<template>
  <app-header />
  <slot />
  <app-footer />
</template>
```

  </CodeGroupItem>

  <CodeGroupItem title="components/AppHeader.vue" active>

```vue
<template>
  <header class="header">
    <div class="container between">
      <div class="header__left">
        <nuxt-link to="/" class="logo">淳渔影视</nuxt-link>
        <nav class="hidden-sm-and-down">
          <ul>
            <li :class="route.path === '/' ? 'active' : ''"><NuxtLink to="/">首页</NuxtLink></li>
            <li><nuxt-link :to="`/c`">电影</nuxt-link></li>
            <li><nuxt-link :to="`/c`">电视剧</nuxt-link></li>
          </ul>
        </nav>
      </div>
      <div class="header__right items-center">
        <el-input
            class="w-50 m-2 mr-20"
            placeholder="请输入搜索的影视名"
            :suffix-icon="ElIconSearch"
            v-model="searchValue"
            @keyup.enter.native="handleSearch"
        />
        <ClientOnly>
          <template v-if="token">
            <el-dropdown @command="handleCommand">
              <el-button circle :icon="ElIconUserFilled" color="#155FAA"></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="user">个人中心</el-dropdown-item>
                  <el-dropdown-item divided command="logOut">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <el-button circle :icon="ElIconUserFilled" @click="goLogin"></el-button>
          </template>
        </ClientOnly>
      </div>
    </div>
    <div class="mobile-nav hidden-sm-only hidden-sm-and-up">
      <ul>
        <li><nuxt-link :to="`/c`">电影</nuxt-link></li>
        <li><nuxt-link :to="`/c`">电视剧</nuxt-link></li>
      </ul>
    </div>
  </header>
  <div class="header__height__placeholder"></div>
</template>

<script setup lang="ts">
const route = useRoute()

const searchValue = ref<string>('')
const token = ref<string | undefined>(undefined)

function handleCommand(command: string) {
  switch (command) {
    case 'logOut':
      logOut()
      break;
    default:
      navigateTo('/user')
      break;
  }
}

function logOut() {}

function handleSearch() {
  navigateTo('/search?keyword=' + searchValue.value)
}
</script>


<style lang="scss">
.header {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 55px;
  background-color: #292838;

  &__left {
    display: flex;
    .logo {
      display: flex;
      width: 150px;
      height: 55px;
      line-height: 55px;
      font-size: 24px;
      color: #FF9900;
      font-weight: bold;
      background-position: 50% 50% !important;
      background-size: cover !important;
      overflow: hidden;
    }
    nav {
      ul {
        display: flex;
        li {
          a {
            display: inline-block;
            height: 55px;
            line-height: 55px;
            font-size: 15px;
            padding: 0 20px;
            color: #fff;
          }
          &.active {
            a {
              background-color: #155FAA;
              color: #fff;
            }
          }
        }
      }
    }
  }
  &__height__placeholder {
    height: 55px;
  }
}
</style>
```

  </CodeGroupItem>

<CodeGroupItem title="components/AppFooter.vue" active>

```vue
<template>
  <footer>
    Copyright {{ $dayjs().format('YYYY') }} 淳渔影视 Inc. All Rights Reserved.
  </footer>
</template>

<style scoped lang="scss">
footer {
  padding: 40px 0;
  text-align: center;
}
</style>
```

  </CodeGroupItem>

</CodeGroup>

一系列操作后你会发现什么都没有变化，还是显示之前的页面内容，别急，我们继续；