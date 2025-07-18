<script setup lang="ts">
import { computed } from 'vue'
import { sortedArticles, tagDictionary } from '@/router/fileRouters'
import ArticleCard from '@/components/ArticleCard.vue'
import TagItem from '@/components/TagItem.vue'
import { inject } from 'vue'
import type Strings from '@/i18n/strings'

const syslang: Strings = inject('syslang')!

// get the latest 5 articles from the sorted list
const latestArticles = sortedArticles.slice(0, 5)

// get top tags from the tag dictionary
const topTags = computed(() => {
  return Object.values(tagDictionary)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
})
</script>

<template>
  <div class="home-page">
    <div class="main-content">
      <div class="articles-list">
        <ArticleCard v-for="article in latestArticles" :key="article.slug" :article="article" />
      </div>

      <div v-if="latestArticles.length === 0" class="empty-state">
        <p>{{ syslang.HINT_NO_ARTICLE }}</p>
      </div>

      <footer>
        <div v-if="latestArticles && latestArticles.length > 0" class="footer-content">
          <router-link to="/articles" class="view-all-link"
            >{{ syslang.VIEW_ALL_ARTICLES }} →</router-link
          >
        </div>
      </footer>
    </div>

    <aside class="sidebar" v-if="topTags && topTags.length > 0">
      <div class="sidebar-section">
        <h3>{{ syslang.POPULAR_TAGS }}</h3>
        <div class="sidebar-tags">
          <TagItem v-for="tag in topTags" :key="tag.name" :tag="tag" variant="sidebar" />
        </div>
        <div class="sidebar-footer">
          <router-link to="/tags" class="view-all-tags">{{ syslang.VIEW_ALL_TAGS }} →</router-link>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #1a1a1a;
  color: #e0e0e0;
  display: flex;
  gap: 30px;
}

.main-content {
  flex: 1;
  min-width: 0;
}

.sidebar {
  width: 300px;
  flex-shrink: 0;
}

.sidebar-section {
  background: #2d2d2d;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #404040;
}

.sidebar-section h3 {
  color: #f0f0f0;
  font-size: 1.2em;
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #404040;
}

.sidebar-tags {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #404040;
  text-align: center;
}

.view-all-tags {
  color: #60a5fa;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s ease;
}

.view-all-tags:hover {
  color: #93c5fd;
}

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

.view-all-link {
  display: inline-block;
  color: #60a5fa;
  text-decoration: none;
  padding: 8px 16px;
  border: 1px solid #60a5fa;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.view-all-link:hover {
  background: #60a5fa;
  color: #1a1a1a;
}

.articles-list {
  margin-bottom: 40px;
}

.footer-content {
  text-align: right;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .home-page {
    flex-direction: column;
    gap: 20px;
  }

  .sidebar {
    width: 100%;
    order: -1;
  }

  .articles-list {
    margin: 0 -20px 40px -20px;
  }

  .sidebar-section {
    margin: 0 -20px;
    border-radius: 0;
    border-left: none;
    border-right: none;
  }
}
</style>
