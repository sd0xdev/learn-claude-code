# Game Development Rules

When creating or modifying game artifacts, always keep these elements in sync. Reference the **UI Component Reference** section below for component names and locations.

## Characters

When adding or modifying characters:

1. **Data File**: Add to `data/characters.json`
2. **Portrait Art**: Create pixel art in `ui/portraits.js` if it doesn't exist
3. **Talk Button**: Enable via `updateTalkButton()` in Actions Section
4. **Portrait Display**: Character appears via `showPortrait()` when talking
5. **Terminal Output**: Character mentioned in room description text

## Rooms

When adding or modifying rooms:

1. **Data File**: Add to `data/rooms.json`
2. **Location Name**: Updates via `updateLocation()` in Location Section
3. **Mini Map**: Update `mapLayout` grid in `ui/ui.js`
4. **Map Visualization**: Synced by `updateMap()`
5. **Terminal Output**: Room description shown via `print()`
6. **Exits**: Ensure room exits match the spatial grid layout

## Items

When adding or modifying items:

1. **Data File**: Add to `data/items.json`
2. **Take Button**: Enable via `updateTakeButton()` in Actions Section
3. **Inventory List**: Updates via `updateInventory()` in Inventory Section
4. **Terminal Output**: Item mentioned in room description when present
5. **Mini Map**: Ensure minimap continues to work as expected.

## Enemies

When adding or modifying enemies:

1. **Data File**: Add to `data/enemies.json`
2. **Attack Button**: Enable via `updateAttackButton()` in Actions Section
3. **Pixel Art**: Create in `ui/portraits.js` if it doesn't exist
4. **Terminal Output**: Enemy mentioned in room description when present

## Navigation

- Support arrow keys ONLY for keyboard navigation
- DO NOT add WASD (w/a/s/d) key support — it interferes with text input
- Arrow keys: ArrowUp, ArrowDown, ArrowLeft, ArrowRight

## Reference Implementation

- The `reference/complete/` directory contains the complete, finished version of the game
- When implementing features, check reference/complete/game.js, reference/complete/ui/ui.js, and reference/complete/data/ for reference
- Use these as guardrails to ensure your implementations match the intended patterns and structure

## Internationalization (i18n)

The game supports English (`en`) and Traditional Chinese (`zh-TW`). Locale is detected via URL query parameter `?lang=zh-TW`.

### Architecture

- **`strings.js`**: Core i18n infrastructure — `detectLocale()`, `t()` helper, `S` string map, `T` template functions, `localizeHTML()`
- **Data JSON files**: Use inline `_zh` suffix fields (e.g., `name_zh`, `description_zh`) — not separate overlay files
- **Items**: Use `icon` field for icon lookup instead of English name matching

### Translation helper `t()`

Dual-signature function:
- `t(localeMap)` — for system strings: `t(S.welcome)` returns the localized string from `{ en: "...", "zh-TW": "..." }`
- `t(obj, field)` — for data objects: `t(room, "name")` returns `room.name_zh` (zh-TW) or `room.name` (en)

### Template functions `T.*`

Locale-aware string formatters for sentences with parameters:
- `T.youGo(dir)`, `T.youPickUp(item)`, `T.youAttackFor(name, dmg)`, `T.enemyDefeated(name)`, etc.

### When adding translatable content

1. Add `_zh` fields to data JSON files alongside English fields
2. Add new system strings to the `S` object in `strings.js` with both `en` and `zh-TW`
3. Use `t()` or `T.*` in game.js/ui.js — never hardcode English strings
4. Add items with an `icon` field for icon lookup

### Course locale

- Course language is stored in `dungeon/course-progress.json` as `"locale": "en"` or `"locale": "zh-TW"`
- Lesson translations are in `learn-claude/zh-TW/`
- Set via `/course lang zh-TW`

### Testing

Run `npm test` to verify i18n infrastructure:
- `t()` function behavior for both locales
- `T.*` template functions output
- Data file integrity (all `_zh` fields present)
- `S` string completeness

## General Principle

When you add any game artifact (character, room, item, enemy), update:

1. The data file (JSON) — include `_zh` fields for zh-TW translations
2. The UI elements that display/interact with it — use `t()` for all user-facing strings
3. Any visual assets (pixel art) if applicable

---

## UI Component Reference

Understanding the game's UI structure helps when adding features. Here's the complete hierarchy:

### Layout Structure

**Status Panel** (Left Sidebar)

- **Status Section**: HP Display with hearts and text (100/100)
- **Location Section**: Location Name, Mini Map grid, Map Legend
- **Inventory Section**: Inventory List of carried items
- **Actions Section**: Action Buttons Grid containing:
  - Look Button, Inventory Button, Help Button (always visible)
  - Take Button (appears when items present)
  - Talk Button (appears when characters present)
  - Attack Button (appears when enemies present)

**Main Panel** (Right Side)

- **Portrait Display**: Character portraits during conversations
- **Terminal Output**: Game text messages and room descriptions
- **Command Input**: Text field for player commands

### Code References

| Component Name   | HTML/CSS Reference                   | Update Function                    |
| ---------------- | ------------------------------------ | ---------------------------------- |
| Status Panel     | `.status-panel`                      | N/A (container)                    |
| HP Display       | `.hp-display`, `#hp-bar`, `#hp-text` | `updateHpBar()`                    |
| Location Name    | `#location-name`                     | `updateLocation()`                 |
| Mini Map         | `#pixel-map`                         | `updateMap()`                      |
| Inventory List   | `#inventory-list`                    | `updateInventory()`                |
| Take Button      | `#take-btn`                          | `updateTakeButton()`               |
| Talk Button      | `#talk-btn`                          | `updateTalkButton()`               |
| Attack Button    | `#attack-btn`                        | `updateAttackButton()`             |
| Portrait Display | `#portrait-container`                | `showPortrait()`, `hidePortrait()` |
| Terminal Output  | `#output`                            | `print(text, className)`           |
| Command Input    | `#command`                           | N/A (user input)                   |
