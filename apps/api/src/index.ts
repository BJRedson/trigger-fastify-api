import Fastify from "fastify";
import { env } from "./config.js";
import { tasksRoutes } from "./routes/tasks.route.js";
import { runsRoutes } from "./routes/runs.route.js";


async function main() {
  const app = Fastify({ logger: { level: env.LOG_LEVEL } });
  await app.register(tasksRoutes);
  await app.register(runsRoutes);
  app.get("/health", () => ({ ok: true, env: env.TRIGGER_ENV }));
  await app.listen({ port: env.PORT, host: "0.0.0.0" });
}
main().catch(err => { console.error(err); process.exit(1); });