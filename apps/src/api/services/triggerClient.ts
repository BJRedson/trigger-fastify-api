export async function triggerProcessMessage(payload: {
  message: string; correlationId?: string;
}) {
  const { processMessage } = await import("../../triggers/processMessage.task");
  const run = await processMessage.trigger(payload);
  return { runId: run.id };
}