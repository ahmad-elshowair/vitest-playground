## Vitest

### Snapshot testing

- snapshots are useful to make sure the output of functions doesn't change unexpectedly over time.
- Real-time feedback on Snapshot changes due to Hot Module Replacement (HMR).
- Granular snapshots tests break on minor UI changes.
- It can be written in the component directly or as a separated test file.
- to update snapshots run `vitest --updateSnapshot`.
