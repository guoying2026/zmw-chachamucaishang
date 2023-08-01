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
.
├── README.md
├── app.vue  # 因为我们项目共用的项目头是一样的，所以就用app.vue。放所有页面共同的页眉页脚。
├── nuxt.config.ts
├── package-lock.json
├── package.json
├── components          # 用于存放可重用的组件
│   ├── Header.vue
│   └── Footer.vue
├── layouts             # 用于存放布局组件
│   └── default.vue     # 默认布局，可以包含 <Header /> 和 <Footer />
├── pages               # 用于存放应用的页面
│   ├── index.vue       # 对应网站的根 URL ("/")
│   ├── about.vue       # 对应 "/about" URL
│   └── contact.vue     # 对应 "/contact" URL
├── public
│   └── favicon.ico
├── server
│   └── tsconfig.json
└── tsconfig.json

```

在 Nuxt.js 中，layouts 文件夹和 App.vue 都可以用于定义应用程序的全局布局。但是，他们之间的主要区别在于如何处理不同的页面布局：

App.vue：如果你在 App.vue 文件中定义了全局页眉和页脚，那么这些元素将在所有页面上显示，无论页面是否定义了自己的布局。

layouts 文件夹：如果你在 layouts 文件夹中定义了全局页眉和页脚，那么这些元素将只在使用该布局的页面上显示。例如，如果你在 layouts/default.vue 文件中定义了全局页眉和页脚，那么这些元素将只在使用 default 布局的页面上显示。如果某个页面定义了自己的布局（例如，layouts/custom.vue），并且没有包含全局页眉和页脚，那么全局页眉和页脚将不会在该页面上显示。

总的来说，如果你希望全局页眉和页脚在所有页面上都显示，那么最好在 App.vue 中定义它们。如果你希望能够更灵活地控制全局元素在哪些页面上显示，那么最好在 layouts 文件夹中定义它们。

这两种方法都是合理的，选择哪种方法取决于你的具体需求和你的应用程序的布局需求。
