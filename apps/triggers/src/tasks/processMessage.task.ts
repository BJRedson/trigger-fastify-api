import { task, wait } from "@trigger.dev/sdk";

export const processMessage = task({
  id: "process-message",
  run: async (payload: { message: string; correlationId?: string }, io) => {
    console.info("Start", payload);
    await wait.for({ seconds: 5 }); // simula trabalho (pausas são gerenciadas pelo Run Engine)
    const output = {
      uppercased: payload.message.toUpperCase(),
      reversed: payload.message.split("").reverse().join(""),
    };
    console.info("Done", { output });
    return output; // ficará disponível em runs.retrieve(runId).output
  },
});