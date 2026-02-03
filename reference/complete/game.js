// Dungeons & Agents - Game Engine
// Starter skeleton for lessons

// ============ GAME STATE ============

let rooms = {}
let items = {}
let characters = {}
let enemies = {}
let inventory = []
let currentRoom = "cave-entrance"
let playerHp = 100
const maxHp = 100
let visitedRooms = new Set(["cave-entrance"])
let talkingTo = null
let talkingToId = null
let conversationState = {}
let storyFlags = new Set()

// ============ DATA LOADING ============

async function loadRooms() {
  const response = await fetch("data/rooms.json")
  rooms = await response.json()
}

async function loadItems() {
  const response = await fetch("data/items.json")
  items = await response.json()
}

async function loadCharacters() {
  try {
    const response = await fetch("data/characters.json")
    characters = await response.json()
  } catch (e) {
    characters = {}
  }
}

async function loadEnemies() {
  try {
    const response = await fetch("data/enemies.json")
    enemies = await response.json()
  } catch (e) {
    enemies = {}
  }
}

// ============ COMMAND PROCESSING ============

function processCommand(input) {
  const command = input.trim().toLowerCase()

  // Echo the command
  print(`> ${input}`, "command")

  // If in dialogue mode, treat input as message (unless it's leave/go)
  if (talkingTo) {
    if (command === "leave") {
      leaveConversation()
      return
    }
    if (command.startsWith("go ") || ["up", "down", "left", "right"].includes(command)) {
      leaveConversation()
      const direction = command.startsWith("go ") ? command.slice(3) : command
      goDirection(direction)
      return
    }
    // Treat as message to NPC
    sayTo(input)
    return
  }

  // Basic commands
  if (command === "help") {
    print(
      "Available commands: help, look, go, take, inventory, attack, talk, leave",
    )
  } else if (command === "look") {
    const room = rooms[currentRoom]
    if (room) {
      print(room.description)

      // Show items in room
      const roomItems = Object.entries(items)
        .filter(([id, item]) => item.room === currentRoom)
        .map(([id, item]) => item.name)
      if (roomItems.length > 0) {
        print(`Items: ${roomItems.join(", ")}`)
      }

      // Show enemies in room
      const roomEnemies = Object.entries(enemies)
        .filter(([id, enemy]) => enemy.room === currentRoom && enemy.hp > 0)
        .map(([id, enemy]) => `${enemy.name} (${enemy.hp} hp)`)
      if (roomEnemies.length > 0) {
        print(`Enemies: ${roomEnemies.join(", ")}`)
      }

      const exitList = Object.keys(room.exits).join(", ")
      if (exitList) {
        print(`Exits: ${exitList}`)
      }
    }
  } else if (command.startsWith("go ")) {
    const direction = command.slice(3).trim()
    goDirection(direction)
  } else if (command === "take" || command.startsWith("take ")) {
    const itemName = command === "take" ? "" : command.slice(5)
    take(itemName)
  } else if (command === "inventory" || command === "inv") {
    showInventory()
  } else if (command === "attack") {
    attack()
  } else if (command === "talk" || command.startsWith("talk ")) {
    const name = command === "talk" ? "" : command.slice(5)
    talk(name)
  } else if (command === "leave") {
    leaveConversation()
  } else if (command.startsWith("say ")) {
    const message = input.slice(4) // Use 'input' to preserve case
    sayTo(message)
  } else {
    print("I don't understand that.", "error")
  }
}

// ============ MOVEMENT ============

