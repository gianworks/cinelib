# AI Usage

This project was developed with AI assistance. This file records how AI was used during development.

## 1. How I used AI

### 2026-09-22 - Project idea and scope planning

- **Tool:** ChatGPT
- **What I asked for:** Helped evaluate possible React project ideas and determine which ideas fit the course requirements and two-week development timeline.
- **What it gave back:** Suggested possible project ideas and compared their complexity, features, and feasibility.
- **What I kept, what I changed, and why:** I used the suggestions to choose CineLib as the project idea. I adjusted the scope to focus only on movie browsing and personal library management to keep it achievable.
- **Commit:** N/A

### 2026-09-22 - Application structure planning

- **Tool:** ChatGPT
- **What I asked for:** Helped define CineLib's purpose, audience, features, pages, and database structure.
- **What it gave back:** Provided a proposed application structure, feature list, and database design.
- **What I kept, what I changed, and why:** I kept the overall structure but changed the database design to use only one `library_movies` table because it better matched the project's scope.
- **Commit:** N/A

### 2026-09-23 - Component and routing planning

- **Tool:** ChatGPT
- **What I asked for:** Helped plan the routes and component structure for the React application.
- **What it gave back:** Suggested routes, reusable components, and a component hierarchy.
- **What I kept, what I changed, and why:** I used the ideas as a guide when creating the Browse Movies and My Library pages, while adjusting components based on my implementation.
- **Commit:** https://github.com/gianworks/cinelib/commit/63cf7efe24d0ed651b55b15ba339284c497e8f68

### 2026-09-23 - UI component planning

- **Tool:** ChatGPT
- **What I asked for:** Helped plan reusable UI components such as the Navbar and SearchBar.
- **What it gave back:** Suggested component responsibilities and how they could be reused across pages.
- **What I kept, what I changed, and why:** I used the suggestions to create reusable components instead of duplicating UI code.
- **Commit:** https://github.com/gianworks/cinelib/commit/eef71e30bcb1b12f1825e5479faf36dbe2eb43a0

## 2. Where the AI got it wrong

### Case 1 - Too many suggested pages

- **What it gave me:** The AI initially suggested multiple pages such as separate Watchlist and Favorites pages.
- **What was wrong with it:** This increased the project scope beyond the required size and separated features that could be managed inside My Library.
- **What I did instead:** I reduced the application to two main sections: Browse Movies and My Library. Movie Details was kept as a separate reusable page accessed from both sections.
- **Commit:** N/A

### Case 2 - Incorrect database structure

- **What it gave me:** The AI initially suggested multiple database tables for movies, favorites, watchlists, and reviews.
- **What was wrong with it:** The structure was more complex than needed for CineLib's requirements.
- **What I did instead:** I changed it to a single `library_movies` table containing `id`, `tmdb_id`, `watch_status`, `rating`, `notes`, `is_favorite`, and `date_added`.
- **Commit:** N/A

### Case 3 - Movie details implementation approach

- **What it gave me:** The AI initially recommended using a modal window for movie details.
- **What was wrong with it:** I decided that a separate Movie Details page better matched the application's structure and navigation flow.
- **What I did instead:** I changed the design to use a dedicated Movie Details page that can be accessed from both Browse Movies and My Library.
- **Commit:** N/A

## 3. Who wrote what

### Written by me

#### Initial Project Setup

- **File:** `src/`
- **Commit:** https://github.com/gianworks/cinelib/commit/425917a29d03351cd05642bd8dbd23ae5c544566
- **What it does and why it is built this way:** I created the initial React project structure and implemented the application foundation. This provides the starting point for adding CineLib features.

#### Navbar and Search Components

- **File:** `src/components/Navbar.tsx`, `src/components/SearchBar.tsx`
- **Commit:** https://github.com/gianworks/cinelib/commit/eef71e30bcb1b12f1825e5479faf36dbe2eb43a0
- **What it does and why it is built this way:** These components provide reusable navigation and search functionality across the application. I created them as separate components to avoid repeating code and to keep the UI consistent between pages.

### The AI-written part I understand best

No AI-written code has been used in the project so far. AI assistance has mainly been used for project planning, documentation, feature decisions, and reviewing implementation approaches. Future AI-assisted code contributions will be documented here if used.