[English](README.en.md) | 繁體中文

# 學習 Claude Code

一門在 Claude Code 中學習 Claude Code 的互動式課程。

Claude 以對話方式教學，逐步引導你學習概念並完成實作練習。

## 快速開始

1. 首先，安裝 [Claude Code](https://docs.anthropic.com/en/docs/claude-code)（如果尚未安裝）：

```bash
npm install -g @anthropic-ai/claude-code
```

2. 複製此儲存庫：

```bash
git clone https://github.com/delbaoliveira/learn-claude-code
cd learn-claude-code
pnpm install
```

> **注意**：`pnpm install` 會自動從 `reference/starter/` 初始化 `dungeon/` 工作區。

3. 啟動 Claude 對話：

```bash
claude
```

4. 輸入 `/course` 開始課程。

---

## 你將打造的專案

在整個課程中，你將打造**地下城與代理**（Dungeons & Agents）—— 一款在瀏覽器中執行的文字冒險遊戲。

```
╔═══════════════════════════════════════════╗
║             地下城與代理                   ║
╚═══════════════════════════════════════════╝

你站在一個黑暗洞穴的入口。
一陣冷風從深處吹來。

> go north
```

每堂課教授一個 Claude Code 概念，然後讓你將其應用到遊戲中。到第 10 課結束時，你將擁有一個完整的遊戲，包含房間、物品、戰鬥系統，以及對 Claude Code 的扎實理解。

啟動遊戲伺服器：

```bash
pnpm start
```

- 繁體中文版（預設）：http://localhost:3000
- English：http://localhost:3000?lang=en

課程中逐步建構時使用學生工作區：

```bash
pnpm run dev
```

---

## 課程結構

**簡介**

0. 歡迎

**第一部分：入門**

1. 你的第一次 Session
2. CLI 導航
3. 管理上下文
4. 模式

**第二部分：專案上下文**

5. CLAUDE.md
6. 撰寫規則
7. 提示技巧
8. 建立技能

**第三部分：代理**

9. 子代理
10. 應用程式代理

---

## 目錄結構

```
learn-claude-code/
├── learn-claude/               # 11 堂課程
│   └── zh-TW/                  # 繁體中文版課程
├── dungeon/                    # 你的工作區（自動產生，不追蹤於 git）
│   ├── server.js               # 遊戲伺服器
│   ├── index.html              # 終端風格 UI
│   ├── game.js                 # 遊戲引擎（由你來打造！）
│   ├── data/                   # 遊戲資料（房間、物品、敵人）
│   └── course-progress.json    # 你的學習進度
├── reference/
│   ├── starter/                # 初始狀態（用於 /course reset）
│   └── complete/               # 完整參考實作
├── .claude/
│   └── skills/
│       ├── course/             # 互動式課程執行器
│       └── dungeon/            # 遊戲建構技能（第 09 課）
└── README.md
```

## 課程指令

| 指令               | 說明                       |
| ------------------ | -------------------------- |
| `/course`          | 顯示進度儀表板             |
| `/course next`     | 繼續下一堂課               |
| `/course progress` | 查看詳細統計               |
| `/course exit`     | 暫停並儲存進度             |
| `/course reset`    | 重新開始                   |
| `/course update`   | 更新至最新版本             |
| `/course lang zh-TW` | 設定為繁體中文           |
| `/course lang en`  | 設定為英文                 |

---

## 給貢獻者

### 根據官方文件審查課程

```
/review-lesson 03
```

### 產生新課程

```
/lesson "topic name"
```
