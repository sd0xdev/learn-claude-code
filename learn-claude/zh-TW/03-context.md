═══════════════════════════════════════════════════════════════════
第 03 課：管理上下文
═══════════════════════════════════════════════════════════════════

## 什麼是上下文？

上下文是 Claude 在對話中能「看見」的所有內容——你的訊息、Claude 的回覆、讀取過的檔案、撰寫過的程式碼。這些全都存在於一個**上下文視窗**中，而它的大小是有限制的。

你可以把它想像成一塊白板。隨著你的工作，白板會逐漸被填滿。當它滿了，較早的內容會被清除以騰出空間給新內容。如果重要的細節被清除了，Claude 可能會遺忘你們先前討論過的事情。

## 為什麼這很重要

你正在進行一段深入的除錯工作。你已經分享了堆疊追蹤、解釋了架構、逐一檢視了檔案。然後 Claude 漏掉了你先前問過的某件事。

發生了什麼事？對話變得太長，早期的上下文被擠出去了。以下是管理上下文的方法。

## 關鍵指令

**`/context`** — 顯示你已使用了多少上下文視窗空間。

**`/compact`** — 將對話摘要成重點，釋放空間的同時保留重要的上下文。

**`/clear`** — 清除對話歷史紀錄並釋放上下文空間。

## 試試看

是時候為 Dungeons & Agents 新增房間了。

1. 執行 `/context` 查看你目前使用了多少上下文視窗空間。

2. 請 Claude 擴展房間系統：

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

3. 測試遊戲：用 `go up`、方向鍵、`look` 來探索。

4. 再次執行 `/context`——注意使用量增加了。

隨著你新增更多功能：對話變長時使用 `/compact`，需要重新開始時使用 `/clear`。
