import { describe, it, expect } from "vitest"
import { readFileSync } from "fs"
import { resolve } from "path"
import { detectLocale, createT, createTemplates, S, dirNames } from "../reference/complete/strings.js"

// ============ detectLocale ============

describe("detectLocale", () => {
  it("defaults to 'en' when no query param", () => {
    expect(detectLocale("")).toBe("en")
  })

  it("defaults to 'en' when search is undefined-like", () => {
    expect(detectLocale("?foo=bar")).toBe("en")
  })

  it("returns 'zh-TW' when ?lang=zh-TW", () => {
    expect(detectLocale("?lang=zh-TW")).toBe("zh-TW")
  })

  it("returns 'en' for invalid locale values", () => {
    expect(detectLocale("?lang=fr")).toBe("en")
    expect(detectLocale("?lang=zh-CN")).toBe("en")
  })
})

// ============ t() helper ============

describe("t() with English locale", () => {
  const t = createT("en")

  it("returns English from locale map", () => {
    expect(t(S.welcome)).toBe("Welcome to Dungeons & Agents!")
  })

  it("returns base field from data object", () => {
    const room = { name: "Cave Entrance", name_zh: "洞穴入口" }
    expect(t(room, "name")).toBe("Cave Entrance")
  })

  it("returns field even when _zh is missing", () => {
    const obj = { name: "Test" }
    expect(t(obj, "name")).toBe("Test")
  })
})

describe("t() with zh-TW locale", () => {
  const t = createT("zh-TW")

  it("returns zh-TW from locale map", () => {
    expect(t(S.welcome)).toBe("歡迎來到 Dungeons & Agents！")
  })

  it("returns _zh field from data object", () => {
    const room = { name: "Cave Entrance", name_zh: "洞穴入口" }
    expect(t(room, "name")).toBe("洞穴入口")
  })

  it("falls back to English when _zh field is missing", () => {
    const obj = { name: "Test" }
    expect(t(obj, "name")).toBe("Test")
  })

  it("falls back to English when locale map has no zh-TW", () => {
    const map = { en: "English only" }
    expect(t(map)).toBe("English only")
  })
})

// ============ T template functions ============

describe("Template functions (English)", () => {
  const tEn = createT("en")
  const T = createTemplates("en", tEn)

  it("T.youGo formats correctly", () => {
    expect(T.youGo("up")).toBe("You go up.")
  })

  it("T.youPickUp formats correctly", () => {
    expect(T.youPickUp("Rusty Sword")).toBe("You pick up the Rusty Sword.")
  })

  it("T.youAttackFor formats correctly", () => {
    expect(T.youAttackFor("Goblin", 10)).toBe("You attack the Goblin for 10 damage!")
  })

  it("T.enemyDefeated formats correctly", () => {
    expect(T.enemyDefeated("Goblin")).toBe("The Goblin is defeated!")
  })

  it("T.playerHpLeft formats correctly", () => {
    expect(T.playerHpLeft(75)).toBe("You have 75 hp left.")
  })

  it("T.carrying formats correctly", () => {
    expect(T.carrying("Sword, Torch")).toBe("You are carrying: Sword, Torch")
  })

  it("T.youSay formats correctly", () => {
    expect(T.youSay("Hello")).toBe('You: "Hello"')
  })

  it("T.npcSays formats correctly", () => {
    expect(T.npcSays("Elara", "Welcome")).toBe('Elara: "Welcome"')
  })

  it("T.npcGreeting formats correctly", () => {
    expect(T.npcGreeting("Elara", "Welcome")).toBe('Elara: "Welcome"')
  })

  it("T.exitList formats correctly", () => {
    expect(T.exitList("up, down")).toBe("Exits: up, down")
  })

  it("T.localizeExits keeps English directions", () => {
    expect(T.localizeExits("up, down")).toBe("up, down")
  })
})

