require("dotenv").config()
const http = require("http")
const fs = require("fs")
const path = require("path")
const Anthropic = require("@anthropic-ai/sdk")

const PORT = 3000

// Initialize Anthropic client (fallback if no API key)
const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
}

// Track connected clients for live reload
const clients = new Set()

const server = http.createServer(async (req, res) => {
  // Handle API requests
  if (req.method === "POST" && req.url === "/api/talk") {
    let body = ""

    req.on("data", (chunk) => {
      body += chunk.toString()
    })

    req.on("end", async () => {
      try {
        const { character, message } = JSON.parse(body)

        // If no API key, fallback to greeting
        if (!anthropic) {
          res.writeHead(200, { "Content-Type": "application/json" })
          res.end(JSON.stringify({ response: character.greeting }))
          return
        }

        // Build system prompt from character data
        const systemPrompt = `You are ${character.name}, ${character.personality}.
You are currently in the ${character.location}.
Your knowledge: ${character.knowledge}
Respond in character with dialogue only. Keep responses concise (1-2 sentences). No narration or scene-setting.`

        // Call Claude API
        const response = await anthropic.messages.create({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 200,
          temperature: 0.8,
          system: systemPrompt,
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
        })

        const aiResponse = response.content[0].text

        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ response: aiResponse }))
      } catch (err) {
        console.error("API error:", err)
        res.writeHead(500, { "Content-Type": "application/json" })
        res.end(
          JSON.stringify({
            response: "The character seems distracted...",
          }),
        )
      }
    })

    return
  }

  // Live reload endpoint
  if (req.url === "/live-reload") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    })
    res.write("data: connected\n\n")
    clients.add(res)
    req.on("close", () => clients.delete(res))
    return
  }

  let filePath = req.url === "/" ? "/index.html" : req.url
  filePath = path.join(__dirname, filePath)

  const ext = path.extname(filePath)
  const contentType = mimeTypes[ext] || "text/plain"

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404)
      res.end("Not found")
      return
    }
    res.writeHead(200, { "Content-Type": contentType })
    res.end(content)
  })
})

// Watch for file changes and notify clients
fs.watch(__dirname, { recursive: true }, (event, filename) => {
  if (filename && !filename.includes("node_modules")) {
    clients.forEach((client) => {
      client.write("data: reload\n\n")
    })
  }
})

server.listen(PORT, () => {
  console.log(`\n  Dungeons & Agents running at http://localhost:${PORT}`)
  console.log(`  Live reload enabled\n`)
})
