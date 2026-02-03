# Claude CLI Hotkeys & Shortcuts Crash Course

Press `?` anytime to see available shortcuts for your environment.

---

## Essential Controls

| Shortcut  | What it does                               |
| --------- | ------------------------------------------ |
| `Ctrl+C`  | Cancel current input or stop generation    |
| `Ctrl+D`  | Exit Claude Code                           |
| `Escape`  | Cancel current input                       |
| `Esc Esc` | Rewind conversation/code to previous point |

---

## Navigation & Input

| Shortcut  | What it does                               |
| --------- | ------------------------------------------ |
| `Up/Down` | Navigate command history                   |
| `Ctrl+R`  | Reverse search through history             |
| `Ctrl+L`  | Clear terminal screen (keeps conversation) |

---

## Multiline Input

| Method       | How                                      |
| ------------ | ---------------------------------------- |
| Backslash    | Type `\` then `Enter`                    |
| Option+Enter | macOS default                            |
| Shift+Enter  | Works in iTerm2, WezTerm, Ghostty, Kitty |
| Ctrl+J       | Line feed (works everywhere)             |
| Paste        | Just paste multi-line content directly   |

**Tip:** Run `/terminal-setup` to enable Shift+Enter in VS Code, Alacritty, etc.

---

## Quick Prefixes

| Prefix | What it does                               | Example            |
| ------ | ------------------------------------------ | ------------------ |
| `/`    | Run a command or skill                     | `/help`, `/commit` |
| `!`    | Run bash directly (adds output to context) | `! git status`     |
| `@`    | File path autocomplete                     | `@src/components/` |

---

## Mode Switching

| Shortcut             | What it does                                    |
| -------------------- | ----------------------------------------------- |
| `Shift+Tab`          | Cycle between Normal → Auto-Accept → Plan modes |
| `Alt+P` / `Option+P` | Switch model without clearing prompt            |
| `Alt+T` / `Option+T` | Toggle extended thinking                        |

---

## Text Editing

| Shortcut | What it does                      |
| -------- | --------------------------------- |
| `Ctrl+K` | Delete from cursor to end of line |
| `Ctrl+U` | Delete entire line                |
| `Ctrl+Y` | Paste deleted text                |
| `Alt+B`  | Move back one word                |
| `Alt+F`  | Move forward one word             |

**macOS Note:** Alt shortcuts require Option as Meta. Set in:

- **iTerm2:** Settings → Profiles → Keys → "Esc+"
- **Terminal.app:** Settings → Profiles → Keyboard → "Use Option as Meta Key"

---

## During Tasks

| Shortcut | What it does                                     |
| -------- | ------------------------------------------------ |
| `Ctrl+B` | Background a running command (tmux: press twice) |
| `Ctrl+O` | Toggle verbose output (see tool details)         |
| `Ctrl+T` | Toggle task list visibility                      |

---

## Images & External Editor

| Shortcut           | What it does                        |
| ------------------ | ----------------------------------- |
| `Ctrl+V` / `Cmd+V` | Paste image from clipboard          |
| `Ctrl+G`           | Open prompt in external text editor |

---

## Common Built-in Commands

| Command    | Purpose                         |
| ---------- | ------------------------------- |
| `/help`    | Show all commands               |
| `/clear`   | Clear conversation              |
| `/compact` | Compress context to save tokens |
| `/cost`    | Show token usage                |
| `/plan`    | Enter plan mode                 |
| `/review`  | Review code changes             |
| `/commit`  | Generate commit message         |
| `/undo`    | Revert last change              |
| `/model`   | Change model                    |
| `/memory`  | Edit CLAUDE.md files            |
| `/init`    | Create CLAUDE.md for project    |
| `/resume`  | Resume previous session         |
| `/context` | Visualize context usage         |
| `/doctor`  | Check installation health       |
| `/vim`     | Enable vim editing mode         |
| `/theme`   | Change color theme              |
| `/tasks`   | List background tasks           |
| `/export`  | Export conversation             |

---

## Vim Mode (if enabled with `/vim`)

### Mode Switching

| Key   | Action               |
| ----- | -------------------- |
| `Esc` | Enter NORMAL mode    |
| `i`   | Insert before cursor |
| `a`   | Insert after cursor  |
| `I`   | Insert at line start |
| `A`   | Insert at line end   |
| `o`   | Open line below      |
| `O`   | Open line above      |

### Navigation (NORMAL mode)

| Key       | Action             |
| --------- | ------------------ |
| `h/j/k/l` | Left/down/up/right |
| `w`       | Next word          |
| `b`       | Previous word      |
| `0`       | Beginning of line  |
| `$`       | End of line        |
| `gg`      | Beginning of input |
| `G`       | End of input       |

### Editing (NORMAL mode)

| Key  | Action             |
| ---- | ------------------ |
| `x`  | Delete character   |
| `dd` | Delete line        |
| `dw` | Delete word        |
| `cc` | Change line        |
| `cw` | Change word        |
| `yy` | Yank (copy) line   |
| `p`  | Paste after        |
| `.`  | Repeat last change |

---

## History Search (Ctrl+R)

1. Press `Ctrl+R` to start
2. Type to search previous commands
3. `Ctrl+R` again cycles through matches
4. `Tab` or `Esc` accepts and lets you edit
5. `Enter` accepts and executes immediately
6. `Ctrl+C` cancels

---

## Customizing Keybindings

Run `/keybindings` to open `~/.claude/keybindings.json`.

Example - rebind Ctrl+E to open external editor:

```json
{
  "bindings": [
    {
      "context": "Chat",
      "bindings": {
        "ctrl+e": "chat:externalEditor"
      }
    }
  ]
}
```

### Chord Example (key sequence):

```json
{
  "bindings": [
    {
      "context": "Chat",
      "bindings": {
        "ctrl+k ctrl+s": "chat:submit"
      }
    }
  ]
}
```

Changes apply automatically without restart.

---

## Quick Reference Card

```
ESSENTIALS          MODES               INPUT
─────────────       ─────────────       ─────────────
Ctrl+C  Cancel      Shift+Tab  Cycle    /  Command
Ctrl+D  Exit        Alt+P      Model    !  Bash mode
Esc     Cancel      Alt+T      Think    @  File path
Esc Esc Rewind

EDITING             NAVIGATION          TASKS
─────────────       ─────────────       ─────────────
Ctrl+K  Kill line   Up/Down    History  Ctrl+B  Background
Ctrl+U  Clear line  Ctrl+R     Search   Ctrl+T  Task list
Ctrl+Y  Paste       Ctrl+L     Clear    Ctrl+O  Verbose
```
