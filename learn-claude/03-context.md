═══════════════════════════════════════════════════════════════════
LESSON 03: Managing Context
═══════════════════════════════════════════════════════════════════

## What is context?

Context is everything Claude can "see" during a conversation — your messages, Claude's responses, files that were read, code that was written. It all lives in a **context window**, which has a size limit.

Think of it like a whiteboard. As you work, you fill it up. When it's full, older content gets erased to make room for new content. If important details get erased, Claude might forget things you already discussed.

## Why it matters

You're deep in a debugging session. You've shared stack traces, explained the architecture, walked through files. Then Claude misses something you asked about earlier.

What happened? The conversation got too long, and early context was pushed out. Here's how to manage that.

## Key Commands

**`/context`** — Shows how much of the context window you've used.

**`/compact`** — Summarizes the conversation into key points, freeing up space while keeping important context.

**`/clear`** — Clear conversation history and free up context.

## Try It

Time to add rooms to Dungeons & Agents.

1. Run `/context` to see how much of the context window you've used.

2. Ask Claude to expand the room system:

   > Expand the dungeon game with more rooms. The cave-entrance already exists in data/rooms.json. Add 4 more connected rooms:
   >
   > - "narrow-tunnel" (up from entrance) — cramped passage, exits: down, right, up, left
   > - "treasure-room" (right of tunnel) — glittering chamber with gold coins, exits: left
   > - "underground-lake" (left of tunnel) — vast cavern with dark water, exits: right, left
   > - "secret-garden" (up from tunnel) — impossible flowers blooming underground, exits: down
   >
   > Update cave-entrance to have an exit up to narrow-tunnel.
   > Update game.js so 'look' shows the current room description and exits, 'go [direction]' or arrow keys (ArrowUp/Down/Left/Right) to move between rooms.
   > Update the mapLayout grid in ui/ui.js to show all rooms in their correct positions.
   > Make sure the map and room positions match.

3. Test the game: explore with `go up`, arrow keys, `look`.

4. Run `/context` again — notice the usage grew.

As you add more features: `/compact` when things get long, `/clear` when starting fresh.
