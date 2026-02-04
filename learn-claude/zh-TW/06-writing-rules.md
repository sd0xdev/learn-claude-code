═══════════════════════════════════════════════════════════════════
課程 06：撰寫規則
═══════════════════════════════════════════════════════════════════

**規則**是 Claude 在處理你的專案時所遵循的約束條件。以遊戲為例，這代表你可以定義遊戲規則——武器傷害範圍、敵人數值、房間需求——而 Claude 每次新增內容時都會遵守這些規則。

## 規則的存放位置

在你的 `CLAUDE.md` 檔案中：

```markdown
## Rules

- Always use pnpm, never npm
- Don't modify files in /legacy
- Run tests before committing
```

## 規則類型

**風格：**"Use named exports, not default exports"

**邊界：**"Don't modify anything in /packages/core"

**流程：**"Run `pnpm test` after modifying test files"

**安全：**"Never commit API keys or secrets"

## 撰寫好的規則

| 模糊               | 具體                                       |
| ----------------- | ------------------------------------------ |
| "Write good code" | "Add JSDoc comments to exported functions" |
| "Be careful"      | "Ask before deleting files"                |

## 動手試試

1. 請 Claude 新增規則：

   > Add a Rules section to dungeon/CLAUDE.md with these game rules: weapon damage 1-10, enemy HP 5-30, room descriptions 2-3 atmospheric sentences, every room must have at least one exit, no one-way doors.

2. 試著打破規則：

   > Add a legendary sword that does 50 damage

3. Claude 應該會拒絕或調整以遵守你的規則。
