//Auto-generated
import type { RouteRecordRaw } from 'vue-router'
import type { ArticleMetadata, TagDictionary } from '@/types/article'

// Article 1: In-depth Understanding of Vue 3 Reactivity
// Article 2: README

export const articleRoutes: RouteRecordRaw[] = [
  {
    path: '/article/2025/07/17/sample',
    name: 'article-2025-07-17-sample',
    component: () => import('../views/ArticleView.vue'),
    props: () => ({ path: '2025/07/2025-07-17-sample.md' }),
    meta:     {
          "title": "In-depth Understanding of Vue 3 Reactivity",
          "date": "2025-07-17T00:00:00.000Z",
          "slug": "2025/07/17/sample",
          "articlePath": "2025/07/2025-07-17-sample.md",
          "author": "Meiotoha",
          "keywords": [
                "Vue",
                "Frontend",
                "Reactivity"
          ],
          "abstract": "This article thoroughly analyzes the implementation principles of Vue 3’s reactivity system, with code examples and practical scenarios to help developers master reactive programming."
    }
  },
  {
    path: '/article/2025/07/README',
    name: 'article-2025-07-README',
    component: () => import('../views/ArticleView.vue'),
    props: () => ({ path: '2025/07/README.md' }),
    meta:     {
          "title": "README",
          "date": "",
          "slug": "2025/07/README",
          "articlePath": "2025/07/README.md"
    }
  }
]

export const articlesMetadata: ArticleMetadata[] = [
    {
    "path": "2025/07/2025-07-17-sample.md",
    "title": "In-depth Understanding of Vue 3 Reactivity",
    "date": "2025-07-17T00:00:00.000Z",
    "slug": "2025/07/17/sample",
    "year": "2025",
    "month": "07",
    "day": "17",
    "author": "Meiotoha",
    "keywords": [
      "Vue",
      "Frontend",
      "Reactivity"
    ],
    "abstract": "This article thoroughly analyzes the implementation principles of Vue 3’s reactivity system, with code examples and practical scenarios to help developers master reactive programming."
  },
    {
    "path": "2025/07/README.md",
    "title": "README",
    "date": "",
    "slug": "2025/07/README",
    "year": "",
    "month": "",
    "day": ""
  }
]

export const sortedArticles = articlesMetadata.sort((a, b) =>
  new Date(b.date).getTime() - new Date(a.date).getTime()
)

export const tagDictionary: TagDictionary =   {
    "Vue": {
      "name": "Vue",
      "count": 1,
      "articles": [
        {
          "path": "2025/07/2025-07-17-sample.md",
          "title": "In-depth Understanding of Vue 3 Reactivity",
          "date": "2025-07-17T00:00:00.000Z",
          "slug": "2025/07/17/sample",
          "year": "2025",
          "month": "07",
          "day": "17",
          "author": "Meiotoha",
          "keywords": [
            "Vue",
            "Frontend",
            "Reactivity"
          ],
          "abstract": "This article thoroughly analyzes the implementation principles of Vue 3’s reactivity system, with code examples and practical scenarios to help developers master reactive programming."
        }
      ]
    },
    "Frontend": {
      "name": "Frontend",
      "count": 1,
      "articles": [
        {
          "path": "2025/07/2025-07-17-sample.md",
          "title": "In-depth Understanding of Vue 3 Reactivity",
          "date": "2025-07-17T00:00:00.000Z",
          "slug": "2025/07/17/sample",
          "year": "2025",
          "month": "07",
          "day": "17",
          "author": "Meiotoha",
          "keywords": [
            "Vue",
            "Frontend",
            "Reactivity"
          ],
          "abstract": "This article thoroughly analyzes the implementation principles of Vue 3’s reactivity system, with code examples and practical scenarios to help developers master reactive programming."
        }
      ]
    },
    "Reactivity": {
      "name": "Reactivity",
      "count": 1,
      "articles": [
        {
          "path": "2025/07/2025-07-17-sample.md",
          "title": "In-depth Understanding of Vue 3 Reactivity",
          "date": "2025-07-17T00:00:00.000Z",
          "slug": "2025/07/17/sample",
          "year": "2025",
          "month": "07",
          "day": "17",
          "author": "Meiotoha",
          "keywords": [
            "Vue",
            "Frontend",
            "Reactivity"
          ],
          "abstract": "This article thoroughly analyzes the implementation principles of Vue 3’s reactivity system, with code examples and practical scenarios to help developers master reactive programming."
        }
      ]
    },
    "__NO_TAGS__": {
      "name": "No tags to display",
      "count": 1,
      "articles": [
        {
          "path": "2025/07/README.md",
          "title": "README",
          "date": "",
          "slug": "2025/07/README",
          "year": "",
          "month": "",
          "day": ""
        }
      ]
    }
  }

export const allTags = Object.keys(tagDictionary).sort()
