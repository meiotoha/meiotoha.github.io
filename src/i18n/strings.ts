export default interface Strings {
  NAV_HOME: string
  NAV_ABOUT: string
  NAV_ARTICLES: string
  NAV_TAGS: string

  TAG: string
  ARTICLE: string
  ARTICLE_LIST: string

  HINT_LOADING: string
  HINT_NO_ARTICLE: string
  HINT_NO_TAG: string

  VIEW_ALL_ARTICLES: string
  VIEW_ALL_TAGS: string

  ERROR_NOT_FOUND: string
  ERROR_FILE_NOT_FOUND: string
  ERROR_FILE_READ_FAILED: string

  ERROR_404_NOT_FOUND: string
  formatError404NotFound: (slotcontent: string) => string
  ERROR_404_RETURN_HOME: string

  POPULAR_TAGS: string
  ALL_TAGS: string

  NO_ARTICLE: string

  TOC_MENU: string

  NO_TAGS_DISPLAY: string

  NO_ARTICLE_WITH_TAG: string

  formatArticleTagCount(count: number): string

  formatAriticleListCount(count: number): string

  formatDate(year: string, month: string, day: string): string

  formatDateTime(datetime: string): string
}
