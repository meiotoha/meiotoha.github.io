# GitHub Pages CI/CD Deployment

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

## Automatic Deployment

1. **Enable GitHub Pages in your repository**:

   - Go to repository settings → Pages
   - Set Source to "GitHub Actions"

2. **Push code to trigger deployment**:
   - Push to the `main` branch to trigger build and deploy
   - After successful build, your site will be available at `https://username.github.io/static-pages/`

## Manual Deployment (Optional)

If you need to deploy manually:

```bash
# Build and deploy to gh-pages branch
npm run deploy
```

## Deployment Configuration

- **GitHub Actions Workflow**: `.github/workflows/deploy.yml`
- **Vite Config**: Automatically sets correct base path
- **Router Config**: Uses `import.meta.env.BASE_URL` for adaptive paths

## Notes

1. Ensure the repository name matches the `base` path in `vite.config.ts`
2. If you change the repo name, update the `base` config in `vite.config.ts`
3. First deployment may take a few minutes to take effect
