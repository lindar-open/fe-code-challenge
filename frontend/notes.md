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

# 4. Custom Animation Hooks: useFlashEffect & useShakeEffect

**Why custom hooks?**

- To encapsulate animation logic (flash and shake) for stock cards, keeping SymbolCard clean and minimizing re-renders.
- Each hook tracks price changes using refs and state, and only updates the card's className (not its children or content).

**useFlashEffect**

- Triggers a green or red box-shadow flash when the price increases or decreases.
- Returns a className string (e.g., 'symbolCard**flash--green' or 'symbolCard**flash--red') for use in the card's class list.
- Uses refs to track the previous price and a timer to remove the class after the animation duration.
- Ensures the flash effect takes precedence over the active (black shadow) state.

**useShakeEffect**

- Triggers a shake animation if the price changes by more than 25% (up or down).
- Returns a className string ('symbolCard\_\_shake') for use in the card's class list.
- Uses refs to track the previous price and a timer to remove the class after the animation duration.

**Why keep them separate?**

- Each effect is independent and may have different triggers and durations.
- Separation keeps logic simple, reusable, and easy to test or extend.
- Both hooks are highly efficient: they use refs and state to avoid unnecessary re-renders, and SymbolCard's children are memoized.

**Usage in SymbolCard:**

- Both hooks are called with the current price.
- The returned classNames are combined in the card's className prop.
- This approach ensures maximum performance and a clean, maintainable codebase.

---

# 5. Granular SymbolCard Component Structure

**Why granular?**

- Splitting SymbolCard into small, focused subcomponents improves maintainability, testability, and performance.
- Each subcomponent is responsible for a single part of the card, making the codebase easier to reason about and update.

**How SymbolCard is split:**

- `SymbolCardHeader`: Renders the stock symbol and the trend marker (arrow), using a dedicated `SymbolCardTrendIcon` for the arrow.
- `SymbolCardPrice`: Displays the formatted price.
- `SymbolCardInfo`: Shows company name, industry, and market cap, each as a ListItem with an icon.
- The main `SymbolCard` component only handles layout, click logic, and animation classNames. It does not contain any UI logic for the card's fields.

**Benefits:**

- Each part of the card can be memoized independently, so price flashes or shakes do not cause unnecessary re-renders of the info or header.
- Easier to test and update individual parts (e.g., changing how the trend icon works does not affect the rest of the card).
- Keeps SymbolCard clean and focused on composition and interaction, not rendering details.

**Summary:**

- This granular approach is a best practice for React, especially in performance-sensitive UIs like dashboards.
