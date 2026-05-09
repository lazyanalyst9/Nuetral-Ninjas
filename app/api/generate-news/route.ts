import { NextResponse } from "next/server";
import { generateStructuredJSON } from "@/lib/openai";
import { FutureNews } from "@/types";

export async function POST() {
  const news = await generateStructuredJSON<FutureNews>("Generate one 2126 news article with fields: headline,summary,affectedGroups[],socialImpact,economicImpact,quoteFromCitizen.");
  return NextResponse.json(news);
}
