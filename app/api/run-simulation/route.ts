import { NextResponse } from "next/server";
import { storeArchiveDiscovery, storeCitizen, storeMemoryNode, storeRelationship, storeTimelineEvent } from "@/lib/hydradb";
import { runNeuroSimulation } from "@/lib/pipeshift";

export async function POST() {
  const simulation = await runNeuroSimulation();
  await Promise.all([
    ...simulation.humans.map((human) => storeCitizen(human)),
    ...simulation.humans.flatMap((human) => human.memories.map((memory) => storeMemoryNode(memory))),
    ...simulation.humans.flatMap((human) => human.relationships.map((relationship) => storeRelationship(relationship))),
    ...simulation.timeline.map((event) => storeTimelineEvent(event)),
    ...simulation.streams.map((stream) => storeArchiveDiscovery(stream.id, stream)),
    ...simulation.religions.map((religion) => storeArchiveDiscovery(religion.id, religion)),
    ...simulation.market.map((listing) => storeArchiveDiscovery(listing.id, listing)),
    ...simulation.forbiddenFiles.map((file) => storeArchiveDiscovery(file.id, file)),
  ]);

  return NextResponse.json(simulation);
}
