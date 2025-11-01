import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function tasksRoutes(app: FastifyInstance) {
  app.post("/tasks", {
    schema: { body: z.object({ message: z.string().min(1), correlationId: z.string().optional() }) }
  }, async (req, reply) => {
    const { message, correlationId } = req.body as { message: string; correlationId?: string };

    // Import dinâmico evita ciclo entre app e workers
    const _import = (eval("import") as unknown as (path: string) => Promise<any>);
    const { processMessage } = await _import("../../../triggers/src/tasks/processMessage.task");
    const run = await processMessage.trigger({ message, correlationId }); // retorna o run
    return reply.code(202).send({ ok: true, runId: run.id });
  });
}
