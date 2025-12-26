# Lexicon (20Wordy8)

## Overview

Lexicon is a React + TypeScript single-page word puzzle game that blends 2048-style sliding and merging mechanics with word formation. Players slide letter tiles on a 4×4 grid to merge matching letters (A → B → C …), score points from merges, use limited "pops" to remove tiles, lock tiles to hold them in place, and aim to form a target 4-letter word chosen from themed word packs.

Game state and theme persist across reloads.

---

## Features

- **Grid Gameplay**
  - 4×4 sliding tiles that compact and merge in the direction of a move.

- **Letter Merging**
  - Matching letters merge into the next letter.
  - Merges award points via a merge scoring table.

- **Target Word Objective**
  - Win by forming the `targetWord` in any full row or column.

- **Tile Locking**
  - Double-click to lock a tile (prevents moving or merging).
  - Double-click again to unlock.

- **Tile Popping**
  - Long-press to pop (remove) a tile.
  - Pops are limited by a `pops` budget.

- **Mobile Swipe Support**
  - Swipe gestures supported via `MobileSwiper`.

- **Audio Feedback**
  - UI sounds for moves, pops, locks, and merges using `use-sound`.

- **Themes & Word Packs**
  - Multiple themed word banks.
  - New packs can be added in `wordBanks.ts`.

- **Persistence**
  - `localStorage` saves `gameState`, `targetWord`, and `currentTheme`.

- **Responsive UI**
  - CSS modules and component-level styles for mobile and desktop.

---

## Tech Stack

- **Frontend**
  - React 18
  - TypeScript

- **State Management**
  - React Context + `useReducer`
  - `GameProvider`, `WordProvider`

- **Utilities**
  - `lodash`
  - `uid`
  - `use-sound`

- **Styling**
  - CSS / CSS Modules

- **Build**
  - Create React App
  - `react-scripts`

---

## Architecture & Data Flow

- Routing and screen composition live under `screens` and `index.js`.
- `GameProvider` holds the canonical game state:
  - `board` (2D array of tile IDs)
  - `tiles` (ID → tile metadata map)
  - `tilesByIds`
  - `score`, `pops`, and `status`
- UI components call `useGame()` to:
  - Move tiles
  - Lock/unlock tiles
  - Pop tiles
  - Query tiles for rendering
- Moves dispatch `MOVE_*` actions to the reducer, which compacts and merges tiles deterministically.
- After animations complete, `CLEAN_UP` and `CREATE_TILE` restore state and add a new `'A'` tile.
- `WordProvider` selects a 4-letter `targetWord` from `wordBanks` and persists it in `localStorage`.
- Sounds and animations are tied to move, merge, and pop events for feedback.

---
