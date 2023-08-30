#!/bin/bash

echo "正在检测环境变量..."

if [ -z $GIT_URL ]; then
  $GIT_URL="https://gitee.com/joytouwu/zmw-chachamucaishang.git"
fi

if [ -z $GIT_BRANCH ]; then
  $GIT_BRANCH="master"
fi

if [ ! -z $NPM_REGISTRY ]; then
  $NPM_REGISTRY="https://registry.npmjs.com"
fi

if [ -z $WWWROOT ]; then
  $WWWROOT="/wwwroot"
fi

if [ ! -d $WWWROOT ]; then
  mkdir -p $WWWROOT
fi

if [ ! "$(ls -A $WWWROOT)" ]; then
  echo "正在克隆仓库..."
  git clone $GIT_URL $WWWROOT
fi

cd $WWWROOT

git restore .

echo "正在拉取更新..."

git pull --force origin $GIT_BRANCH

# 设置npm镜像
npm config set registry $NPM_REGISTRY

echo "正在安装依赖..."

# 安装esbuild
npm i @esbuild/linux-x64

# 安装package.json所列出的库
npm install

echo "正在编译..."
# 部署
npm run build

# 修改文件权限
chmod -R 777 ./

echo "正在启动程序..."

if [ $(($IS_NODE_CLUSTER)) == 1 ]; then
  # 启动集群模式
  echo "启动集群模式"
  NITRO_PRESET=node_cluster node $WWWROOT/.output/server/index.mjs
else
  # 启动程序
  node $WWWROOT/.output/server/index.mjs
fi

echo "完成!"