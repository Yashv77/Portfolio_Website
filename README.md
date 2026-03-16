# Portfolio Website Redesign

This is a modern, responsive, and high-performance React portfolio application using Vite, TailwindCSS, React Router, and Framer Motion. 

## Features
- **Dual Personality Mode**: Users can toggle between a "Professional" mode and a "Creative" mode, dynamically altering copy, styling, layouts, and tone.
- **Scroll Snapping**: Project list is shown using full vertical scroll snap sections.
- **Admin Edit Dashboard**: Hidden path `/signin` -> `/admin` to allow content updates (stored via `localStorage`).

## Getting Started

1. Clone or download the repository.
2. Ensure you have Node.js installed.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the local server:
   ```bash
   npm run dev
   ```

## Netlify Deployment Instructions

This website is a frontend-only Single Page Application (SPA), which makes deploying to Netlify very straightforward.

### Method 1: Connecting a Repository (Recommended)
1. Push your code to a GitHub, GitLab, or Bitbucket repository.
2. Log in to [Netlify](https://app.netlify.com/).
3. Click on **Add new site** > **Import an existing project**.
4. Select your repository provider and authorize Netlify.
5. Pick your portfolio repository.
6. In the build settings, enter:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
7. Click **Deploy site**.

### Method 2: Manual Deploy
1. Run `npm run build` on your local machine to generate the `dist` folder.
2. Log in to Netlify.
3. Drag and drop the `dist/` folder into the "Sites" tab in the Netlify dashboard.

### Important Note: Netlify Redirects for React Router
To prevent 404 errors when navigating directly to routes like `/projects` or `/admin`, create a `_redirects` file in the `public/` folder with the following content:
```
/*    /index.html   200
```
*(This tells Netlify to direct all traffic to your React application)*

## Admin Login
- **URL**: `/signin`
- **Default password**: `admin123`
