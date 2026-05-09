import { NextResponse } from "next/server";
import { getEnv } from "@/lib/env";

export async function GET() {
  const env = getEnv();

  return NextResponse.json({
    openai: env.hasOpenAIKey,
    pipeshift: env.hasPipeShiftConfig,
    hydradb: env.hasHydraDBConfig,
    modelProvider: env.modelProvider,
    runtime: env.isRender ? "render" : "local",
  });
}
