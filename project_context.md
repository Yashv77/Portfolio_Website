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
- **Display Scale Clipping Fix**: Removed `lg:justify-center` from the left sticky header in `Portfolio.jsx` and added `overflow-y-auto`. Previously, high display scaling shrank the logical screen height significantly, and `justify-center` forcefully centered the ~670px tall static content within a ~500px viewport, permanently pushing the top "Yash Vardhan" heading off-screen. To safely restore the vertical centering without breaking small screens, the static content was wrapped inside a new `my-auto` container, which effectively serves as a restoration point for vertical centering. This allows the content to dynamically center itself perfectly on large screens but collapse and align safely to the top on extreme viewports where scrolling is required.
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
- **Asset Migration**: Moved all static images and files from the legacy `_old_site/assets` folder exclusively into the Vite-standard `public/assets` directory and deleted the `_old_site` footprint. Refactored `initialData.js` to correctly point all project `imageUrl` strings safely to the `/assets/` root filepath, fixing the broken image loading on Netlify!

## Current Feature Additions
- **Prompt Summary**: The user requested a fluid background animation (greyish white on pro and greyish black on creative), blurred mask gradients on the top and bottom of scrolling cards, enlarging the name, adding Education, Skills & Softwares from resume, splitting projects into Academic and Personal, applying specified labels for sections per mode, updating section header font sizes, and adding major tags below the projects heading.
- **Updates**: Refactored initialData.js, split initialProjects into initialAcademicProjects and initialPersonalProjects. Created Education.jsx and Skills.jsx using resume data. Updated Portfolio.jsx adding custom maskImage for vertical fading carousel effect. Updated 	ailwind.config.js with blob CSS animation keyframes and mapped them dynamically in Portfolio.jsx background via nimate-blob and nimation-delay-2000. Changed nav sections logic mapped to specific labels for professional/creative mode. Updated heading font sizes inside About, Experience, and Projects components. Mapped the Projects component into two instances iterating over the Academic vs Personal segmented data arrays.
- **Bug Fix**: Added snap-center and min-h-[100svh] to Education.jsx and Skills.jsx wrapping containers so they reliably lock into the viewport tracking natively when scrolling the right-hand panel instead of being skipped over.
- **UI Tweaks**: Separated Skills.jsx into Skills.jsx and a robust Softwares.jsx component. Injected both at the very end of the vertical scrolling components sequence after Projects. Stripped the internal standalone <h2> heading blocks from Education, Skills and Softwares per user preference, favoring the nav tracking for navigation instead.
- **UI Tweaks**: Removed <h2> from About.jsx. Updated Portfolio.jsx navigation tracking labels entirely strictly to user specification (The Lore, Place where I supposedly learned things, etc). Adjusted creative backgrounds for ALL layout card containers to g-black mirroring the g-white Pro approach exactly.
- **Data Update**: Rebuilt initialEducation and initialSkills dynamically to contain internal {professional, creative} sub-objects and supplied unique sarcastic lines across all skill buckets and educational milestone texts as prompted.
- **UI Animations**: Engineered a CSS liquid swirling fluid background to accurately simulate a deep shifting silk cloth using mathematically calculated order-radius morphs rotating over an animated timeline. Applied a Framer Motion whileInView Intersection scale-blur algorithm to every card section across the site so they visually sink and blur out (scale: 0.9, blur: 8px) near the screen extents, but snap forward sharp and elevated (scale: 1, blur: 0px) when vertically centered.
- **UI Layout**: Removed the static array of major tags positioned above the entire Projects layout wrapper and individually mapped project.category to render directly under <h3 className=	ext-2xl font-bold...> {project.title[mode]} </h3> utilizing the specific card object variables (Data Analysis, Mechanical, etc).
- **Background Expansion**: Significantly widened the \liquidFlow\ background fluid blobs in \Portfolio.jsx\. Pushed their \	op/left\ and \ottom/right\ limits to 30%, increased their total span to \90vw\, and raised \lur\ limits to cleanly disperse color mesh out to the ultimate page corners.
- **Typography Scaling**: Scaled up side navigation text labels to \	ext-sm md:text-base\. Augmented the active \Experience\ and \Projects\ visible section headers from \	ext-2xl\ up to \	ext-3xl md:text-4xl\ to give stronger aesthetic balance against massive spacing block sizing.
- **Headless CMS Completion**: Fully implemented <EditableText> inline editing across all remaining sections (Education, Projects, Skills, Softwares). Added massive admin UI capability directly into the floating cards: specific array rearrangement methods (moveItem), object deletion (deleteItem), and object injection (ddNew...). Hovering any card now shows Up/Down/Delete manipulation toggles, and sections feature + Add Project/Skill/Tag features which inherently write backwards through Zustand state seamlessly to Supabase.
- **Supabase Authentic Security Implementation**: Nuked frontend-only admin hashing bypass. Interfaced AdminLogin entirely via @supabase/supabase-js native signInWithPassword. Bound App.js global state listener to supabase.auth.onAuthStateChange. Integrated physical Sign Out button on the primary HUD alongside cloud sync.
- **Project UI Restoration**: Remapped the Projects layout to ensure full min-h-[90svh] snapping viewport separation. Fixed the collapse of the vertical carousel layout and injected dynamic scroll buttons (animated V arrows) to skip smoothly up and down adjacent elements.
- **UI Aesthetics Tweaks**: Realigned the carousel chevron arrows to sit flush within the flex flow grid (mt-6, mb-6) rather than absolute screen edges. Masked the raw image URL EditableText input completely behind an isAdmin flag so it vanishes entirely for regular users. Implemented items-center on the ProjectCard grid so the physical image object automatically vertically anchors centrally alongside text bodies regardless of description height.
- **UI Aesthetics Tweaks**: Removed text labels from the Mode Toggle buttons on both Mobile and Desktop views, increasing icon scale to properly represent a purely minimalist graphical interface toggle.
- **Resume PDF Exporter Restructure**: Scrapped unstable LaTeX CORS external API POST generation pipelines. Installed html2pdf.js library natively to the frontend. Implemented a perfectly matched invisible HTML/Tailwind LaTeX layout clone mirroring rticle.cls constraints that successfully rips data straight to native PDF binary locally on user demand.
- **Fully Native Vector PDF Rendering Engine Implementation**: Deprecated html2pdf.js due to HTML layout engine snapping and overflow failures. Installed @react-pdf/renderer generating mathematical, exact, fully-selectable LaTeX structure duplicates directly into native PDF binaries via Document construction without breaking DOM tree calculations.
- **Point-Wise Explicit Separation Engine**: Converted description parsing engines in Experience.jsx, Projects.jsx, and EditableText.jsx allowing the user to naturally type explicit multiline structures spanning new lines (via text-area) which are programmatically rendered down as strict <ul list-disc><li> HTML items natively to explicitly separate project scopes into points on save.\n- **LIFO Card Addition**: Reconfigured ddNewExperience array destructuring priority to rigidly inject newly instanced empty cards at index[0] rather than popping appending to the absolute bottom.
- **Resume Builder Dual-Pane System**: Completely discarded the simple PDF Generator modal. Engineered a dual-pane builder matrix. The left pane functions as an isolated state builder decoupling PDF form texts from the global store, allowing absolute toggle/omit features and string overriding. The right pane binds a @react-pdf/renderer <PDFViewer> natively embedding a real-time live-update PDF mirror scaling dynamically.

