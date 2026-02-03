═══════════════════════════════════════════════════════════════════
LESSON 01: Your First Session
═══════════════════════════════════════════════════════════════════

A session is an interactive conversation where Claude can see your project and make changes to your code.

Claude automatically reads your project structure.

> **Tip**: You can quit the current session with `/exit` or `Ctrl+C` and continue the most recent session with `claude --continue`.

## Try It

Let's make your first change to Dungeons & Agents.

1. Ask Claude to add the first commands:

   > Look at the dungeon game in dungeon/. Add a basic command system to game.js:
   >
   > - 'help' shows available commands
   > - 'look' says "You are in a dark cave. Exits: up"
   > - Unknown commands show "I don't understand that"
   > - Enable the "Look" and "Take" buttons in the UI.

2. Accept Claude's changes.

3. Start the game server in a **separate terminal**:

   ```bash
   node dungeon/server.js
   ```

4. Open http://localhost:3000 and try the new help command.
