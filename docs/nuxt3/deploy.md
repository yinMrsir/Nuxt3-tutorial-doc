# 打包部署到服务器

## 打包
```shell
yarn build
# or
npm run build
```
## 部署

### 安装pm2

:::tip
此步骤是在服务器上操作, 前提是安装好了Nodejs环境.
:::

```shell
npm install pm2@latest -g
# or
yarn global add pm2
```

### 配置pm2

1. 常见配置文件

```shell
touch pm2.config.js
```

2. 写入配置项

```js
module.exports = {
  apps: [
    {
      name: 'chunyu',
      port: '3005',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
```
* exec_mode:应用程序启动模式，这里设置的是cluster_mode（集群），默认是fork
* instances：启用多少个实例，可用于负载均衡。如果-i 0或者-i max，则根据当前机器核数确定实例数目。
* [pm2配置参数](https://pm2.keymetrics.io/docs/usage/pm2-api/)

4. 上传项目文件到服务器

3. 到项目目录启动
```shell
pm2 start pm2.config.js
```

### 使用域名访问

我们通过nginx配置, 将以下配置代码添加到nginx.conf中

```shell
server {
    listen 80;
    server_name 你的用户端访问域名;

    location / {
        proxy_pass http://服务器IP:3005/;
    }
}
```
