<template>
  <article class="docs-content">
    <h1 class="content-title">
      {{ title }}
    </h1>
    <!-- eslint-disable vue/no-v-html -- 内容来自仓库内受控的本地 markdown，构建期解析，无用户输入 -->
    <div
      ref="bodyRef"
      class="markdown-body"
      v-html="html"
    />
    <!-- eslint-enable vue/no-v-html -->
  </article>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted } from 'vue';
import 'highlight.js/styles/atom-one-dark.css';

const props = defineProps<{
  html: string;
  title: string;
}>();

const bodyRef = ref<HTMLElement | null>(null);

const enhanceCodeBlocks = (): void => {
  const root = bodyRef.value;
  if (!root) {
    return;
  }
  const blocks = Array.from(root.querySelectorAll<HTMLPreElement>('pre'));
  blocks.forEach((pre) => {
    if (pre.querySelector('.copy-btn')) {
      return;
    }
    const button = document.createElement('button');
    button.className = 'copy-btn';
    button.type = 'button';
    button.textContent = '复制';
    button.addEventListener('click', () => {
      const code = pre.querySelector('code')?.textContent ?? '';
      navigator.clipboard.writeText(code).then(() => {
        button.textContent = '已复制';
        window.setTimeout(() => {
          button.textContent = '复制';
        }, 1500);
      });
    });
    pre.appendChild(button);
  });
};

watch(
  () => props.html,
  () => {
    nextTick(enhanceCodeBlocks);
  },
);

onMounted(() => {
  nextTick(enhanceCodeBlocks);
});
</script>

<style scoped>
.docs-content {
  max-width: 820px;
  margin: 0 auto;
  padding: 2.5rem 3rem 5rem;
}

.content-title {
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, var(--color-accent), var(--color-accent-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.markdown-body {
  color: var(--color-text-secondary);
  line-height: 1.8;
  font-size: 1rem;
}

.markdown-body :deep(h2) {
  font-family: var(--font-display);
  font-size: 1.6rem;
  color: var(--color-text-primary);
  margin: 2.5rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
  scroll-margin-top: 1rem;
}

.markdown-body :deep(h3) {
  font-family: var(--font-display);
  font-size: 1.2rem;
  color: var(--color-text-primary);
  margin: 2rem 0 0.75rem;
  scroll-margin-top: 1rem;
}

.markdown-body :deep(p) {
  margin: 0.85rem 0;
}

.markdown-body :deep(a) {
  color: var(--color-accent);
  text-decoration: none;
}

.markdown-body :deep(a:hover) {
  text-decoration: underline;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  padding-left: 1.5rem;
  margin: 0.85rem 0;
}

.markdown-body :deep(li) {
  margin: 0.35rem 0;
}

.markdown-body :deep(strong) {
  color: var(--color-text-primary);
  font-weight: 600;
}

.markdown-body :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.875em;
  background: var(--color-bg-tertiary);
  color: var(--color-accent);
  padding: 0.15em 0.4em;
  border-radius: 4px;
}

.markdown-body :deep(pre) {
  position: relative;
  margin: 1.25rem 0;
  padding: 1.25rem 1.25rem;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: #0d1117;
  overflow-x: auto;
}

.markdown-body :deep(pre code) {
  background: transparent;
  color: inherit;
  padding: 0;
  font-size: 0.875rem;
  line-height: 1.6;
}

.markdown-body :deep(.copy-btn) {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  padding: 0.25rem 0.65rem;
  font-size: 0.75rem;
  font-family: var(--font-body);
  color: var(--color-text-secondary);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--color-border-light);
  border-radius: 6px;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
}

.markdown-body :deep(pre:hover .copy-btn) {
  opacity: 1;
}

.markdown-body :deep(.copy-btn:hover) {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.markdown-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.25rem 0;
  font-size: 0.95rem;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  border: 1px solid var(--color-border);
  padding: 0.6rem 0.9rem;
  text-align: left;
}

.markdown-body :deep(th) {
  background: var(--color-bg-tertiary);
  color: var(--color-text-primary);
  font-family: var(--font-display);
  font-weight: 600;
}

@media (max-width: 720px) {
  .docs-content {
    padding: 1.5rem 1.25rem 4rem;
  }

  .content-title {
    font-size: 1.75rem;
  }
}
</style>
