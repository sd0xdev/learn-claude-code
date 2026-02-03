const http = require("http")
const fs = require("fs")
const path = require("path")

const PORT = 3000

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
}

// Track connected clients for live reload
const clients = new Set()

const server = http.createServer(async (req, res) => {
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