- **Reverted Add Section Feature**: Removed the custom sections CMS (customSections array in useStore, dynamic Experience/Projects rendering in Portfolio.jsx, onUpdateWrapper prop drilling in Experience.jsx and Projects.jsx, and the Add Section admin button). All components reverted to their original direct-store patterns.

## Detail Page & New Sections Feature (April 8, 2026)
- **Extracurricular Section**: Added xtracurricularData to store and initial data. New Extracurricular.jsx section component with timeline-style cards, admin CRUD, and navigation to detail pages.
- **Blog Section**: Added logData to store and initial data. New Blog.jsx section component with card layout, cover images, excepts, and click-through to detail pages.
- **Rich Detail Pages**: Created DetailPage.jsx component accessible via /detail/:type/:id route. Supports block-based content editing:
  - Text/Paragraph blocks
  - Heading blocks
  - Image blocks (with URL + caption)
  - Link card blocks (with URL, title, description)
  - Admin can add, edit, reorder, and delete blocks
- **Clickable Cards**: Every project, experience, education, extracurricular, and blog card now navigates to its own detail page when clicked. Admin mode shows an ExternalLink shortcut button.
- **Data Architecture**: Each item now supports a detailBlocks array field for rich content storage.

### Data & Embed Updates (April 8, 2026 - Continued)
- **Extracurricular Data**: Replaced placeholder data with 4 real entries from resume: Team Ultron Motorsports chassis lead, Concept EV design head, Team Neki community outreach, and Upwork freelancing. All with detailed bullet-point descriptions.
- **Blog Data**: Replaced placeholder with a real blog post on ATV chassis design with 4 headed sections and full content blocks.
- **Document/PDF Block**: New block type document for embedding PDFs via iframe. Supports direct PDF URLs and auto-converts Google Drive view links to preview links. Has title, height config, and an Open button.
- **Embed Block**: New block type mbed for general iframe embeds (YouTube, Figma, CodePen, etc.). Supports title, height, and fullscreen.
- **Block Types Available**: text, heading, image, link, document, embed (6 total).

### Scroll & Visibility Fixes (April 8, 2026)
- **Root cause**: snap-mandatory on the scroll container prevented stopping at sections without internal snap-center items. Changed to snap-proximity.
- **Animation fix**: Extracurricular cards changed from opacity 0.3 + blur (needing 50% viewport) to simple fade-in with once: true and low margin.
- **Snap points**: Added snap-start, min-h-[100svh], and vertical centering to Extracurricular and Blog wrappers.
- **Section order**: Reordered content to match nav: about → education → experience → projects → extracurricular → blog → skills → softwares.

