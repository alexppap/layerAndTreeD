import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';

export default defineConfigWithVueTs(
  // Vue 3 推荐规则（含 vue-eslint-parser，正确解析 .vue 中的 <script setup lang="ts">）
  pluginVue.configs['flat/recommended'],

  // Vue + TypeScript 官方集成（非类型检查版，更快）
  vueTsConfigs.recommended,

  // 忽略构建产物与生成目录
  {
    ignores: ['dist/**', 'coverage/**', 'node_modules/**', '*.d.ts'],
  },

  // 项目自定义规则
  {
    name: 'app/custom-rules',
    files: ['src/**/*.{ts,vue}'],
    rules: {
      // ── 格式 ──────────────────────────────────────────────
      semi: ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true }],

      // ── Vue 组件规范 ──────────────────────────────────────
      // 允许单词组件名（App、HomePage 等）
      'vue/multi-word-component-names': 'off',
      // 强制使用 <script setup>
      'vue/component-api-style': ['error', ['script-setup']],
      // template 在最前（符合 CLAUDE.md）
      'vue/block-order': ['error', { order: ['template', 'script', 'style'] }],

      // ── TypeScript 规范 ───────────────────────────────────
      // 显式 any 仅警告
      '@typescript-eslint/no-explicit-any': 'warn',
      // 未使用变量交由 TS 的 noUnusedLocals 处理，ESLint 层关闭避免重复报错
      '@typescript-eslint/no-unused-vars': 'off',

      // ── 代码质量（Airbnb 风格关键项）──────────────────────
      // 禁止 console（允许 warn/error）
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      // 优先 const
      'prefer-const': 'error',
      // 禁止 var
      'no-var': 'error',
      // 对象解构
      'prefer-destructuring': ['warn', { array: false, object: true }],
      // 箭头函数体简洁
      'arrow-body-style': ['error', 'as-needed'],
    },
  },
);
