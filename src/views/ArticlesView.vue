<script setup lang="ts">
import { computed } from 'vue'
import { sortedArticles } from '@/router/fileRouters'
import ArticleCard from '@/components/ArticleCard.vue'
import HeaderCom from '@/components/HeaderCom.vue'
import { inject } from 'vue'
import type Strings from '@/i18n/strings'

const syslang: Strings = inject('syslang')!

const articles = computed(() => sortedArticles)
</script>

<template>
  <div class="base-page">
    <HeaderCom
      :title="syslang.ARTICLE_LIST"
      :desc="syslang.formatAriticleListCount(articles.length)"
    />

    <div class="articles-list">
      <ArticleCard v-for="article in articles" :key="article.slug" :article="article" />
    </div>

    <div v-if="articles.length === 0" class="empty-state">
      <p>{{ syslang.NO_ARTICLE }}</p>
    </div>
  </div>
</template>

<style scoped>
.articles-list {
  margin-bottom: 40px;
}

@media (max-width: 768px) {
  .articles-list {
    margin: 0 -20px 40px -20px;
  }
}
</style>
