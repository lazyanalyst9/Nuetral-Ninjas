import { NextResponse } from "next/server";
import { seedMarket } from "@/lib/demoData";
import { generateViaNeurovault } from "@/lib/pipeshift";
import { MemoryMarketListing } from "@/types";

export async function POST() {
  const listing = await generateViaNeurovault<MemoryMarketListing>(
    "Generate one memory black market listing from 2161 with memoryName, seller, riskLevel, price, emotionalIntensity, legalityStatus, buyerWarning.",
    seedMarket[0]
  );
  return NextResponse.json(listing);
}
