import "server-only";

import { seedWorld } from "@/data/seed2161";
import { storeArchiveDiscovery, storeCitizen, storeMemory, storeRelationship, storeTimelineEvent } from "@/lib/hydradb";
import { NeuroSimulation, SimulationEvent, SyntheticHuman } from "@/types";

export function loadSeedWorld() {
  return seedWorld;
}

export function mutateCitizens(citizens: SyntheticHuman[], events: SimulationEvent[]) {
  const emotions = ["weaponized grief", "redline devotion", "static euphoria", "forensic panic", "holy suspicion", "market sadness", "quantum dread"];
  const actorSet = new Set(events.flatMap((event) => event.actors));
  return citizens.map((citizen, index) =>
    actorSet.has(citizen.id)
      ? {
          ...citizen,
          emotionalState: emotions[index % emotions.length],
          corruptionLevel: Math.min(100, citizen.corruptionLevel + 5 + (index % 10)),
          criminalRisk: Math.min(100, citizen.criminalRisk + 3 + (index % 5)),
          realityStabilityImpact: Math.min(100, citizen.realityStabilityImpact + 4),
          lastKnownBroadcast: `${citizen.lastKnownBroadcast} // mutated by ${events[index % events.length]?.type ?? "ARCHIVE CORRUPTION SPIKE"}`,
        }
      : citizen
  );
}

export function updateRelationshipGraph(world: NeuroSimulation, events: SimulationEvent[]) {
  return {
    nodes: [
      ...world.graph.nodes,
      ...events.map((event) => ({
        id: event.id,
        label: event.type,
        type: "crime" as const,
        corruption: Math.min(100, event.instabilityDelta * 8),
      })),
    ],
    edges: [
      ...world.graph.edges,
      ...events.flatMap((event) => event.actors.map((actor) => ({ from: actor, to: event.id, label: event.type }))),
    ],
  };
}

export function eventToStream(event: SimulationEvent) {
  return {
    id: `stream-${event.id}`,
    senderIdentity: event.actors[0],
    emotionSignal: event.type,
    memoryFragment: event.description,
    beliefMutation: event.title,
    timestamp: event.timestamp,
    instabilityScore: Math.min(100, event.instabilityDelta * 7),
  };
}

export function eventToTimeline(event: SimulationEvent) {
  return {
    id: `timeline-${event.id}`,
    year: 2161,
    eventTitle: event.title,
    category: event.type,
    impact: event.description,
    corruption: Math.min(100, event.instabilityDelta * 8),
  };
}

export function updateInstability(current: number, events: SimulationEvent[]) {
  const delta = events.reduce((total, event) => total + event.instabilityDelta, 0);
  return Math.min(100, current + Math.max(5, Math.min(15, delta)));
}

export async function persistSimulationEvents(world: NeuroSimulation, events: SimulationEvent[]) {
  const mutatedCitizens = mutateCitizens(world.humans, events);
  const timelineEvents = events.map(eventToTimeline);

  await Promise.all([
    ...mutatedCitizens.slice(0, 10).map((citizen) => storeCitizen(citizen)),
    ...mutatedCitizens.slice(0, 10).flatMap((citizen) => citizen.memories.map((memory) => storeMemory(memory))),
    ...world.graph.edges.slice(0, 20).map((edge, index) =>
      storeRelationship({
        id: `sim-rel-${events[0]?.id ?? "cycle"}-${index}`,
        sourceHumanId: edge.from,
        targetHumanId: edge.to,
        person: edge.to,
        connection: edge.label,
        status: "generated during chaos simulation",
        emotionalCharge: 70,
      })
    ),
    ...timelineEvents.map((event) => storeTimelineEvent(event)),
    ...events.map((event) => storeArchiveDiscovery(event.id, event)),
  ]);
}
