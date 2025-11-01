import { defineConfig } from "@trigger.dev/sdk";

export default defineConfig({
  runtime: "node-22",
  maxDuration: 120, // mínimo 5s; ajuste conforme necessário
  project: process.env.TRIGGER_PROJECT_REF || "local", // obrigatório pelo tipo TriggerConfig
  // logLevel: "info",                         // opcional
   dirs: ["apps/src/triggers"],                     // opcional; padrão: ["./trigger"]
  tsconfig: "./tsconfig.json",
});