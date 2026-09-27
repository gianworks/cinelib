# AI Usage

This project was developed with AI assistance. This file records how AI was used during development.

## 1. How I used AI

### 2026-09-22 - Project idea and scope planning

- **Tool:** ChatGPT
- **What I asked for:** Helped evaluate possible React project ideas and determine which ideas fit the course requirements and two-week development timeline.
- **What it gave back:** Suggested possible project ideas and compared their complexity, features, and feasibility.
- **What I kept, what I changed, and why:** I used the suggestions to choose CineLib as the project idea. I adjusted the scope to focus on movie browsing and personal library management to keep it achievable.
- **Commit:** N/A

### 2026-09-22 - Application structure planning

- **Tool:** ChatGPT
- **What I asked for:** Helped define CineLib's purpose, audience, features, pages, and database structure.
- **What it gave back:** Provided a proposed application structure, feature list, and database design.
- **What I kept, what I changed, and why:** I kept the overall idea but changed the database design to use only one `library_movies` table because it better matched the project's scope.
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

### 2026-09-24 - Frontend component implementation

- **Tool:** ChatGPT
- **What I asked for:** Helped with structuring reusable movie-related components and organizing the Browse page.
- **What it gave back:** Suggested approaches for component separation and reusable UI patterns.
- **What I kept, what I changed, and why:** I used the suggestions as a reference but implemented and adjusted the components based on CineLib's requirements.
- **Commit:**  
https://github.com/gianworks/cinelib/commit/6c4ab484f57f64239178fd8b571dd4f577091966
https://github.com/gianworks/cinelib/commit/fbcb7565eafe2771aab10769d24f1d146e081818

### 2026-09-25 - TMDB API integration and movie filtering

- **Tool:** ChatGPT
- **What I asked for:** Helped implement Axios API requests, TMDB API integration, movie searching, filtering, and sorting.
- **What it gave back:** Provided guidance on API service structure, discover endpoints, and connecting filter values with TMDB query parameters.
- **What I kept, what I changed, and why:** I used the guidance for the movie filtering implementation but adjusted the logic based on CineLib's requirements.
- **Commit:**  
https://github.com/gianworks/cinelib/commit/f19654530561a1f83082b95aa8f3fddf5094a3f5
https://github.com/gianworks/cinelib/commit/842d0f9a12285276eb8be20eee69250c3d6e46fd

### 2026-09-26 - Movie Details page implementation

- **Tool:** ChatGPT
- **What I asked for:** Helped plan the Movie Details page, including displaying movie information, cast, crew, images, and connecting movie data from TMDB.
- **What it gave back:** Provided guidance on component structure and handling multiple API requests.
- **What I kept, what I changed, and why:** I used the suggestions to structure the page but implemented the final layout and features based on CineLib's design.
- **Commit:**  
https://github.com/gianworks/cinelib/commit/070804bdd9306daf10007a58724e4a82d3c60b50

### 2026-09-26 - Backend setup and API structure

- **Tool:** ChatGPT
- **What I asked for:** Helped plan the Express backend structure, PostgreSQL connection, API routes, controllers, and services.
- **What it gave back:** Suggested backend organization and approaches for handling library movie data.
- **What I kept, what I changed, and why:** I used the suggested structure as a starting point but modified it to fit CineLib's single-table library design.
- **Commit:**  
https://github.com/gianworks/cinelib/commit/fdf0944d0836461c98deb5ca39de85d081d29f53

### 2026-09-27 - Library management implementation

- **Tool:** ChatGPT
- **What I asked for:** Helped implement movie library functionality, including backend API communication, database initialization, and displaying saved movies.
- **What it gave back:** Provided guidance for creating library endpoints, database operations, and frontend integration.
- **What I kept, what I changed, and why:** I used the guidance for some backend API implementation and database initialization, then adjusted the code to match CineLib's requirements.
- **Commit:**  
https://github.com/gianworks/cinelib/commit/a788ca3ef95a57b00822fd50ef748f57f637e6c5
https://github.com/gianworks/cinelib/commit/9a7f7270f90f4ddd0b61de78e39ce1954d71a847

### 2026-09-27 - Environment configuration

- **Tool:** ChatGPT
- **What I asked for:** Helped review environment variable usage and project configuration documentation.
- **What it gave back:** Guidance on separating secrets from source code and documenting required environment variables.
- **What I kept, what I changed, and why:** I created environment example files containing placeholders only and kept actual credentials outside the repository.
- **Commit:**  
https://github.com/gianworks/cinelib/commit/93fa0e82052a58740abca6dfb8980a02d9299b4b

