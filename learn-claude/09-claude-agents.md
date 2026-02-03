═══════════════════════════════════════════════════════════════════
LESSON 09: Subagents
═══════════════════════════════════════════════════════════════════

A **subagent** is a specialized helper that runs in its own context window. Claude spawns subagents for complex tasks — they work independently, then report back.

For example, you can create agents to debug, design, implement features, etc.

Why use subagents?

- **Preserve context** — keep exploration out of your main conversation
- **Enforce constraints** — limit which tools a subagent can use
- **Control costs** — route tasks to faster, cheaper models like Haiku

## Built-in Subagents

| Agent               | Purpose                    | Model        |
| ------------------- | -------------------------- | ------------ |
| **Explore**         | Search and understand code | Haiku (fast) |
| **Plan**            | Research for planning      | Inherits     |
| **General-purpose** | Complex multi-step tasks   | Inherits     |

## Creating Custom Subagents

Run `/agents` to open the interactive subagent manager.

**Subagent fields:**

- `name` — identifier (lowercase, hyphens)
- `description` — tells Claude when to use this subagent
- `tools` — which tools the subagent can use (optional)
- `model` — `sonnet`, `opus`, `haiku`, or `inherit` (optional)

## Background Agents

Run subagents in the background while you keep working:

- **`Ctrl+B`** — background a running task
- **"run this in the background"** — ask Claude directly
- **`/tasks`** — check on background work

## Try It

1. Run `/agents`

2. Select **Create new agent** → **Project-level**

3. Select **Generate with Claude** and describe the agent:

   ```
   A character creator that makes NPCs for a dungeon game. It should read /skills/add-character/skill.md to understand the character creation process, read the rooms to understand the world, design characters with personality traits, and save them to data/characters.json.
   ```

4. Keep the default tools and model, pick a color, and save.

5. Test it in the background:

   > Create two new characters: a Dwarf NPC for the treasure-room and a Elf for the underground-lake. Run this in the background.

6. While it runs, check `/tasks` to see the background work.

7. Test: `talk dwarf` should show the dwarf's greeting.
