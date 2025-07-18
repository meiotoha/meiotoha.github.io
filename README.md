# Vue 3 + Vite Static Blog System

A static blog system built with Vue 3 and Vite, supporting automatic route generation at build time.

## Features

- ✅ **Automatic Route Generation**: Routes for articles are generated automatically during build
- ✅ **Static Server Friendly**: Fully supports static deployment
- ✅ **TypeScript Support**: Type-safe development experience
- ✅ **Responsive Design**: Works on all devices
- ✅ **Markdown Rendering**: Full markdown syntax support
- ✅ **Article Metadata**: Automatically parses article title and date

## Tech Stack

- Vue 3 + Composition API
- Vite
- TypeScript
- Vue Router 4
- Element Plus UI Library
- Markdown Rendering Engine

## Project Setup

```sh
npm install
```

### Development

```sh
npm run dev
```

### Build for Production

```sh
npm run build
```

## Deployment

After building, static files are generated and can be deployed to any static server:

Supported static hosts:

- Netlify
- Vercel
- GitHub Pages
- Any SPA-compatible server

## Usage

See the full usage guide in [docs/usage.md](./docs/usage.md).

Basic workflow:

1. Add markdown articles
2. Run dev server
3. Build for production and deploy to a host

## Project Structure

See the full project structure in [docs/project-structure.md](./docs/project-structure.md).

The project is organized by feature: articles, components, i18n, plugins, router, types, utils, views, and public assets.

## GitHub Pages CI/CD

See [docs/github-ci.md](./docs/github-ci.md) for details on automatic and manual deployment to GitHub Pages using GitHub Actions.

## Internationalization (i18n)

This project supports multi-language (i18n) for UI text and article metadata. All user-facing strings are managed via parameterized language files and injected into components, making it easy to switch languages or add new ones.

For detailed usage and extension steps, see [docs/i18n.md](./docs/i18n.md).
