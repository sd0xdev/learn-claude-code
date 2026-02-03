═══════════════════════════════════════════════════════════════════
LESSON 06: Writing Rules
═══════════════════════════════════════════════════════════════════

A **rule** is a constraint Claude follows when working on your project. For a game, this means you can define game rules — weapon damage ranges, enemy stats, room requirements — and Claude respects them every time it adds content.

## Where Rules Live

In your `CLAUDE.md` file:

```markdown
## Rules

- Always use pnpm, never npm
- Don't modify files in /legacy
- Run tests before committing
```

## Rule Types

**Style:** "Use named exports, not default exports"

**Boundaries:** "Don't modify anything in /packages/core"

**Process:** "Run `pnpm test` after modifying test files"

**Safety:** "Never commit API keys or secrets"

## Writing Good Rules

| Vague             | Specific                                   |
| ----------------- | ------------------------------------------ |
| "Write good code" | "Add JSDoc comments to exported functions" |
| "Be careful"      | "Ask before deleting files"                |

## Try It

1. Ask Claude to add rules:

   > Add a Rules section to dungeon/CLAUDE.md with these game rules: weapon damage 1-10, enemy HP 5-30, room descriptions 2-3 atmospheric sentences, every room must have at least one exit, no one-way doors.

2. Try to break a rule:

   > Add a legendary sword that does 50 damage

3. Claude should push back or adjust to follow your rules.
