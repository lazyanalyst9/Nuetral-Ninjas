import { NextResponse } from "next/server";
import { seedTimeline } from "@/lib/demoData";
import { generateViaNeurovault } from "@/lib/pipeshift";
import { TimelineEvent } from "@/types";

export async function POST() {
  const event = await generateViaNeurovault<TimelineEvent>(
    "Generate one corrupted timeline event between 2026 and 2161. Include AI rights wars, memory ownership, synthetic rebellion, old internet collapse, consciousness economy, first AI government, upload scandal, or reality personalization crisis.",
    seedTimeline[0]
  );
  return NextResponse.json(event);
}
