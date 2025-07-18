<script setup lang="ts">
import type { TocItem } from '@/utils/toc'

interface Props {
  item: TocItem
  activeId: string
}

defineProps<Props>()

defineEmits<{
  'item-click': [id: string]
}>()
</script>

<template>
  <li class="toc-item">
    <a
      :href="`#${item.id}`"
      :class="['toc-link', `toc-level-${item.level}`, { 'toc-active': activeId === item.id }]"
      @click.prevent="$emit('item-click', item.id)"
    >
      {{ item.title }}
    </a>
    <ul v-if="item.children && item.children.length > 0" class="toc-children">
      <TocItemComponent
        v-for="child in item.children"
        :key="child.id"
        :item="child"
        :active-id="activeId"
        @item-click="$emit('item-click', $event)"
      />
    </ul>
  </li>
</template>

<style scoped>
.toc-item {
  margin: 0;
}

.toc-link {
  display: block;
  padding: 4px 0;
  color: #b0b0b0;
  text-decoration: none;
  line-height: 1.4;
  transition: color 0.2s ease;
  border-left: 2px solid transparent;
  padding-left: 8px;
  margin-left: 0;
}

.toc-link:hover {
  color: #60a5fa;
}

.toc-active {
  color: #60a5fa !important;
  border-left-color: #60a5fa;
  font-weight: 500;
}

/* 不同级别的缩进 */
.toc-level-1 {
  font-size: 14px;
  font-weight: 500;
}

.toc-level-2 {
  font-size: 13px;
  margin-left: 12px;
}

.toc-level-3 {
  font-size: 12px;
  margin-left: 24px;
}

.toc-level-4 {
  font-size: 11px;
  margin-left: 36px;
}

.toc-level-5,
.toc-level-6 {
  font-size: 11px;
  margin-left: 48px;
}

.toc-children {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
