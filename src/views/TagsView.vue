<script setup lang="ts">
import { computed } from 'vue'
import { tagDictionary, allTags } from '@/router/fileRouters'
import TagItem from '@/components/TagItem.vue'
import HeaderCom from '@/components/HeaderCom.vue'
import { inject } from 'vue'
import type Strings from '@/i18n/strings'

const syslang: Strings = inject('syslang')!

const popularTags = computed(() => {
  return Object.values(tagDictionary)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
})

const sortedTags = computed(() => {
  const tags = Object.values(tagDictionary)
  const normalTags = tags.filter((tag) => tag.name !== syslang.NO_TAGS_DISPLAY)
  const noTagsTag = tags.find((tag) => tag.name === syslang.NO_TAGS_DISPLAY)

  const sortedNormalTags = normalTags.sort((a, b) => b.count - a.count)

  return noTagsTag ? [...sortedNormalTags, noTagsTag] : sortedNormalTags
})
</script>

<template>
  <div class="base-page">
    <HeaderCom :title="syslang.TAG" :desc="syslang.formatArticleTagCount(allTags.length)" />

    <div class="popular-tags" v-if="popularTags && popularTags.length > 0">
      <h2 class="tag-list-title">{{ syslang.POPULAR_TAGS }}</h2>
      <div class="tag-cloud">
        <TagItem v-for="tag in popularTags" :key="tag.name" :tag="tag" />
      </div>
    </div>

    <div class="popular-tags" v-if="sortedTags && sortedTags.length > 0">
      <h2 class="tag-list-title">{{ syslang.ALL_TAGS }}</h2>
      <div class="tag-cloud">
        <TagItem v-for="tag in sortedTags" :key="tag.name" :tag="tag" />
      </div>
    </div>

    <div v-if="allTags.length <= 0" class="empty-state">
      <p>{{ syslang.NO_ARTICLE }}</p>
    </div>
  </div>
</template>

<style scoped>
.popular-tags {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid #404040;
}

.popular-tags h2 {
  text-align: center;
  font-size: 1.8em;
  color: #f0f0f0;
  margin-bottom: 30px;
}

.popular-tags-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.popular-tag-item:hover {
  background: #3a3a3a;
  border-color: #60a5fa;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(96, 165, 250, 0.2);
}

.popular-tag-item h3 {
  font-size: 1.2em;
  color: #f0f0f0;
  margin: 0 0 8px 0;
}

.popular-tag-item p {
  color: #b0b0b0;
  font-size: 0.9em;
  margin: 0;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .popular-tags-list {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
  }

  .tag-cloud {
    gap: 8px;
  }
}
</style>