- **React Router**: Added v7 future flags (v7_startTransition, v7_relativeSplatPath) to BrowserRouter to suppress deprecation warnings.

### Section Consistency Fix (April 9, 2026)
- **All sections now have headings**: About, Education, Skills, Softwares now have section titles matching the nav labels (pro/creative modes).
- **All sections snap-center**: Every section uses snap-center w-full min-h-[100svh] flex flex-col justify-center py-12 px-6.
- **Unified pattern**: heading + add button at top, cards below. Consistent padding (px-6 on wrapper, no inner px-6).
- **Snap restored to mandatory**: Since all sections now have snap-center, snap-mandatory gives reliable center snapping.

### Scroll & Layout Revert (April 9, 2026)
- **Reverted**: Removed the forced snap-center wrapper and headings that broke continuous scrolling of large sections (Experience, Projects).
- **Restored**: Original clean layouts for About, Education, Skills, Softwares.
- **Scroll Container**: Reverted to snap-proximity to allow smooth scrolling through tall sections without aggressive snapping glitches.

### Strict Snapping and Card Behavior Fix (April 9, 2026)
- Set main portfolio scroll container to snap-mandatory to forcefully snap to the next component with any small scroll delta.
- Transformed Extracurricular and Blog to act exactly like Projects: each card item inside is its own full-screen snap-center min-h-[90svh] container, ensuring strict 1-by-1 snapping.
- Education naturally snaps the entire block of 3 cards at once because its parent wrapper is the snap-center min-h-[100svh] boundary.
- Removed textual <h2/> section headings completely above components (Experience, Projects, Blog, Extracurricular) to ensure full screen estate is cleanly used for the items themselves during snapping.

### Sidebar Nav & PDF Generator Update (April 9, 2026)
- Re-arranged the Portfolio.jsx mappings to position Blog strictly below Softwares at the very edge of the page.
- Updated the ResumeGeneratorModal: Rewrote the PDF document mapping to stop using hardcoded Extracurricular data. 
- Added ExtracurricularData pulling dynamically from the Zustand useStore to map real extracurricular items.
- Inserted an Extracurricular tab inside the PDF Builder form Modal to toggle them visibly in and out before downloading the PDF.

### Direct Database Injection (April 19, 2026)
- Created a Python script leveraging the local supabase.js Rest API credentials to extract live web data without discarding recent inline edits.
- Validated existing personalProjectsData schema and pushed 5 new Data Science and ML projects sequentially to the Supabase dataset.

### Data Science Summarization & AI Content Generation (April 19, 2026)
- Paraphrased and reduced the length of the 5 newly injected Data Science projects to prevent UI overflowing while retaining highly technical keywords.
- Generated 5 customized, ultra-modern tech-style dashboard and data mapping graphics via AI generation tools to match the glassmorphism website aesthetic.
- Hooked new imageUrl parameters pointing to the newly bundled assets inside the local data repository.

### Responsive Typography & Sizing Fix (May 1, 2026)
- **Issue**: User reported that the portfolio "looks way too big" and disorganized on some devices, sharing screenshots where the primary "Yash Vardhan" heading wrapped to a second line and UI elements appeared excessively large. Upon further investigation, this was due to browser-level font size preferences scaling up `rem` units dynamically on different PCs.
- **Resolution**: Implemented responsive font scaling across key components and locked the base root font size.
- **Font Scale Lock**: Added `html { font-size: 16px !important; }` to `index.css` to strictly force `1rem = 16px`, completely decoupling the Tailwind text utility sizing from unpredictable browser font preferences and guaranteeing the layout aspect ratio everywhere.
- **Portfolio.jsx**: Reduced the massive `lg:text-8xl` primary heading down to a fluid `text-4xl sm:text-5xl lg:text-6xl xl:text-7xl` progression. Also scaled down the subtitle slightly to maintain hierarchy.
- **About.jsx**: Adjusted the large body text from a static `text-lg` to a responsive `text-base md:text-lg` and added `max-w-xl` to the content card so it doesn't infinitely stretch on ultra-wide screens.
- **Softwares.jsx**: Adjusted the padding and text sizing of the skill badges to be slightly smaller and fluid (`text-xs md:text-sm`) and added `max-w-xl` to its container.
- **Global 25% Scale Reduction**: Reduced the locked root `html` font size in `index.css` from `16px` down to `12px`. Because TailwindCSS strictly utilizes `rem` units for nearly all typography, margins, padding, and max-widths, overriding this base size down by exactly 25% shrinks the entire UI layout and spacing uniformly without requiring individual component adjustments, providing the user with their explicitly requested 25% smaller aesthetic.
