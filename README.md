# Abdul Qayyum Ishak - Portfolio

A lightweight, mobile-first portfolio for Abdul Qayyum Ishak, Senior Mobile Application Developer.

## Highlights

- Semantic HTML, custom CSS, and dependency-free JavaScript
- Responsive layouts for mobile, tablet, and desktop
- Accessible navigation, keyboard controls, and reduced-motion support
- Dark developer-focused visual system with responsive cards, timelines, and subtle motion
- Career timeline, selected work, full project archive, skills, achievements, and education
- Locally hosted 2026 CV and optimized profile image

## Local preview

No build step is required. Serve the repository root with any static file server, for example:

```sh
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Deployment

This portfolio is a static site, so GitHub Pages can publish it directly from the repository without a build step.

### Deploy with GitHub Pages

1. Push the latest version to the `master` branch:

   ```sh
   git add .
   git commit -m "Update portfolio"
   git push -u origin master
   ```

2. Open the repository on GitHub:
   [github.com/wasddsaw/portfolio](https://github.com/wasddsaw/portfolio)

3. Go to **Settings → Pages**.

4. Under **Build and deployment** configure:

   - **Source:** Deploy from a branch
   - **Branch:** `master`
   - **Folder:** `/ (root)`

5. Select **Save**. GitHub will start the first deployment. Its progress is available from the repository’s **Actions** tab.

6. When deployment finishes, the site will be available at:
   [https://wasddsaw.github.io/portfolio/](https://wasddsaw.github.io/portfolio/)

### Publish future changes

GitHub Pages redeploys automatically whenever new commits are pushed to `master`:

```sh
git add .
git commit -m "Describe the portfolio update"
git push origin master
```

### Repository URL and authentication

Use a credential-free HTTPS remote and let Git Credential Manager, GitHub CLI, or SSH handle authentication:

```sh
git remote set-url origin https://github.com/wasddsaw/portfolio.git
git remote -v
```

Do not place a GitHub personal access token directly inside the repository’s remote URL.

### If the repository name changes

Update the canonical, Open Graph, Twitter image, and JSON-LD URLs in `index.html` so they match the new GitHub Pages address.

For additional publishing options and troubleshooting, see GitHub’s official [Pages publishing-source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
