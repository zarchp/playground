# Playground 🚀

An experimental sandbox for testing Laravel + React (Inertia.js) code, new features, and prototyping ideas. This is where concepts are explored, things are broken, and rapid iterations happen.

> **⚠️ Warning**: This is not production code. Expect experiments, temporary hacks, and a lot of learning-by-breaking.

---

## Tech Stack 🛠️

- **Laravel** — PHP Backend Framework
- **Inertia.js** — Modern monolith (SPA without API)
- **React Starter Kit** — Newest React + TypeScript setup
- **Tailwind CSS** — Utility-first CSS Framework
- **shadcn/ui** — Beautiful, accessible components
- **pnpm** — Fast and efficient package manager
- **Vite** — Lightning-fast build tool

---

## Getting Started 🏁

### Prerequisites

- PHP >= 8.2
- Composer
- Node.js >= 18
- pnpm
- MySQL / SQLite (optional for simple tests)

### Installation

```bash
git clone https://github.com/your-username/playground.git
cd playground

# Backend dependencies
composer install

# Frontend dependencies
pnpm install

# Setup environment
cp .env.example .env
php artisan key:generate

# Run migrations if needed
php artisan migrate

# Run development servers
pnpm dev
php artisan serve
