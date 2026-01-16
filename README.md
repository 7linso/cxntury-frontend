# Frontend Testing Task

---

## Setup

I started by creating a new React (TypeScript) project using Vite, then installed all required dependencies like Tailwind CSS and its Vite plugin:

```bash
npm create vite@latest frontend -- --template react-ts
cd .\frontend\

npm install
npm install -D tailwindcss @tailwindcss/vite postcss autoprefixer
npm i axios
```

---

## Update project to use Tailwind

To enable Tailwind, I updated the Vite configuration. In vite.config.ts I added the Tailwind Vite plugin:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Next I removed all default styles from src/index.css and replaced them with:

```css
@import "tailwindcss";
```

Finally, I started the development server:

```bash
npm run dev
```

---

## Development

Once I confirmed that Tailwind classes were working correctly my next step was to building the UI and core components. I initially created everything using mock data to quickly iterate on layout and design.

After that, I connected the frontend to the backend API. For this, I created:
- api.ts for axios instance
- helper.ts to hold functions which call API
- types.ts which shares TS types used across app

After manually confirming that the backend connection was ok (via simple console.log checks on res.data) I replaced all mock data with real API responses using useEffect and useState. Later this logic was moved into custom hooks to improve reusability and keep components cleaner.

I also implemented basic error handling using state and conditional rendering. On top of that I added a few small UX improvements such as transitions and automatically scrolling to the top after a reset action. These weren’t part of the assignment but helped avoid constant manual page reloads during testing.