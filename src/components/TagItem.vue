<template>
  <div class="tag-item" :class="variantClass" @click="handleTagClick(tag.name)">
    <span class="tag-name">{{ tag.name }}</span>
    <span v-if="variant === 'sidebar'" class="tag-count sidebar-count">{{ tag.count }}</span>
    <span v-else-if="variant !== 'link' && variant !== 'home-card'" class="tag-count"
      >({{ tag.count }})</span
    >
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TagInfo } from '@/types/article'
import { tagDictionary } from '@/router/fileRouters'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Props {
  tag: TagInfo
  variant?: 'default' | 'link' | 'sidebar' | 'home-card'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
})

const variantClass = computed(() => {
  return `tag-${props.variant}`
})

const handleTagClick = (tagName: string) => {
  // find the tag key by name
  const tagKey = Object.keys(tagDictionary).find((key) => tagDictionary[key].name === tagName)
  if (tagKey) {
    router.push(`/tag/${tagKey}`)
  }
}
</script>
<style scoped>
.tag-item {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: #2d2d2d;
  border: 1px solid #404040;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
  color: #e0e0e0;
}

.tag-item:hover {
  background: #1e3a8a;
  border-color: #60a5fa;
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(96, 165, 250, 0.3);
}

/* 链接变体样式 */
.tag-item.tag-link {
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 2px 4px;
  color: #60a5fa;
  text-decoration: none;
}

.tag-item.tag-link:hover {
  background: transparent;
  border: none;
  transform: none;
  box-shadow: none;
  color: #93c5fd;
  text-decoration: underline;
}

.tag-item.tag-link .tag-name {
  color: #60a5fa;
  font-weight: 500;
}

.tag-item.tag-link:hover .tag-name {
  color: #93c5fd;
}

/* 侧边栏变体样式 */
.tag-item.tag-sidebar {
  justify-content: space-between;
  padding: 8px 12px;
  background: #3a3a3a;
  border: 1px solid #4a4a4a;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
}

.tag-item.tag-sidebar:hover {
  background: #1e3a8a;
  border-color: #60a5fa;
  transform: translateX(2px);
  box-shadow: none;
}

.tag-item.tag-sidebar .tag-name {
  font-size: 14px;
  color: #e0e0e0;
  font-weight: 500;
}

.tag-item.tag-sidebar .sidebar-count {
  font-size: 12px;
  color: #b0b0b0;
  background: #4a4a4a;
  padding: 2px 6px;
  border-radius: 4px;
  min-width: 20px;
  text-align: center;
  margin-left: 0;
}

.tag-item.tag-sidebar:hover .sidebar-count {
  background: #60a5fa;
  color: #1a1a1a;
}

/* 首页卡片变体样式 */
.tag-item.tag-home-card {
  padding: 2px 10px;
  background: #23272f;
  border: 1px solid #333;
  border-radius: 14px;
  font-size: 13px;
  color: #64b5f6;
  margin: 0 6px 6px 0;
  box-shadow: 0 1px 4px rgba(100, 181, 246, 0.08);
}

.tag-item.tag-home-card:hover {
  background: #2a3440;
  color: #90caf9;
  border-color: #444;
}

.tag-item.tag-home-card .tag-name {
  color: #64b5f6;
  font-size: 13px;
  font-weight: 500;
}

.tag-name {
  font-weight: 500;
}

.tag-count {
  margin-left: 4px;
  font-size: 0.85em;
  color: #b0b0b0;
}

@media (max-width: 768px) {
  .tag-item {
    padding: 4px 8px;
    font-size: 0.9em;
  }

  .tag-item.tag-link {
    padding: 2px 4px;
  }
}
</style>
