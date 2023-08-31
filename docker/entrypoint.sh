#!/bin/bash

if [ -z $WWWROOT ]; then
  $WWWROOT="/wwwroot"
fi

if [ ! -d $WWWROOT ]; then
  mkdir -p $WWWROOT
fi

cd $WWWROOT

if [ $(($IS_NODE_CLUSTER)) == 1 ]; then
  # 启动集群模式
  NITRO_PRESET=node_cluster PORT=$PORT node $WWWROOT/.output/server/index.mjs
else
  # 启动程序
  PORT=$PORT node $WWWROOT/.output/server/index.mjs
fi
