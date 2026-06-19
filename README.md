
# 💸 Splitly - Advanced Expense Tracker Dashboard

**Splitly** is a highly interactive, frontend-only expense tracking and management application. Designed with a focus on seamless user experience, it handles complex data manipulation, multi-step user flows, dynamic filtering, and real-time UI updates entirely on the client side without relying on a backend.

## ✨ Core Features

* **Advanced Drill-Down Search & Filter Engine:** A custom-built, highly optimized data filtration system. Users can combine search queries with specific category and group filters (AND logic) for pinpoint accuracy.
* **Complex Multi-Step Forms:** Utilizes `react-hook-form` to handle intricate, 3-step form validations and state capture cleanly without unnecessary re-renders.
* **Dynamic Data Visualizations:** Real-time, 7-day interactive charts tracking total expenses and transaction counts.
* **Advanced State Management:** Built to handle hundreds of localized data points seamlessly using Redux Toolkit, ensuring active states (like pinned friends or active filters) persist predictably across the app.
* **Zero-Lag UI:** Implements custom debounce logic and strict React component memoization (`React.memo`, `useMemo`, `useCallback`) to maintain 60 FPS animations and instant search feedback, even with heavy DOM elements.
* **Modern Component Architecture:** Integrates custom Tailwind styling alongside premium **Uiverse UI** components for a highly polished, interactive aesthetic.
* **Fluid Routing & Animations:** Powered by React Router DOM for seamless SPA navigation, paired with Framer Motion for physics-based page transitions and layout animations.

## 🛠 Tech Stack

* **Framework:** [React.js](https://reactjs.org/)
* **Routing:** [React Router DOM](https://reactrouter.com/)
* **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
* **Form Handling:** [React Hook Form](https://react-hook-form.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [Uiverse UI](https://uiverse.io/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** React Icons
* **Date Formatting:** Day.js
  
