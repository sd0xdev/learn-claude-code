═══════════════════════════════════════════════════════════════════
課程 07：提示技巧
═══════════════════════════════════════════════════════════════════

你請 Claude「加入戰鬥系統」，結果它建了一套精密的系統，包含類別、事件、骰子判定和狀態效果——但你只是想讓玩家打一隻哥布林而已。

令人沮喪的 Session 和高效率的 Session 之間的差別，就在於你如何下提示。

## 好提示的結構

**範圍** — 要修改哪些檔案或區域

> "In game.js, add an attack command..."
> "Store enemies in data/enemies.json"

**背景** — 目前已經有什麼？

> "The game already has rooms, items, and a take command..."

**約束** — 遵循 CLAUDE.md 中的規則

> "Enemy HP should be 5-30 per the game rules"
> "Keep it simple — no status effects or special abilities"

**驗收標準** — 「完成」是什麼樣子？

> "Player types 'attack', sees damage dealt, goblin dies or player dies"

## 提示模式

**新增內容：**

> Add a [room/item/enemy] called [name] in [location]. It should [description].

**新增功能：**

> Add [command] to game.js. It should [behavior]. Store data in [file].

**修正錯誤：**

> When I [action], expected [X] but got [Y]. The problem is in [file].

**說明：**

> How does the [system] work? Walk me through [specific flow].

## 動手試試

**模糊的提示：**

> Add combat to the game

**在計畫模式中使用詳細的提示：**

> Add combat to the dungeon game in game.js:
>
> - Enemies stored in data/enemies.json (id, name, hp, damage, room)
> - Player has hp (starts at 100)
> - 'attack' command starts turn-based combat with enemy in current room
> - Each turn: player deals 5 base damage plus weapon damage, enemy deals its damage
> - At 0 hp: enemy defeated (remove from room) or player dies (game over)
> - Add a goblin (30 hp, 3 damage) in narrow-tunnel
> - Create a Portrait Display box on top of the items box that displays the NPCs (enemies and characters) name, portrait, and description. The box should display on room entry if the NPC is present.

測試：前往隧道，輸入 `attack`，和哥布林戰鬥。
