import { NextRequest, NextResponse } from "next/server";
import { mockStoreMemory } from "@/lib/integrations";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const result = await mockStoreMemory(payload);
  return NextResponse.json(result);
}
