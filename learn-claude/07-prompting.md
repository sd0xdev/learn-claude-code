═══════════════════════════════════════════════════════════════════
LESSON 07: Prompting
═══════════════════════════════════════════════════════════════════

You ask Claude to "add combat" and it builds an elaborate system with classes, events, dice rolls, and status effects — when you just wanted the player to hit a goblin.

The difference between frustrating and productive sessions is how you prompt.

## Anatomy of a Good Prompt

**Scope** — What files or areas to touch

> "In game.js, add an attack command..."
> "Store enemies in data/enemies.json"

**Context** — What already exists?

> "The game already has rooms, items, and a take command..."

**Constraints** — Follow the rules in CLAUDE.md

> "Enemy HP should be 5-30 per the game rules"
> "Keep it simple — no status effects or special abilities"

**Acceptance criteria** — What does "done" look like?

> "Player types 'attack', sees damage dealt, goblin dies or player dies"

## Prompt Patterns

**Add content:**

> Add a [room/item/enemy] called [name] in [location]. It should [description].

**Add a feature:**

> Add [command] to game.js. It should [behavior]. Store data in [file].

**Fix a bug:**

> When I [action], expected [X] but got [Y]. The problem is in [file].

**Explain:**

> How does the [system] work? Walk me through [specific flow].

## Try It

**Vague prompt:**

> Add combat to the game

**Detailed prompt in plan mode:**

> Add combat to the dungeon game in game.js:
>
> - Enemies stored in data/enemies.json (id, name, hp, damage, room)
> - Player has hp (starts at 100)
> - 'attack' command starts turn-based combat with enemy in current room
> - Each turn: player deals 5 base damage plus weapon damage, enemy deals its damage
> - At 0 hp: enemy defeated (remove from room) or player dies (game over)
> - Add a goblin (30 hp, 3 damage) in narrow-tunnel
> - Create a Portrait Display box on top of the items box that displays the NPCs (enemies and characters) name, portrait, and description. The box should display on room entry if the NPC is present.

Test it: go to the tunnel, type `attack`, fight the goblin.
