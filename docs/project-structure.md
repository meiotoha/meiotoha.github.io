# Project Structure

```
src/
├── assets/
│   ├── articles/           # Source markdown files
│   └── icons/              # SVG icon assets
├── components/
│   ├── ArticleCard.vue     # Article card component
│   ├── FooterCom.vue       # Footer component
│   ├── HeaderCom.vue       # Header component
│   ├── IconComponent.vue   # Icon wrapper
│   ├── MarkdownContent.vue # Markdown rendering component
│   ├── NavMenu.vue         # Navigation menu
│   ├── TagItem.vue         # Tag display component
│   ├── TocContainer.vue    # Table of contents container
│   └── ...                 # Other UI components
├── i18n/
│   ├── en-us.ts            # English language strings
│   ├── strings.ts          # Strings interface definition
│   └── ...                 # Other language files
├── plugins/
│   └── article-routes-plugin.ts # Vite plugin for route generation
├── router/
│   ├── index.ts            # Main router config
│   └── fileRouters.ts      # Auto-generated article routes
├── types/
│   └── article.ts          # Article type definitions
├── utils/
│   ├── avatar.ts           # Avatar utility
│   ├── ellang.ts           # Element Plus i18n utility
│   ├── i18n.ts             # i18n language selector
│   ├── toc.ts              # Table of contents utility
│   └── ...                 # Other utilities
├── views/
│   ├── AboutView.vue       # About page
│   ├── ArticlesView.vue    # Article list view
│   ├── ArticleView.vue     # Article detail view
│   ├── HomeView.vue        # Home page
│   ├── NotFoundView.vue    # 404 page (or 404.vue)
│   ├── TagArticlesView.vue # Tag filtered articles
│   └── TagsView.vue        # Tags list view
├── App.vue                 # Main app component
├── main.ts                 # App entry point
├── style.css               # Global styles
├── ...                     # Other config files
public/
├── favicon.ico             # Site favicon
└── articles/               # Article files copied during build
    └── 2025/
        └── 07/
            ├── 2025-07-15-my-first-post.md
            └── 2025-07-16-another-post.md
```
