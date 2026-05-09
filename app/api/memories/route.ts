import { NextResponse } from "next/server";
import { getAllMemories } from "@/lib/hydradb";

export async function GET() {
  return NextResponse.json(await getAllMemories());
}
