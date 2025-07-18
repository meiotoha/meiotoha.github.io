import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import GithubSlugger from 'github-slugger'
import type { Node } from 'unist'

export interface TocItem {
  id: string
  title: string
  level: number
  children?: TocItem[]
}

interface HeadingNode extends Node {
  type: 'heading'
  depth: number
  children: Array<{
    type: string
    value: string
  }>
}

export function extractToc(markdownContent: string): TocItem[] {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFrontmatter, ['yaml', 'toml'])

  const ast = processor.parse(markdownContent)
  const headings: TocItem[] = []
  const slugger = new GithubSlugger()

  function visit(node: Node) {
    if (node.type === 'heading') {
      const heading = node as HeadingNode
      const title = heading.children
        .map((child) => child.value || '')
        .join('')
        .trim()

      if (title) {
        const id = slugger.slug(title)
        headings.push({
          id,
          title,
          level: heading.depth,
        })
      }
    }

    if ('children' in node && Array.isArray(node.children)) {
      node.children.forEach(visit)
    }
  }

  visit(ast)
  return buildTocTree(headings)
}

function buildTocTree(headings: TocItem[]): TocItem[] {
  const tree: TocItem[] = []
  const stack: TocItem[] = []

  for (const heading of headings) {
    // 找到合适的父级位置
    while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
      stack.pop()
    }

    if (stack.length === 0) {
      tree.push(heading)
    } else {
      const parent = stack[stack.length - 1]
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(heading)
    }

    stack.push(heading)
  }

  return tree
}
