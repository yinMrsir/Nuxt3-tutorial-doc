# 公共部分(layout)

大多数组件是用户界面的可重用部分，如按钮和菜单。在Nuxt中，您可以在components/ 目录中创建这些组件，它们将在整个应用程序中自动可用，而无需显式地导入它们。

- 现在正式开始我们的页面开发阶段，**第一步** 我们先创建头部和底部：

```shell
# 创建组件目录
mkdir components

# 创建公用的头部和底部组件
touch components/AppHeader.vue components/AppFooter.vue
```