# Cryptocurrency Portfolio Tracker

Cryptocurrency portfolio tracking application built with Next.js 15 and TypeScript. This application provides a monitoring cryptocurrency investments and tracking portfolio performance.

## Features

- 📊 Portfolio tracking with market data integration
- 🌙 Dark/Light mode support
- 📱 Responsive design for all devices

## Tech Stack

- **Framework:** Next.js 15.3.3
- **Language:** TypeScript
- **UI Components:** Material Tailwind
- **Styling:** Tailwind CSS
- **Icons:** Lucide React

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm, yarn, or pnpm

## Getting Started

1. Clone the repository:
```bash
git clone [your-repo-url]
cd portoapp
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── components/     # React components
├── service/       # API services and data fetching
├── utils/         # Utility functions and constants
├── types/         # TypeScript type definitions
└── data/          # Static data and configurations
```

## API Integration

The application integrates with a custom backend API for real-time cryptocurrency data. The main endpoints include:

- `/api/coin-data` - Fetches current market data for specified cryptocurrencies

## Development

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