describe("Template functions (zh-TW)", () => {
  const tZh = createT("zh-TW")
  const T = createTemplates("zh-TW", tZh)

  it("T.youGo formats correctly in Chinese", () => {
    expect(T.youGo("up")).toBe("你往上走。")
  })

  it("T.youPickUp formats correctly in Chinese", () => {
    expect(T.youPickUp("生鏽的劍")).toBe("你撿起了生鏽的劍。")
  })

  it("T.youAttackFor formats correctly in Chinese", () => {
    expect(T.youAttackFor("哥布林", 10)).toBe("你攻擊了哥布林，造成 10 點傷害！")
  })

  it("T.enemyDefeated formats correctly in Chinese", () => {
    expect(T.enemyDefeated("哥布林")).toBe("哥布林被擊敗了！")
  })

  it("T.playerHpLeft formats correctly in Chinese", () => {
    expect(T.playerHpLeft(75)).toBe("你還剩 75 HP。")
  })

  it("T.youSay uses Chinese quotation marks", () => {
    expect(T.youSay("你好")).toBe("你：「你好」")
  })

  it("T.npcSays uses Chinese quotation marks", () => {
    expect(T.npcSays("艾拉拉", "歡迎")).toBe("艾拉拉：「歡迎」")
  })

  it("T.npcGreeting uses Chinese quotation marks", () => {
    expect(T.npcGreeting("艾拉拉", "歡迎")).toBe("艾拉拉：「歡迎」")
  })

  it("T.exitList uses Chinese label", () => {
    expect(T.exitList("上、下")).toBe("出口: 上、下")
  })

  it("T.localizeExits translates directions to Chinese", () => {
    expect(T.localizeExits("up, down")).toBe("上、下")
  })

  it("T.localizeExits handles unknown directions gracefully", () => {
    expect(T.localizeExits("up, northwest")).toBe("上、northwest")
  })
})

// ============ Data file integrity ============

describe("Data file integrity — rooms.json", () => {
  const rooms = JSON.parse(
    readFileSync(resolve("reference/complete/data/rooms.json"), "utf-8")
  )

  it("all rooms have name_zh", () => {
    for (const [id, room] of Object.entries(rooms)) {
      expect(room.name_zh, `room ${id} missing name_zh`).toBeTruthy()
    }
  })

  it("all rooms have description_zh", () => {
    for (const [id, room] of Object.entries(rooms)) {
      expect(room.description_zh, `room ${id} missing description_zh`).toBeTruthy()
    }
  })
})

describe("Data file integrity — items.json", () => {
  const items = JSON.parse(
    readFileSync(resolve("reference/complete/data/items.json"), "utf-8")
  )

  it("all items have name_zh", () => {
    for (const [id, item] of Object.entries(items)) {
      expect(item.name_zh, `item ${id} missing name_zh`).toBeTruthy()
    }
  })

  it("all items have description_zh", () => {
    for (const [id, item] of Object.entries(items)) {
      expect(item.description_zh, `item ${id} missing description_zh`).toBeTruthy()
    }
  })

  it("all items have icon field", () => {
    for (const [id, item] of Object.entries(items)) {
      expect(item.icon, `item ${id} missing icon`).toBeTruthy()
    }
  })
})

describe("Data file integrity — characters.json", () => {
  const characters = JSON.parse(
    readFileSync(resolve("reference/complete/data/characters.json"), "utf-8")
  )

  it("all characters have name_zh", () => {
    for (const [id, char] of Object.entries(characters)) {
      expect(char.name_zh, `character ${id} missing name_zh`).toBeTruthy()
    }
  })

  it("all characters have personality_zh", () => {
    for (const [id, char] of Object.entries(characters)) {
      expect(char.personality_zh, `character ${id} missing personality_zh`).toBeTruthy()
    }
  })

  it("all characters have greeting_zh", () => {
    for (const [id, char] of Object.entries(characters)) {
      expect(char.greeting_zh, `character ${id} missing greeting_zh`).toBeTruthy()
    }
  })
})

describe("Data file integrity — enemies.json", () => {
  const enemies = JSON.parse(
    readFileSync(resolve("reference/complete/data/enemies.json"), "utf-8")
  )

  it("all enemies have name_zh", () => {
    for (const [id, enemy] of Object.entries(enemies)) {
      expect(enemy.name_zh, `enemy ${id} missing name_zh`).toBeTruthy()
    }
  })
})

// ============ S strings completeness ============

describe("S strings have both en and zh-TW", () => {
  for (const [key, map] of Object.entries(S)) {
    if (typeof map === "object" && map.en) {
      it(`S.${key} has zh-TW translation`, () => {
        expect(map["zh-TW"], `S.${key} missing zh-TW`).toBeTruthy()
      })
    }
  }
})

// ============ dirNames completeness ============

describe("dirNames have both en and zh-TW", () => {
  for (const [dir, map] of Object.entries(dirNames)) {
    it(`dirNames.${dir} has en and zh-TW`, () => {
      expect(map.en).toBeTruthy()
      expect(map["zh-TW"]).toBeTruthy()
    })
  }
})
