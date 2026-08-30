# HRMS Web Application

Next.js frontend application for Human Resource Management System with role-based access control and employee management features.

## Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

## Installation

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# API Gateway URL
NEXT_PUBLIC_API_URL=<insert_api_gateway_url>

# Application URLs
NEXT_PUBLIC_HOST_URL=<insert_host_app_url>
NEXT_PUBLIC_HRMS_URL=<insert_web_hrms_url>
NEXT_PUBLIC_CRMS_URL=<insert_crms_url>
NEXT_PUBLIC_POS_URL=<insert_pos_url>
NEXT_PUBLIC_SCMS_URL=<insert_scms_url>

# HRMS Backend API URL
NEXT_PUBLIC_HRMS_API_URL=<insert_hrms_backend_api_url>
```

Example values:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5001/
NEXT_PUBLIC_HOST_URL=http://localhost:3000
NEXT_PUBLIC_HRMS_URL=http://localhost:3002
NEXT_PUBLIC_CRMS_URL=http://localhost:3001
NEXT_PUBLIC_POS_URL=http://localhost:3003
NEXT_PUBLIC_SCMS_URL=http://localhost:3004
NEXT_PUBLIC_HRMS_API_URL=http://localhost:5165/api
```

## Run Commands

Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will run on port 3002 by default.

Build for production:
```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

## Project Structure

- `app/` - Next.js app router pages and layouts
- `components/` - Reusable React components
- `lib/` - Utility functions and service clients
- `pages/` - Additional pages (Digital 201 Files, User Management, etc.)

## Features

- Employee Information Management
- Digital 201 Files tracking
- User Management with role-based access
- Attendance and Biometrics integration
- Payroll management
- Document management system
