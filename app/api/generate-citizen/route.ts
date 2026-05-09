import { NextResponse } from "next/server";
import { generateCitizen } from "@/lib/ai";

export async function POST() {
  return NextResponse.json(await generateCitizen());
}
