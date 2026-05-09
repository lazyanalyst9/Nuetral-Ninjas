import { MemoryNode } from "@/types";

export async function mockStoreMemory(node: MemoryNode) {
  // TODO: replace with real HydraDB integration using:
  // process.env.HYDRADB_URL and process.env.HYDRADB_API_KEY
  return { stored: true, backend: "mock-hydradb", node };
}

export async function mockRunAgent(task: string, payload: unknown) {
  // TODO: replace with real PipeShift orchestration using:
  // process.env.PIPESHIFT_API_KEY
  return { queued: true, backend: "mock-pipeshift", task, payload };
}
