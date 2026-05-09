import { NextRequest, NextResponse } from "next/server";
import { mockRunAgent } from "@/lib/integrations";

export async function POST(req: NextRequest) {
  const { task, payload } = await req.json();
  const result = await mockRunAgent(task, payload);
  return NextResponse.json(result);
}
