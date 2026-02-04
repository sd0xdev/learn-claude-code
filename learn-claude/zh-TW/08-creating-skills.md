═══════════════════════════════════════════════════════════════════
課程 08：建立技能
═══════════════════════════════════════════════════════════════════

每次你在地牢遊戲中新增角色時，都要輸入一樣的指令：詢問個性、知識、位置、招呼語，存到正確的檔案。技能讓你只需要寫一次這些指令。Claude 會在相關時自動套用——或者你也可以用 `/skill-name` 手動呼叫。

## 為什麼要使用技能

沒有技能的話，你得重複自己：

> "Add a wizard. Ask me for personality, knowledge, location, greeting. Save to data/characters.json."

有了技能，你只需要說：

> "Add a wizard to the treasure room."

Claude 會辨識出這個任務符合你的 `add-character` 技能，載入它，然後照著你的指令執行。

## 技能的結構

**前置資料** — 在 `---` 行之間的中繼資料：

- `name` — 技能名稱（例如 `add-character`）
- `description` — 告訴 Claude 何時自動使用這個技能
- `argument-hint` — 手動呼叫時的佔位文字

**主體** — Claude 遵循的提示。使用 `$ARGUMENTS` 代入使用者的輸入。

```markdown
---
name: add-character
description: Add an NPC to the dungeon game
argument-hint: "<character-name>"
---

Create a new NPC named $ARGUMENTS for the dungeon game.

Ask the user for:

- Personality (2-3 traits)
- Knowledge (what do they know about the dungeon?)
- Location (which room are they in?)
- Greeting (what they say when you first talk to them)

Save to dungeon/data/characters.json.
```

## 技能的存放位置

- `.claude/skills/` — 專案層級
- `~/.claude/skills/` — 全域（所有專案）

## 動手試試

1. 請 Claude 建立技能：

   > Create a Claude Code skill at .claude/skills/add-character/SKILL.md that adds NPCs to the dungeon game. It should ask for personality, knowledge, location, and greeting, then save to data/characters.json.
   >
   > - It should also create a pixel art for the character in ui/portraits.js.
   > - The character's name, portrait, and description should be displayed in the Portrait Display box on room entry if the character is present.

2. 測試自動呼叫——只需描述你想要的：

   > Add a wizard character to the secret garden. They should be wise and guide the player to the treasure room.

3. 在繼續之前，讓我們啟用對話按鈕，這樣就能和角色互動：

   > Enable the Talk Button in the Actions Section when a character is in the room.
