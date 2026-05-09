import { NextRequest, NextResponse } from "next/server";
import { chatWithHuman } from "@/lib/ai";

export async function POST(req: NextRequest) {
  const { human, message } = await req.json();
  return NextResponse.json(await chatWithHuman(human, message));
}
