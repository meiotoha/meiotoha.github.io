<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import { defineAsyncComponent } from 'vue'
import { extractToc, type TocItem } from '@/utils/toc'

const MarkdownContent = defineAsyncComponent(() => import('@/components/MarkdownContent.vue'))
const TocContainer = defineAsyncComponent(() => import('@/components/TocContainer.vue'))
const HeaderCom = defineAsyncComponent(() => import('@/components/HeaderCom.vue'))

import { inject } from 'vue'
import type Strings from '@/i18n/strings'

const syslang: Strings = inject('syslang')!

const route = useRoute()
const loading = ref(true)
const error = ref('')
const content = ref('')
const articleTitle = ref('')
const articleDate = ref('')
const articleKeywords = ref<string[]>([])
const articleAbstract = ref('')
const tocItems = ref<TocItem[]>([])

const loadArticle = async () => {
  try {
    loading.value = true
    error.value = ''

    const path = (route.meta?.articlePath as string) || (route.params.path as string)

    if (!path) {
      throw new Error(syslang.ERROR_FILE_NOT_FOUND)
    }

    // load article content
    const response = await fetch(`/articles/${path}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    content.value = await response.text()

    // extract TOC
    tocItems.value = extractToc(content.value)

    // prefer route metadata for article details
    if (route.meta?.title) {
      articleTitle.value = route.meta.title as string
    }
    if (route.meta?.date) {
      articleDate.value = syslang.formatDateTime(route.meta.date as string)
    }
    if (route.meta?.keywords) {
      articleKeywords.value = route.meta.keywords as string[]
    }
    if (route.meta?.abstract) {
      articleAbstract.value = route.meta.abstract as string
    }

    // fallback to filename for title and date if not provided
    if (!articleTitle.value || !articleDate.value) {
      const pathParts = path.split('/')
      const fileName = pathParts[pathParts.length - 1]
      const match = fileName.match(/(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/)

      if (match) {
        const [, year, month, day, title] = match
        if (!articleTitle.value) {
          articleTitle.value = title.replace(/-/g, ' ')
        }
        if (!articleDate.value) {
          articleDate.value = syslang.formatDate(year, month, day)
        }
      } else {
        if (!articleTitle.value) {
          articleTitle.value = fileName.replace(/\.md$/, '')
        }
      }
    }
  } catch (err) {
    error.value = syslang.ERROR_FILE_READ_FAILED
    console.error(syslang.ERROR_FILE_READ_FAILED, err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadArticle()
})

watch(() => route.params.path, loadArticle)
</script>

<template>
  <div class="article-page">
    <div v-if="loading" class="loading">
      {{ syslang.HINT_LOADING }}
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="article-content">
      <div class="article-layout">
        <div class="article-main">
          <HeaderCom :title="articleTitle" :desc="articleDate" />
          <MarkdownContent :content="content" />
        </div>
      </div>
      <!-- TOC -->
      <div v-if="tocItems.length > 0" class="floating-toc">
        <TocContainer :toc-items="tocItems" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #1a1a1a;
  color: #e0e0e0;
}

.article-layout {
  display: flex;
  justify-content: center;
}

.article-main {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.floating-toc {
  position: fixed;
  top: 140px;
  right: 20px;
  width: 280px;
  z-index: 100;
  backdrop-filter: blur(8px);
  background: rgba(45, 45, 45, 0.95);
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  transform: translateX(0);
  opacity: 0.9;
  transition: all 0.3s ease;
}

.floating-toc:hover {
  opacity: 1;
  transform: translateX(-5px);
}

.loading,
.error {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

.error {
  color: #e74c3c;
}

.keywords-container {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.article-meta {
  color: #b0b0b0;
  font-size: 14px;
  margin: 0;
}

.article-meta .author {
  margin: 0 0 8px 0;
  font-style: italic;
}

.article-meta .keywords {
  margin: 0 0 12px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.article-meta .keywords-label {
  font-weight: 500;
}

.article-meta .keyword-tag {
  background: #1e3a8a;
  color: #93c5fd;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.article-meta .abstract {
  margin: 0;
  padding: 12px;
  background: #2d2d2d;
  border-left: 4px solid #60a5fa;
  border-radius: 4px;
  font-style: italic;
  line-height: 1.5;
  color: #c0c0c0;
}

.article-content {
  line-height: 1.6;
}

:deep(.el-page-header) {
  background: transparent;
  color: #e0e0e0;
}

:deep(.el-page-header__content) {
  color: #f0f0f0;
}

:deep(.el-descriptions) {
  background: transparent;
}

:deep(.el-descriptions__label) {
  color: #b0b0b0;
  font-weight: 500;
}

:deep(.el-descriptions__content) {
  color: #e0e0e0;
}

:deep(.el-descriptions__body) {
  background: transparent;
}

:deep(.el-descriptions__table) {
  border-collapse: separate;
  border-spacing: 0;
}

:deep(.el-descriptions-item__cell) {
  border: none;
  padding: 8px 12px;
}

@media (max-width: 800px) {
  .floating-toc {
    display: none;
  }
}
</style>
