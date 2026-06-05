<template>
  <aside class="docs-toc">
    <div class="toc-progress">
      <div
        class="toc-progress-bar"
        :style="{ width: `${progress}%` }"
      />
    </div>
    <p class="toc-title">
      本页目录
    </p>
    <nav
      v-if="items.length"
      class="toc-nav"
    >
      <a
        v-for="item in items"
        :key="item.id"
        :href="`#${item.id}`"
        class="toc-link"
        :class="[`level-${item.level}`, { active: item.id === activeId }]"
        @click.prevent="scrollTo(item.id)"
      >
        {{ item.text }}
      </a>
    </nav>
    <p
      v-else
      class="toc-empty"
    >
      暂无目录
    </p>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, nextTick } from 'vue';
import type { TocItem } from '../../composables/useMarkdown';

const props = defineProps<{
  items: TocItem[];
  container: HTMLElement | null;
}>();

const activeId = ref('');
const progress = ref(0);

let observer: IntersectionObserver | null = null;

const scrollTo = (id: string): void => {
  const root = props.container;
  const target = root?.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
  if (root && target) {
    root.scrollTo({ top: target.offsetTop - 16, behavior: 'smooth' });
  }
};

const updateProgress = (): void => {
  const root = props.container;
  if (!root) {
    return;
  }
  const max = root.scrollHeight - root.clientHeight;
  progress.value = max > 0 ? Math.min(100, (root.scrollTop / max) * 100) : 0;
};

const setupObserver = (): void => {
  observer?.disconnect();
  const root = props.container;
  if (!root || props.items.length === 0) {
    return;
  }
  observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry) => {
          activeId.value = entry.target.id;
        });
    },
    { root, rootMargin: '0px 0px -70% 0px', threshold: 0 },
  );
  props.items.forEach((item) => {
    const target = root.querySelector(`#${CSS.escape(item.id)}`);
    if (target) {
      observer?.observe(target);
    }
  });
};

watch(
  () => [props.items, props.container] as const,
  () => {
    const root = props.container;
    if (root) {
      root.removeEventListener('scroll', updateProgress);
      root.addEventListener('scroll', updateProgress, { passive: true });
    }
    nextTick(() => {
      setupObserver();
      updateProgress();
    });
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  observer?.disconnect();
  props.container?.removeEventListener('scroll', updateProgress);
});
</script>

<style scoped>
.docs-toc {
  width: 240px;
  flex-shrink: 0;
  padding: 2.5rem 1.25rem;
  overflow-y: auto;
}

.toc-progress {
  height: 3px;
  background: var(--color-border);
  border-radius: 2px;
  margin-bottom: 1.25rem;
  overflow: hidden;
}

.toc-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--color-accent), var(--color-accent-secondary));
  transition: width 0.15s ease-out;
}

.toc-title {
  font-family: var(--font-display);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-tertiary);
  margin-bottom: 0.75rem;
}

.toc-nav {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  border-left: 1px solid var(--color-border);
}

.toc-link {
  display: block;
  padding: 0.35rem 0.85rem;
  margin-left: -1px;
  border-left: 2px solid transparent;
  color: var(--color-text-tertiary);
  text-decoration: none;
  font-size: 0.875rem;
  line-height: 1.4;
  transition: all 0.2s ease;
}

.toc-link.level-3 {
  padding-left: 1.6rem;
  font-size: 0.825rem;
}

.toc-link:hover {
  color: var(--color-text-secondary);
}

.toc-link.active {
  color: var(--color-accent);
  border-left-color: var(--color-accent);
}

.toc-empty {
  color: var(--color-text-tertiary);
  font-size: 0.875rem;
}

@media (max-width: 1200px) {
  .docs-toc {
    display: none;
  }
}
</style>
