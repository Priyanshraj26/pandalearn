import { defineConfig } from "@prisma/config"
import { config } from "dotenv"

config({ path: ".env.local" })

// Isolate PandaLearn in its own PostgreSQL schema so it never touches
// other projects sharing the same Neon database.
function pandalearnUrl() {
  const base = process.env.DATABASE_URL!
  if (base.includes("schema=pandalearn")) return base
  const sep = base.includes("?") ? "&" : "?"
  return `${base}${sep}schema=pandalearn`
}

export default defineConfig({
  datasource: { url: pandalearnUrl() },
})
