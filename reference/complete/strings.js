// Dungeons & Agents - i18n / Localization
// Supports English (en) and Traditional Chinese (zh-TW)

// ============ LOCALE DETECTION ============

function detectLocale(search) {
  if (search === undefined) {
    search = typeof window !== "undefined" ? window.location.search : ""
  }
  return new URLSearchParams(search).get("lang") === "zh-TW" ? "zh-TW" : "en"
}

const locale = detectLocale()

if (typeof document !== "undefined") {
  document.documentElement.lang = locale === "zh-TW" ? "zh-TW" : "en"
}

// ============ TRANSLATION HELPER ============

// Factory for testability
function createT(loc) {
  return function t(objOrMap, field) {
    if (field !== undefined) {
      // Signature 1: t(obj, field) — data objects with _zh suffixed fields
      if (loc === "zh-TW" && objOrMap[field + "_zh"]) {
        return objOrMap[field + "_zh"]
      }
      return objOrMap[field]
    }
    // Signature 2: t({ en: "...", "zh-TW": "..." }) — locale maps
    if (loc === "zh-TW" && objOrMap["zh-TW"]) {
      return objOrMap["zh-TW"]
    }
    return objOrMap.en
  }
}

const t = createT(locale)

// ============ SYSTEM STRINGS ============

const S = {
  // Welcome / init
  welcome: { en: "Welcome to Dungeons & Agents!", "zh-TW": "歡迎來到 Dungeons & Agents！" },
  typeHelp: { en: "Type 'help' for available commands.", "zh-TW": "輸入 'help' 查看可用指令。" },

  // Help
  availableCommands: {
    en: "Available commands: help, look, go, take, inventory, attack, talk, leave",
    "zh-TW": "可用指令：help、look、go、take、inventory、attack、talk、leave",
  },

  // Look labels
  items: { en: "Items", "zh-TW": "物品" },
  enemies: { en: "Enemies", "zh-TW": "敵人" },
  exits: { en: "Exits", "zh-TW": "出口" },
  talkTo: { en: "Talk to", "zh-TW": "可對話" },

  // Movement
  cantGoThatWay: { en: "You can't go that way.", "zh-TW": "你不能往那個方向走。" },

  // Inventory
  dontSeeHere: { en: "You don't see that here.", "zh-TW": "這裡沒有那個東西。" },
  carryingNothing: { en: "You are carrying nothing.", "zh-TW": "你身上什麼都沒有。" },

  // Combat
  nothingToAttack: { en: "There's nothing to attack here.", "zh-TW": "這裡沒有可以攻擊的目標。" },
  youHaveBeenSlain: { en: "You have been slain. Game over.", "zh-TW": "你已陣亡。遊戲結束。" },
  refreshToRestart: { en: "Refresh to restart.", "zh-TW": "重新整理頁面以重新開始。" },

  // NPC conversation
  noOneHere: { en: "There's no one here to talk to.", "zh-TW": "這裡沒有人可以交談。" },
  dontSeeAnyone: { en: "I don't see anyone by that name here.", "zh-TW": "這裡沒有叫那個名字的人。" },
  typeMessageOrLeave: {
    en: "Type your message, or 'leave' to end conversation.",
    "zh-TW": "輸入你的訊息，或輸入 'leave' 結束對話。",
  },
  notTalkingToAnyone: { en: "You're not talking to anyone.", "zh-TW": "你目前沒有在與任何人對話。" },

  // Error
  dontUnderstand: { en: "I don't understand that.", "zh-TW": "我不明白那個指令。" },

  // Goblin easter egg
  goblinSpeak: {
    en: "GRAK SNORK BLURGLE!! MEEP GRONK SKREEEE!!",
    "zh-TW": "GRAK SNORK BLURGLE!! MEEP GRONK SKREEEE!!",
  },

  // UI labels
  statusLabel: { en: "STATUS", "zh-TW": "狀態" },
  locationLabel: { en: "LOCATION", "zh-TW": "位置" },
  inventoryLabel: { en: "INVENTORY", "zh-TW": "物品欄" },
  actionsLabel: { en: "ACTIONS", "zh-TW": "行動" },
  emptyInventory: { en: "Empty", "zh-TW": "空的" },
  unknownLocation: { en: "Unknown", "zh-TW": "未知" },
  enterCommand: { en: "Enter command...", "zh-TW": "輸入指令..." },
  itemsBarTitle: { en: "ITEMS:", "zh-TW": "物品：" },

  // Map legend
  legendYou: { en: "You", "zh-TW": "你" },
  legendVisited: { en: "Visited", "zh-TW": "已探索" },
  legendUnknown: { en: "Unknown", "zh-TW": "未知" },

  // Button labels
  btnLook: { en: "Look", "zh-TW": "查看" },
  btnInv: { en: "Inv", "zh-TW": "背包" },
  btnHelp: { en: "Help", "zh-TW": "說明" },
  btnTake: { en: "Take", "zh-TW": "拿取" },
  btnTalk: { en: "Talk", "zh-TW": "交談" },
  btnAtk: { en: "Atk", "zh-TW": "攻擊" },
}

// ============ TEMPLATE FUNCTIONS ============

// Direction display names
const dirNames = {
  up: { en: "up", "zh-TW": "上" },
  down: { en: "down", "zh-TW": "下" },
  left: { en: "left", "zh-TW": "左" },
  right: { en: "right", "zh-TW": "右" },
}

