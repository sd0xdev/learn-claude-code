═══════════════════════════════════════════════════════════════════
LESSON 04: Modes
═══════════════════════════════════════════════════════════════════

You ask Claude to add a combat system to the dungeon game. It starts writing code immediately — but wait, should combat be turn-based or real-time? How should damage be calculated? Where does health get stored?

For complex tasks, you want Claude to _think before it codes_. That's what Plan Mode does.

Claude Code has three modes for different situations:

- **Normal Mode (Default)** — Claude proposes changes, you approve each one. Best for learning, reviewing unfamiliar code, or sensitive changes.
- **Auto-Accept Mode** — Claude makes file edits without asking. You still approve shell commands. Best for trusted refactoring and bulk operations.
- **Plan Mode** — Claude researches and plans before writing code. It explores the codebase, proposes an approach, then implements after you approve. Best for complex features and architectural changes.

## Try It

1. Press `Shift+Tab` until you see "plan" in the mode indicator below the input field.

2. Ask Claude to plan the inventory system:

   > Plan an inventory system for the dungeon game. Players can pick up items with 'take [item]', view inventory with 'inventory'. Items are stored in data/items.json.
   >
   > - Create pixel art for the items in the inventory.
   > - Make sure the Inventory List (in Inventory Section) and Take Button (in Actions Section) are working correctly. The Take Button should be enabled when items are present in the current room.
   > - Add a box at the top of the dialogue to display the items available in the current room.

3. Review Claude's plan and approve.

> Tip: Select option 2 to maintain the course context.

4. Test: `look` should show items, `take sword` picks it up, `inventory` lists what you're carrying.
