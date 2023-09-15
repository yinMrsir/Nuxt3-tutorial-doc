# Docker安装redis

#### 1、拉取最新版的 Redis 镜像

```shell
docker pull redis:latest
```

#### 2、查看本地镜像
```shell
docker images
```

#### 3、运行容器
```shell
docker run -itd --name redis-test -p 6379:6379 redis
```
参数说明：

> -p 6379:6379：映射容器服务的 6379 端口到宿主机的 6379 端口。外部可以直接通过宿主机ip:6379 访问到 Redis 的服务。

执行以上步骤redis就可以正常使用了, 为了安全性, 云服务建议执行以下步骤

## 安全
:::danger
Redis 报 EXECABORT Transaction discarded because of previous errors 错误及解决方案
:::
```shell
# 查看运行的redis，并记下它的 CONTAINER ID
docker ps 

# 通过容器id，进入redis
docker exec -it CONTAINER_ID /bin/bash

# 运行redis客户端
redis-cli

# 修改配置中的 bind 参数为
config set bind 127.0.0.1

# 保护模式更改为yes
config set protected-mode yes

# 改为带密码访问
config set requirepass password

# 关闭6379端口的访问
```

## 相关链接
[我是如何利用Redis黑进你的系统的](https://www.toutiao.com/article/6396969912178311682/)
