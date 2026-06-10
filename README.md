# TaskPilot 🚀

A production-ready Task Management Dashboard built with Next.js, TypeScript, and Node.js.

**Live Demo:** [https://task-pilot-gamma-nine.vercel.app](https://task-pilot-gamma-nine.vercel.app)  
**API:** [https://api-task-pilot.onrender.com](https://api-task-pilot.onrender.com)

---

## Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **TanStack Query** — data fetching, caching, optimistic updates
- **ShadCN UI** + **Tailwind CSS**

### Backend
- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT Authentication**
- **REST API**

---

## Features

- JWT-based authentication (register, login, logout)
- Protected routes
- Dashboard with task metrics (total, completed, pending, completion %)
- Chart.js visualizations — donut chart + bar chart
- Create, edit, delete tasks
- Mark tasks as completed
- Search tasks by title/description
- Filter tasks by status (pending / completed)
- Overdue and due-soon indicators
- Responsive — mobile first

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd taskpilot
```

### 2. Backend setup

```bash
cd api
npm install
```

Create `.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskpilot
JWT_SECRET=your_secret_key_here
```

Generate JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Start dev server:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd web
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## API Reference

### Auth

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login | No |
| POST | `/api/auth/logout` | Logout | Yes |

### Tasks

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/tasks` | Get all tasks (supports `?status=` and `?search=`) | Yes |
| GET | `/api/tasks/stats` | Get dashboard metrics | Yes |
| GET | `/api/tasks/:id` | Get single task | Yes |
| POST | `/api/tasks` | Create task | Yes |
| PATCH | `/api/tasks/:id` | Update task | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Yes |

### Task Schema

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "status": "pending | completed",
  "dueDate": "Date",
  "createdAt": "Date"
}
```

### Auth Header

```
Authorization: Bearer <token>
```

---

## Architecture Decisions

**Feature-based structure** — `packages/user` and `packages/task` each own their controller and routes. Easy to scale, easy to find things.

**Service layer** — controllers are thin. All DB logic lives in `UserService` / `TaskService`. Separation of concerns.

**TanStack Query** — used for all client-side data fetching. Query keys are centralized in `TASK_KEYS` for consistent cache invalidation across create/update/delete mutations.

**JWT stateless auth** — token stored client-side. Server validates on every protected request via `authMiddleware`. No server-side session storage needed.

**MongoDB with Mongoose** — flexible schema fits the task model. `userId` stored as string for simplicity; Mongoose handles ObjectId coercion in queries.

---

## Assumptions

- Single user per account — tasks are scoped to `userId`
- No real-time updates (no WebSocket) — TanStack Query invalidates cache on mutations
- JWT expiry set to 7 days
- No pagination on task list (reasonable for personal task manager scope)
- Deployment: frontend on Vercel, backend on Render (free tier — cold starts expected)

---

## Deployment

### Frontend (Vercel)

```bash
cd web
vercel --prod
```

Set environment variable in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=https://api-task-pilot.onrender.com/api
```

### Backend (Render)

- Build command: `npm run build`
- Start command: `npm start`
- Set env vars: `MONGO_URI`, `JWT_SECRET`, `PORT`

---

## Scripts

### Backend

| Script | Command |
|--------|---------|
| Dev | `npm run dev` |
| Build | `npm run build` |
| Start | `npm start` |

### Frontend

| Script | Command |
|--------|---------|
| Dev | `npm run dev` |
| Build | `npm run build` |
| Start | `npm start` |
| Lint | `npm run lint` |