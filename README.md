

# SimulationExpress

#### 介绍

SimulationExpress 是一个用 Node.js 原生 HTTP 模块实现的 Express.js 模拟框架。它提供了类似 Express 的路由处理和中间件机制，旨在帮助理解 Express 框架的核心原理。

#### 软件架构

```
SimulationExpress
├── src/
│   ├── index.js              # 入口文件，导出 createApplication 函数
│   ├── appliction.js         # Application 类，处理路由和服务器启动
│   └── router/
│       ├── index.js         Mapping
│       # 导出 Router ├── router.js         # Router 类，处理单个路由的派发
│       └── routerMapping.js # RouterMapping 类，管理所有路由映射
└── test/
    └── index.js              # 测试示例
```

**核心组件：**

- **Application 类**：主应用类，负责注册路由和启动 HTTP 服务器
- **Router 类**：处理单个路由的匹配和请求派发
- **RouterMapping 类**：管理所有路由映射，支持 RESTful 参数和查询参数

#### 安装教程

1. 确保已安装 Node.js (v14+)
2. 克隆或下载本仓库
3. 安装依赖：
   ```bash
   pnpm install
   ```

#### 使用说明

```javascript
const { createApplication } = require('./src/index.js');

const app = createApplication();

// 注册 GET 路由
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

// 注册 RESTful 路由
app.get('/user/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

// 启动服务器
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

**支持的路由方法：**

- `GET`
- `POST`
- `PUT`
- `DELETE`
- `PATCH`

**功能特性：**

- 路由匹配和派发
- RESTful 路径参数支持 (如 `/user/:id`)
- 查询参数解析
- 中间件机制

#### 参与贡献

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request

#### 许可证

MIT License