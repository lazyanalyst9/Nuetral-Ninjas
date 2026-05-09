import { NextResponse } from "next/server";
import { getEnv } from "@/lib/env";

export async function GET() {
  const env = getEnv();

  return NextResponse.json({
    archive: "NEUROVAULT_2161",
    stability: 43,
    pipeshiftConfigured: env.hasPipeShiftConfig,
    hydradbConfigured: env.hasHydraDBConfig,
    openaiConfigured: env.hasOpenAIKey,
    modelProvider: env.modelProvider,
    runtime: env.isRender ? "render" : "local",
    secretsCommitted: false,
  });
}
