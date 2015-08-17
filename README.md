# Study `Nodejs` `Koa` `React` `Webpack`
--- 打造一个简单的进销存系统

[![Build Status](https://travis-ci.org/iamcc/study-koa-react-webpack-2.svg)](https://travis-ci.org/iamcc/study-koa-react-webpack-2)
[![Coverage Status](https://coveralls.io/repos/iamcc/study-koa-react-webpack-2/badge.svg?branch=master&service=github)](https://coveralls.io/github/iamcc/study-koa-react-webpack-2?branch=master)

## 搭建环境
### 工具
- [Sublime Text 3](http://www.sublimetext.com/3) - 代码编辑器
- [eslint](https://github.com/eslint/eslint) - 基于 `nodejs` 的代码检测工具
- [babel](https://github.com/babel/babel) - 基于 `nodejs` 的 `es6` 处理工具
- [babel-eslint](https://github.com/babel/babel-eslint) - `eslint` 组件
- [webpack](http://webpack.github.io/) - 前端构建工具
- [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html) - 前端构建工具，用于 `hot-reload`
- [react-hot-loader](https://github.com/gaearon/react-hot-loader) - `webpack` 组件，用户处理 `react` 的热编译
- `style-loader` `css-loader` `less-loader` - `webpack` 组件，用于处理样式文件
- [autoprefixer-loader](https://github.com/passy/autoprefixer-loader) - `webpack` 组件，为样式自动添加 `-webkit` 等前缀
- `url-loader` `file-loader` - `webpack` 组件，用于处理样式样式所引用的文件依赖
- `babel-loader` - `webpack` 组件，用于处理 `es6` 新语法
- [nodemon](https://github.com/remy/nodemon) - `nodejs` 开发工具，监测文件变动重启服务

### 后端
- [iojs](https://iojs.org/en/index.html) - `nodejs` 分支，更多的语法支持
- [koa](http://koajs.com/) - `nodejs` `web` 框架
- [koa-static](https://github.com/koajs/static) - `koa` 组件，处理静态文件，可用 `nginx` 代替
- [koa-body](https://github.com/dlau/koa-body) - `koa` 组件，处理 `http` `post` 传过来的数据
- [koa-router](https://github.com/alexmingoia/koa-router) - `koa` 组件，处理路由
- [koa-jwt](https://github.com/stiang/koa-jwt) - `koa` 组件，处理身份验证 [jwt](http://jwt.io/)
- [mongodb](http://www.mongodb.org) - nosql 数据库
- [mongoose](http://mongoosejs.com/) - `mongodb` `ODM` 框架

### 前端
- [react](http://facebook.github.io/react/) - `facebook` 开源前端模板工具
- [react-router](https://github.com/rackt/react-router) - `react` 路由组件
- [antd](http://ant.design/) - `阿里`开源的 `react` 组件
- `jquery` - `antd` 依赖 `jquery`
- [reflux](https://github.com/reflux/refluxjs) - `flux` 框架
- [superagent](https://github.com/visionmedia/superagent) - `ajax` 工具

### 测试
- [mocha](http://mochajs.org/) - 测试框架
- [should](https://github.com/shouldjs/should.js) - 断言框架
- [istanbul](https://github.com/gotwarlost/istanbul) - 代码覆盖率框架
- [supertest](https://github.com/visionmedia/supertest) - 测试http请求
- [muk](https://github.com/fent/node-muk) - 模拟方法
- [pedding](https://github.com/node-modules/pedding) - 辅助工具



# Mark
`Bigpipe`


## 实现功能
- 环境配置文件 `server/config.js`，根据环境(`dev` `prod` `test`)自动返回相应的配置
- 初始化管理员账户
- 登录功能
- 首页Layout
- 用户功能
- 测试功能，测试覆盖

## 目录结构
```
├── README.html
├── README.md
├── assets
│   └── index.html
├── client
│   ├── actions
│   │   ├── AuthAction.js
│   │   └── UserAction.js
│   ├── app.less
│   ├── components
│   │   ├── Admin.jsx
│   │   ├── Auth.jsx
│   │   └── Sidebar.jsx
│   ├── constants
│   ├── index.js
│   ├── pages
│   │   ├── App.jsx
│   │   ├── Login.jsx
│   │   ├── admin
│   │   │   ├── CreateUser.jsx
│   │   │   ├── Manage.jsx
│   │   │   ├── StockManagement.jsx
│   │   │   └── UserManagement.jsx
│   │   ├── order
│   │   │   └── Index.jsx
│   │   ├── stock
│   │   │   └── Index.jsx
│   │   ├── supplier
│   │   │   └── Index.jsx
│   │   └── user
│   │       └── ModifyPassword.jsx
│   ├── routes.jsx
│   ├── services
│   │   ├── AuthService.js
│   │   ├── UserService.js
│   │   ├── token.js
│   │   └── util.js
│   └── stores
│       └── AuthStore.js
├── index.js
├── package.json
├── server
│   ├── apis
│   │   ├── auth.js
│   │   ├── index.js
│   │   └── user.js
│   ├── config.js
│   ├── index.js
│   └── models
│       ├── init.js
│       ├── user.js
│       └── util.js
├── test
│   ├── client
│   └── server
│       ├── apis
│       │   ├── auth.test.js
│       │   └── user.test.js
│       ├── bootstrap.js
│       ├── index.test.js
│       └── models
│           └── init.test.js
└── webpack.config.js
```

## 使用
安装依赖
```
npm i
```

启动服务端web服务
```
npm start
```

启动前端构建工具
```
npm run dev
```

服务端代码测试
```
npm run test-server
```

服务端代码测试覆盖率
```
npm run cov-server
```

```
浏览器打开 http://localhost:8001 既可查看效果
```