# 安装

此处我们使用vite来创建我们的应用，更多其他方式可以访问[官网](https://docs.pmnd.rs/react-three-fiber/getting-started/installation#vite.js)

```shell
# Create app
npm create vite my-app

# Select react as framework

# Install dependencies
cd my-app
npm install
npm install three @react-three/fiber @react-three/drei

# Start development server
npm run dev
```

## 初始化项目
**第一步**：修改src/App.tsx
```tsx
function App() {
  return (
    <>
      threejs
    </>
  )
}
export default App
```
**第二步**：删除App.css
```shell
rm src/App.css
```

**第三步**: 修改index.css
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
```
第四步：打开[http://localhost:5173](http://localhost:5173), 页面正常显示threejs。

如何你对一些语法格式有要求，你也可以设置eslint规则：
```js
module.exports = {
  rules: {
    // ...
    'array-bracket-spacing': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'quotes': ['error','single']
  },
}
```

接下来就可以进入我们的3D旅程啦～
