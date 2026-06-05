<template>
  <div class="docs-page">
    <header class="docs-header">
      <button
        class="sidebar-toggle"
        type="button"
        aria-label="切换目录"
        @click="sidebarOpen = !sidebarOpen"
      >
        ☰
      </button>
      <RouterLink
        to="/"
        class="docs-logo"
      >
        <span class="logo-icon">◈</span>
        <span class="logo-text">LayerAndTree<span class="logo-accent">D</span></span>
      </RouterLink>
      <span class="header-divider" />
      <span class="header-title">文档中心</span>
    </header>

    <div class="docs-body">
      <DocsSidebar
        :groups="docGroups"
        :active="currentSection"
        :open="sidebarOpen"
        @navigate="sidebarOpen = false"
      />

      <div
        v-if="sidebarOpen"
        class="sidebar-mask"
        @click="sidebarOpen = false"
      />

      <main
        ref="mainRef"
        class="docs-main"
      >
        <DocsContent
          v-if="exists"
          :html="html"
          :title="currentTitle"
        />
        <div
          v-else
          class="docs-empty"
        >
          <p class="empty-title">
            文档不存在
          </p>
          <RouterLink
            :to="`/docs/${defaultSection}`"
            class="empty-link"
          >
            返回快速入门
          </RouterLink>
        </div>
      </main>

      <DocsToc
        :items="toc"
        :container="mainRef"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import DocsSidebar from './DocsSidebar.vue';
import DocsContent from './DocsContent.vue';
import DocsToc from './DocsToc.vue';
import { docGroups, defaultSection, findDoc } from '../../docs/config';
import { useMarkdown } from '../../composables/useMarkdown';

const route = useRoute();
const sidebarOpen = ref(false);
const mainRef = ref<HTMLElement | null>(null);

const currentSection = computed(() => {
  const param = route.params.section;
  const section = Array.isArray(param) ? param[0] : param;
  return section || defaultSection;
});

const currentTitle = computed(() => findDoc(currentSection.value)?.title ?? '未找到');

const { html, toc, exists } = useMarkdown(currentSection);
</script>

<style scoped>
.docs-page {
  min-height: 100vh;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  display: flex;
  flex-direction: column;
}

.docs-header {
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 1.5rem;
  background: rgba(10, 15, 25, 0.9);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 60;
}

.sidebar-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--color-text-primary);
  font-size: 1.25rem;
  cursor: pointer;
}

.docs-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--color-text-primary);
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.1rem;
}

.logo-icon {
  color: var(--color-accent);
  font-size: 1.3rem;
}

.logo-accent {
  color: var(--color-accent);
}

.header-divider {
  width: 1px;
  height: 20px;
  background: var(--color-border-light);
}

.header-title {
  font-family: var(--font-display);
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  color: var(--color-text-secondary);
}

.docs-body {
  flex: 1;
  display: flex;
  min-height: 0;
  height: calc(100vh - 56px);
}

.docs-main {
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.sidebar-mask {
  display: none;
}

.docs-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
}

.empty-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-text-secondary);
}

.empty-link {
  color: var(--color-accent);
  text-decoration: none;
  border: 1px solid rgba(0, 212, 255, 0.4);
  border-radius: 8px;
  padding: 0.5rem 1.25rem;
}

.empty-link:hover {
  background: rgba(0, 212, 255, 0.1);
}

@media (max-width: 960px) {
  .sidebar-toggle {
    display: block;
  }

  .sidebar-mask {
    display: block;
    position: fixed;
    top: 56px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>
