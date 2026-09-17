# Learnify Solutions - Enterprise IT Training Platform

A modern, full-stack enterprise IT learning management and course catalog platform built with React 19, TypeScript, Tailwind CSS, and Node.js (Express).

## Features

- **Dynamic Course Catalog**: Browse and search across Cloud Computing, Cybersecurity, AI/ML, DevOps, and Enterprise Networking domains.
- **Enterprise Curriculum & Syllabus Generator**: Real-time client-side and server-side PDF syllabus generation.
- **Corporate Training Inquiry Management**: Lead intake with automated transactional email notifications.
- **Dynamic Content Management System (CMS)**: Manage top announcements, corporate statistics, and program offerings.
- **High-Performance Architecture**: Brotli/Gzip compression, Helmet security headers, rate-limiting, and SEO optimization with Schema.org JSON-LD.

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion
- **Backend**: Node.js, Express, Nodemailer, Helmet, Compression
- **Database/Persistence**: Supabase / PostgreSQL integration support
- **Build Tool**: Vite 6, esbuild

## Getting Started

### Prerequisites

- Node.js 20+ installed
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Key environment configurations:
- `EMAIL_USER`: SMTP outgoing email address (e.g., info@learnify-solutions.com)
- `EMAIL_PASSWORD`: SMTP app password / password
- `ADMIN_EMAIL`: Destination email for customer leads
- `ADMIN_USERNAME` & `ADMIN_PASSWORD`: Credentials for the administrative control panel
- `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY`: Supabase database credentials

### Development

To start the development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### Production Build

To build the client and bundle the backend server for production:

```bash
npm run build
```

### Start in Production

```bash
npm start
```

## License

All rights reserved © Learnify Solutions.
