import { FastifyInstance } from "fastify";
import { runs } from "@trigger.dev/sdk"; // SDK expõe a Management API p/ runs.retrieve
// docs: runs.retrieve(runId) -> status, payload, output, attempts
export async function runsRoutes(app: FastifyInstance) {
  app.get("/runs/:runId", async (req, reply) => {
    const { runId } = req.params as { runId: string };
    const info = await runs.retrieve(runId); // <- status/output (com secret key)
    return reply.send({ ok: true, run: info });
  });
}
