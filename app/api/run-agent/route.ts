import { NextRequest, NextResponse } from "next/server";
import { runPipeShiftAgent } from "@/lib/pipeshift";

export async function POST(req: NextRequest) {
  const { task, payload } = await req.json();
  const result = await runPipeShiftAgent(task, payload);
  return NextResponse.json(result);
}
