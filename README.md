# 心流永动科技 - 企业门户网站

## 项目简介

这是一个企业门户网站项目，包含前台展示网站和后台管理系统。

**技术栈：**
- 前端框架：React 18 + TypeScript + Vite
- 样式方案：Tailwind CSS v4
- 状态管理：Zustand + TanStack Query
- 数据库：Supabase PostgreSQL
- 托管平台：Cloudflare Pages

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env` 并填入 Supabase 配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. 初始化数据库

1. 登录 [Supabase Dashboard](https://supabase.com)
2. 创建新项目
3. 在 SQL Editor 中运行 `supabase/init.sql` 脚本

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 项目结构

```
xflow-portal/
├── src/
│   ├── components/       # 组件
│   │   ├── admin/        # 后台组件
│   │   ├── layout/       # 布局组件
│   │   └── ui/           # UI 组件
│   ├── pages/            # 页面
│   │   ├── admin/        # 后台页面
│   │   └── public/       # 前台页面
│   ├── hooks/            # 自定义 Hooks
│   ├── lib/              # 工具库
│   ├── stores/           # 状态管理
│   └── types/            # 类型定义
├── supabase/             # 数据库脚本
├── output/               # 设计文档
└── .super-dev/           # 任务规划
```

## 部署指南

### Cloudflare Pages 部署

1. **创建 Cloudflare 账户**（免费）
   - 访问 https://dash.cloudflare.com/sign-up

2. **连接 GitHub 仓库**
   - 在 Cloudflare Pages 中创建新项目
   - 连接 GitHub 仓库

3. **配置构建设置**
   - 构建命令：`npm run build`
   - 输出目录：`dist`

4. **配置环境变量**
   - 在 Pages 设置中添加环境变量：
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

5. **获取免费域名**
   - 项目会自动获得 `*.pages.dev` 二级域名
   - 可在 Pages 设置中自定义域名

## 后台管理

访问 `/admin/login` 进入后台管理系统。

**默认账户：**
- 用户名：admin
- 密码：admin123

## 免费资源额度

| 服务 | 免费额度 | 用途 |
|-----|---------|------|
| Cloudflare Pages | 无限站点、无限带宽 | 网站托管 |
| Cloudflare Workers | 10万请求/天 | API 服务 |
| Supabase | 500MB 存储、5GB 带宽/月 | 数据库 |

**总成本：¥0**

## 文档

- [研究报告](output/01-research.md)
- [产品需求文档](output/02-prd.md)
- [架构设计文档](output/03-architecture.md)
- [UI/UX 设计文档](output/04-uiux.md)

## License

MIT