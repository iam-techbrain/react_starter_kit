# React DummyJSON Starter Kit

A production-grade, modular frontend starter kit built with React 18, Vite, and React Router v6. This repository demonstrates core frontend architecture patterns including component composition, centralized context state management, asynchronous REST API integration, and vanilla CSS design systems.

---

## Overview

This project serves as an architectural reference and foundational template for React web applications. It integrates with public REST endpoints from DummyJSON to illustrate real-world patterns for authentication, data fetching, error handling, and component encapsulation.

---

## Architectural Highlights

### 1. Component Modularity and Composition
- **Layout Wrapper (`Wrapper.jsx`)**: Implements layout containment utilizing the standard React `children` prop pattern.
- **Hero Section (`HeroSection.jsx`)**: Configurable header banner accepting titles, subtitles, badges, and statistical metrics through explicit props.
- **Product Card (`ProductCard.jsx`)**: Independent presentation component handling price calculations, badge logic, rating display, and upward event delegation (`onAddToCart`).
- **Global Navigation and Footer (`Header.jsx`, `Footer.jsx`)**: Persistent layout components featuring dynamic authentication indicators and routing links.

### 2. State and Authentication Management
- **Authentication Context (`AuthContext.jsx`)**: Centralized state management provider for user authentication, session persistence using browser `localStorage`, and token lifecycle methods.
- **Protected Routing Patterns**: Route guarding logic that reacts dynamically to user login and logout actions.

### 3. Asynchronous Data Handling
- **API Service Layer (`src/api/dummyJson.js`)**: Encapsulated HTTP client using native `fetch` with `async/await` syntax and error handling.
- **Component Lifecycle Integration**: Data fetching managed via `useEffect` hooks paired with granular state tracking (`loading`, `error`, `data`).
- **User Feedback**: Skeleton loading states and contextual fallback views to ensure a smooth, non-blocking user experience.

---

## Application Pages and Routes

| Route | Component | Description |
| :--- | :--- | :--- |
| `/` | `ProductsPage` | Catalogs products retrieved from the REST API. Includes live search, category filtering, and cart interaction handlers. |
| `/login` | `LoginPage` | Handles user authentication via API POST requests, error messaging, and automated redirection upon success. |
| `/profile` | `ProfilePage` | Displays authenticated user information alongside a directory view of users fetched from the API. |

---

## Technology Stack

- **Framework**: React 18.3.1
- **Build Tool**: Vite 6.0.0
- **Routing**: React Router DOM 6.28.0
- **Icons**: Lucide React 0.460.0
- **Styling**: Vanilla CSS (Modular CSS custom properties and responsive layout system)
- **External API**: DummyJSON RESTful Services

---

## Directory Structure

```
react-dummyjson-starter-kit/
|-- index.html                 # HTML application entry point
|-- package.json               # Project manifest, scripts, and dependencies
|-- vite.config.js             # Vite configuration file
`-- src/
    |-- App.jsx                # Application root with route declarations
    |-- main.jsx               # React DOM entry point
    |-- api/
    |   `-- dummyJson.js       # Asynchronous HTTP API functions
    |-- components/
    |   |-- common/
    |   |   |-- Footer.jsx     # Global layout footer
    |   |   |-- Header.jsx     # Top navigation bar with auth status
    |   |   |-- HeroSection.jsx# Reusable hero banner component
    |   |   `-- Wrapper.jsx    # Generic container wrapper
    |   `-- products/
    |       `-- ProductCard.jsx# Reusable product presentation card
    |-- context/
    |   `-- AuthContext.jsx    # React Context provider for authentication
    |-- pages/
    |   |-- LoginPage.jsx      # Authentication and login view
    |   |-- ProductsPage.jsx   # Product listing and filter view
    |   `-- ProfilePage.jsx    # User details and directory view
    `-- styles/
        `-- index.css          # Design system variables, utilities, and styles
```

---

## Getting Started

### Prerequisites
- Node.js (version 18.0.0 or higher recommended)
- npm (version 9.0.0 or higher)

### Installation

1. Navigate to the project directory:
   ```bash
   cd react_starter_kit
   ```

2. Install all required dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the local development server:
```bash
npm run dev
```

The application will be accessible at:
```
http://localhost:3000
```

### Production Build

Compile the project assets for deployment:
```bash
npm run build
```

To preview the production bundle locally:
```bash
npm run preview
```

---

## API Endpoints Used

| Method | Endpoint | Purpose |
| :--- | :--- | :--- |
| `POST` | `https://dummyjson.com/auth/login` | Authenticate user credentials and retrieve JWT token |
| `GET` | `https://dummyjson.com/products` | Retrieve catalog products list |
| `GET` | `https://dummyjson.com/products/categories` | Retrieve available product categories |
| `GET` | `https://dummyjson.com/products/category/{category}` | Filter catalog products by specific category |
| `GET` | `https://dummyjson.com/products/search?q={query}` | Search catalog by text query |
| `GET` | `https://dummyjson.com/users` | Retrieve directory of users |
| `GET` | `https://dummyjson.com/users/{id}` | Retrieve individual user profile details |

---

## Test Credentials

For testing authentication on the `/login` view, use the following pre-configured DummyJSON accounts:

| Username | Password | User Name | Role |
| :--- | :--- | :--- | :--- |
| `emilys` | `emilyspass` | Emily Johnson | User |
| `michaelw` | `michaelwpass` | Michael Williams | User |
| `sophiab` | `sophiabpass` | Sophia Brown | User |

*Note: The login view also includes one-click buttons to autofill these credentials during testing.*

---

## License

This project is open-source and available under the MIT License.
