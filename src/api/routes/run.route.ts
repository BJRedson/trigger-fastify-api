import { FastifyInstance } from "fastify";
import { runs } from "@trigger.dev/sdk"; // Management API

export async function runsRoutes(app: FastifyInstance) {
  app.get("/runs/:runId", async (req, reply) => {
    const { runId } = req.params as { runId: string };
    const info = await runs.retrieve(runId); // requer TRIGGER_SECRET_KEY no processo
    return reply.send({ ok: true, run: info });
  });
}