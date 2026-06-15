## Plan: Nx and Angular upgrade path

TL;DR: Upgrade this repo from Angular 17.0.8 and Nx 17.2.8 to the latest Angular 22.x and Nx 22.x in one-major-version-at-a-time stages. Start by cleaning the package.json Nx dependency mismatch, then run sequential migrations for Angular 18, 19, 20, 21, and 22 while validating after each stage.

**Steps**

1. Baseline audit and cleanup

   - Confirm the working tree is clean in Git before starting.
   - Remove the legacy duplicate `@nx/workspace` entry in `package.json` from `dependencies` and keep the correctly versioned `devDependencies` entry.
   - Confirm `package-lock.json` presence and that npm is the package manager.
   - Run a fresh install with `npm install` to verify the current state.

2. Prepare the repo for stepwise migration

   - Ensure `@angular/*` packages, `@angular-devkit/*`, `@angular/cli`, `@nx/angular`, `@nx/workspace`, and supporting Nx packages are aligned by version family in `package.json`.
   - Remove deprecated/unused Angular tooling such as `codelyzer` if it is no longer required after migration.
   - Keep note of ecosystem packages that may need updates at each step: `rxjs`, `typescript`, `@angular/fire`, `@ng-bootstrap/ng-bootstrap`, `jest-preset-angular`, `cypress`, `eslint` plugins, and `firebase-tools`.

3. Upgrade path (one major version at a time)

   - 17 -> 18
   - 18 -> 19
   - 19 -> 20
   - 20 -> 21
   - 21 -> 22

   For each major version step:
   a. Update Angular package family to the next major: `@angular/core`, `@angular/common`, `@angular/compiler`, `@angular/forms`, `@angular/platform-browser`, `@angular/platform-browser-dynamic`, `@angular/router`, `@angular/compiler-cli`, `@angular/language-service`, `@angular-devkit/build-angular`, `@angular/cli`, `@schematics/angular`, and any Angular package in the workspace.
   b. Update Nx packages to the corresponding next major: `@nx/angular`, `@nx/workspace`, `@nx/cypress`, `@nx/eslint`, `@nx/eslint-plugin`, `@nx/jest`.
   c. Update `rxjs` and `typescript` to the minimum compatible versions for that Angular major (typically RxJS 7+ for Angular 18+ and progressively newer TypeScript versions.).
   d. Run `npm install`.
   e. Run Nx migration tooling for that major: `npx nx migrate @nx/workspace@<target-major>` and then `npx nx migrate --run-migrations`.
   f. Run Angular migrations if needed: `npx ng update @angular/core@<target-major> @angular/cli@<target-major>` and any package-specific update commands.
   g. Update from Cypress to Playwright for e2e testing if the Angular major supports it and if desired, since Cypress support may be deprecated in future Angular versions.
   h. Run validation: `npm test`, `npm run lint`, `npm run build`, and any e2e or project-specific checks.
   h. Fix any migration issues before moving to the next major.

4. Special focus areas

   - Resolve the current `@nx/workspace` version mismatch before the first migration.
   - Ensure `@nx/angular` is not listed in `dependencies` if it should be in `devDependencies`; keep Nx runtime packages consistent.
   - Upgrade `rxjs` from 6.6 to the version required by each Angular major, likely through 7 and eventually 8.
   - Increment `typescript` as required by Angular majors, since Angular 22 may require TypeScript 5.4+ or newer.
   - Check compatibility of supporting libraries: `@angular/fire`, `@ng-bootstrap/ng-bootstrap`, `bootstrap`, `jest-preset-angular`, `cypress`, and `eslint` tooling.
   - After each major migration, run `npx nx format:write` or equivalent formatting, then review diffs.

5. Final validation and cleanup
   - After the final Nx 22 + Angular 22 migration, run full workspace validation: unit tests, lint, build, and e2e paths.
   - Verify `package-lock.json` is updated and consistent.
   - Confirm there are no leftover old package versions or duplicate package entries.
   - Commit each major upgrade step separately if using version control.

**Relevant files**

- `/home/blair/Repos/board-game-web-apps/package.json` — clean and align Angular/Nx dependency versions.
- `/home/blair/Repos/board-game-web-apps/package-lock.json` — validate lockfile updates per migration.
- `/home/blair/Repos/board-game-web-apps/nx.json` — ensure Nx target and generator configuration continues to work after migration.

**Verification**

1. After each major upgrade, run `npm install`, `npx nx migrate --run-migrations`, `npm test`, `npm run lint`, and `npm run build`.
2. Confirm the repo still boots and builds the Angular applications.
3. Validate that the final versions are Angular 22.x and Nx 22.x.

**Decisions**

- The upgrade will follow major-version increments only, not every patch version.
- The repo uses npm and `package-lock.json`, so migration commands should be run with npm.
- The current `@nx/workspace` mismatch in `package.json` must be fixed before migration starts.
