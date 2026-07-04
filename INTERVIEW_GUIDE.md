# Interview Preparation Guide: Store Rating Application

This document provides architectural defenses and strategic answers for potential technical interview questions regarding this project.

## 1. Why Sequelize over Prisma or Raw SQL?
**Defense**: "We chose Sequelize to maintain absolute control over the SQL dialects while retaining the benefits of a robust, mature ORM. Unlike Prisma which runs a separate Rust engine (which can bloat serverless cold starts), Sequelize natively integrates into Node.js. It also forces us to strictly define our schema in code, making migrations highly predictable. Finally, we abstracted Sequelize entirely behind a **Repository Layer**, meaning if we ever needed to swap to Raw SQL for performance, the Service layer wouldn't even know it happened."

## 2. Explain your Role-Based Access Control (RBAC) strategy.
**Defense**: "RBAC is enforced on both ends. On the backend, we verify the JWT in middleware and attach the decoded user payload to `req.user`. A secondary middleware (`authorizeRoles`) explicitly checks if `req.user.role` matches the route requirements, throwing a `403` if it fails. On the frontend, we mirror this using a `<ProtectedRoute>` wrapper that intercepts rendering. If a Store Owner tries to load an Admin URL, the frontend blocks the component mount and redirects them. This double-layer ensures the UI is honest and the API is secure."

## 3. Why did you use CSS Custom Properties instead of Tailwind?
**Defense**: "To guarantee absolute consistency (`impeccable` constraint) and to prevent 'utility-class soup'. By extracting exact tokens (`--spacing-16`, `--color-primary`, `--shadow-sm`) into a central `theme.css`, we ensured that every single developer on the team uses the exact same visual language. It makes implementing Dark Mode trivial in the future, keeps the JSX highly readable, and drastically reduces the final CSS bundle size (which compiled to under 4kB)."

## 4. How did you handle Component Reusability?
**Defense**: "We banned duplicate UI logic. If a page needed a button, it imported the shared `<Button>` atom. We built generic `<FilterBar>`, `<SearchBar>`, and `<Pagination>` molecules. For example, the `StatsGrid` and `DashboardCard` used by the Admin to view total users are the exact same components imported by the Store Owner to view total ratings. This dramatically lowered our maintenance surface area."

## 5. How did you handle State and Performance?
**Defense**: "We avoided heavy global state managers like Redux because the application state is primarily server-driven. We used custom hooks (`useStoreRatings`, `useUsers`) to encapsulate Axios fetch logic and local loading states. Crucially, we bound the state of searches, sorting, and pagination directly to the **URL parameters** (`useSearchParams`). This means users can bookmark search results, and refreshing the page doesn't break the application flow. We also utilized `isSubmitting` bounds on all forms to prevent duplicate network calls."

## 6. What is the most complex part of the architecture?
**Defense**: "The integration between the Frontend Custom Hooks and the Backend Repositories when handling nested sorting and pagination. Ensuring that the database efficiently queried paginated data while also applying text-search filters required careful Sequelize `where` and `limit/offset` orchestration, which was then perfectly mirrored by the frontend UI state."
