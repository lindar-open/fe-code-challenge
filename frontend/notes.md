# 1. Fixing the Price History Chart Race Condition

**The Issue:**

- When switching stocks quickly, multiple fetches for price history could overlap.
- A slower (previous) fetch could finish after a faster (newer) one, causing the chart to show outdated data.

**Why It Happens:**

- Each fetch is asynchronous and independent.
- Redux state is updated by whichever fetch finishes last, regardless of which stock is currently selected.

**The Solution:**

- Use Redux Toolkit’s built-in `thunkAPI.signal` in the async thunk to automatically abort previous fetches when a new one starts.
- This ensures only the latest fetch updates the state, so the chart always matches the selected stock.
- In addition, the chart data is cleared immediately when a new stock is selected, so no stale data is shown while loading.

**Result:**

- Now, when you switch stocks quickly, only the latest selected stock’s price history is shown.
- No more mismatched or outdated charts, even on a slow connection.

---

# 2. Persisting the Active Card Selection with Redux

**Why?**

- Needed to keep the selected (active) card highlighted even when navigating between pages.
- Local state (`useState`) would reset on navigation; global state (Redux) persists.

**What Was Added?**

- Added `activeSymbol` to the Redux slice (`dashboardOptionsSlice`).
- Created an action `setActiveSymbol` to update the active card.
- Created a selector `selectActiveSymbol` to access the current active card from anywhere.

**How Is It Used?**

- In `SymbolsView.tsx`, replaced `useState` with `useAppSelector(selectActiveSymbol)` and `dispatch(setActiveSymbol(...))`.
- When a card is clicked, `setActiveSymbol` is dispatched with the card’s symbol.
- The `activeSymbol` value is passed to each `SymbolCard` (via `SymbolsGrid`) as the `isActive` prop.

**How Does It Affect the UI?**

- The `isActive` prop adds a CSS class to the active card for styling.
- The selected card remains highlighted and the chart remains visible, even after navigating away and back.

**Why Is This Best Practice?**

- Keeps UI state that should persist across routes in a single, global place (Redux).
- Avoids prop drilling and unnecessary re-renders.
- Makes the app more predictable and easier to maintain.

---

# 3. Reducing Initial Bundle Size with React Suspense and Lazy Loading

**Why?**

- To improve the initial load time of the app by only loading the code needed for the first screen.
- Large apps can have many components and views, but users usually only need the main dashboard at first.

**What Was Added?**

- Used `React.lazy` and `Suspense` in the router to load each main view (Dashboard, Profile, Statements) only when the user navigates to them.
- This means the code for Profile and Statements is not loaded until the user actually visits those pages.

**How Is It Used?**

- In `src/router/index.tsx`, each route uses a lazy import:
  ```tsx
  const SymbolsView = lazy(() => import('@/components/SymbolsView'));
  // ...
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route index element={<SymbolsView />} />
      ...
    </Routes>
  </Suspense>;
  ```
- The `Suspense` component shows a loading indicator while the new view is being loaded.

**Result:**

- The initial JavaScript bundle is smaller, so the app loads faster for the user.
- Additional code is only loaded as needed, improving performance and user experience.

---
