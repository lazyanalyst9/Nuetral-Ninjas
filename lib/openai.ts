import "server-only";

import OpenAI from "openai";

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "demo-seed-mode" });

export async function generateStructuredJSON<T>(prompt: string): Promise<T> {
  const completion = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content:
          "You are NEUROVAULT_2161, a recovered illegal consciousness archive from the year 2161. Generate cinematic, unsettling, believable future civilization data. Return valid JSON only.",
      },
      { role: "user", content: prompt },
    ],
  });

  const raw = completion.output_text;
  return JSON.parse(raw) as T;
}
