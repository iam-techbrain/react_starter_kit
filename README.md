# React DummyJSON Learning Application

A clean, modular 3-page learning application built with React 18, Vite, and React Router v6 consuming public APIs from DummyJSON.

## Description

This project is a modern, modular frontend web application designed as an architectural template for React developers. Built using React 18, Vite, and React Router v6, it demonstrates essential frontend engineering principles including component composition via the `children` prop pattern, explicit parent-to-child prop delegation, centralized global state management via `AuthContext`, and asynchronous REST API integration. The application features a 3-page workflow: an asynchronous Login view with token persistence in local state and storage, a real-time Products catalog displaying reusable `ProductCard` components with live search and category filtering, and an authenticated User Profile view.

## Getting Started

### Dependencies

* Operating System: Windows 10/11, macOS, or Linux
* Runtime: Node.js (v18.0.0 or higher recommended, tested on v24.x)
* Package Manager: npm (v9.0.0 or higher) or yarn / pnpm
* Core Libraries:
  * `react` (^18.3.1) - Core frontend UI library
  * `react-dom` (^18.3.1) - React DOM rendering engine
  * `react-router-dom` (^6.28.0) - Client-side declarative routing
  * `lucide-react` (^0.460.0) - Modern UI iconography
* Development Tooling:
  * `vite` (^6.0.0) - Next-generation frontend build tool and dev server
  * `@vitejs/plugin-react` (^4.3.4) - Fast Refresh and JSX transformation

### Installing

* Clone or navigate to the project directory:
  ```bash
  cd "e:\Starter Kit\react_starter_kit"
  ```
* Install all required dependencies via npm:
  ```bash
  npm install
  ```
* Environment Configuration:
  * If custom API base URLs are needed, create a `.env` file in the root directory:
    ```env
    VITE_DUMMYJSON_BASE_URL=https://dummyjson.com
    ```

### Executing program

* Running in Development Mode (Vite Dev Server):
  ```bash
  npm run dev
  ```
* Building for Production:
  ```bash
  npm run build
  ```
* Previewing Production Build locally:
  ```bash
  npm run preview
  ```
* Accessing the Application:
  * Open your web browser and navigate to the local Vite URL (default):
    ```text
    http://localhost:5173
    ```
* Application Navigation & Views:
  * `/` or `/login` — Login Portal calling `POST https://dummyjson.com/auth/login`
  * `/products` — Products Catalog calling `GET https://dummyjson.com/products`
  * `/profile` — User Profile view calling `GET https://dummyjson.com/users`
* Testing Authentication with Demo Credentials:
  * Predefined DummyJSON accounts can be used to log in:
    * Username: `emilys`
    * Password: `emilyspass`
    * Alternative: `michaelw` / `michaelwpass`

## Help

* Port 5173 already in use:
  * If port `5173` is occupied, Vite will automatically select the next available port (e.g., `5174`), or you can force a custom port in `package.json`:
    ```bash
    npm run dev -- --port 3000
    ```
* Node Version Compatibility:
  * Verify your installed Node version using `node -v`. Ensure version is 18.0.0 or higher.
* Network or CORS Errors during API calls:
  * Ensure your machine has an active internet connection to communicate with `https://dummyjson.com`.
* Authentication State reset:
  * If the session is cleared upon hard refresh, check your browser's `localStorage` permissions.

## Authors

* Development Team
* Project Contributor: [@Developer](https://github.com/)

## Version History

* 0.2
  * Integrated `AuthContext` for centralized authentication state management
  * Implemented reusable `Wrapper` component with `children` prop
  * Added live search, category filtering, and responsive `ProductCard` grid
  * Upgraded build pipeline to Vite 6 and React Router v6
* 0.1
  * Initial Release with baseline React structure and routing

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments

* [DummyJSON](https://dummyjson.com) - Public REST API for realistic mock data and authentication services
* [Vite](https://vitejs.dev) - Fast and lean frontend tooling
* [React Router](https://reactrouter.com) - Declarative routing for React web applications
* [PurpleBooth / README-Template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2) - Standard project documentation structure inspiration
* [awesome-readme](https://github.com/matiassingers/awesome-readme) - Documentation best practices
