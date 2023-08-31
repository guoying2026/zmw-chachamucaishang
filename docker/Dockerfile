FROM node:20.5.0

ENV GIT_URL https://github.com/guoying2026/zmw-chachamucaishang.git
ENV GIT_BRANCH master
ENV NPM_REGISTRY https://registry.npmjs.com
ENV SITE_DOMAIN localhost
ENV WWWROOT /wwwroot
ENV IS_NODE_CLUSTER 0
ENV PORT 3000

RUN mkdir -p ${WWWROOT}

WORKDIR ${WWWROOT}

# COPY . .

RUN apt install -y wget curl git \
  && wget --version \
  && curl --version \
  && git --version

RUN if [ ! "$(ls -A $WWWROOT)" ]; then git clone ${GIT_URL} ${WWWROOT}; fi \
  && git restore . \
  && git pull --force origin ${GIT_BRANCH} \
  && npm config set registry ${NPM_REGISTRY} \
  && npm uninstall @esbuild/win32-x64 \
  && npm i @esbuild/linux-x64 \
  && npm install \
  && npm run build
ADD docker/entrypoint.sh /entrypoint.sh
EXPOSE ${PORT}
RUN chmod -R 777 ${WWWROOT}
RUN chmod +x /*.sh
ENTRYPOINT ["/entrypoint.sh"]