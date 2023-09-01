#!/bin/bash

set -eu

# 检测是否有node安装包，没有则自动下载
if [ ! -f "docker/node-v20.5.0-linux-x64.tar.gz" ]; then
    wget -O docker/node-v20.5.0-linux-x64.tar.gz https://nodejs.org/dist/v20.5.0/node-v20.5.0-linux-x64.tar.gz
fi

docker build -f docker/Dockerfile -t ccmcs:latest .

dockerImageId=`docker images | grep ccmcs | awk '{print $3}'`

docker tag $dockerImageId registry.cn-beijing.aliyuncs.com/jryhd/zmw-pingfen:latest

docker push registry.cn-beijing.aliyuncs.com/jryhd/zmw-pingfen:latest
