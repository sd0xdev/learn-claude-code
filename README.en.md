[繁體中文](README.md) | English

# Learn Claude Code

An interactive course for learning Claude Code in Claude Code.

Claude teaches you conversationally, walking you through concepts and hands-on exercises step by step.

## Quick Start

1. First, install [Claude Code](https://docs.anthropic.com/en/docs/claude-code) if you haven't already:

```bash
npm install -g @anthropic-ai/claude-code
```

2. Clone this repository:

```bash
git clone https://github.com/delbaoliveira/learn-claude-code
cd learn-claude-code
```

3. Start a session with Claude:

```bash
claude
```

4. Then type `/course` to begin.

---

## What You'll Build

Throughout the course, you'll build **Dungeons & Agents** — a text adventure game that runs in your browser.

```
╔═══════════════════════════════════════════╗
║            DUNGEONS  &  AGENTS            ║
╚═══════════════════════════════════════════╝

You stand at the entrance of a dark cave.
A cold wind blows from within.

> go north
```

Each lesson teaches a Claude Code concept, then has you apply it to the game. By lesson 10, you'll have a complete game with rooms, items, combat, and a foundational understanding of Claude Code.

Start the game server:

```bash
pnpm start
```

- Traditional Chinese (default): http://localhost:3000
- English: http://localhost:3000?lang=en

When building step-by-step during the course, use the student workspace:

```bash
pnpm run dev
```

---

## Course Structure

**Introduction**

0. Welcome

**Part 1: Getting Started**

1. Your First Session
2. CLI Navigation
3. Managing Context
4. Modes

**Part 2: Project Context**

5. CLAUDE.md
6. Writing Rules
7. Prompting
8. Creating Skills

**Part 3: Agents**

9. Subagents
10. Application Agents

---

## Directory Structure

```
learn-claude-code/
├── learn-claude/               # 11 lessons
├── dungeon/                    # Your workspace
│   ├── server.js               # Game server
│   ├── index.html              # Terminal-styled UI
│   ├── game.js                 # Game engine (you build this!)
│   ├── data/                   # Game data (rooms, items, enemies)
│   └── course-progress.json    # Your saved progress
├── reference/
│   ├── starter/                # Starting state (for /course reset)
│   └── complete/               # Complete reference implementation
├── .claude/
│   └── skills/
│       ├── course/             # Interactive course runner
│       └── dungeon/            # Game-building skills (lesson 09)
└── README.md
```

## Course Commands

| Command            | Description                  |
| ------------------ | ---------------------------- |
| `/course`          | Show dashboard with progress |
| `/course next`     | Continue to next lesson      |
| `/course progress` | View detailed stats          |
| `/course exit`     | Pause and save position      |
| `/course reset`    | Start over                   |
| `/course update`   | Update to latest version     |
| `/course lang zh-TW` | Switch to Traditional Chinese |
| `/course lang en`  | Switch to English            |

---

## For Contributors

### Review a lesson against official docs

```
/review-lesson 03
```

### Generate a new lesson

```
/lesson "topic name"
```
