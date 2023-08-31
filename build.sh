#!/bin/bash

set -eu

docker build -f docker/Dockerfile -t ccmcs:latest .

dockerImageId=`docker images | grep ccmcs | awk '{print $3}'`

docker tag $dockerImageId registry.cn-beijing.aliyuncs.com/jryhd/zmw-chachamucaishang:latest

docker push registry.cn-beijing.aliyuncs.com/jryhd/zmw-chachamucaishang:latest
