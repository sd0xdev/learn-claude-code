// Dungeons & Agents - UI Management
// Handles all DOM updates and visual elements

// DOM Element References
const output = document.getElementById("output")
const commandInput = document.getElementById("command")
const hpBar = document.getElementById("hp-bar")
const hpText = document.getElementById("hp-text")
const locationName = document.getElementById("location-name")
const inventoryList = document.getElementById("inventory-list")
const attackBtn = document.getElementById("attack-btn")
const talkBtn = document.getElementById("talk-btn")
const takeBtn = document.getElementById("take-btn")
const itemsBar = document.getElementById("items-bar")
const itemsList = document.getElementById("items-list")
const pixelMap = document.getElementById("pixel-map")
const portraitContainer = document.getElementById("portrait-container")
const portraitArt = document.getElementById("portrait-art")
const portraitName = document.getElementById("portrait-name")
const portraitTrait = document.getElementById("portrait-trait")
const portraitClose = document.getElementById("portrait-close")

// Map configuration - room positions on grid
const mapLayout = {
  grid: [
    [null, null, null],
    [null, null, null],
    [null, "cave-entrance", null],
  ],
}

// Display text in the terminal
function print(text, className = "") {
  const p = document.createElement("p")
  p.textContent = text
  if (className) p.className = className
  output.appendChild(p)
  output.scrollTop = output.scrollHeight
}

// Update HP bar with heart icons
function updateHpBar() {
  hpBar.innerHTML = ""
  const hearts = 10
  const hpPerHeart = maxHp / hearts
  const filledHearts = Math.ceil(playerHp / hpPerHeart)
  const hpPercent = playerHp / maxHp

  for (let i = 0; i < hearts; i++) {
    const heart = document.createElement("span")
    heart.className = "hp-heart"
    heart.textContent = "♥"

    if (i >= filledHearts) {
      heart.classList.add("empty")
    } else if (hpPercent <= 0.25) {
      heart.classList.add("low")
    } else {
      heart.classList.add("full")
    }

    hpBar.appendChild(heart)
  }

  hpText.textContent = `${playerHp}/${maxHp}`
}

// Update location display
function updateLocation() {
  const room = rooms[currentRoom]
  if (room) {
    locationName.textContent = room.name
    visitedRooms.add(currentRoom)
  } else {
    locationName.textContent = "Unknown"
  }
}

// Get icon for item
function getItemIcon(itemName) {
  const name = itemName.toLowerCase()
  if (name.includes("sword")) return "⚔"
  if (name.includes("key")) return "🗝"
  if (name.includes("torch")) return "🔥"
  if (name.includes("potion")) return "🧪"
  if (name.includes("shield")) return "🛡"
  if (name.includes("gem") || name.includes("jewel")) return "💎"
  return "◆"
}

// Update inventory display
function updateInventory() {
  inventoryList.innerHTML = ""

  if (inventory.length === 0) {
    const li = document.createElement("li")
    li.className = "inventory-empty"
    li.textContent = "Empty"
    inventoryList.appendChild(li)
  } else {
    inventory.forEach((id) => {
      const item = items[id]
      const li = document.createElement("li")
      const icon = document.createElement("span")
      icon.className = "item-icon"
      icon.textContent = getItemIcon(item.name)
      li.appendChild(icon)
      li.appendChild(document.createTextNode(item.name))
      inventoryList.appendChild(li)
    })
  }
}

// Update attack button state
function updateAttackButton() {
  const hasEnemy = Object.values(enemies).some(
    (e) => e.room === currentRoom && e.hp > 0,
  )
  attackBtn.disabled = !hasEnemy
}

// Update talk button state
function updateTalkButton() {
  const hasNPC = Object.values(characters).some(
    (c) => c.location === currentRoom,
  )
  talkBtn.disabled = !hasNPC
}

// Update take button state
function updateTakeButton() {
  const hasItems = Object.values(items).some(
    (item) => item.location === currentRoom,
  )
  takeBtn.disabled = !hasItems
}

// Enable basic action buttons (look, help, inventory)
function enableBasicButtons() {
  document.querySelectorAll('.pixel-btn[data-cmd="look"], .pixel-btn[data-cmd="help"], .pixel-btn[data-cmd="inventory"]').forEach(btn => {
    btn.disabled = false
  })
}

// Get map cell HTML for a room
function getMapCell(roomId) {
  if (!roomId) {
    return '<div class="map-cell empty"></div>'
  }

  const isCurrent = roomId === currentRoom
  const isVisited = visitedRooms.has(roomId)

  let className = "map-cell"
  if (isCurrent) {
    className += " current"
  } else if (isVisited) {
    className += " visited"
  } else {
    className += " unknown"
  }

  return `<div class="${className}"></div>`
}

// Update mini map
function updateMap() {
  let html = ""

  for (const row of mapLayout.grid) {
    for (const roomId of row) {
      html += getMapCell(roomId)
    }
  }

  pixelMap.innerHTML = html
}

// Show character portrait
function showPortrait(character) {
  const charId = Object.keys(characters).find(
    (id) => characters[id].name === character.name,
  )

  const pixelArt = generatePixelArt(charId)
  if (pixelArt) {
    portraitArt.style.boxShadow = pixelArt
    portraitArt.textContent = ''
  } else {
    portraitArt.style.boxShadow = 'none'
    portraitArt.textContent = '?'
  }
  portraitName.textContent = character.name
  portraitTrait.textContent = character.personality
  portraitContainer.hidden = false
}

// Hide character portrait
function hidePortrait() {
  portraitContainer.hidden = true
}

// Update all UI elements
function updateUI() {
  updateHpBar()
  updateLocation()
  updateInventory()
  updateAttackButton()
  updateTalkButton()
  updateTakeButton()
  updateMap()
  enableBasicButtons()
}
