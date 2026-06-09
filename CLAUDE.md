# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Node.js is installed at `C:\Program Files\nodejs` but is not in the default shell PATH. Prefix every PowerShell session:
```powershell
$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
```

```bash
npm run dev              # dev server at http://localhost:5173/missione-compleanno/
npm run dev -- --host    # also expose on LAN (for iPhone testing)
npm run build            # production build → dist/
npm run deploy           # build + push to gh-pages branch, then git push origin main
```

After `npm run deploy`, always also run `git push origin main` to keep the main branch in sync (deploy only pushes to `gh-pages`).

Dev reset: append `#reset` to the URL to clear localStorage and restart from intro.

## Architecture

Linear state machine — a single `phase` string in localStorage drives all routing. No router library; `App.jsx` renders the correct screen via a lookup map.

**State shape** (localStorage key: `missione-compleanno`):
```js
{ phase, completedMissions: [], dayCompletedAt: null, photo: null }
```

**Full phase flow:**
```
intro → mission1 → mission2
→ travel-tellaro → arrive-tellaro
→ mission3
→ travel-fiascherino → arrive-fiascherino
→ mission4
→ travel-lerici → arrive-lerici
→ mission5 → day-complete → finale
```

`useAdventureState` (`src/hooks/useAdventureState.js`) is the single source of truth. Exports:
- `advance(nextPhase, extras?)` — change phase
- `completeMission(n, nextPhase, extras?)` — add mission number to `completedMissions` and change phase atomically
- `reset()` — clear localStorage and return to intro

## Travel / Arrival screens

`TravelScreen.jsx` is a single reusable component for all 6 travel/arrive phases. Configuration lives entirely in `App.jsx` in the `TRAVEL_CONFIGS` object — to change copy, button text, or destinations, edit that object only.

`AdventureMap` accepts an optional `scooterOverride: {x, y}` prop. Travel screens pass a halfway coordinate (defined in `TravelScreen.jsx`'s `HALFWAY` map); arrival screens omit it so the scooter lands on the waypoint derived from `completedMissions.length`.

## Missions

| Phase | What | Transition |
|-------|------|------------|
| `mission1` | Text riddle — answer: `"aurea"` | `completeMission(1, 'mission2')` |
| `mission2` | Pick correct village photo (Tellaro) | `completeMission(2, 'travel-tellaro')` |
| `mission3` | Text riddle — answers: pranzo/cibo/fame/etc | `completeMission(3, 'travel-fiascherino')` |
| `mission4` | Scratch card 3×3 — 5 Lerici + 2 Vernazza + 2 Portovenere (inline SVG) | `completeMission(4, 'travel-lerici')` |
| `mission5` | Take photo, canvas-compress (max 800px JPEG 0.72), save to state | `completeMission(5, 'day-complete', {photo})` |

Progress bar shows 5 ticks (20% each). `SHOW_PROGRESS` in `App.jsx` lists every phase where the bar is visible.

## Key implementation notes

**Mission 2 villages**: `public/images/Monterosso.jpg`, `Camogli.jpg`, `Tellaro.jpg`. Correct answer is index 2 (Tellaro). Image paths use `import.meta.env.BASE_URL` for Vite base-path compatibility.

**Mission 4 scratch card**: star counter shows the highest count of any single borough revealed (not just Lerici) so the outcome isn't telegraphed. Win condition is still 3 Lerici.

**Photo compression** (`mission5`): Canvas resize + `toDataURL('image/jpeg', 0.72)`. Wrapped in try/catch for localStorage quota errors.

**MenuButton**: `position: fixed` top-right, `z-index: 200`, present on all screens. Opens a confirmation dropdown before calling `reset()`.

## Design system

Fonts: **Cormorant Garamond** (headings, italic) + **Raleway** (body). Loaded in `index.html`.

Key CSS variables: `--bg: #0d0614`, `--gold: #c9a96e`, `--rose: #d4847a`, `--text: #f5ede8`, `--text-muted: #9a7d8a`. Full palette in `src/index.css`.

AdventureMap SVG colors are hardcoded in the component, not CSS variables — edit them directly in `AdventureMap.jsx` if the palette changes.

## Deployed

Live at `https://boboman99.github.io/missione-compleanno/`. GitHub username: `boboman99`.
