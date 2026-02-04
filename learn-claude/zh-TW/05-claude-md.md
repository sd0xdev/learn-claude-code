═══════════════════════════════════════════════════════════════════
第 05 課：CLAUDE.md
═══════════════════════════════════════════════════════════════════

每次你請 Claude 新增一個房間，你都要解釋 JSON 格式。每次你想要一個物品，你都要描述資料存放的位置。如果 Claude 能自己記住呢？

**CLAUDE.md** 是一個 Claude 在 Session 開始時會自動讀取的檔案。將它加到你的專案根目錄，就能為 Claude 提供關於你專案的持久上下文。

## 範例：

```markdown
# My Project

## Overview

React app with TypeScript and Tailwind.

## Conventions

- Functional components with hooks
- Use named exports, not default exports
- Don't modify files in /legacy
```

## 為什麼這很重要

沒有 CLAUDE.md，你會不斷重複自己。有了它：

- Claude 了解你的專案結構
- Claude 自動遵循你的慣例
- 新團隊成員可以立即讓 Claude 上手

## 試試看

1. 為地下城遊戲建立一個 CLAUDE.md：

   > Create a CLAUDE.md in dungeon/ documenting the game structure, how rooms.json works, and that room descriptions should be 2-3 atmospheric sentences. Also document that whenever rooms are added or modified, the mapLayout grid in ui/ui.js must be updated to keep the mini map synchronized with actual room connections.

2. 測試看看：問 "What's the format for adding a new room?"——Claude 應該不需要你解釋就能回答。

現在你已經有了 CLAUDE.md，下一課將教你如何撰寫 Claude 確實會遵循的規則。
