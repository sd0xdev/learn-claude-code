═══════════════════════════════════════════════════════════════════
第 01 課：你的第一次 Session
═══════════════════════════════════════════════════════════════════

Session（工作階段）是一段互動式對話，在這段對話中 Claude 可以查看你的專案並對程式碼進行修改。

Claude 會自動讀取你的專案結構。

> **提示**：你可以使用 `/exit` 或 `Ctrl+C` 退出目前的 Session，並使用 `claude --continue` 繼續最近的 Session。

## 試試看

讓我們對 Dungeons & Agents 進行你的第一次修改。

1. 請 Claude 新增第一批指令：

   > Look at the dungeon game in dungeon/. Add a basic command system to game.js:
   >
   > - 'help' shows available commands
   > - 'look' says "You are in a dark cave. Exits: up"
   > - Unknown commands show "I don't understand that"
   > - Enable the "Look" and "Take" buttons in the UI.

2. 接受 Claude 的變更。

3. 在**另一個終端機**中啟動遊戲伺服器：

   ```bash
   node dungeon/server.js
   ```

4. 開啟 http://localhost:3000 並試試新的 help 指令。
