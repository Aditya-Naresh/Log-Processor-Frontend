# Project Name

## Overview
A brief description of your project, its purpose, and key features.

## Prerequisites
- Node.js
- npm/yarn/pnpm/bun

## Getting Started

### 1. Clone the Repository
```bash
https://github.com/Aditya-Naresh/Log-Processor-Frontend.git
cd Log-Processor-Frontend
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Setup
Create a `.env.local` file in the project root and add the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

⚠️ **Important:** Never commit your actual credentials to version control. Always use environment variables and add `.env.local` to your `.gitignore`.

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
- `app/`: Next app directory
- `components/`: Reusable React components
- `helper/`: Utility functions and library such as Subase Configuration
- `store/`: Redux setup
- `hooks`: Custom Hooks

## Features
- Next App Router
- Supabase Authentication
- Responsive Design

## Technologies Used
- Next
- Supabase
- React
- TypeScript





Backend Link: [https://github.com/Aditya-Naresh/Log-Processor-Backend.git](https://github.com/Aditya-Naresh/Log-Processor-Backend.git)
