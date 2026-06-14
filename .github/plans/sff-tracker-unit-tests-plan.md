# sff-tracker unit tests plan

## Goal

- Get `nx run sff-tracker:test` passing successfully.
- Reach at least 80% unit test coverage for the `sff-tracker` app.

## Implementation steps

1. Upgrade `ts-node` to `10.9.1` so Jest can parse the TypeScript Jest config.
2. Fix `apps/sff-tracker/src/app/app.component.spec.ts`:
   - Remove stale `NxWelcomeComponent` dependency.
   - Keep tests that verify the app component is created and the router outlet is rendered.
3. Update `apps/sff-tracker/src/app/pages/home/home.component.spec.ts`:
   - Provide `PlayerStore` and use `NO_ERRORS_SCHEMA`.
   - Add tests for store-backed `players$` and `updatePlayerHealth()` wiring.
4. Update `apps/sff-tracker/src/app/components/touch-number-spinner/touch-number-spinner.component.spec.ts`:
   - Import `ReactiveFormsModule` and `FormGroup`.
   - Use `NO_ERRORS_SCHEMA` to ignore Angular Material template dependencies.
   - Add tests for default form initialization, form value change emission, manual spinner updates, and the missing-control branch.
5. Add `apps/sff-tracker/src/app/pages/home/home.store.spec.ts`:
   - Test the default state, `updatePlayer()` behavior, and `selectPlayer()` results.
6. Run coverage and validate with `npm exec nx test sff-tracker -- --runInBand --coverage --coverageReporters=text-summary`.

## Outcome

- All `sff-tracker` tests now pass.
- Coverage is 100% for statements, branches, functions, and lines.
