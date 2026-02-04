import { describe, it, expect, beforeAll, afterAll } from "vitest"
import http from "http"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dungeonDir = path.resolve(__dirname, "../dungeon")

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
}

// Replicate the server routing logic for testing
function createTestServer() {
  return http.createServer((req, res) => {
    const urlPath = req.url.split("?")[0]
    let filePath = urlPath === "/" ? "/index.html" : urlPath
    filePath = path.join(dungeonDir, filePath)

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
}

function fetch(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = ""
      res.on("data", (chunk) => (data += chunk))
      res.on("end", () => resolve({ status: res.statusCode, body: data }))
    }).on("error", reject)
  })
}

describe("Server routing", () => {
  let server
  let baseUrl

  beforeAll(async () => {
    server = createTestServer()
    await new Promise((resolve) => {
      server.listen(0, () => {
        const port = server.address().port
        baseUrl = `http://localhost:${port}`
        resolve()
      })
    })
  })

  afterAll(async () => {
    await new Promise((resolve) => server.close(resolve))
  })

  it("serves index.html at /", async () => {
    const res = await fetch(`${baseUrl}/`)
    expect(res.status).toBe(200)
  })

  it("serves index.html at /?lang=zh-TW (query string stripped)", async () => {
    const res = await fetch(`${baseUrl}/?lang=zh-TW`)
    expect(res.status).toBe(200)
    expect(res.body).toContain("html")
  })

  it("serves index.html at /?lang=en", async () => {
    const res = await fetch(`${baseUrl}/?lang=en`)
    expect(res.status).toBe(200)
  })

  it("returns 404 for nonexistent paths", async () => {
    const res = await fetch(`${baseUrl}/nonexistent.html`)
    expect(res.status).toBe(404)
  })
})
