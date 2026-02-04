# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个基于 Vue 3 + TypeScript + Vite 的前端项目，使用 Element Plus 作为 UI 组件库。

## 常用命令

```bash
# 启动开发服务器
bun run dev

# 构建生产版本（包含类型检查）
bun run build

# 预览构建结果
bun run preview
```

## 技术栈

- **Vue 3** - 使用 `<script setup>` 语法
- **TypeScript** - 严格模式，启用了 `noUnusedLocals` 和 `noUnusedParameters`
- **Vite** - 构建工具
- **Element Plus** - UI 组件库

## 项目结构

```
src/
├── main.ts          # 应用入口
├── App.vue          # 根组件
├── components/      # 组件目录
└── assets/          # 静态资源
```

## 🚀 最佳实践

### 性能优化
- **使用 `v-memo` 优化列表渲染**
- **图表组件使用 `shallowRef` 避免深度响应**
- **大型数据使用 `markRaw` 标记**

### 错误处理
- **API 调用统一错误处理**
- **组件边界错误处理**
- **异步操作使用try-catch**

### 代码复用
- **提取公共逻辑到组合式函数**
- **封装通用组件到 `components/` 目录**
- **工具函数放置在 `utils/` 目录**

## 📚 开发指南

### 核心原则
- **始终使用 Vue 3 组合式 API 的 `<script setup lang="ts">` 语法**
- **模板部分应放置在 Vue 文件的顶部**
- **对函数使用具名导出**
- **变量使用驼峰命名法**
- **遵循 ESLint 配置的代码风格**
- **组件应按功能组织在子目录中**
- **js代码符合前端Airbnb规范**
- **如果你不确定，请明确告知我，而不是编造**

### ts代码规范
- **forEach,find,map等方法时不要使用单个字母作为参数名，使用item,index等**
- **默认使用分号**
- **尽量遵循函数式编程原则，少使用push,splice等会改变原数组的方法，使用map,filter等返回新数组的方法**
- **TypeScript 配置要求严格类型检查**
## 代码规范
