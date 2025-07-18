<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { tagDictionary } from '@/router/fileRouters'
import ArticleCard from '@/components/ArticleCard.vue'
import HeaderCom from '@/components/HeaderCom.vue'
import { inject } from 'vue'
import type Strings from '@/i18n/strings'

const syslang: Strings = inject('syslang')!
const route = useRoute()
const router = useRouter()
const tagName = computed(() => route.params.tag as string)

const displayTagName = computed(() => {
  const tag = tagDictionary[tagName.value]
  return tag ? tag.name : tagName.value
})

const articles = computed(() => {
  const tag = tagDictionary[tagName.value]
  return tag ? tag.articles : []
})

const handleTagClick = (clickedTagName: string) => {
  const tagKey = Object.keys(tagDictionary).find(
    (key) => tagDictionary[key].name === clickedTagName,
  )
  if (tagKey) {
    router.push(`/tag/${tagKey}`)
  }
}
</script>

<template>
  <div class="base-page">
    <HeaderCom
      :title="`${syslang.TAG}: ${displayTagName}`"
      :desc="syslang.formatAriticleListCount(articles.length)"
    />

    <div class="articles-list">
      <ArticleCard
        v-for="article in articles"
        :key="article.slug"
        :article="article"
        :highlight-tag="tagName"
        @tag-click="handleTagClick"
      />
    </div>

    <div v-if="articles!.length === 0" class="empty-state">
      <p>{{ syslang.NO_ARTICLE_WITH_TAG }}</p>
    </div>
  </div>
</template>

<style scoped>
.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #404040;
}

.page-header h1 {
  font-size: 2.5em;
  color: #f0f0f0;
  margin-bottom: 10px;
}

.page-header p {
  color: #b0b0b0;
  font-size: 1.1em;
  margin-bottom: 20px;
}

.back-link {
  display: inline-block;
  color: #60a5fa;
  text-decoration: none;
  padding: 8px 16px;
  border: 1px solid #60a5fa;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.back-link:hover {
  background: #60a5fa;
  color: #1a1a1a;
}

.articles-list {
  margin-bottom: 40px;
}

@media (max-width: 768px) {
  .articles-list {
    margin: 0 -20px 40px -20px;
  }
}
</style>
