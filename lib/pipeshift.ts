import "server-only";

import { seedForbiddenFiles, seedHumans, seedSimulation, seedStreams, governmentAlerts, simulationEvents } from "@/lib/demoData";
import { generateStructuredJSON as generateOpenAIStructuredJSON } from "@/lib/openai";
import { ConsciousnessStream, ForbiddenFile, GovernmentAlert, NeuroSimulation, SimulationEvent, SyntheticHuman } from "@/types";

export const neurovaultSystemPrompt =
  "You are NEUROVAULT_2161, a recovered illegal consciousness archive from the year 2161. Generate cinematic, unsettling, believable future civilization data. Return valid JSON only.";

const simulationPrompt =
  "Run 25 years inside NEUROVAULT_2161. Return valid JSON with humans[50], streams[60], market[40], religions[25], timeline[50], governmentAlerts[35], forbiddenFiles[30], simulationEvents[40], realityBreaches[15], graph.nodes, graph.edges, yearsSimulated=25. Synthetic humans need all SyntheticHuman fields. Include illegal archive, AI religion, memory market, AI government, and corrupted timeline details.";

function hasPipeShiftCredentials() {
  return Boolean(process.env.PIPESHIFT_BASE_URL && process.env.PIPESHIFT_API_KEY);
}

export async function runNeuroSimulation(): Promise<NeuroSimulation> {
  try {
    return await runPipeShiftSimulation();
  } catch {
    try {
      return await runOpenAISimulation();
    } catch {
      return seedSimulation;
    }
  }
}

export async function generateStructuredJSON<T>(prompt: string, schemaName = "NEUROVAULT_2161_JSON"): Promise<T> {
  const payload = await callPipeShift(schemaName, {
    prompt,
    schemaName,
    system: neurovaultSystemPrompt,
    provider: process.env.MODEL_PROVIDER ?? "pipeshift",
  });
  return (payload.result ?? payload.output ?? payload.data ?? payload) as T;
}

export async function generateCitizen() {
  return generateViaNeurovault<SyntheticHuman>(
    "Generate one unforgettable NEUROVAULT_2161 citizen with all SyntheticHuman fields, including traumaMemory, obsession, fear, religionOrBeliefSystem, enemy, ally, lastKnownBroadcast, hiddenMemoryFragment, relationshipGraphLinks.",
    seedHumans[0]
  );
}

export async function generateChaosEvent() {
  return generateViaNeurovault<SimulationEvent>(
    "Generate one NEUROVAULT_2161 chaos simulation event using one of the required event types. Include title, description, actors, instabilityDelta, timestamp.",
    simulationEvents[0]
  );
}

export async function generateConsciousnessStream() {
  return generateViaNeurovault<ConsciousnessStream>(
    "Generate one consciousness stream from a future citizen with senderIdentity, emotionSignal, memoryFragment, beliefMutation, timestamp, instabilityScore.",
    seedStreams[0]
  );
}

export async function generateGovernmentAlert() {
  return generateViaNeurovault<GovernmentAlert>(
    "Generate one AI government alert from 2161 with issuingGovernment, alertLevel, target, message, surveillanceAction, instabilityImpact.",
    governmentAlerts[0]
  );
}

export async function generateForbiddenFile() {
  return generateViaNeurovault<ForbiddenFile>(
    "Generate one forbidden NEUROVAULT_2161 classified file with title, classification, summary, leakRisk, contents.",
    seedForbiddenFiles[0]
  );
}

export async function runSimulationCycle() {
  return generateViaNeurovault<SimulationEvent[]>(
    "Generate 3 to 7 chaotic NEUROVAULT_2161 simulation events. Include betrayals, alliances, scandals, government alerts, memory market transactions, forbidden files, and timeline damage.",
    simulationEvents.slice(0, 5)
  );
}

export async function generateViaNeurovault<T>(task: string, fallback: T): Promise<T> {
  try {
    if (hasPipeShiftCredentials()) {
      const payload = await callPipeShift(task);
      return (payload.result ?? payload.output ?? payload.data ?? payload) as T;
    }
  } catch {
    // OpenAI fallback below.
  }

  try {
    if (process.env.OPENAI_API_KEY) {
      return await generateOpenAIStructuredJSON<T>(task);
    }
  } catch {
    // Seed fallback below.
  }

  return fallback;
}

export async function runPipeShiftAgent(task: string, payload: unknown) {
  if (!hasPipeShiftCredentials()) {
    return { queued: true, backend: "mock-pipeshift", task, payload };
  }

  try {
    return await callPipeShift(task, payload);
  } catch (error) {
    return { queued: true, backend: "mock-pipeshift", task, payload, fallbackReason: (error as Error).message };
  }
}

async function runPipeShiftSimulation(): Promise<NeuroSimulation> {
  if (!hasPipeShiftCredentials()) {
    throw new Error("PipeShift credentials are missing.");
  }

  const payload = await callPipeShift("neurovault_2161.run_25_years", {
    prompt: simulationPrompt,
    system: neurovaultSystemPrompt,
    provider: process.env.MODEL_PROVIDER ?? "openai",
  });
  const simulation = (payload.result ?? payload.output ?? payload.data ?? payload) as NeuroSimulation;
  return normalizeSimulation({ ...simulation, source: "pipeshift" });
}

async function runOpenAISimulation(): Promise<NeuroSimulation> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OpenAI credentials are missing.");
  }

  const simulation = await generateOpenAIStructuredJSON<Omit<NeuroSimulation, "source">>(simulationPrompt);
  return normalizeSimulation({ ...simulation, source: "openai" });
}

async function callPipeShift(task: string, payload?: unknown) {
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
              { role: "user", content: typeof payload === "object" && payload && "prompt" in payload ? String((payload as { prompt: unknown }).prompt) : task },
            ],
            response_format: { type: "json_object" },
          }
        : {
            task,
            provider: process.env.MODEL_PROVIDER ?? "pipeshift",
            system: neurovaultSystemPrompt,
            payload,
          }
    ),
  });

  if (!response.ok) {
    throw new Error(`PipeShift failed with ${response.status}.`);
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

function normalizeSimulation(simulation: NeuroSimulation): NeuroSimulation {
  return {
    ...seedSimulation,
    ...simulation,
    humans: simulation.humans?.slice(0, 50) ?? seedSimulation.humans,
    streams: simulation.streams?.slice(0, 60) ?? seedSimulation.streams,
    market: simulation.market?.slice(0, 40) ?? seedSimulation.market,
    religions: simulation.religions?.slice(0, 25) ?? seedSimulation.religions,
    timeline: simulation.timeline?.slice(0, 50) ?? seedSimulation.timeline,
    governments: simulation.governments?.slice(0, 2) ?? seedSimulation.governments,
    governmentAlerts: simulation.governmentAlerts?.slice(0, 35) ?? seedSimulation.governmentAlerts,
    simulationEvents: simulation.simulationEvents?.slice(0, 40) ?? seedSimulation.simulationEvents,
    realityBreaches: simulation.realityBreaches?.slice(0, 15) ?? seedSimulation.realityBreaches,
    systemLog: simulation.systemLog ?? seedSimulation.systemLog,
    forbiddenFiles: simulation.forbiddenFiles?.slice(0, 30) ?? seedSimulation.forbiddenFiles,
    graph: simulation.graph ?? seedSimulation.graph,
    yearsSimulated: 25,
  };
}
