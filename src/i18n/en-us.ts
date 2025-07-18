import type Strings from './strings'

class EnUsStrings implements Strings {
  ERROR_404_NOT_FOUND = 'Page not found'
  formatError404NotFound(slotcontent: string): string {
    return ` The url ${slotcontent} is not found.`
  }
  ERROR_404_RETURN_HOME = 'Return to Home'
  NO_TAGS_DISPLAY = 'No tags to display'
  NO_ARTICLE_WITH_TAG = 'No articles with this tag'

  ALL_TAGS = 'All Tags'
  NO_ARTICLE = 'No article'
  NAV_HOME = 'Home'
  NAV_ABOUT = 'About'
  NAV_ARTICLES = 'Articles'
  NAV_TAGS = 'Tags'

  TAG = 'Tag'
  ARTICLE = 'Article'
  ARTICLE_LIST = 'Article List'

  HINT_LOADING = 'Loading...'
  HINT_NO_ARTICLE = 'No articles found'
  HINT_NO_TAG = 'No tags found'

  VIEW_ALL_ARTICLES = 'View all articles'
  VIEW_ALL_TAGS = 'View all tags'

  POPULAR_TAGS = 'Popular tags'
  TOC_MENU = 'Table Of Contents'

  ERROR_NOT_FOUND = 'Page not found'
  ERROR_FILE_NOT_FOUND = 'File not found'
  ERROR_FILE_READ_FAILED = 'Failed to read file'

  formatAriticleListCount(count: number): string {
    return `Total ${count} articles`
  }

  formatArticleTagCount(count: number): string {
    return `Total ${count} tags`
  }

  formatDate(year: string, month: string, day: string): string {
    return `${year}-${month}-${day}`
  }

  formatDateTime(datetime: string): string {
    if (!datetime) return ''
    const date = new Date(datetime)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
}

export const enUs = new EnUsStrings()