function createTemplates(loc, tFn) {
  const isZh = loc === "zh-TW"
  return {
    youGo: (dir) =>
      isZh
        ? `你往${dirNames[dir]?.["zh-TW"] || dir}走。`
        : `You go ${dir}.`,
    youPickUp: (name) =>
      isZh ? `你撿起了${name}。` : `You pick up the ${name}.`,
    carrying: (list) =>
      isZh ? `你帶著：${list}` : `You are carrying: ${list}`,
    youAttackFor: (name, dmg) =>
      isZh
        ? `你攻擊了${name}，造成 ${dmg} 點傷害！`
        : `You attack the ${name} for ${dmg} damage!`,
    enemyDefeated: (name) =>
      isZh ? `${name}被擊敗了！` : `The ${name} is defeated!`,
    enemyHpLeft: (name, hp) =>
      isZh ? `${name}還剩 ${hp} HP。` : `The ${name} has ${hp} hp left.`,
    enemyAttacksYou: (name, dmg) =>
      isZh
        ? `${name}攻擊你造成了 ${dmg} 點傷害！`
        : `The ${name} attacks you for ${dmg} damage!`,
    playerHpLeft: (hp) =>
      isZh ? `你還剩 ${hp} HP。` : `You have ${hp} hp left.`,
    youStopTalkingTo: (name) =>
      isZh ? `你結束了與${name}的對話。` : `You stop talking to ${name}.`,
    npcGreeting: (name, greeting) =>
      isZh ? `${name}：「${greeting}」` : `${name}: "${greeting}"`,
    youSay: (msg) => (isZh ? `你：「${msg}」` : `You: "${msg}"`),
    npcSays: (name, msg) =>
      isZh ? `${name}：「${msg}」` : `${name}: "${msg}"`,
    localizeExits: (exitsStr) =>
      isZh
        ? exitsStr.split(", ").map(d => dirNames[d]?.["zh-TW"] || d).join("、")
        : exitsStr,
    exitList: (exits) => `${tFn(S.exits)}: ${exits}`,
    itemList: (items) => `${tFn(S.items)}: ${items}`,
    enemyList: (enemies) => `${tFn(S.enemies)}: ${enemies}`,
    talkToList: (chars) => `${tFn(S.talkTo)}: ${chars}`,
    enemyStatus: (name, hp) =>
      isZh ? `${name} (${hp} HP)` : `${name} (${hp} hp)`,
    enemyEncounterStats: (hp, dmg) =>
      isZh ? `${hp} HP • ${dmg} 傷害` : `${hp} HP • ${dmg} damage`,
  }
}

const T = createTemplates(locale, t)

// ============ HTML LOCALIZATION ============

function localizeHTML() {
  if (typeof document === "undefined" || locale === "en") return

  // Panel titles
  const panelTitle = document.querySelector(".panel-title")
  if (panelTitle) panelTitle.textContent = t(S.statusLabel)

  const subtitles = document.querySelectorAll(".panel-subtitle")
  const subtitleKeys = [S.locationLabel, S.inventoryLabel, S.actionsLabel]
  subtitles.forEach((el, i) => {
    if (subtitleKeys[i]) el.textContent = t(subtitleKeys[i])
  })

  // Map legend
  const legendItems = document.querySelectorAll(".legend-item")
  const legendKeys = [S.legendYou, S.legendVisited, S.legendUnknown]
  legendItems.forEach((el, i) => {
    if (!legendKeys[i]) return
    const swatch = el.querySelector(".legend-swatch")
    el.textContent = ""
    if (swatch) el.appendChild(swatch)
    el.appendChild(document.createTextNode(" " + t(legendKeys[i])))
  })

  // Buttons with data-cmd
  const btnMap = { look: S.btnLook, inventory: S.btnInv, help: S.btnHelp, attack: S.btnAtk }
  document.querySelectorAll(".pixel-btn[data-cmd]").forEach((btn) => {
    const cmd = btn.dataset.cmd
    if (!btnMap[cmd]) return
    const icon = btn.querySelector(".btn-icon")
    btn.textContent = ""
    if (icon) btn.appendChild(icon)
    btn.appendChild(document.createTextNode(" " + t(btnMap[cmd])))
  })

  // Talk / Take buttons (no data-cmd)
  const talkBtn = document.getElementById("talk-btn")
  if (talkBtn) {
    const icon = talkBtn.querySelector(".btn-icon")
    talkBtn.textContent = ""
    if (icon) talkBtn.appendChild(icon)
    talkBtn.appendChild(document.createTextNode(" " + t(S.btnTalk)))
  }

  const takeBtn = document.getElementById("take-btn")
  if (takeBtn) {
    const icon = takeBtn.querySelector(".btn-icon")
    takeBtn.textContent = ""
    if (icon) takeBtn.appendChild(icon)
    takeBtn.appendChild(document.createTextNode(" " + t(S.btnTake)))
  }

  // Items bar title
  const itemsTitle = document.querySelector(".items-title")
  if (itemsTitle) itemsTitle.textContent = t(S.itemsBarTitle)

  // Input placeholder
  const cmdInput = document.getElementById("command")
  if (cmdInput) cmdInput.placeholder = t(S.enterCommand)

  // Initial output text
  const outputDiv = document.getElementById("output")
  if (outputDiv) {
    const systemPs = outputDiv.querySelectorAll("p.system")
    if (systemPs.length > 0) systemPs[0].textContent = t(S.typeHelp)
  }

  // Inventory empty text
  const emptyItem = document.querySelector(".inventory-empty")
  if (emptyItem) emptyItem.textContent = t(S.emptyInventory)
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", localizeHTML)
}

// ============ EXPORTS (for testing) ============

if (typeof module !== "undefined" && module.exports) {
  module.exports = { detectLocale, createT, createTemplates, S, dirNames }
}
