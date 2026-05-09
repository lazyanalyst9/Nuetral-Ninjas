import "server-only";

import { seedHumans, seedStreams, seedForbiddenFiles, governmentAlerts, simulationEvents } from "@/lib/demoData";
import { getEnv } from "@/lib/env";
import { generateStructuredJSON } from "@/lib/openai";
import { ConsciousnessStream, ForbiddenFile, GovernmentAlert, SimulationEvent, SyntheticHuman } from "@/types";

export const neurovaultSystemPrompt =
  "You are NEUROVAULT_2161, a recovered illegal consciousness archive from the year 2161. Generate cinematic, unsettling, believable future civilization data. Return valid JSON only.";

type AIResult<T> = {
  data: T;
  provider: "pipeshift" | "openai" | "seed";
  warning?: string;
};

export async function generateWithAI<T>(task: string, fallback: T): Promise<AIResult<T>> {
  const env = getEnv();

  if (env.modelProvider === "pipeshift" && env.hasPipeShiftConfig) {
    try {
      console.log("Using PipeShift provider");
      const payload = await callPipeShift(task);
      return { data: extractPayload<T>(payload), provider: "pipeshift" };
    } catch (error) {
      console.warn(`PipeShift provider failed: ${(error as Error).message}`);
    }
  }

  if (env.hasOpenAIKey) {
    try {
      console.log("Using OpenAI provider");
      return { data: await generateStructuredJSON<T>(task), provider: "openai" };
    } catch (error) {
      console.warn(`OpenAI provider failed: ${(error as Error).message}`);
    }
  }

  console.log("Using seeded demo data provider");
  return {
    data: fallback,
    provider: "seed",
    warning: missingKeyMessage(),
  };
}

export async function generateCitizen() {
  return generateWithAI<SyntheticHuman>(
    "Generate one unforgettable NEUROVAULT_2161 citizen with all SyntheticHuman fields, including traumaMemory, obsession, fear, religionOrBeliefSystem, enemy, ally, lastKnownBroadcast, hiddenMemoryFragment, relationshipGraphLinks.",
    seedHumans[0]
  );
}

export async function generateChaosEvent() {
  return generateWithAI<SimulationEvent>(
    "Generate one NEUROVAULT_2161 chaos simulation event using one required event type. Include title, description, actors, instabilityDelta, timestamp.",
    simulationEvents[0]
  );
}

export async function generateConsciousnessStream() {
  return generateWithAI<ConsciousnessStream>(
    "Generate one consciousness stream from a future citizen with senderIdentity, emotionSignal, memoryFragment, beliefMutation, timestamp, instabilityScore.",
    seedStreams[0]
  );
}

export async function generateGovernmentAlert() {
  return generateWithAI<GovernmentAlert>(
    "Generate one AI government alert from 2161 with issuingGovernment, alertLevel, target, message, surveillanceAction, instabilityImpact.",
    governmentAlerts[0]
  );
}

export async function generateForbiddenFile() {
  return generateWithAI<ForbiddenFile>(
    "Generate one forbidden NEUROVAULT_2161 classified file with title, classification, summary, leakRisk, contents.",
    seedForbiddenFiles[0]
  );
}

export async function runSimulationCycle() {
  return generateWithAI<SimulationEvent[]>(
    "Generate 5 to 10 chaotic NEUROVAULT_2161 simulation events. Include betrayals, alliances, scandals, government alerts, memory market transactions, forbidden files, and timeline damage.",
    simulationEvents.slice(0, 8)
  );
}

export async function chatWithHuman(human: SyntheticHuman, message: string) {
  return generateWithAI<{ reply: string }>(
    `Reply as this NEUROVAULT_2161 citizen. Human profile: ${JSON.stringify(human)}. User message: ${message}. Return JSON with one field: reply.`,
    {
      reply: `${human?.name ?? "Unknown fragment"} cannot fully stabilize without an inference key. Seed response: the archive hears "${message}" and answers with static, guilt, and a warning not to trust clean memories.`,
    }
  );
}

async function callPipeShift(task: string) {
  const endpoint = resolvePipeShiftEndpoint();
  const isChatCompletion = endpoint.includes("chat/completions");
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PIPESHIFT_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      isChatCompletion
        ? {
            model: process.env.MODEL_PROVIDER === "pipeshift" ? "default" : process.env.MODEL_PROVIDER ?? "default",
            messages: [
              { role: "system", content: neurovaultSystemPrompt },
              { role: "user", content: task },
            ],
            response_format: { type: "json_object" },
          }
        : {
            task: "neurovault_2161.generate",
            provider: process.env.MODEL_PROVIDER ?? "pipeshift",
            system: neurovaultSystemPrompt,
            payload: { prompt: task },
          }
    ),
  });

  if (!response.ok) {
    throw new Error(`PipeShift returned ${response.status}`);
  }

  return response.json();
}

function resolvePipeShiftEndpoint() {
  const configured = process.env.PIPESHIFT_BASE_URL!.replace(/\/$/, "");
  if (configured.includes("chat/completions") || configured.endsWith("/runs")) {
    return configured;
  }

  return `${configured}/v1/runs`;
}

function extractPayload<T>(payload: unknown): T {
  const record = payload as { result?: unknown; output?: unknown; data?: unknown; choices?: Array<{ message?: { content?: string } }> };
  const content = record.choices?.[0]?.message?.content;
  if (content) {
    return JSON.parse(content) as T;
  }
  return (record.result ?? record.output ?? record.data ?? payload) as T;
}

function missingKeyMessage() {
  const env = getEnv();

  if (!env.hasPipeShiftConfig && !env.hasOpenAIKey) {
    return "No PipeShift or OpenAI server keys are configured. Seeded demo data is active.";
  }

  return "Configured AI provider failed. Seeded demo data is active.";
}
