<script setup lang="ts">
import type { ArticleMetadata } from '@/types/article'
import TagItem from './TagItem.vue'
import { inject } from 'vue'
import type Strings from '@/i18n/strings'

const syslang: Strings = inject('syslang')!

defineProps<{
  article: ArticleMetadata
  highlightTag?: string
}>()
</script>

<template>
  <article class="article-card">
    <router-link :to="`/article/${article.slug}`" class="article-link">
      <div class="article-content">
        <header class="article-header">
          <h2>{{ article.title }}</h2>
          <div class="article-info">
            <time class="article-date">{{ syslang.formatDateTime(article.date) }}</time>
          </div>
        </header>
        <div v-if="article.abstract" class="article-abstract">
          {{ article.abstract }}
        </div>
      </div>
      <div class="article-sidebar">
        <div v-if="article.keywords && article.keywords.length > 0" class="article-keywords">
          <TagItem v-for="keyword in article.keywords" :key="keyword" variant="home-card"
            :tag="{ name: keyword, count: 0, articles: [] }" />
        </div>
      </div>
    </router-link>
  </article>
</template>

<style scoped>
.article-card {
  background: #2d2d2d;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  border: 1px solid #404040;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  border-color: #555;
}

.article-link {
  display: flex;
  padding: 20px;
  text-decoration: none;
  color: #e0e0e0;
  align-items: flex-start;
  gap: 20px;
}

.article-content {
  flex: 1;
  min-width: 0;
}

.article-header {
  margin-bottom: 12px;
}

.article-header h2 {
  font-size: 1.2em;
  color: #f0f0f0;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.article-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.article-date {
  color: #b0b0b0;
  font-size: 13px;
  font-weight: normal;
}

.article-author {
  color: #999;
  font-size: 12px;
  font-style: italic;
}

.article-abstract {
  color: #c0c0c0;
  font-size: 14px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-sidebar {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  min-width: 200px;
}

.article-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  justify-content: flex-end;
}

.keyword-tag {
  background: #1e3a8a;
  color: #93c5fd;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #1e40af;
}

.keyword-tag:hover {
  background: #1e40af;
  color: #dbeafe;
  transform: scale(1.05);
}

.keyword-active {
  background: #2563eb;
  color: white;
  font-weight: 600;
  border-color: #3b82f6;
}

.article-meta {
  text-align: right;
}

.article-path {
  color: #808080;
  font-size: 11px;
  font-family: monospace;
  background: #3a3a3a;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid #4a4a4a;
}

@media (max-width: 768px) {
  .article-link {
    flex-direction: column;
    gap: 12px;
  }

  .article-sidebar {
    align-items: flex-start;
    min-width: auto;
    width: 100%;
  }

  .article-keywords {
    justify-content: flex-start;
  }

  .article-meta {
    text-align: left;
  }
}
</style>