---

## 2. Where the AI got it wrong

### Case 1 - Too many suggested pages

- **What it gave me:** The AI initially suggested multiple pages such as separate Watchlist and Favorites pages.
- **What was wrong with it:** This increased the project scope beyond what was needed and created unnecessary separation between related features.
- **What I did instead:** I reduced the application to Browse Movies and My Library as the main sections. Movie Details was kept as a separate page for viewing movie information.
- **Commit:** N/A

### Case 2 - Incorrect database structure

- **What it gave me:** The AI initially suggested multiple database tables for movies, favorites, watchlists, and reviews.
- **What was wrong with it:** The design was more complex than needed for CineLib's requirements.
- **What I did instead:** I changed the database design to use one `library_movies` table containing the required library information.
- **Commit:** N/A

### Case 3 - Movie details implementation approach

- **What it gave me:** The AI initially suggested using a modal for displaying movie details.
- **What was wrong with it:** A modal did not fit the navigation structure I wanted for CineLib.
- **What I did instead:** I implemented a dedicated Movie Details page that can be accessed from both Browse Movies and My Library.
- **Commit:** N/A

---

## 3. Who wrote what

### Written by me

#### Initial Project Setup

- **File:** `src/`
- **Commit:** https://github.com/gianworks/cinelib/commit/425917a29d03351cd05642bd8dbd23ae5c544566
- **What it does and why it is built this way:** I created the initial React project structure and application foundation. This provides the base structure for adding CineLib features and organizing the frontend code.

#### Navbar and Search Components

- **File:** `src/components/Navbar`, `src/components/SearchBar`
- **Commit:** https://github.com/gianworks/cinelib/commit/eef71e30bcb1b12f1825e5479faf36dbe2eb43a0
- **What it does and why it is built this way:** I implemented reusable navigation and search components to avoid duplicated UI code and maintain consistent layouts across pages.

#### Movie Display Components

- **File:** `MovieCard`, related Browse components
- **Commit:**  
https://github.com/gianworks/cinelib/commit/fbcb7565eafe2771aab10769d24f1d146e081818
- **What it does and why it is built this way:** I created reusable movie card components and organized the frontend structure to support displaying movies retrieved from TMDB.

#### Dropdown Filters and Browse Interface

- **File:** `DropdownButton`, Browse page components
- **Commit:**  
https://github.com/gianworks/cinelib/commit/6c4ab484f57f64239178fd8b571dd4f577091966
- **What it does and why it is built this way:** I implemented reusable dropdown components and integrated them into the Browse page to provide movie filtering controls.

#### Movie Details Page

- **File:** `MovieDetails` component and related styles
- **Commit:**  
https://github.com/gianworks/cinelib/commit/070804bdd9306daf10007a58724e4a82d3c60b50
- **What it does and why it is built this way:** I created a dedicated Movie Details page that displays detailed movie information including the poster, backdrop, genres, runtime, rating, cast, and crew.

#### Library Movie Display Components

- **File:** `LibraryMovieCard`, `MyLibrary`
- **Commit:**  
https://github.com/gianworks/cinelib/commit/9a7f7270f90f4ddd0b61de78e39ce1954d71a847
- **What it does and why it is built this way:** I implemented the My Library page and LibraryMovieCard component to display saved movies and provide library search functionality. The components were separated to keep the movie display logic reusable and maintain a clean component structure.

---

### The AI-written part I understand best

#### Movie Filtering and TMDB Discover API Integration

- **File:** TMDB API service and Browse filtering logic
- **Commit:**  
https://github.com/gianworks/cinelib/commit/f19654530561a1f83082b95aa8f3fddf5094a3f5  
https://github.com/gianworks/cinelib/commit/842d0f9a12285276eb8be20eee69250c3d6e46fd
- **What it does and why we kept it:** This handles retrieving movies from TMDB and applying filters such as genre, year, and sorting options. We kept this approach because it uses TMDB's existing API capabilities while providing the required movie discovery features.

#### Backend API and Database Initialization

- **File:** Backend API routes, controllers, services, and database initialization
- **Commit:**  
https://github.com/gianworks/cinelib/commit/fdf0944d0836461c98deb5ca39de85d081d29f53  
https://github.com/gianworks/cinelib/commit/a788ca3ef95a57b00822fd50ef748f57f637e6c5
- **What it does and why we kept it:** This handles parts of the backend structure, library movie API endpoints, and PostgreSQL database initialization. We kept this approach because it provides a simple backend structure that supports CineLib's library management features.