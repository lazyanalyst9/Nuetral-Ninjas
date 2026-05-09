import { NextResponse } from "next/server";
import { generateChaosEvent } from "@/lib/ai";

export async function POST() {
  return NextResponse.json(await generateChaosEvent());
}
