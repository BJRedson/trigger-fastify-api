import { FastifyInstance } from "fastify";
import { z } from "zod";

const bodySchema = z.object({
  message: z.string().min(1),
  correlationId: z.string().optional(),
});

export async function tasksRoutes(app: FastifyInstance) {
  app.post("/tasks", async (req, reply) => {
    const parsed = bodySchema.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send(parsed.error);
    const { message, correlationId } = parsed.data;
    const { processMessage } = await import("../../triggers/processMessage.task.js");
    const run = await processMessage.trigger({ message, correlationId });
    return reply.code(202).send({ ok: true, runId: run.id });
  });
}
