# Portfolio Website Redesign Context

## Purpose
Convert an existing plain HTML/CSS portfolio into a modern React application utilizing Vite, TailwindCSS, Framer Motion, and React Router. The website will feature a "Dual Personality Mode," enabling users to switch between a Professional and Creative tone/theme.

## Tech Stack
- Frontend Framework: React (via Vite)
- Routing: React Router
- Styling: TailwindCSS (with `dark` class toggling for themes)
- Animations: Framer Motion
- Icons: Lucide React
- State Management: Zustand (with `localStorage` persistence)

## Architecture & Features
- `components/Navbar.jsx`: Fixed navigation bar containing the theme switch button.
- `pages/Home.jsx`: Landing section introducing the user with mode-specific messaging.
- `pages/About.jsx`: Detail section toggling between professional history and a more playful "lore" description.
- `pages/Experience.jsx`: Timeline layout of the user's past work and internship experiences.
- `pages/Projects.jsx`: Scrolling snapped full-screen page sections detailing each project. Features gradients and blurred background images.
- `pages/AdminLogin.jsx` & `pages/AdminDashboard.jsx`: A secure section (frontend path `/signin`) allowing the user to log in and edit portfolio data directly which syncs to `localStorage`.
- `data/initialData.js`: Centralized content to initialize the application state.

## Recent Changes
- Initialized a brand-new Vite React application.
- Migrated legacy `index.html`, `styles.css`, and static `assets/` to an obsolete directory `_old_site`.
- Created all necessary React components (`Navbar`, `Home`, `About`, `Experience`, `Projects`, `AdminLogin`, `AdminDashboard`).
- Implemented global state via `Zustand` to orchestrate mode changes and persist editable data to `localStorage`.
- Added TailwindCSS dark mode support and custom scroll snap CSS utilities.

## Current Developer Prompt
Use the all content that is already there on the website and implement the change following the given instructions... (Objective: Build a modern, high-performance portfolio website with Professional Mode and Creative Mode... Admin Editing Panel...)

## Latest Change Summary
- **Issue**: User requested that the left panel stays precisely centered vertically, the right panel items should individually snap vertically (ratcheting/jackpot effect) filling full screen height, and the creative theme should strip `cyan` colors in favor of `black` and `grey` tones (`stone` tailwind palette).
- **Resolution**: Let's review the precise alterations!
- **Left Panel**: Applied `h-full lg:justify-center` flex alignments so the static details automatically hover in the exact vertical middle of the available space instead of stretching to boundaries.
- **Right Panel**: Applied `snap-y snap-mandatory` along with `overflow-y-auto` hiding the native scrollbar. Inside `Experience.jsx`, `About.jsx`, and `Projects.jsx`, every individual mapped card/section was given `snap-center min-h-[100svh] flex flex-col justify-center`. This perfectly emulates the ratcheting wheel scrolling the user requested.
- **Color Palettes**: Replaced all `cyan` references across all files mapping the Creative theme directly to `stone` variants (`stone-950`, `stone-300`, `stone-800`, etc.) ensuring a distinctly monochrome, sleek aesthetic.
- **UI Improvements**: Replaced plain background with an overlaid grid pattern alongside glowing localized radial gradients that dynamically fade depending on Pro vs Creative Mode.
- **Custom Logo**: Replaced the generic Monitor icon with the exact Upwork SVG logo dynamically rendered.
- **Interactive Shift**: Re-situated the Mode Toggle switch out of the fixed top-right corner to neatly anchor itself in the bottom-left corner of the primary static left panel text, expanding naturally for desktop and keeping a minimized floating version specifically for mobile viewing footprint.
- **Visual Polish**: Increased grid pattern size to `48px` and made the vignette wider with a smoother `ellipse_at_center` radial gradient.
- **Active Navigation Tracking**: Updated `IntersectionObserver` config in `Portfolio.jsx` applying `rootMargin: "-40% 0px -50% 0px"` logic so right-side snapshot items spanning more than a full viewport accurately trigger their respective `About`/`Experience`/`Projects` nav indicators upon intersecting the screen's vertical axis.
- **Image Formatting**: Enforced `aspect-video w-full` across project thumbnail imagery providing rigid 16:9 compliance regardless of responsive scaling.
- **Performance Tweak**: Swapped lagging CSS utility transition delays (`duration-500` and `duration-700`) mapping to mode switches for far snappier `duration-300 ease-in-out` curves resulting in completely smooth yet highly responsive immediate visual logic.
- **Admin Dashboard Farm**: Completely rewrote `AdminDashboard.jsx` to function as a fully-featured CMS (Content Management System) or "Farm". It now maps out the entirety of both the `Projects` and `Experience` arrays, providing interactive adding hooks, raw UI form inputs editing Professional & Creative variations concurrently, array-tag modifications, state-bound delete keys, and bulk-save persistence to `localStorage` via Zustand hooks.
- **Missing Project Population**: Retrieved the 5 missing static html projects from early `index.html` cache (`Text-Encryption Chrome Extension`, `Website-Locker Chrome Extension`, `Shell Eco-Marathon EV Urban Concept`, `Portable Digital Storage Oscilloscope`, `Waste Wrapper as Fuel for Water Desalination`) and inserted them directly into `initialData.js` arrays padding out the full 10-count stack alongside newly conceptualized "Creative Mode" copy text variations for all 5. Also provided a "Reset Data To Default" failsafe button inside the Admin Dashboard to flush manual local storage states and force-load the 10 projects instantly.
- **Deployment Fix**: Added `netlify.toml` and `public/_redirects` to explicitly configure the Vite `dist` directory as the deployment artifact and force 200 HTTP routing for client-side navigation. This eliminates Netlify's "legacy prerendering" and "application/octet-stream" module load freezing issues since Netlify was incorrectly attempting to natively serve un-compiled `.jsx` maps.
  - *Addendum*: Followed up with an update modifying the `netlify.toml` build command to exactly `npm ci --include=dev && npm run build`. By default, Netlify prunes explicit DEV dependencies like `vite` if it detects certain production environments leading to `sh: 1: vite: Permission denied`. This explicit command forces Netlify to bootstrap the Dev package mapping first before spawning the binary execution context.
