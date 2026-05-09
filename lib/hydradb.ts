import "server-only";

import { seedMemories, seedRelationships, seedSimulation } from "@/lib/demoData";
import { MemoryNode, Relationship, SyntheticHuman, TimelineEvent } from "@/types";

const citizenStore = new Map<string, SyntheticHuman>(seedSimulation.humans.map((citizen) => [citizen.id, citizen]));
const memoryStore = new Map<string, MemoryNode>(seedMemories.map((memory) => [memory.id, memory]));
const relationshipStore = new Map<string, Relationship>(seedRelationships.map((relationship) => [relationship.id, relationship]));
const timelineStore = new Map<string, TimelineEvent>(seedSimulation.timeline.map((event) => [event.id, event]));
const discoveryStore = new Map<string, unknown>();

function hasHydraDBCredentials() {
  return Boolean(process.env.HYDRADB_URL && process.env.HYDRADB_API_KEY);
}

async function hydraRequest<T>(path: string, init?: RequestInit): Promise<T> {
  if (!hasHydraDBCredentials()) {
    throw new Error("HydraDB credentials are missing.");
  }

  const baseUrl = process.env.HYDRADB_URL!.replace(/\/$/, "");
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.HYDRADB_API_KEY}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`HydraDB failed with ${response.status}.`);
  }

  return response.json() as Promise<T>;
}

export async function storeMemoryNode(node: MemoryNode) {
  memoryStore.set(node.id, node);
  return storeWithFallback("/memory-nodes", node, { stored: true, backend: "mock-hydradb", node });
}

export async function storeCitizen(citizen: SyntheticHuman) {
  citizenStore.set(citizen.id, citizen);
  return storeWithFallback("/citizens", citizen, { stored: true, backend: "mock-hydradb", citizen });
}

export async function storeMemory(node: MemoryNode) {
  return storeMemoryNode(node);
}

export async function storeRelationship(relationship: Relationship) {
  relationshipStore.set(relationship.id, relationship);
  return storeWithFallback("/relationships", relationship, { stored: true, backend: "mock-hydradb", relationship });
}

export async function storeTimelineEvent(event: TimelineEvent) {
  timelineStore.set(event.id, event);
  return storeWithFallback("/timeline-events", event, { stored: true, backend: "mock-hydradb", event });
}

export async function storeArchiveDiscovery(id: string, payload: unknown) {
  discoveryStore.set(id, payload);
  return storeWithFallback("/archive-discoveries", { id, payload }, { stored: true, backend: "mock-hydradb", id, payload });
}

export async function searchMemories(query = "") {
  if (hasHydraDBCredentials()) {
    try {
      return await hydraRequest<MemoryNode[]>(`/memory-nodes/search?q=${encodeURIComponent(query)}`);
    } catch {
      // Local mock fallback below.
    }
  }

  const term = query.toLowerCase();
  return Array.from(memoryStore.values()).filter((memory) =>
    [memory.summary, memory.category, memory.humanId, ...memory.tags].join(" ").toLowerCase().includes(term)
  );
}

export async function getHumanTimeline(humanId: string) {
  if (hasHydraDBCredentials()) {
    try {
      return await hydraRequest<TimelineEvent[]>(`/humans/${encodeURIComponent(humanId)}/timeline`);
    } catch {
      // Local mock fallback below.
    }
  }

  const memories = Array.from(memoryStore.values()).filter((memory) => memory.humanId === humanId);
  const tagged = Array.from(timelineStore.values()).filter((event) =>
    memories.some((memory) => memory.tags.some((tag) => event.impact.toLowerCase().includes(tag.toLowerCase())))
  );

  return tagged.length > 0 ? tagged : Array.from(timelineStore.values());
}

export async function getCitizenMemories(citizenId: string) {
  return Array.from(memoryStore.values()).filter((memory) => memory.humanId === citizenId);
}

export async function getRelationshipGraph() {
  return {
    nodes: Array.from(citizenStore.values()).map((citizen) => ({
      id: citizen.id,
      label: citizen.name,
      type: "human",
      corruption: citizen.corruptionLevel,
    })),
    edges: Array.from(relationshipStore.values()).map((relationship) => ({
      from: relationship.sourceHumanId,
      to: relationship.targetHumanId ?? relationship.person,
      label: relationship.connection,
    })),
  };
}

export async function searchArchive(query = "") {
  const term = query.toLowerCase();
  return {
    citizens: Array.from(citizenStore.values()).filter((citizen) =>
      [citizen.name, citizen.occupation, citizen.secret, citizen.obsession, citizen.enemy, citizen.ally].join(" ").toLowerCase().includes(term)
    ),
    memories: await searchMemories(query),
    relationships: Array.from(relationshipStore.values()).filter((relationship) =>
      [relationship.person, relationship.connection, relationship.status].join(" ").toLowerCase().includes(term)
    ),
  };
}

export async function getAllMemories() {
  return Array.from(memoryStore.values());
}

async function storeWithFallback<T>(path: string, payload: unknown, fallback: T) {
  if (!hasHydraDBCredentials()) {
    return fallback;
  }

  try {
    return await hydraRequest(path, { method: "POST", body: JSON.stringify(payload) });
  } catch (error) {
    return { ...fallback, fallbackReason: (error as Error).message };
  }
}
