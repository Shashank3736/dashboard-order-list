# Dashboard Order List

A modern, responsive eCommerce dashboard application built with Next.js 15, React 19, and TypeScript. Features comprehensive order management, data visualization, and a clean, accessible user interface with dark/light theme support.

Live Link: https://dashboard-order-list.vercel.app/

## Features

- **Modern Dashboard**: Clean, responsive interface with comprehensive data visualization
- **Order Management**: Complete order tracking with status management and user profiles
- **Data Visualization**: Interactive charts using Recharts for revenue, projections, and analytics
- **Theme Support**: Dark/light mode with system preference detection
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessibility**: Built with accessibility best practices using Radix UI primitives
- **Performance Optimized**: Turbopack for fast builds and hot module replacement

## Technology Stack

### Core Framework
- **Next.js 15.5.3** with App Router architecture
- **React 19.1.0** with React Server Components (RSC)
- **TypeScript 5** for type safety
- **Turbopack** for fast development and builds

### Styling & UI
- **Tailwind CSS v4** for utility-first styling
- **shadcn/ui** components with "new-york" style variant
- **Radix UI** primitives for accessible components
- **Lucide React** for consistent iconography
- **Framer Motion** for smooth animations
- **next-themes** for theme management

### Data & Utilities
- **date-fns** for date manipulation and formatting
- **Recharts** for data visualization and charts
- **clsx** and **tailwind-merge** for conditional styling

## Installation

Follow these steps from the project root:

1. **Clone the repository**
```bash
git clone https://github.com/Shashank3736/dashboard-order-list.git
cd dashboard-order-list
```

2. **Install dependencies**
```bash
npm install
```

3. **Build the application**
```bash
npm run build
```

4. **Start the production server**
```bash
npm run start
```

The app will be available at http://localhost:3000

## Development

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production with Turbopack
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Development Server
```bash
npm run dev
```
Starts the development server with Turbopack for fast hot module replacement.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── _components/        # Page-specific components
│   │   ├── donut.tsx       # Donut chart component
│   │   ├── loading.tsx     # Loading skeleton component
│   │   ├── mini-bar-chart.tsx # Mini bar chart component
│   │   ├── result.tsx      # Dashboard results component
│   │   ├── revenue-area-chart.tsx # Revenue area chart
│   │   ├── revenue-by-location.tsx # Location revenue chart
│   │   └── stat-card.tsx   # Statistics card component
│   ├── orders/             # Orders page and components
│   │   ├── _component/     # Order-specific components
│   │   └── page.tsx        # Orders listing page
│   ├── globals.css         # Global styles and CSS variables
│   ├── layout.tsx          # Root layout with theme provider
│   └── page.tsx            # Home dashboard page
├── components/             # Reusable components
│   ├── ui/                 # shadcn/ui components
│   │   ├── breadcrumb.tsx  # Breadcrumb navigation
│   │   ├── button.tsx      # Button component
│   │   ├── card.tsx        # Card component
│   │   ├── chart.tsx       # Chart wrapper component
│   │   ├── dropdown-menu.tsx # Dropdown menu
│   │   ├── input.tsx       # Input field
│   │   ├── notification.tsx # Notification component
│   │   ├── popover.tsx     # Popover component
│   │   └── progress.tsx    # Progress bar
│   ├── main/               # Application-specific components
│   │   ├── left-sidebar.tsx # Secondary sidebar
│   │   ├── navbar.tsx      # Main navigation bar
│   │   ├── notifications.tsx # Notifications dropdown
│   │   └── sidebar.tsx     # Primary sidebar
│   ├── dark-mode-toggle.tsx # Theme switching component
│   └── theme-provider.tsx  # Theme context provider
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and configurations
│   ├── actions.ts          # Server actions and API calls
│   ├── data.ts             # Data models and mock data
│   └── utils.ts            # Common utilities and helpers
```

## Core Components

### Navigation Components

#### `Navbar` (`src/components/main/navbar.tsx`)
Main navigation bar with responsive design featuring:
- Animated sidebar toggles with Framer Motion
- Responsive search functionality (desktop/mobile)
- Breadcrumb navigation
- Theme toggle and notifications
- Refresh functionality

**Key Features:**
- Mobile-first responsive design
- Smooth animations and transitions
- ARIA accessibility attributes

#### `Sidebar` & `LeftSidebar` (`src/components/main/`)
Collapsible sidebars for navigation and additional functionality:
- Primary sidebar for main navigation
- Secondary sidebar for additional tools
- Overlay support for mobile devices

### Dashboard Components

#### `StatCard` (`src/app/_components/stat-card.tsx`)
Displays key metrics with growth indicators:
- Customer count, orders, revenue statistics
- Growth percentage visualization
- Responsive card layout

#### Chart Components
- **`DonutChart`**: Circular progress visualization for sales segments
- **`MiniBarChart`**: Compact bar charts for quick data overview
- **`RevenueAreaChart`**: Area charts for revenue trends over time
- **`RevenueByLocation`**: Geographic revenue distribution

### UI Components (shadcn/ui)

All UI components follow the shadcn/ui design system:
- **Consistent styling** with Tailwind CSS
- **Accessibility-first** approach using Radix UI
- **Customizable variants** with class-variance-authority
- **Dark/light theme** support

## Data Management

### Data Models (`src/lib/data.ts`)

#### Core Types
```typescript
// User profile with avatar generation
type User = {
  name: string;
  profileImage: string;
  gender: 'boy' | 'girl';
  id: number;
}

