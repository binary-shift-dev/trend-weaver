# Điểm Trend — Trend Weaver

Aggregates trending posts from Vietnamese social media (Facebook, TikTok, X, forums) and presents them in a single feed with AI-powered summaries.

**Live site:** [diemtrend.vietdoo.site](https://diemtrend.vietdoo.site)

## Features

- **Trending Feed** — browse the hottest posts across platforms
- **Topic Filtering** — filter by Tech, Finance, Entertainment, Society, or Drama
- **Search** — find posts by keyword
- **Post Detail** — read full AI summaries, engagement stats, and comments
- **Responsive** — works on desktop and mobile

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Router](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query)
- [Recharts](https://recharts.org/)

## Getting Started

**Prerequisites:** Node.js ≥ 18 and npm

```sh
# Clone the repo
git clone https://github.com/binary-shift-dev/trend-weaver.git
cd trend-weaver

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

## Project Structure

```
src/
├── components/   # Reusable UI components
│   └── ui/       # shadcn/ui primitives
├── data/         # Mock data
├── hooks/        # Custom React hooks
├── lib/          # Utility functions
├── pages/        # Route pages (Index, PostDetail, Search, Topic)
└── types/        # TypeScript type definitions
```

## License

This project is private.
