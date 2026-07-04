# Store Rating Application

A production-grade, highly scalable SaaS platform for managing store ratings, built with React, Node.js, Express, and MySQL (Sequelize).

## Architecture Overview
The application utilizes a classic MVC/layered architecture on the backend, ensuring a strict separation of concerns. 
- **Repository Layer**: Abstracts Sequelize operations.
- **Service Layer**: Contains core business logic.
- **Controller Layer**: Handles HTTP requests, validations (Joi), and responses.
- **Frontend**: A modular React SPA utilizing custom hooks, Axios interceptors for JWT, and a completely generic, reusable UI component library driven by CSS custom properties.

## Tech Stack
- **Frontend**: React (Vite), React Router v6, React Hook Form, Zod, Lucide-React.
- **Backend**: Node.js, Express, Sequelize ORM, Joi, JSONWebToken, Bcrypt.
- **Database**: MySQL.

## Features
- **RBAC**: Multi-tiered Role-Based Access Control (Admin, Store Owner, User, Guest).
- **Admin Module**: Full CRUD over Users and Stores. Dashboard statistics.
- **Store Owner Module**: Specialized analytics dashboard and sorted ratings view.
- **User Module**: Browsing, searching, and submitting 1-5 star ratings for stores.
- **Security**: JWT-based authentication, password hashing, boundary validation on all inputs.

## Installation & Setup

1. **Clone the repository**
2. **Database Setup**
   Ensure MySQL is running locally or via Docker. Create a database named `store_rating_db`.
3. **Backend Setup**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Update .env with your MySQL credentials
   npm run start
   ```
4. **Frontend Setup**
   ```bash
   cd client
   npm install
   cp .env.example .env
   npm run dev
   ```

## Scripts
- **Backend**: `npm run start` (Starts the server), `npm run dev` (Nodemon).
- **Frontend**: `npm run dev` (Vite dev server), `npm run build` (Production build), `npm run lint` (ESLint).

## Deployment Instructions
- **Backend (Render / Heroku / PM2)**: Set environment variables in the host dashboard. Ensure the host provides a MySQL instance. Build and run `node src/server.js`.
- **Frontend (Vercel / Netlify)**: Connect the GitHub repository, set `VITE_API_URL` to your deployed backend URL. The build command is `npm run build` and output directory is `dist`.



also the login credentials for the :
## Admin
email: admin@demo.com
password:admin123
## Store Owner
email:owner@demo.com
password:password123
## User
can create their account and rate the available stores

