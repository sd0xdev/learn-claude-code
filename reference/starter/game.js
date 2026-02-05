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

  // TODO: Add command handling here
  // Commands to implement: help, look, go, take, inventory, attack, talk, leave, say

  print(t(S.dontUnderstand), "error")
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

// Portrait close button
portraitClose.addEventListener("click", (e) => {
  e.stopPropagation()
  hidePortrait()
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

// ============ INITIALIZATION ============

async function init() {
  await loadRooms()
  await loadItems()
  await loadCharacters()
  await loadEnemies()

  updateUI()

  print(t(S.welcome))
  print(t(S.typeHelp))
  print("")
  const room = rooms[currentRoom]
  if (room) {
    print(t(room, "description"))
  }
}

init()
