import "server-only";

export type ModelProvider = "pipeshift" | "openai" | "seed";

export function getEnv() {
  const hasOpenAIKey = Boolean(process.env.OPENAI_API_KEY);
  const hasPipeShiftKey = Boolean(process.env.PIPESHIFT_API_KEY);
  const hasPipeShiftBaseUrl = Boolean(process.env.PIPESHIFT_BASE_URL);
  const hasHydraDBKey = Boolean(process.env.HYDRADB_API_KEY);
  const hasHydraDBUrl = Boolean(process.env.HYDRADB_URL);
  const requestedProvider = normalizeProvider(process.env.MODEL_PROVIDER);

  const canUsePipeShift = hasPipeShiftKey && hasPipeShiftBaseUrl;
  const canUseOpenAI = hasOpenAIKey;
  const canUseHydraDB = hasHydraDBKey && hasHydraDBUrl;

  const modelProvider: ModelProvider =
    requestedProvider === "pipeshift" && canUsePipeShift
      ? "pipeshift"
      : requestedProvider === "openai" && canUseOpenAI
        ? "openai"
        : canUsePipeShift
          ? "pipeshift"
          : canUseOpenAI
            ? "openai"
            : "seed";

  return {
    hasOpenAIKey,
    hasPipeShiftKey,
    hasPipeShiftBaseUrl,
    hasHydraDBKey,
    hasHydraDBUrl,
    hasPipeShiftConfig: canUsePipeShift,
    hasHydraDBConfig: canUseHydraDB,
    modelProvider,
    requestedProvider,
    isRender: Boolean(process.env.RENDER || process.env.RENDER_SERVICE_ID),
    isLocal: !process.env.RENDER && !process.env.RENDER_SERVICE_ID,
  };
}

function normalizeProvider(value: string | undefined): ModelProvider {
  if (value === "pipeshift" || value === "openai" || value === "seed") {
    return value;
  }

  return "pipeshift";
}
