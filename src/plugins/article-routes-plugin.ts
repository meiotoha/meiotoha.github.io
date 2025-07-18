import type { Plugin } from 'vite'
import type { ArticleMetadata, TagDictionary } from '../types/article'
import { NO_TAGS_KEY } from '../types/article'
import { readdir, stat, copyFile, mkdir, readFile } from 'fs/promises'
import { join, relative, dirname } from 'path'
import matter from 'gray-matter'

import { GetSysLang } from '../utils/i18n'
import { SITE_LANGUAGE } from '../consts'

const syslang = GetSysLang(SITE_LANGUAGE)

interface FrontmatterData {
  title?: string
  date?: string
  author?: string
  keywords?: string[]
  abstract?: string
  description?: string
  summary?: string
}

async function getAllMarkdownFiles(dir: string, baseDir: string = dir): Promise<ArticleMetadata[]> {
  const files: ArticleMetadata[] = []

  try {
    const entries = await readdir(dir)

    for (const entry of entries) {
      const fullPath = join(dir, entry)
      const stats = await stat(fullPath)

      if (stats.isDirectory()) {
        const subFiles = await getAllMarkdownFiles(fullPath, baseDir)
        files.push(...subFiles)
      } else if (entry.endsWith('.md')) {
        const relativePath = relative(baseDir, fullPath).replace(/\\/g, '/')
        const fileName = entry

        // 读取文件内容解析 frontmatter
        let frontmatter: FrontmatterData = {}
        try {
          const fileContent = await readFile(fullPath, 'utf-8')
          const parsed = matter(fileContent)
          frontmatter = parsed.data
        } catch (error) {
          console.warn('Error reading markdown file:', fullPath, error)
        }

        const match = fileName.match(/(\d{4})-(\d{2})-(\d{2})-(.+)\.md$/)

        if (match) {
          const [, year, month, day, title] = match
          const slug = `${year}/${month}/${day}/${title}`

          files.push({
            path: relativePath,
            title: frontmatter.title || title.replace(/-/g, ' '),
            date: frontmatter.date || `${year}-${month}-${day}`,
            slug,
            year,
            month,
            day,
            author: frontmatter.author,
            keywords: frontmatter.keywords,
            abstract: frontmatter.abstract || frontmatter.description || frontmatter.summary,
          })
        } else {
          const slug = relativePath.replace(/\.md$/, '')
          files.push({
            path: relativePath,
            title: frontmatter.title || fileName.replace(/\.md$/, '').replace(/-/g, ' '),
            date: frontmatter.date || '',
            slug,
            year: '',
            month: '',
            day: '',
            author: frontmatter.author,
            keywords: frontmatter.keywords,
            abstract: frontmatter.abstract || frontmatter.description || frontmatter.summary,
          })
        }
      }
    }
  } catch (error) {
    console.warn('Error reading directory:', dir, error)
  }

  return files
}

function generateTagDictionary(articles: ArticleMetadata[]): TagDictionary {
  const tagDict: TagDictionary = {}
  const noTagsArticles: ArticleMetadata[] = []

  articles.forEach((article) => {
    if (article.keywords && article.keywords.length > 0) {
      article.keywords.forEach((tag) => {
        if (!tagDict[tag]) {
          tagDict[tag] = {
            name: tag,
            count: 0,
            articles: [],
          }
        }
        tagDict[tag].count++
        tagDict[tag].articles.push(article)
      })
    } else {
      // 没有标签的文章
      noTagsArticles.push(article)
    }
  })

  // 如果有无标签的文章，添加到字典中
  if (noTagsArticles.length > 0) {
    tagDict[NO_TAGS_KEY] = {
      name: syslang.NO_TAGS_DISPLAY,
      count: noTagsArticles.length,
      articles: noTagsArticles.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    }
  }

  // 按文章数量排序每个标签下的文章
  Object.values(tagDict).forEach((tagInfo) => {
    if (tagInfo.name !== syslang.NO_TAGS_DISPLAY) {
      tagInfo.articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }
  })

  return tagDict
}

function generateRouterCode(articles: ArticleMetadata[]): string {
  const routeImports = articles
    .map((article, index) => `// Article ${index + 1}: ${article.title}`)
    .join('\n')

  const routesCode = articles
    .map(
      (article) => `  {
    path: '/article/${article.slug}',
    name: 'article-${article.slug.replace(/[^a-zA-Z0-9]/g, '-')}',
    component: () => import('../views/ArticleView.vue'),
    props: () => ({ path: '${article.path}' }),
    meta: ${JSON.stringify(
      {
        title: article.title,
        date: article.date,
        slug: article.slug,
        articlePath: article.path,
        author: article.author,
        keywords: article.keywords,
        abstract: article.abstract,
      },
      null,
      6,
    ).replace(/^/gm, '    ')}
  }`,
    )
    .join(',\n')

  const articlesMetadata = articles
    .map((article) => `  ${JSON.stringify(article, null, 2).replace(/^/gm, '  ')}`)
    .join(',\n')

  const tagDictionary = generateTagDictionary(articles)
  const tagDictionaryCode = JSON.stringify(tagDictionary, null, 2).replace(/^/gm, '  ')

  return `//Auto-generated
import type { RouteRecordRaw } from 'vue-router'
import type { ArticleMetadata, TagDictionary } from '@/types/article'

${routeImports}

export const articleRoutes: RouteRecordRaw[] = [
${routesCode}
]

export const articlesMetadata: ArticleMetadata[] = [
${articlesMetadata}
]

export const sortedArticles = articlesMetadata.sort((a, b) =>
  new Date(b.date).getTime() - new Date(a.date).getTime()
)

export const tagDictionary: TagDictionary = ${tagDictionaryCode}

export const allTags = Object.keys(tagDictionary).sort()
`
}

async function copyArticlesToPublic(srcDir: string, publicDir: string) {
  try {
    const articles = await getAllMarkdownFiles(srcDir)

    for (const article of articles) {
      const srcPath = join(srcDir, article.path)
      const destPath = join(publicDir, article.path)
      const destDir = dirname(destPath)

      await mkdir(destDir, { recursive: true })
      await copyFile(srcPath, destPath)
    }

    console.log(`✓ 复制了 ${articles.length} 个文章文件到 public 目录`)
  } catch (error) {
    console.warn('复制文章失败:', error)
  }
}

export function articleRoutesPlugin(): Plugin {
  return {
    name: 'article-routes-generator',
    async buildStart() {
      const srcArticlesDir = join(process.cwd(), 'src', 'assets', 'articles')
      const publicArticlesDir = join(process.cwd(), 'public', 'articles')

      try {
        await copyArticlesToPublic(srcArticlesDir, publicArticlesDir)

        const articles = await getAllMarkdownFiles(srcArticlesDir)
        const routerCode = generateRouterCode(articles)

        const routerFilePath = join(process.cwd(), 'src', 'router', 'fileRouters.ts')
        await import('fs/promises').then((fs) => fs.writeFile(routerFilePath, routerCode, 'utf-8'))

        console.log(`✓ 生成了 ${articles.length} 个文章路由`)
      } catch (error) {
        console.error('生成文章路由失败:', error)
      }
    },
  }
}
