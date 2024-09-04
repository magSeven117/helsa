# Helsa - Telemedicine Platform

## Table of Contents

- [Helsa - Telemedicine Platform](#helsa---telemedicine-platform)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Docker Setup (Optional)](#docker-setup-optional)
    - [Deployment](#deployment)
    - [Folder Structure](#folder-structure)
  - [Other links](#other-links)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)


## Introduction

Welcome to **Helsa**, a cutting-edge telemedicine platform designed to connect patients and healthcare providers seamlessly. Helsa offers a modern and intuitive interface for virtual consultations, health monitoring, and medical record management.

This repository contains both, backend and frontend web source code, destined to manage all main features of the platform.

## Features

- **Virtual Consultations**: Secure video conferencing between patients and healthcare providers.
- **Health Monitoring**: Track and record vital health metrics.
- **Medical Record Management**: Secure storage and easy access to patient medical histories.
- **User Authentication**: Secure login and user management system.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Modern UI/UX**: Based on the color scheme with hexadecimal code `#8167EC`.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [Next.js](https://nextjs.org/), [GraphQL](https://graphql.org)
- **Database**: [MongoDB](https://mongodb.com), [Prisma](https://www.prisma.io)
- **Authentication**: [Clerk](https://clerk.com)
- **Message Queue**: [Qstash](https://upstash.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Deployment**: [Vercel](https://vercel.com/home)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16.x or later)
- npm or yarn
- MongoDB (for local development)
- Docker (optional, for containerized setup)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Duccem/ducen-hospital.git
   cd ducen-hospital
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:

   Create a `.env.local` file in the root directory and add the following variables:

   ```bash
   DATABASE_URL=your-mongodb-connection-string
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-public-key
   CLERK_WEBHOOK=your-app-webhook-to-clerk
   STRIPE_SECRET_KEY=your-stripe-secret-key
   QSTASH_URL=upstash-url-to-push
   QSTASH_APP_URL=your-webhook-url
   QSTASH_TOKEN=your-qstash-token
   QSTASH_CURRENT_SIGNING_KEY=sign-key
   QSTASH_NEXT_SIGNING_KEY=sign-key
   SECRET=your-secret-key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Docker Setup (Optional)
You can run the Helsa project using Docker and Docker Compose, which simplifies the setup process and ensures consistency across different environments.

1. **Create a ```docker-compose.yml``` file** in the root directory with the following content:
    ```yml
    version: '3.8'

    services:
      app:
        image: node:16-alpine
        container_name: helsa-app
        working_dir: /app
        volumes:
          - .:/app
          - /app/node_modules
        ports:
          - '3000:3000'
        environment:
          - DATABASE_URL=your-mongodb-connection-string
          - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-public-key
          - CLERK_WEBHOOK=your-app-webhook-to-clerk
          - STRIPE_SECRET_KEY=your-stripe-secret-key
          - QSTASH_URL=upstash-url-to-push
          - QSTASH_APP_URL=your-webhook-url
          - QSTASH_TOKEN=your-qstash-token
          - QSTASH_CURRENT_SIGNING_KEY=sign-key
          - QSTASH_NEXT_SIGNING_KEY=sign-key
          - SECRET=your-secret-key
        command: sh -c "yarn install && yarn dev"

      mongo:
        image: mongo:4.4
        container_name: helsa-mongo
        ports:
          - '27017:27017'
        volumes:
          - mongo-data:/data/db

    volumes:
      mongo-data:
    ```

2. **Run the application** using Docker Compose:
   
    ```bash
      docker-compose up
    ```
    This will start both the Next.js application and a MongoDB instance. The app will be available at http://localhost:3000.

3. **Stopping the containers**:

    To stop the containers, press Ctrl+C in the terminal where docker-compose up is running. Alternatively, you can stop them using:
    ```bash
    docker-compose down
    ```
    This will stop and remove the containers, but the data in MongoDB will persist in the ```mongo-data``` volume.

### Deployment

Helsa is designed to be deployed on Vercel, but you can deploy it on any platform that supports Node.js.

1. **Deploy to Vercel**:

   - Sign in to your [Vercel](https://vercel.com/) account.
   - Link your repository and import your project.
   - Set up the environment variables in the Vercel dashboard.
   - Deploy your project.

### Folder Structure

```bash
helsa/
├── etc/                             # Everything that is relevant information to the project
├── public/                          
├── src/                             # Project main folder
│   ├── app/                         # Next.js App router, code for backend and frontend apps
│   │   ├── (app)/                   # Frontend application
│   │   │   ├── (pages)/             # NextJS pages of app router
│   │   │   └── components/          # Project section components
│   │   └── api/                     # Backend api application
│   │       ├── events/              # Message Q Asynchronous events
│   │       ├── graphql/             # GraphQL API
│   │       └── webhooks/            # Webhooks to third party services
│   ├── libs/                        # Aux libraries
│   │   ├── ducen-ui/                # Custom own ui library
│   │   ├── shadcn-ui/               # shadcn ui components
│   │   └── utils/                   # Utility functions
│   ├── modules/                     # Modules of DDD source code
│   │   ├── shared/                  # Shared modules across all apps
│   │   ├── doctor/                  
│   │   └── user/                    
│   ├── assets/                      
│   └── middleware.js                # Function that its executed in all routes
├── .env.local                       
├── .eslintrc.json
├── .gitignore     
├── .prettierrc     
├── .components.json     
├── globals.d.ts     
├── next-env.d.ts     
├── postcss.config.mjs     
├── tailwind.config.ts     
├── tsconfig.ts     
├── next.config.js    
├── package.json     
└── README.md
```

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
