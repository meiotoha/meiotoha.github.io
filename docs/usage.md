# Usage Guide

## 1. Add New Articles

Manually create markdown files under `src/assets/articles`:

```
src/assets/articles/
├── 2025/
│   └── 07/
│       ├── 2025-07-15-my-first-post.md
│       └── 2025-07-16-another-post.md
```

## 2. Filename Format

Filenames must follow: `YYYY-MM-DD-title.md`

- `YYYY`: Year (4 digits)
- `MM`: Month (2 digits)
- `DD`: Day (2 digits)
- `title`: Article title (use hyphens)

## 3. Start Dev Server

```sh
npm run dev
```

## 4. Build for Production

```sh
npm run build
```

During build:

- Article files are copied to `public/articles/`
- Route configuration is generated automatically
- Static files are output to `dist/`

## 5. Access Articles

- Article list: `/articles`
- Single article: `/article/2025/07/15/my-first-post`
