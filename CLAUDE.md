# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Node.js is installed at `C:\Program Files\nodejs` but is not in the default shell PATH. Prefix every PowerShell session:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
```

```bash
npm run dev          # dev server at http://localhost:5173/missione-compleanno/
npm run dev -- --host  # also expose on LAN (for phone testing)
npm run build        # production build → dist/
npm run deploy       # build + push to gh-pages branch (GitHub Pages)
```

Dev reset: open the app URL with `#reset` appended to clear localStorage and restart from the intro.

## Architecture

The app is a **linear state machine** — a single `phase` string in localStorage drives everything. There is no router; `App.jsx` renders the correct screen via a lookup map keyed on `phase`.

**State shape** (localStorage key: `missione-compleanno`):
```js
{ phase, completedMissions: [], dayCompletedAt: null, photo: null }
```

**Phase flow:**
```
intro → mission1 → mission2 → mission3 → mission4 → day-complete → finale
```

`useAdventureState` (`src/hooks/useAdventureState.js`) is the single source of truth. Every `setState` call immediately writes to localStorage — no effect needed. Two transition helpers:
- `advance(nextPhase, extras?)` — change phase without completing a mission
- `completeMission(n, nextPhase, extras?)` — append mission number and change phase atomically

## Key Implementation Details

**Screens** (`src/screens/`) each accept `{ state, advance, completeMission }`. Mission screens show a success burst for ~1.8s then call `completeMission()` — this delay lets the `AdventureMap` scooter animate to the new waypoint before the screen transitions.

**AdventureMap** (`src/components/AdventureMap.jsx`) is a pure SVG. The scooter position is derived from `completedMissions.length` (index into `WAYPOINTS` array). CSS `transition` on `x`/`y` handles the animation. Gold path segments are rendered only for completed legs; grey dashes for future ones.

**Mission 2 villages** are inline SVG illustrations (no external files). To replace with real photos, swap `<v.Component />` in `Mission2Screen.jsx` for `<img src={imgPath('village1.jpg')} />` where `imgPath = name => \`${import.meta.env.BASE_URL}images/${name}\``.

**Mission 4 photo** is compressed via Canvas API before saving (max 800px, JPEG 0.72) to stay within the 5 MB localStorage limit.

## Before Deploy

Two constants must be filled in:

| File | What to change |
|------|---------------|
| `src/screens/FinaleScreen.jsx` | `VENUE.name` and `VENUE.detail` — dinner restaurant |
| `package.json` + `vite.config.js` | `[GITHUB_USERNAME]` → actual GitHub username |

The `base` in `vite.config.js` must match the GitHub repo name exactly (`/missione-compleanno/`).
