═══════════════════════════════════════════════════════════════════
LESSON 05: CLAUDE.md
═══════════════════════════════════════════════════════════════════

Every time you ask Claude to add a room, you explain the JSON format. Every time you want an item, you describe where the data lives. What if Claude just remembered?

**CLAUDE.md** is a file Claude reads automatically at session start. Add it to your project root to give Claude persistent context about your project.

## Example:

```markdown
# My Project

## Overview

React app with TypeScript and Tailwind.

## Conventions

- Functional components with hooks
- Use named exports, not default exports
- Don't modify files in /legacy
```

## Why It Matters

Without CLAUDE.md, you repeat yourself constantly. With it:

- Claude knows your project structure
- Claude follows your conventions automatically
- New team members get Claude up to speed instantly

## Try It

1. Create a CLAUDE.md for the dungeon game:

   > Create a CLAUDE.md in dungeon/ documenting the game structure, how rooms.json works, and that room descriptions should be 2-3 atmospheric sentences. Also document that whenever rooms are added or modified, the mapLayout grid in ui/ui.js must be updated to keep the mini map synchronized with actual room connections.

2. Test it: ask "What's the format for adding a new room?" — Claude should know without you explaining.

Now that you have a CLAUDE.md, the next lesson shows you how to write rules that Claude actually follows.
