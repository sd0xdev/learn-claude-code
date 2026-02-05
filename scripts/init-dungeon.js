#!/usr/bin/env node
/**
 * Initialize dungeon/ workspace from reference/starter/
 * Preserves .env and course-progress.json if they exist
 */

const fs = require("fs")
const path = require("path")

const ROOT = path.resolve(__dirname, "..")
const DUNGEON = path.join(ROOT, "dungeon")
const STARTER = path.join(ROOT, "reference", "starter")

function copyRecursive(src, dest) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true })
    for (const file of fs.readdirSync(src)) {
      if (file === "node_modules") continue
      copyRecursive(path.join(src, file), path.join(dest, file))
    }
  } else {
    fs.copyFileSync(src, dest)
  }
}

function main() {
  // Check if dungeon exists
  if (fs.existsSync(DUNGEON)) {
    console.log("✓ dungeon/ already exists")
    return
  }

  // Check if starter exists
  if (!fs.existsSync(STARTER)) {
    console.error("✗ reference/starter/ not found")
    process.exit(1)
  }

  console.log("Initializing dungeon/ from reference/starter/...")
  copyRecursive(STARTER, DUNGEON)
  console.log("✓ dungeon/ initialized")
  console.log("  Run 'pnpm dev' to start the development server")
}

main()
