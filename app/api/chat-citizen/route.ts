import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: NextRequest) {
  const { citizen, message } = await req.json();
  const res = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      { role: "system", content: `You are ${citizen.name}, a synthetic human from 2126. Stay consistent with this profile: ${JSON.stringify(citizen)}.` },
      { role: "user", content: message },
    ],
  });
  return NextResponse.json({ reply: res.output_text });
}
