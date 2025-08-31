# Client News Demo with TypeScript

A full-featured **News & Magazine Web Application** built with **Next.js 13 (App Router)**, **TypeScript**, **TailwindCSS**, **ShadCN UI**, and **Redux Toolkit**. This project demonstrates modern, scalable, and production-ready practices for building content-driven applications with authentication, dashboard management, and API integration.

---

## 🚀 Tech Stack

* **Frontend Framework:** [Next.js 13](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Styling:** TailwindCSS + ShadCN UI Components
* **State Management:** Redux Toolkit + RTK Query
* **Database & Backend:** MongoDB with Next.js API Routes
* **Authentication:** JWT-based auth (Login, Logout, Register)
* **Rich Text Editing:** Custom Rich Text Editor
* **Deployment Ready:** Configured with `next.config.ts`

---

## ✨ Features

### User Side (Public)

* Browse news by **Category, Lists, Magazine, Lifestyle, etc.**
* Individual **news detail pages** with SEO-friendly slugs
* **Search functionality**
* Cookie Consent Banner
* Responsive, clean UI

### Admin Dashboard

* **Add, Edit, Update, Delete news** (draft & published)
* **Newsletter management**
* **User management** (add, update, delete users)
* **Trashed news system** (soft delete + restore)
* **Statistics & Overview dashboard**

### System Features

* Server-side validation with Zod Schema
* MongoDB Models for News, Drafts, Trash, Users, Newsletter
* API Routes (REST style) for News, Auth, Newsletter, Users
* Global loading states & skeletons
* Error handling + `NoDataFound` component

---

## 📂 Project Structure (High-Level)

```
client-news-demo-with-typescript/
├── public/               # Fonts, images, icons, static assets
├── src/
│   ├── app/              # Next.js App Router (pages, layouts, API routes)
│   ├── components/       # Reusable UI and feature components
│   ├── constants/        # Global constants
│   ├── features/         # Redux slices & RTK Query APIs
│   ├── models/           # Mongoose models
│   ├── provider/         # Redux provider
│   ├── schema/           # Validation schemas (Zod)
│   ├── types/            # TypeScript types (client & server)
│   └── utils/            # Utility functions
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies & scripts
├── tsconfig.json         # TypeScript config
└── README.md             # Documentation
```

---

## ⚡ Getting Started

### Prerequisites

* Node.js >= 18
* Bun or npm/yarn
* MongoDB instance (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/client-news-demo-with-typescript.git
cd client-news-demo-with-typescript

# Install dependencies
bun install   # or npm install / yarn install

# Setup environment variables
cp .env.example .env.local
# Add MongoDB URI, JWT_SECRET, etc. in .env.local

# Run development server
bun dev   # or npm run dev / yarn dev
```

The app should now be running at **[http://localhost:3000](http://localhost:3000)** 🎉

---

## 📜 Available Scripts

* `bun dev` – Start development server
* `bun build` – Build for production
* `bun start` – Start production server
* `bun lint` – Run ESLint

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open a PR or submit an issue.

---

## 📄 License

This project is licensed under the **MIT License**. See the LICENSE file for details.

---

### 👨‍💻 Author

Developed by **Saidul Islam Rana** – *Mern Stack Developer*

---
