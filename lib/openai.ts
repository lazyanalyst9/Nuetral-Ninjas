import OpenAI from "openai";

export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateStructuredJSON<T>(prompt: string): Promise<T> {
  const completion = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content:
          "You are the simulation engine for AFTERLIFE_2126, a recovered archive of future civilization. Generate realistic, emotionally complex, internally consistent synthetic humans and future events. Return valid JSON only.",
      },
      { role: "user", content: prompt },
    ],
  });

  const raw = completion.output_text;
  return JSON.parse(raw) as T;
}
