export interface ArticleMetadata {
  path: string
  title: string
  date: string
  slug: string
  year: string
  month: string
  day: string
  author?: string
  keywords?: string[]
  abstract?: string
}

export interface TagInfo {
  name: string
  count: number
  articles: ArticleMetadata[]
}

export type TagDictionary = Record<string, TagInfo>

// 特殊标签常量
export const NO_TAGS_KEY = '__NO_TAGS__'
