import { NextResponse } from "next/server";
import { seedWorld } from "@/data/seed2161";
import { runSimulationCycle } from "@/lib/ai";
import { eventToStream, eventToTimeline, persistSimulationEvents } from "@/lib/simulation";

export async function POST() {
  const result = await runSimulationCycle();
  const events = result.data.slice(0, Math.max(5, Math.min(10, result.data.length)));
  await persistSimulationEvents(seedWorld, events);
  const instabilityDelta = Math.max(5, Math.min(15, events.reduce((total, event) => total + event.instabilityDelta, 0)));
  return NextResponse.json({
    events,
    provider: result.provider,
    warning: result.warning,
    streams: [...events.slice(0, 5).map(eventToStream), ...seedWorld.streams.slice(0, 5)],
    marketTransactions: seedWorld.market.slice(0, 3),
    governmentAlerts: seedWorld.governmentAlerts.slice(0, 2),
    forbiddenFiles: seedWorld.forbiddenFiles.slice(0, 2),
    timelineEvents: events.slice(0, 2).map(eventToTimeline),
    instabilityDelta,
    log: [
      ...events.map((event) => `[${event.type}] ${event.title}: ${event.description}`),
      ...seedWorld.systemLog.slice(0, 4),
    ].slice(0, 12),
  });
}
