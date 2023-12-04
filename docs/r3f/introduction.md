# 介绍

React- Three-Fiber 是 Three.js 的 React 渲染器。

使用可重用、独立的组件以声明方式构建场景，这些组件对状态做出反应，易于交互并且可以参与 React 的生态系统。

```shell
npm install three @types/three @react-three/fiber
```

**它有限制吗？**

没有任何。在 Threejs 中工作的所有内容都可以在这里工作，无一例外。

**它比普通的 Threejs 慢吗？**

不会。没有任何开销。组件在 React 之外渲染。由于 React 的调度能力，它在规模上优于 Threejs。

**它能跟上 Threejs 频繁的功能更新吗？**

是的。它只是用 JSX 表达 Threejs，<mesh />动态转变成new THREE.Mesh(). 如果新的 Threejs 版本添加、删除或更改功能，您将立即可以使用它，而无需依赖于此库的更新。

# 它是什么样子的？

你可以访问此示例：[一个简易的3D资料卡片](https://www.yinchunyu.com/3d-card), [源码](https://gitee.com/yinMrsir/learning-code/tree/master/r3f/my-card)

# 开始之前

在急于进入这个领域之前，您需要会使用 React 和 Threejs。如果您对 React 不确定，请参阅官方[React 文档](https://react.dev/learn)，尤其是有关 hooks 的部分。至于 Threejs：

* 确保您对 [Threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) 有基本的掌握。

* 知道什么是场景、相机、网格、几何体、材质。

# 生态系统

`three-fiber`有一个充满活力且广泛的生态系统，充满了库、助手和抽象。

`@react-three/drei`– 有用的帮手，这本身就是一个生态系统

`@react-three/gltfjsx`– 将 GLTF 转换为 JSX 组件

`@react-three/postprocessing`– 后处理效果

`@react-three/test-renderer`– 用于节点中的单元测试

`@react-three/flex`– 用于反应三纤的 Flexbox

`@react-three/xr`– VR/AR 控制器和事件

`@react-three/csg`– 构造立体几何

`@react-three/rapier`– 使用 Rapier 的 3D 物理

`@react-three/cannon`– 使用 Cannon 的 3D 物理

`@react-three/p2`– 使用 P2 的 2D 物理

`@react-three/a11y`– 真正适合您的场景

`@react-three/gpu-pathtracer`– 真实的路径追踪

`create-r3f-app next`– nextjs 启动器

`lamina`– 基于图层的着色器材质

`zustand`– 基于通量的状态管理

`jotai`– 基于原子的状态管理

`valtio`– 基于代理的状态管理

`react-spring`– 基于弹簧物理的动画库

`framer-motion-3d`– Framer Motion，一个流行的动画库

`use-gesture`– 鼠标/触摸手势

`leva`– 在几秒钟内创建 GUI 控件

`maath`– 数学助手的厨房水槽

`miniplex`– ECS（实体管理系统）

`composer-suite`– 组合着色器、粒子、效果和游戏机制

## 相关资料

* https://docs.pmnd.rs/

* https://sbcode.net/react-three-fiber/use-ref/
