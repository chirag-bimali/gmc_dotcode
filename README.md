# Student Hub

A university community platform where verified students discover clubs, participate in communities, post updates, and connect with peers. Built for hackathon speed — functional, minimal, and demo-ready.

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | ASP.NET Core 10 Web API |
| Database | PostgreSQL + EF Core 10 |
| Frontend | React 19 + TypeScript 5.9 |
| Routing | TanStack Router (file-based) |
| Data Fetching | TanStack Query 5 |
| Forms | React Hook Form + Zod |
| State | Zustand 5 |
| Styling | Tailwind CSS 4 |
| UI Icons | Lucide React |

## Architecture

### Backend — Clean Architecture

```
Hub.API            → Controllers, middleware, startup
Hub.Application    → Services, DTOs, repository interfaces
Hub.Domain         → Entities, enums (zero dependencies)
Hub.Infrastructure → EF Core DbContext, repository implementations
```

### Frontend — Feature-Sliced Design

```
src/
├── app/          → Entry point, providers, router, styles
├── routes/       → File-based routing (TanStack Router)
├── pages/        → Page compositions
├── widgets/      → Complex UI blocks
├── features/     → User interactions (auth, clubs, posts)
├── entities/     → Business entities
└── shared/       → Reusable infrastructure (API, UI, lib, store)
```

## What's Built

### Authentication
- Login with email/password


### Clubs
- List clubs (paginated), with member count and membership status
- Club detail view
- Join / leave clubs
- Create club

### Posts (per-club feed)
- Create posts with type (Doubt / Resource / Info), title, description, tags
- Edit / delete own posts
- Paginated feed with type filtering
- Like/unlike with optimistic UI updates
- Like count, comment count, isLiked, isAuthor on every post

### Comments
- Create comments on posts
- Edit / delete own comments
- Mark best answer (post author only, Doubt-type posts only)
- One best answer per post, automatically replaced

### Likes
- Toggle like/unlike on posts
- Like count and per-user like status


### Prerequisites
- .NET 10 SDK
- Node.js 20+
- PostgreSQL running on localhost:5432

### Backend

```bash
cd Backend

# Database connection configured in appsettings.Development.json
# Default: Host=localhost;Port=5432;Database=hamro_student_hub

# Run (auto-migrates + seeds on first startup)
dotnet run --project Hub.API
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

Opens at `http://localhost:5173`. API base URL defaults to `http://localhost:5207/api` (set in `.env.development`).


