═══════════════════════════════════════════════════════════════════
課程 10：應用程式代理
═══════════════════════════════════════════════════════════════════

你使用了 Claude 子代理來建立新的遊戲角色。角色已經存在了，但它們的回應是靜態的。

現在讓我們用 AI 讓它們能動態回應使用者。

這堂課你需要有一個 Anthropic API 金鑰，需要至少 5 美元的額度。這堂課的提示也會安裝 Anthropic SDK。如果你想跳過，只需輸入 `/course complete`。

## 差異

- **Claude 子代理** — 幫助你撰寫程式碼
- **應用程式代理** — 在應用程式中執行，與玩家互動。

## 安全提醒

請妥善保管你的 API 金鑰。不應該提交到版本控制、暴露給瀏覽器，或分享給任何人。

## 動手試試

1. 請 Claude 建立 `.env` 檔案：

   > 在 dungeon 目錄建立一個 `.env` 檔案，包含我的 API 金鑰。檔案應該包含：
   >
   > ```
   > ANTHROPIC_API_KEY=sk-ant-xxxxx
   > ```
   >
   > 把 .env 檔案加到 .gitignore。

2. 從 https://console.anthropic.com/settings/keys 取得你的 API 金鑰，然後將 `sk-ant-xxxxx` 替換為你的實際 API 金鑰。

3. 在計畫模式中，請 Claude 加入 API 整合：

   > 加入 Claude API 整合，讓 NPC 能動態回應：
   >
   > - 安裝 Anthropic SDK 和 dotenv
   > - 在 server.js 建立 POST /api/talk 端點
   > - 從環境變數使用 ANTHROPIC_API_KEY
   > - 它應該接收 { character, message } 並回傳 AI 回應
   > - 角色的個性和知識應該影響回應
   > - 在對話模式中，玩家直接輸入訊息（不需要前綴）
   > - 輸入 "leave" 或移動到其他房間會退出對話模式

4. 重新啟動伺服器：

   ```bash
   node dungeon/server.js
   ```

5. 在遊戲中測試（使用方向鍵或輸入指令）：

   ```
   ↑（或 go up）
   ↑（或 go up）
   talk
   你知道哥布林的事嗎？
   跟我說說你自己
   leave
   ```

NPC 現在應該會動態回應，使用它們的個性和知識。它們不再只是資料——它們是代理。

## 你做到了！

你已經完成了整個課程。

當你準備好時，執行：

```
/course complete
```
