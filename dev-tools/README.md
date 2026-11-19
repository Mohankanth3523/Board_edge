# dev-tools

Double-click helpers for Windows (each runs from the project folder):

1. `1-install.cmd` — `npm install` → `logs/install.log`
2. `2-check-and-build.cmd` — `npm run typecheck` + `npm run build` → `logs/typecheck.log`, `logs/build.log`
3. `3-dev-server.cmd` — dev server at http://localhost:5173 (close the window to stop)
4. `4-preview-build.cmd` — serves the production build at http://localhost:4173

Requires Node.js 20.19+.