function goDirection(direction) {
  const room = rooms[currentRoom]
  if (room && room.exits[direction]) {
    currentRoom = room.exits[direction]
    visitedRooms.add(currentRoom)
    updateUI()
    const newRoom = rooms[currentRoom]
    if (newRoom) {
      print(`You go ${direction}.`)
      print(newRoom.description)

      // Show characters in room
      const roomCharacters = Object.entries(characters)
        .filter(([id, char]) => char.location === currentRoom)
        .map(([id, char]) => char.name)
      if (roomCharacters.length > 0) {
        print(`Talk to: ${roomCharacters.join(", ")}`)
      }

      // Show items in room
      const roomItems = Object.entries(items)
        .filter(([id, item]) => item.room === currentRoom)
        .map(([id, item]) => item.name)
      if (roomItems.length > 0) {
        print(`Items: ${roomItems.join(", ")}`)
      }

      // Show enemies in room
      const roomEnemies = Object.entries(enemies)
        .filter(([id, enemy]) => enemy.room === currentRoom && enemy.hp > 0)
        .map(([id, enemy]) => `${enemy.name} (${enemy.hp} hp)`)
      if (roomEnemies.length > 0) {
        print(`Enemies: ${roomEnemies.join(", ")}`)
      }

      const exitList = Object.keys(newRoom.exits).join(", ")
      if (exitList) {
        print(`Exits: ${exitList}`)
      }
    }
  } else {
    print("You can't go that way.", "error")
  }
}

// ============ INVENTORY SYSTEM ============

function take(itemName) {
  // Find item in current room
  let entry
  if (itemName === "") {
    // No target specified - take first item in room
    entry = Object.entries(items).find(
      ([id, item]) => item.room === currentRoom,
    )
  } else {
    // Target specified - match by name (case-insensitive, partial match)
    entry = Object.entries(items).find(
      ([id, item]) =>
        item.room === currentRoom &&
        item.name.toLowerCase().includes(itemName.toLowerCase()),
    )
  }

  if (entry) {
    const [id, item] = entry
    item.room = null // Remove from room
    inventory.push(id) // Add to inventory
    print(`You pick up the ${item.name}.`, "success")
    updateInventory()
    updateTakeButton()
    showItemsBar()
  } else {
    print("You don't see that here.", "error")
  }
}

function showInventory() {
  if (inventory.length === 0) {
    print("You are carrying nothing.")
  } else {
    const carried = inventory.map((id) => items[id].name).join(", ")
    print(`You are carrying: ${carried}`)
  }
}

// ============ COMBAT SYSTEM ============

function attack() {
  // Find enemy in current room with hp > 0
  const entry = Object.entries(enemies).find(
    ([id, enemy]) => enemy.room === currentRoom && enemy.hp > 0,
  )

  if (!entry) {
    print("There's nothing to attack here.", "error")
    return
  }

  const [id, enemy] = entry

  // Check for weapon damage bonus
  const weapon = inventory.find((itemId) => items[itemId].damage)
  const playerDamage = weapon ? items[weapon].damage : 5

  // Player attacks
  enemy.hp -= playerDamage
  print(`You attack the ${enemy.name} for ${playerDamage} damage!`, "combat")

  if (enemy.hp <= 0) {
    print(`The ${enemy.name} is defeated!`, "success")
    enemy.room = null // Remove enemy from room
    updateAttackButton()
    showEncounterBox()
    return
  }

  print(`The ${enemy.name} has ${enemy.hp} hp left.`, "combat")

  // Enemy attacks back
  playerHp -= enemy.damage
  print(`The ${enemy.name} attacks you for ${enemy.damage} damage!`, "combat")

  updateHpBar()

  if (playerHp <= 0) {
    print("You have been slain. Game over.", "error")
    print("Refresh to restart.")
    commandInput.disabled = true
    return
  }

  print(`You have ${playerHp} hp left.`, "combat")
}

// ============ NPC CONVERSATION SYSTEM ============

function talk(name) {
  // Find NPCs in current room
  const npcsInRoom = Object.entries(characters).filter(
    ([id, c]) => c.location === currentRoom,
  )

  if (npcsInRoom.length === 0) {
    // Easter egg: talk to the goblin
    const goblin = Object.entries(enemies).find(
      ([id, e]) => id === "goblin" && e.room === currentRoom && e.hp > 0
    )
    if (goblin) {
      print(`Goblin: "GRAK SNORK BLURGLE!! MEEP GRONK SKREEEE!!"`, "npc")
      return
    }

    print("There's no one here to talk to.", "error")
    return
  }

  let entry
  if (name === "") {
    // No target specified - talk to first NPC in room
    entry = npcsInRoom[0]
  } else {
    // Match by name or ID (case-insensitive, partial match)
    entry = npcsInRoom.find(
      ([id, c]) =>
        c.name.toLowerCase().includes(name.toLowerCase()) ||
        id.toLowerCase().includes(name.toLowerCase()),
    )
  }

  if (!entry) {
    print("I don't see anyone by that name here.", "error")
    return
  }

  const [id, character] = entry
  talkingTo = character
  talkingToId = id

  // Only show portrait if encounter box is hidden (already shows character info)
  if (encounterBox.hidden) {
    showPortrait(character)
  }
  print(`${character.name}: "${character.greeting}"`)
  print("")
  print("Type your message, or 'leave' to end conversation.")
}

