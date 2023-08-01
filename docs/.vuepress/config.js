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
            link: '/nuxt3/csr-ssr-ssg',
            text: '什么是 SPA, CSR, SSR, SSG？',
          }
        ]
      },
      {
        text: 'Nuxt3入门',
        children: [
          {
            link: '/nuxt3/introduction',
            text: 'Nuxt3框架的背景和特点'
          },
          {
            link: '/nuxt3/installation',
            text: '下载和安装Nuxt3'
          },
          {
            link: '/nuxt3/element-plus',
            text: '安装和使用Element Plus组件库'
          },
          {
            link: '/nuxt3/internationalization',
            text: '国际化'
          },
        ]
      },
    ]
  }),
}
