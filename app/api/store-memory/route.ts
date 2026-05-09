import { NextRequest, NextResponse } from "next/server";
import { getHumanTimeline, searchArchive, searchMemories, storeArchiveDiscovery, storeCitizen, storeMemoryNode, storeRelationship, storeTimelineEvent } from "@/lib/hydradb";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const action = payload.action ?? "storeMemoryNode";
  const result =
    action === "storeCitizen"
      ? await storeCitizen(payload.citizen ?? payload)
      : action === "storeRelationship"
      ? await storeRelationship(payload.relationship ?? payload)
      : action === "storeTimelineEvent"
        ? await storeTimelineEvent(payload.event ?? payload)
        : action === "storeArchiveDiscovery"
          ? await storeArchiveDiscovery(payload.id ?? "archive-discovery", payload.discovery ?? payload)
      : action === "searchMemories"
        ? await searchMemories(payload.query ?? "")
        : action === "searchArchive"
          ? await searchArchive(payload.query ?? "")
        : action === "getHumanTimeline"
          ? await getHumanTimeline(payload.humanId ?? "")
          : await storeMemoryNode(payload.node ?? payload);

  return NextResponse.json(result);
}
