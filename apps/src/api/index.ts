import "dotenv/config";
import Fastify from "fastify";
import { env } from "./config.js";
import { tasksRoutes } from "./routes/task.route.js";
import { runsRoutes } from "./routes/run.route.js";
import { ZodTypeProvider } from "fastify-type-provider-zod";

async function main() {
  // 👇 habilita o type provider do Zod
  const app = Fastify({ logger: { level: env.LOG_LEVEL } }).withTypeProvider<ZodTypeProvider>();

  await app.register(tasksRoutes);
  await app.register(runsRoutes);

  app.get("/health", async () => ({ ok: true, env: env.TRIGGER_ENV }));

  await app.listen({ port: env.PORT, host: "0.0.0.0" });
  app.log.info(`API up on :${env.PORT} (${env.TRIGGER_ENV})`);
}
main().catch((err) => { console.error(err); process.exit(1); });