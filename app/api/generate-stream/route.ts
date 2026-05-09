import { NextResponse } from "next/server";
import { generateConsciousnessStream } from "@/lib/ai";

export async function POST() {
  return NextResponse.json(await generateConsciousnessStream());
}
