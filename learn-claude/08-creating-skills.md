═══════════════════════════════════════════════════════════════════
LESSON 08: Creating Skills
═══════════════════════════════════════════════════════════════════

Every time you add a character to the dungeon game, you type the same instructions: ask for personality, knowledge, location, greeting, save to the right file. Skills let you write those instructions once. Claude applies them automatically whenever relevant — or you can invoke them manually with `/skill-name`.

## Why Use Skills

Without a skill, you repeat yourself:

> "Add a wizard. Ask me for personality, knowledge, location, greeting. Save to data/characters.json."

With a skill, you just say:

> "Add a wizard to the treasure room."

Claude recognizes the task matches your `add-character` skill, loads it, and follows your instructions.

## Anatomy of a Skill

**Frontmatter** — metadata between `---` lines:

- `name` — the skill name (e.g., `add-character`)
- `description` — tells Claude when to use this skill automatically
- `argument-hint` — placeholder text for manual invocation

**Body** — the prompt Claude follows. Use `$ARGUMENTS` for user input.

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

## Skill Locations

- `.claude/skills/` — project-specific
- `~/.claude/skills/` — global (all projects)

## Try It

1. Ask Claude to create the skill:

   > Create a Claude Code skill at .claude/skills/add-character/SKILL.md that adds NPCs to the dungeon game. It should ask for personality, knowledge, location, and greeting, then save to data/characters.json.
   >
   > - It should also create a pixel art for the character in ui/portraits.js.
   > - The character's name, portrait, and description should be displayed in the Portrait Display box on room entry if the character is present.

2. Test auto-invocation — just describe what you want:

   > Add a wizard character to the secret garden. They should be wise and guide the player to the treasure room.

3. Before we continue, let's enable the Talk Button, so we can interact with the characters:

   > Enable the Talk Button in the Actions Section when a character is in the room.
