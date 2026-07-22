# Farming Game Calc import plan

## Goal

Import the legacy Angular app into the Nx monorepo as a new application under apps/farming-game-calc and modernize it for the current Angular 22 workspace.

## Completed work

- Scaffolded a new Nx Angular application at apps/farming-game-calc.
- Imported the legacy app source, routing, components, and UI assets.
- Wired the app into the Angular module structure and enabled PWA/service-worker support.
- Updated Bootstrap, ng-bootstrap, and Font Awesome dependencies for Angular 22 compatibility.
- Fixed Angular 22 template and typing issues so the app builds and tests successfully.

## Verification

The following checks were run successfully:

- Build: npm exec nx -- build farming-game-calc
- Lint: npm exec nx -- lint farming-game-calc
- Test: npm exec nx -- test farming-game-calc

Note: the production build completed successfully but emitted a warning because the initial bundle exceeded the configured budget threshold.
