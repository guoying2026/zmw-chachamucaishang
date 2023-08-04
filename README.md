# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## 项目目录结构

```
├── README.md               # 说明项目的功能、安装步骤、使用方法等信息。
├── app.vue                 # 这是你的主Vue组件，所有其他的Vue组件都会在这个文件中被引用和渲染。因此可以放所有页面共用的东西。
├── assets                  # 存放编译过程中需要用到的未编译的静态资源，如SASS、LESS、JavaScript。
├── components              # 存放Vue组件，这些组件可以在你的Vue页面和布局中被引用。
├── layouts                 # 存放你的应用的布局模板。
├── middleware              # 存放应用的中间件。
├── nuxt.config.ts          # 配置你的Nuxt.js应用。
├── package-lock.json       # 详细记录了安装的每个包的具体版本。
├── package.json            # 列出了项目需要的包。
├── pages                   # 存放应用的视图和路由。Nuxt.js框架根据这个目录下的所有.vue文件自动生成应用的路由配置。
│   └── index.vue                 # 对应网站的根 URL ("/")
│   ├── about.vue                 # 对应 "/about" URL
│   └── contact.vue               # 对应 "/contact" URL
├── public                  # 这个目录用来存放应用的静态文件，这些文件不会被Nuxt.js调用webpack进行构建编译，服务器启动的时候，该目录下的文件会映射至应用的根路径/下。
│   └── favicon.ico
├── server                  # 这个目录存放的是服务端的文件，api文件夹就是你存放后端API接口的地方，tsconfig.json是TypeScript的配置文件。
│   ├── api
│   └── tsconfig.json
├── tests                   # 这个目录用来存放测试相关的代码和文件。
├── tsconfig.json           # 这个是TypeScript的配置文件，用于定义TypeScript编译环境和规则。
└── types                   # 这个目录一般用于存放项目中用到的TypeScript的类型声明文件。

```

在 Nuxt.js 中，layouts 文件夹和 App.vue 都可以用于定义应用程序的全局布局。但是，他们之间的主要区别在于如何处理不同的页面布局：

App.vue：如果你在 App.vue 文件中定义了全局页眉和页脚，那么这些元素将在所有页面上显示，无论页面是否定义了自己的布局。

layouts 文件夹：如果你在 layouts 文件夹中定义了全局页眉和页脚，那么这些元素将只在使用该布局的页面上显示。例如，如果你在 layouts/default.vue 文件中定义了全局页眉和页脚，那么这些元素将只在使用 default 布局的页面上显示。如果某个页面定义了自己的布局（例如，layouts/custom.vue），并且没有包含全局页眉和页脚，那么全局页眉和页脚将不会在该页面上显示。

总的来说，如果你希望全局页眉和页脚在所有页面上都显示，那么最好在 App.vue 中定义它们。如果你希望能够更灵活地控制全局元素在哪些页面上显示，那么最好在 layouts 文件夹中定义它们。

这两种方法都是合理的，选择哪种方法取决于你的具体需求和你的应用程序的布局需求。
