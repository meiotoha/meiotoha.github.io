<script setup lang="ts">
import { VueMarkdownAsync, type PluggableList, type CustomAttrs } from '@crazydos/vue-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeMermaid from 'rehype-mermaid'
import rehypeShiki from '@shikijs/rehype'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import remarkFrontmatter from 'remark-frontmatter'

const props = defineProps<{ content: string }>()

const remarkPlugins: PluggableList = [
  remarkParse,
  remarkFrontmatter,
  remarkGfm,
  remarkToc,
  remarkMath
]

const rehypePlugins: PluggableList = [
  rehypeRaw,
  rehypeSlug,
  rehypeMermaid,
  [
    rehypeShiki, {
      theme: 'github-dark'
    }
  ],
]

const customAttrs: CustomAttrs = {
  h1: { class: ['markdown-header'] },
  h2: { class: ['markdown-header'] },
  code: { class: ['markdown-code'] },
  pre: { class: ['markdown-pre'] },
}
</script>

<template>
  <Suspense>
    <VueMarkdownAsync :markdown="props.content" :rehype-plugins="rehypePlugins" :remark-plugins="remarkPlugins"
      :custom-attrs="customAttrs" />
  </Suspense>
</template>

<style lang="css">
.markdown-header {
  color: #e0e0e0;
  margin: 16px 0;
}

.markdown-pre {
  background: #1e1e1e;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  color: #dcdcdc;
  font-family: 'Consolas', 'Courier New', monospace;
}

.markdown-code {
  background: #2d2d2d;
  padding: 2px 4px;
  border-radius: 4px;
  color: #e0e0e0;
  font-family: 'Consolas', 'Courier New', monospace;
}
</style>
