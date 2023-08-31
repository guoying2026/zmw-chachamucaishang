FROM node:20.5.0

ENV GIT_URL https://gitee.com/joytouwu/zmw-chachamucaishang.git
ENV GIT_BRANCH master
ENV NPM_REGISTRY https://registry.npmjs.com
ENV SITE_DOMAIN localhost
ENV WWWROOT /wwwroot
ENV IS_NODE_CLUSTER 0

RUN mkdir -p ${WWWROOT}

WORKDIR ${WWWROOT}

COPY . .

RUN apt install -y wget curl git \
  && wget --version \
  && curl --version \
  && git --version

RUN npm config set registry ${NPM_REGISTRY} \
  && npm uninstall @esbuild/win32-x64 \
  && npm i @esbuild/linux-x64 \
  && npm install \
  && npm run build
ADD docker/entrypoint.sh /entrypoint.sh
EXPOSE 3000
RUN chmod -R 777 ${WWWROOT}
RUN chmod +x /*.sh
ENTRYPOINT ["/entrypoint.sh"]