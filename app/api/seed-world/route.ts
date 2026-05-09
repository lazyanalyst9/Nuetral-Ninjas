import { NextResponse } from "next/server";
import { seedWorld } from "@/data/seed2161";

export async function GET() {
  return NextResponse.json(seedWorld);
}
