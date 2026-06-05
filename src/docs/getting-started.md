# 快速入门

欢迎使用 **LayerAndTreeD** —— 融合 OpenLayers 地理信息系统与 Three.js 三维渲染的工业数字孪生可视化平台。本指南帮助你在几分钟内跑通第一个场景。

## 平台概览

LayerAndTreeD 将地理空间数据与三维场景统一在同一套渲染管线中，核心能力包括：

- 多源地图底图加载与图层管理
- glTF / FBX 三维模型加载与 PBR 渲染
- 实时数据接入与可视化
- 地图与三维场景的联动交互

## 环境要求

- Node.js 18+ 或 Bun 1.0+
- 支持 WebGL 2.0 的现代浏览器
- 推荐使用 Chrome / Edge 最新版

## 第一个场景

下面的代码创建一个最小可运行的可视化容器：

```ts
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
```

挂载完成后，你就可以在 `App.vue` 中组合地图与三维组件了。

### 下一步

- 阅读 [安装指南](/docs/installation) 了解依赖配置
- 阅读 [OpenLayers 集成](/docs/openlayers) 学习地图能力
- 阅读 [Three.js 集成](/docs/threejs) 学习三维渲染
