import { NextResponse } from "next/server";
import { seedForbiddenFiles } from "@/lib/demoData";
import { generateViaNeurovault } from "@/lib/pipeshift";
import { ForbiddenFile } from "@/types";

export async function POST() {
  const file = await generateViaNeurovault<ForbiddenFile>(
    "Generate one forbidden 2161 government file formatted as a classified news leak.",
    seedForbiddenFiles[0]
  );
  return NextResponse.json(file);
}
