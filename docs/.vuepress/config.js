import { defaultTheme } from 'vuepress'

module.exports = {
  theme: defaultTheme({
    logo: 'https://nuxt.com.cn/assets/design-kit/logo/full-logo-green-dark.svg',
    logoDark: 'https://nuxt.com.cn/assets/design-kit/logo/full-logo-green-light.svg',
    // 默认主题配置
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: 'Nuxt3教程',
        link: '/nuxt3/introduction',
      },
      {
        text: '生态系统',
        children: [
          {
            text: 'Redis',
            link: '/other/redis'
          }
        ]
      },
      {
        text: '淳渔CMS',
        link: 'http://cms.yinchunyu.com',
      },
    ],
    sidebar: [
      {
        text: '学前准备',
        children: [
          {
            link: '/nuxt3',
            text: '介绍',
          },
          {
            link: '/nuxt3/csr-ssr-ssg',
            text: '什么是 SPA, CSR, SSR, SSG？',
          }
        ]
      },
      {
        text: 'Nuxt3安装',
        children: [
          {
            link: '/nuxt3/introduction',
            text: 'Nuxt3框架的背景和特点'
          },
          {
            link: '/nuxt3/installation',
            text: '下载和安装Nuxt3'
          },
        ]
      },
      {
        text: '使用模块及插件',
        children: [
          {
            link: '/nuxt3/element-plus',
            text: '安装和使用Element Plus组件库'
          },
          {
            link: '/nuxt3/internationalization',
            text: '国际化'
          },
          {
            link: '/nuxt3/dayjs',
            text: '使用DayJS'
          },
        ]
      },
      {
        text: '页面开发',
        children: [
          {
            link: '/nuxt3/sass',
            text: '安装css扩展语言-Sass'
          },
          {
            link: '/nuxt3/main-css',
            text: '基础样式编写'
          },
          {
            link: '/nuxt3/layout',
            text: '公共部分(头部、底部)编写'
          },
          {
            link: '/nuxt3/create-index',
            text: '首页编写'
          },
          {
            link: '/nuxt3/header-data',
            text: '数据请求封装及导航栏数据获取'
          },
          {
            link: '/nuxt3/index-data',
            text: '首页数据获取'
          },
          {
            link: '/nuxt3/column',
            text: '栏目页实现'
          },
          {
            link: '/nuxt3/show',
            text: '筛选页实现'
          },
          {
            link: '/nuxt3/common',
            text: '公共部分提取和定义ts类型'
          },
          {
            link: '/nuxt3/movie',
            text: '影视详情'
          },
          {
            link: '/nuxt3/static-proxy',
            text: '静态文件代理'
          },
          {
            text: '视频详情开发',
            link: '/nuxt3/video'
          },
          {
            text: '登录/注册',
            link: '/nuxt3/login'
          },
          {
            text: '影视详情-收藏和评分',
            link: '/nuxt3/movie-more'
          },
          {
            text: '视频详情-购买影视',
            link: '/nuxt3/video-buy'
          },
          {
            text: '用户中心和中间件',
            link: '/nuxt3/user'
          },
          {
            text: '金币记录页',
            link: '/nuxt3/wallet-log'
          }
        ]
      },
      {
        text: '打包部署',
        children: [
          {
            text: '细节优化',
            link: '/nuxt3/optimize'
          },
          {
            text: '打包部署到服务器',
            link: '/nuxt3/deploy'
          }
        ]
      },
      {
        text: '常见问题汇总',
        link: '/nuxt3/question'
      },
    ]
  }),
  head: [
    [
      'script',
      {},
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?9edadaa49ae4e9c979c6724865c04b05";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode?.insertBefore(hm, s);
      })()`
    ]
  ]
}