// Order management
type Order = {
  user: { name: string; profile: string };
  id: string;
  project: string;
  address: string;
  date: Date;
  status: 'In Progress' | 'Complete' | 'Pending' | 'Approved' | 'Rejected';
}

// Dashboard analytics
interface DashboardData {
  customers: { total: number; growth: number };
  orders: { total: number; growth: number };
  revenue: { total: number; growth: number };
  // ... additional metrics
}
```

### Server Actions (`src/lib/actions.ts`)

#### Key Functions
- **`getNotifications()`**: Retrieves notifications with human-readable timestamps
- **`getContacts()`**: Fetches user contact information
- **`getActivities()`**: Returns user activities with profile images
- **`getDashboardData()`**: Provides comprehensive dashboard metrics
- **`getOrders()`**: Fetches order list with user details

### Utilities (`src/lib/utils.ts`)

#### Helper Functions
- **`cn()`**: Combines class names with tailwind-merge
- **`getReadableTime()`**: Formats dates into human-readable strings
- **`shortifyText()`**: Method to short the text based on how longer you want (default: 28 chars).

## Styling & Theming

### Tailwind CSS Configuration
- **CSS Variables** for consistent theming
- **Dark/light mode** support through CSS custom properties
- **Responsive breakpoints** for mobile-first design

### Theme System
```typescript
// Theme provider with system preference detection
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
>
```

### Global Styles (`src/app/globals.css`)
- CSS custom properties for colors
- Dark/light mode variable definitions
- Base component styling

## Configuration

### Path Aliases
```json
{
  "@/*": "./src/*"
}
```

### Build Configuration
- **Turbopack** enabled for faster builds
- **Remote image patterns** configured for avatar.iran.liara.run
- **TypeScript strict mode** enabled
- **ES2017 target** with modern module resolution

## 📱 Responsive Design

### Breakpoints
- **Mobile**: Default (< 768px)
- **Tablet**: md (768px+)
- **Desktop**: lg (1024px+)
- **Large Desktop**: xl (1280px+)

### Mobile Features
- Collapsible navigation
- Touch-friendly interactions
- Optimized chart displays
- Responsive grid layouts

## Performance

### Optimizations
- **React Server Components** for reduced client-side JavaScript
- **Turbopack** for fast development builds
- **Code splitting** with Next.js App Router
- **Image optimization** with Next.js Image component