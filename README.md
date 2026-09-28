## Vitest

### Snapshot testing

- snapshots are useful to make sure the output of functions doesn't change unexpectedly over time.
- Real-time feedback on Snapshot changes due to Hot Module Replacement (HMR).
- Granular snapshots tests break on minor UI changes.
- It can be written in the component directly or as a separated test file.

### Integration Tests Versus Unit Tests

- Unit tests: test a single function in isolation
- Integration tests: validate the interactions of the data flow, between multiple tests
- Integration tests sit between unit tests and end-to-end (E2E) tests.

### Why write integration Tests?

- Multiple component interaction: to verify interactions between different Redux components
- State transitions: to verify state transitions from on to another.
- Asynchronous actions: to dispatch async thunks and check the resulting state
- configuring the store: configuring Redux store with specific reducers and middleware.
