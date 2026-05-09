import { NextResponse } from "next/server";
import { generateGovernmentAlert } from "@/lib/ai";

export async function POST() {
  return NextResponse.json(await generateGovernmentAlert());
}