function leaveConversation() {
  if (!talkingTo) return

  print(`You stop talking to ${talkingTo.name}.`)
  talkingTo = null
  talkingToId = null
  hidePortrait()
}

async function sayTo(message) {
  if (!talkingTo) {
    print("You're not talking to anyone.", "error")
    return
  }

  print(`You: "${message}"`)

  try {
    const res = await fetch("/api/talk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        character: talkingTo,
        message,
      }),
    })

    const data = await res.json()
    print(`${talkingTo.name}: "${data.response}"`, "npc")
  } catch (err) {
    console.error("Say error:", err)
    // Fallback to greeting if API fails
    print(`${talkingTo.name}: "${talkingTo.greeting}"`, "npc")
  }
}

// ============ EVENT HANDLERS ============

// Handle input
commandInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const input = commandInput.value
    if (input.trim()) {
      processCommand(input)
      commandInput.value = ""
    }
  }
})

// Focus input on click anywhere
document.addEventListener("click", () => commandInput.focus())

// Button handlers
document.querySelectorAll(".pixel-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation()
    const cmd = btn.dataset.cmd
    if (cmd && !btn.disabled) {
      processCommand(cmd)
    }
  })
})

// Keyboard shortcuts (when not typing in input)
// Disabled until commands are implemented
// document.addEventListener("keydown", (e) => {
//   if (document.activeElement === commandInput) return
//   const shortcuts = { l: "look", i: "inventory", h: "help", a: "attack" }
//   if (shortcuts[e.key.toLowerCase()]) {
//     e.preventDefault()
//     processCommand(shortcuts[e.key.toLowerCase()])
//   }
// })

// Portrait close button
portraitClose.addEventListener("click", (e) => {
  e.stopPropagation()
  leaveConversation()
})

// Talk button - talk to first NPC in room
talkBtn.addEventListener("click", (e) => {
  e.stopPropagation()
  const npc = Object.values(characters).find((c) => c.location === currentRoom)
  if (npc) {
    const name = npc.name.split(" ")[0].toLowerCase()
    processCommand(`talk ${name}`)
  }
})

// Take button - take first item in room
takeBtn.addEventListener("click", (e) => {
  e.stopPropagation()
  const item = Object.values(items).find((i) => i.room === currentRoom)
  if (item) {
    const name = item.name.split(" ")[0].toLowerCase()
    processCommand(`take ${name}`)
  }
})

// Arrow key navigation
document.addEventListener("keydown", (e) => {
  // Only capture arrows when input is empty (so typing still works)
  if (document.activeElement === commandInput && commandInput.value !== "")
    return

  const arrowMap = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  }

  if (arrowMap[e.key]) {
    e.preventDefault()
    processCommand(`go ${arrowMap[e.key]}`)
  }
})

// ============ INITIALIZATION ============

async function init() {
  await loadRooms()
  await loadItems()
  await loadCharacters()
  await loadEnemies()

  updateUI()
  enableCommandButtons()

  print("Welcome to Dungeons & Agents!")
  print("")
  const room = rooms[currentRoom]
  if (room) {
    print(room.description)

    // Show items in the starting room
    const roomItems = Object.entries(items)
      .filter(([id, item]) => item.room === currentRoom)
      .map(([id, item]) => item.name)
    if (roomItems.length > 0) {
      print(`Items: ${roomItems.join(", ")}`)
    }
  }
}

init()
