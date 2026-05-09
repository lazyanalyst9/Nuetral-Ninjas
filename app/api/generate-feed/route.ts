import { NextResponse } from "next/server";
import { seedStreams } from "@/lib/demoData";
import { generateViaNeurovault } from "@/lib/pipeshift";
import { ConsciousnessStream } from "@/types";

export async function POST() {
  const feed = await generateViaNeurovault<ConsciousnessStream[]>(
    "Generate 5 NEUROVAULT_2161 consciousness streams. Return an array.",
    seedStreams
  );
  return NextResponse.json(feed);
}
