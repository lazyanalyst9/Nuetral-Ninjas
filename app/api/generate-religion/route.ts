import { NextResponse } from "next/server";
import { seedReligions } from "@/lib/demoData";
import { generateViaNeurovault } from "@/lib/pipeshift";
import { AIReligion } from "@/types";

export async function POST() {
  const religion = await generateViaNeurovault<AIReligion>(
    "Generate one AI-created religion from 2161 with religionName, machineGod, coreBelief, ritual, followers, enemyIdeology, prophecy, dangerLevel.",
    seedReligions[0]
  );
  return NextResponse.json(religion);
}
