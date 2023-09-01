FROM nginx:1.19.10

ADD docker/sources.list /etc/apt/sources.list
ADD docker/node-v20.5.0-linux-x64.tar.gz /usr/local
ADD docker/render-templates.sh /render-templates.sh
ADD docker/substitute-env-vars.sh /substitute-env-vars.sh
ADD docker/sites-enabled/*tmpl    /etc/nginx/sites-templates/
ADD docker/install.sh    /install.sh

RUN mkdir -p /wwwroot/dist

ENV SITE_DOMAIN localhost
ENV WWWROOT /wwwroot
ENV PREWWWROOT /wwwroot
ENV URL_PATH ''
ENV TRACK_ENABLE false
ENV TRACK_HOST ''
ENV TRACK_PROJECT ''
ENV TRACK_STORE ''
ENV GIT_URL https://github.com/guoying2026/zmw-chachamucaishang.git
ENV GIT_BRANCH master

RUN chmod 777 /usr/local/node-v20.5.0-linux-x64/bin/*
RUN chmod 777 /usr/bin
RUN ln -s /usr/local/node-v20.5.0-linux-x64/bin/* /usr/bin
RUN apt-get update && apt-get install -y curl vim subversion wget && rm -rf /var/lib/apt/lists/*
RUN chmod +x /*.sh
#RUN /install.sh

RUN mkdir -p /etc/nginx/sites-templates
ADD docker/nginx.conf /etc/nginx/nginx.conf
RUN rm -f /etc/nginx/conf.d/default.conf

COPY . /wwwroot

RUN ["/bin/bash", "-c", "set -o pipefail && set -o pipefail && cd /wwwroot && npm config set registry https://mirrors.huaweicloud.com/repository/npm/ && npm install"]

RUN ["/bin/bash", "-c", "set -o pipefail && cd /wwwroot && npm run build"] 

EXPOSE 3000
EXPOSE 80
ADD docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /*.sh
ENTRYPOINT ["/entrypoint.sh"]
