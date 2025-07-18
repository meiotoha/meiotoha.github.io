<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { TocItem } from '@/utils/toc'
import TocItemComponent from './TocItemComponent.vue'
import { inject } from 'vue'
import type Strings from '@/i18n/strings'

const syslang: Strings = inject('syslang')!

defineProps<{
  tocItems: TocItem[]
}>()

const activeId = ref('')
const isCollapsed = ref(false)

const toggleCollapsed = () => {
  isCollapsed.value = !isCollapsed.value
}

const handleItemClick = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleScroll = () => {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
  let currentId = ''

  for (const heading of headings) {
    const rect = heading.getBoundingClientRect()
    if (rect.top <= 100) {
      currentId = heading.id
    }
  }

  activeId.value = currentId
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="toc-container">
    <div class="toc-header">
      <div class="toc-header-content" @click="toggleCollapsed">
        <h3>{{ syslang.TOC_MENU }}</h3>
        <button class="collapse-btn" :class="{ collapsed: isCollapsed }">
          <span class="collapse-icon">{{ isCollapsed ? '▶' : '▼' }}</span>
        </button>
      </div>
    </div>
    <nav v-show="!isCollapsed" class="toc-nav">
      <ul class="toc-list">
        <TocItemComponent
          v-for="item in tocItems"
          :key="item.id"
          :item="item"
          :active-id="activeId"
          @item-click="handleItemClick"
        />
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.toc-container {
  position: relative;
  max-height: 100%;
  overflow-y: auto;
  background: #2d2d2d;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #404040;
  transition: all 0.3s ease;
}

.toc-header {
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #404040;
}

.toc-header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.toc-header-content:hover {
  opacity: 0.8;
}

.collapse-btn {
  background: none;
  border: none;
  color: #b0b0b0;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.collapse-btn:hover {
  background: #404040;
  color: #60a5fa;
}

.collapse-icon {
  font-size: 12px;
  font-weight: bold;
  transition: transform 0.2s ease;
}

.toc-header h3 {
  color: #f0f0f0;
  font-size: 1em;
  margin: 0;
  font-weight: 600;
}

.toc-nav {
  max-height: calc(100vh - 160px);
  overflow-y: auto;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* 自定义滚动条 */
.toc-nav::-webkit-scrollbar {
  width: 4px;
}

.toc-nav::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.toc-nav::-webkit-scrollbar-thumb {
  background: #404040;
  border-radius: 2px;
}

.toc-nav::-webkit-scrollbar-thumb:hover {
  background: #60a5fa;
}
</style>
