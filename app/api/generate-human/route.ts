import { NextResponse } from "next/server";
import { generateStructuredJSON } from "@/lib/openai";
import { SyntheticHuman } from "@/types";

export async function POST() {
  const human = await generateStructuredJSON<SyntheticHuman>("Generate one citizen for year 2126 with fields: id,name,age,birthplace,occupation,personalityTraits[],memories[],trauma,goals[],fears[],politicalBeliefs,relationshipHistory[{person,connection,status}],hiddenSecret,speakingStyle.");
  return NextResponse.json(human);
}
