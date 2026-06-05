<template>
  <aside
    class="docs-sidebar"
    :class="{ open }"
  >
    <nav class="sidebar-nav">
      <div
        v-for="group in groups"
        :key="group.label"
        class="nav-group"
      >
        <p class="group-label">
          {{ group.label }}
        </p>
        <RouterLink
          v-for="item in group.items"
          :key="item.section"
          :to="`/docs/${item.section}`"
          class="nav-item"
          :class="{ active: item.section === active }"
          @click="emit('navigate')"
        >
          {{ item.title }}
        </RouterLink>
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { DocGroup } from '../../docs/config';

defineProps<{
  groups: DocGroup[];
  active: string;
  open: boolean;
}>();

const emit = defineEmits<{
  navigate: [];
}>();
</script>

<style scoped>
.docs-sidebar {
  width: 260px;
  flex-shrink: 0;
  border-right: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
  overflow-y: auto;
  padding: 1.5rem 1rem;
}

.nav-group {
  margin-bottom: 1.75rem;
}

.group-label {
  font-family: var(--font-display);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-tertiary);
  padding: 0 0.75rem;
  margin-bottom: 0.5rem;
}

.nav-item {
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  color: var(--color-text-secondary);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border-left: 2px solid transparent;
}

.nav-item:hover {
  color: var(--color-text-primary);
  background: rgba(0, 212, 255, 0.06);
}

.nav-item.active {
  color: var(--color-accent);
  background: rgba(0, 212, 255, 0.1);
  border-left-color: var(--color-accent);
}

@media (max-width: 960px) {
  .docs-sidebar {
    position: fixed;
    top: 56px;
    left: 0;
    bottom: 0;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .docs-sidebar.open {
    transform: translateX(0);
  }
}
</style>
