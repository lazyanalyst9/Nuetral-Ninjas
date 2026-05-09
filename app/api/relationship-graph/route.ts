import { NextResponse } from "next/server";
import { getRelationshipGraph } from "@/lib/hydradb";

export async function GET() {
  return NextResponse.json(await getRelationshipGraph());
}
