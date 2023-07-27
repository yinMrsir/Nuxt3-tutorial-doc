import { defaultTheme } from 'vuepress'

module.exports = {
  theme: defaultTheme({
    title: 'VuePress',
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
            link: '/nuxt3-create-project',
            text: '创建一个新项目并运行起来'
          },
          {
            link: '/nuxt3-file-structure',
            text: '理解和配置Nuxt3的文件结构和配置文件'
          },
          {
            link: '/nuxt3-templates-and-layouts',
            text: '学习如何使用Nuxt3的模板和布局'
          },
        ]
      },
      {
        text: 'Nuxt3的核心功能',
        children: [
          {
            link: '/nuxt3-router',
            text: '使用Nuxt3的路由系统实现页面间的导航和传参'
          },
          {
            link: '/nuxt3-components',
            text: '学习如何创建和复用组件'
          },
          {
            link: '/nuxt3-state-management',
            text: '使用Nuxt3的状态管理工具管理应用的数据'
          },
          {
            link: '/nuxt3-async-data-and-ssr',
            text: '掌握Nuxt3的异步数据获取和服务器端渲染(SSR)'
          },
        ]
      },
      {
        text: '项目实战',
        children: [
          {
            link: '/project-analysis',
            text: '分析并设计一个具体的项目需求'
          },
          {
            link: '/project-setup',
            text: '搭建项目的基本结构和界面'
          },
          {
            link: '/project-feature-development',
            text: '开发功能模块，并实现与后端API的交互'
          },
          {
            link: '/project-testing-and-optimization',
            text: '进行项目测试和优化'
          },
          {
            link: '/project-deployment',
            text: '部署项目到服务器并进行上线'
          },
        ]
      }
    ]
  }),
}
