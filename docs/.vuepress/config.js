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
        text: '页面开发（更新中...）',
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
