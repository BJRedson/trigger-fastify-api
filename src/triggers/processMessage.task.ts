import { task, wait } from "@trigger.dev/sdk";

export const processMessage = task({
  id: "process-message",
  run: async (payload: { message: string; correlationId?: string }, io) => {
    console.info("Start", payload);

    // Simula trabalho assíncrono
    await wait.for({ seconds: 5 });

    const output = {
      uppercased: payload.message.toUpperCase(),
      reversed: payload.message.split("").reverse().join("")
    };

    console.info("Done", { output });
    return output; // ficará acessível via runs.retrieve
  }
});