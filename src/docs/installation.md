# 安装指南

本页介绍如何在本地搭建 LayerAndTreeD 的开发环境。

## 安装依赖

推荐使用 Bun 作为包管理器：

```bash
bun install
```

也可以使用 npm 或 pnpm：

```bash
npm install
```

## 启动开发服务器

```bash
bun run dev
```

浏览器访问 `http://localhost:5173` 即可看到首页。

## 构建生产版本

构建命令会先执行类型检查再打包：

```bash
bun run build
```

### 预览构建结果

```bash
bun run preview
```

## 核心依赖说明

| 依赖 | 用途 |
| --- | --- |
| `vue` | 视图框架 |
| `ol` | OpenLayers 地图引擎 |
| `three` | 三维渲染引擎 |
| `element-plus` | UI 组件库 |

## 常见问题

如遇到依赖安装失败，请确认 Node 版本不低于 18，并清理缓存后重试。更多问题见 [常见问题](/docs/faq)。
