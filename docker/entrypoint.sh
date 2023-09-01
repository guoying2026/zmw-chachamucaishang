#!/bin/bash

if [ -z $WWWROOT ]; then
  $WWWROOT="/wwwroot"
fi

if [ ! -d $WWWROOT ]; then
  mkdir -p $WWWROOT
fi

cd $WWWROOT

/render-templates.sh /etc/nginx/sites-templates /etc/nginx/conf.d

# 启动程序
PORT=80 /usr/local/node-v20.5.0-linux-x64/bin/node /wwwroot/.output/server/index.mjs

if [ -z $DEBUG ]; then
  nginx -g 'daemon off;'
else
  nginx
  cd $WWWROOT/..
  exec $@
fi
