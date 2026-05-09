import { NextResponse } from "next/server";
import { generateForbiddenFile } from "@/lib/ai";

export async function POST() {
  return NextResponse.json(await generateForbiddenFile());
}
