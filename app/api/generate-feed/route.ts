import { NextResponse } from "next/server";
import { generateStructuredJSON } from "@/lib/openai";
import { FuturePost } from "@/types";

export async function POST() {
  const feed = await generateStructuredJSON<FuturePost[]>("Generate 5 future internet posts with fields: username,platform,post,comments[],sentiment,year.");
  return NextResponse.json(feed);
}
