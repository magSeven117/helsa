# Helsa - Healthcare Platform

## Table of Contents

- [Helsa - Healthcare Platform](#helsa---healthcare-platform)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Deployment](#deployment)
  - [Other links](#other-links)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)


## Introduction

Welcome to **Helsa**, a cutting-edge telemedicine platform designed to connect patients and healthcare providers seamlessly. Helsa offers a modern and intuitive interface for virtual consultations, health monitoring, and medical record management.

This repository contains both, backend, frontend and mobile source code, destined to manage all main features of the platform.

## Features

- **Virtual Consultations**: Secure video conferencing between patients and healthcare providers.
- **Health Monitoring**: Track and record vital health metrics.
- **Medical Record Management**: Secure storage and easy access to patient medical histories.
- **User Authentication**: Secure login and user management system.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Modern UI/UX**: Based on the color scheme with hexadecimal code `#8167EC`.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [Next.js](https://nextjs.org/)
- **Database**: [Supabase](https://supabase.com), [Prisma](https://www.prisma.io)
- **Authentication**: [Better-auth](https://better-auth.com)
- **Background jobs**: [Trigger.dev](https://trigger.dev)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Deployment**: [Vercel](https://vercel.com/home)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16.x or later)
- npm or yarn
- PostgresQL (for local development)
- Docker (optional, for containerized setup)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Duccem/helsa.git
   cd helsa
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file for each app:

   ```bash
    NODE_ENV=development
    PORT=3000
    NEXT_PUBLIC_BASE_URL=http://localhost:3000

    DATABASE_URL="postgresql://postgres:123456@localhost:6543/postgres"
    DIRECT_URL="postgresql://postgres:123456@localhost:6543/postgres"

    UPSTASH_REDIS_REST_TOKEN=your-upstash-token
    UPSTASH_REDIS_REST_URL=https://subdomain.upstash.io

    VOYAGE_API_KEY=your-voyage-key
    ANTHROPIC_API_KEY=your-anthropic-key

    RESEND_API_KEY=your-resend-key

    BETTER_AUTH_SECRET="secret-phrase"

    FACEBOOK_CLIENT_SECRET=facebook-secret
    FACEBOOK_CLIENT_ID=facebook-client-id
    GOOGLE_CLIENT_SECRET=google-secret
    GOOGLE_CLIENT_ID=google-client-id

    TRIGGER_SECRET_KEY=trigger-secret-key
    TRIGGER_PROJECT_ID=trigger-project-id

    NEXT_PUBLIC_STREAM_CLIENT_SECRET=stream-secret
    NEXT_PUBLIC_STREAM_CLIENT_KEY=stream-key

    NEXT_PUBLIC_OPENPANEL_CLIENT_ID=open-panel-key
    NEXT_PUBLIC_OPENPANEL_CLIENT_SECRET=open-panel-secret

    BETTER_STACK_API_KEY=better-stack-key
    BETTER_STACK_URL=https://in.logs.betterstack.com
    LOGTAIL_SOURCE_TOKEN=logtail-token

    NEXT_PUBLIC_SUPABASE_URL=https://subdomain.supabase.co
    NEXT_PUBLIC_SUPABASE_KEY=supabase-key

    BASEHUB_TOKEN=basehub-key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Deployment

Helsa is designed to be deployed on Vercel, but you can deploy it on any platform that supports Node.js.

1. **Deploy to Vercel**:

   - Sign in to your [Vercel](https://vercel.com/) account.
   - Link your repository and import your project.
   - Set up the environment variables in the Vercel dashboard.
   - Deploy your project.


## Other links

- [Changelog](https://github.com/Duccem/ducen-hospital/blob/main/CHANGELOG.md)

## Contributing

- [José Véliz (Duccem)](https://github.com/Duccem)

<a href="https://github.com/duccem/ducen/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=duccem/ducen" />
</a>


## License

This project is licensed under the MIT License.

[License](https://github.com/Duccem/ducen-hospital/blob/main/LICENSE)

## Contact

For any questions or inquiries, please contact us at [support@helsa.com](mailto:support@helsa.com).
