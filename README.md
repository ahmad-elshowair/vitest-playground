# 🌿 Vitest Playground

A modern hands-on learning playground for frontend testing with **Vitest**, **React Testing Library (RTL)**, **Redux Toolkit**, and **React Router v7** in a React 19 + TypeScript application.

---

## 📚 Core Testing Concepts & Notes

### 1. Unit Testing

- **Definition**: Tests a single function, utility, or component in complete isolation without external side-effects.
- **Example in repo**: [`src/test/math.test.ts`](file:///Users/elshowair/code/learn/vitest-playground/src/test/math.test.ts) testing pure arithmetic functions (`sum`, `subtract`, `multiply`, `divide`).

### 2. Snapshot Testing

- **Purpose**: Verifies that data structures or rendered outputs do not change unexpectedly over time.
- **Fast Feedback**: Real-time feedback on snapshot changes powered by Vitest's Hot Module Replacement (HMR).
- **Inline vs. File Snapshots**:
  - `toMatchInlineSnapshot(...)`: Inlines the snapshot directly inside the test file, ideal for small objects.
  - `toMatchSnapshot()`: Saves snapshots in an adjacent `__snapshots__/` directory, ideal for larger payloads or markup.
- **Trade-off**: Granular snapshot tests can be brittle and break on minor UI changes.
- **Updating Snapshots**: When intentional changes occur, update snapshots with:
  ```bash
  pnpm vitest -u
  # or
  pnpm vitest --updateSnapshot
  ```
- **Example in repo**: [`src/test/fruit.test.ts`](file:///Users/elshowair/code/learn/vitest-playground/src/test/fruit.test.ts) verifying fruit taxonomy and nutrition data contracts.

### 3. Redux State & Reducer Testing

- **Pure Reducers**: Test initial state and deterministic transitions (`clearFruit`).
- **Async Thunks**: Test action lifecycle dispatches (`pending`, `fulfilled`, `rejected`) and status transitions (`idle` → `loading` → `succeeded` / `failed`).
- **Immutability & Isolation**: Ensure each test uses a fresh store instance (via `beforeEach`) and reads state after dispatch to avoid stale references.
- **Example in repo**: [`src/test/fruitsSlice.test.tsx`](file:///Users/elshowair/code/learn/vitest-playground/src/test/fruitsSlice.test.tsx).

### 4. Integration Tests vs. Unit Tests

- **Unit Tests**: Test a single unit/function in isolation.
- **Integration Tests**: Validate data flow and interactions between multiple units (e.g. Redux store + UI components + routing).
- **Position**: Sits between Unit Tests and End-to-End (E2E) tests in the testing pyramid.

#### Why Write Integration Tests?

- **Multiple Component Interaction**: Verifies how React components consume, dispatch, and reflect Redux state.
- **State Transitions**: Validates end-to-end transitions across UI interactions and store state.
- **Asynchronous Data Flow**: Dispatches async thunks and asserts loading spinners, error alerts, and data cards.
- **Custom Store Configuration**: Verifies behavior with specific middleware, listeners, or preloaded states.

### 5. Custom Test Utilities (`test-utils.tsx`)

- Provides a reusable `renderWithProviders` wrapper configured with `setupStore` and Redux `<Provider>`.
- Uses `combineReducers` to handle partial preloaded state cleanly across test cases.
- **Example in repo**: [`src/test/test-utils.tsx`](file:///Users/elshowair/code/learn/vitest-playground/src/test/test-utils.tsx).

### 6. Routing & Navigation Testing

- Use `MemoryRouter` to test client-side routing, default index routes, and 404 (`NotFound`) fallbacks without a browser window.
- **Example in repo**: [`src/test/App.test.tsx`](file:///Users/elshowair/code/learn/vitest-playground/src/test/App.test.tsx).

---

## 🗂 Test Suite Directory Map

```text
src/
├── test/
│   ├── setup.ts               # Jest-DOM matchers setup for Vitest
│   ├── math.test.ts           # Pure unit tests (arithmetic operations)
│   ├── fruit.test.ts          # Snapshot testing (inline & external snapshots)
│   ├── fruitsSlice.test.tsx   # Redux slice & async thunk state transitions
│   ├── App.test.tsx           # App shell, brand render, and 404 routing tests
│   └── test-utils.tsx         # Custom RTL renderWithProviders & store setup
```

---

## 🚀 Available Scripts

```bash
# Run Vitest in interactive watch mode
pnpm test

# Run tests once (CI mode)
pnpm test run

# Run tests with code coverage analysis (v8)
pnpm test:coverage

# Update snapshot files
pnpm vitest -u

# Run ESLint validation
pnpm lint

# TypeScript check & production build
pnpm build

# Start local Vite development server
pnpm dev
```
