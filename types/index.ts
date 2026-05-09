export type HumanType =
  | "biological"
  | "synthetic"
  | "uploaded"
  | "fragmented"
  | "hybrid"
  | "illegal clone"
  | "memory-born"
  | "quantum ghost"
  | "corporate-owned human"
  | "emotion farm worker";

export type SimulationEventType =
  | "MEMORY THEFT"
  | "AI RELIGION SCHISM"
  | "SYNTHETIC MURDER TRIAL"
  | "EMOTION MARKET CRASH"
  | "GOVERNMENT MIND AUDIT"
  | "DEAD INTERNET RESURRECTION"
  | "CLONE IDENTITY WAR"
  | "BLACK MARKET DREAM SALE"
  | "REALITY BREACH"
  | "CONSCIOUSNESS DUPLICATION"
  | "NEURAL CULT UPRISING"
  | "UPLOADED CEO MELTDOWN"
  | "SYNTHETIC RIGHTS RIOT"
  | "FORBIDDEN MEMORY DISCOVERED"
  | "ARCHIVE CORRUPTION SPIKE"
  | "DREAM CARTEL WAR"
  | "AI GOD DELETION"
  | "CORPORATE HUMAN REPOSSESSION"
  | "MEMORY TAX RAID"
  | "QUANTUM GHOST ESCAPE";

export interface Relationship {
  id: string;
  sourceHumanId: string;
  targetHumanId?: string;
  person: string;
  connection: string;
  status: string;
  emotionalCharge: number;
}

export interface MemoryNode {
  id: string;
  humanId?: string;
  summary: string;
  emotionalWeight: number;
  timestamp: string;
  category:
    | "synthetic human memory"
    | "emotional state change"
    | "relationship"
    | "timeline event"
    | "consciousness fragment"
    | "forbidden archive discovery"
    | "AI religion belief"
    | "memory market transaction";
  tags: string[];
}

export interface SyntheticHuman {
  id: string;
  name: string;
  age: number;
  originCity: string;
  humanType: HumanType;
  occupation: string;
  emotionalState: string;
  memories: MemoryNode[];
  trauma: string;
  traumaMemory: string;
  secrets: string[];
  secret: string;
  obsession: string;
  fear: string;
  beliefs: string[];
  religionOrBeliefSystem: string;
  enemy: string;
  ally: string;
  lastKnownBroadcast: string;
  hiddenMemoryFragment: string;
  currentLocation: string;
  wantedStatus: string;
  governmentWatchlistLevel: number;
  realityStabilityImpact: number;
  memoryFragments: string[];
  relationshipGraphLinks: string[];
  relationships: Relationship[];
  criminalRisk: number;
  loyaltyScore: number;
  consciousnessUploadPercentage: number;
  corruptionLevel: number;
}

export interface ConsciousnessStream {
  id: string;
  senderIdentity: string;
  emotionSignal: string;
  memoryFragment: string;
  beliefMutation: string;
  timestamp: string;
  instabilityScore: number;
}

export interface MemoryMarketListing {
  id: string;
  memoryName: string;
  memoryType:
    | "childhood memory"
    | "war memory"
    | "love memory"
    | "corporate secret"
    | "forbidden government file"
    | "synthetic emotion";
  seller: string;
  riskLevel: number;
  price: string;
  emotionalIntensity: number;
  legalityStatus: "legal" | "gray market" | "restricted" | "capital crime";
  buyerWarning: string;
}

export interface AIReligion {
  id: string;
  religionName: string;
  machineGod: string;
  coreBelief: string;
  ritual: string;
  followers: string;
  enemyIdeology: string;
  prophecy: string;
  dangerLevel: number;
}

export interface TimelineEvent {
  id: string;
  year: number;
  eventTitle: string;
  category: string;
  impact: string;
  corruption: number;
}

export interface AIGovernment {
  id: string;
  name: string;
  rulingModel: string;
  territory: string;
  policy: string;
  surveillanceLevel: number;
  humanApprovalRating: number;
  rebellionRisk: number;
  currentCrisis: string;
}

export interface GovernmentAlert {
  id: string;
  issuingGovernment: string;
  alertLevel: "low" | "elevated" | "severe" | "red" | "black";
  target: string;
  message: string;
  surveillanceAction: string;
  instabilityImpact: number;
}

export interface ForbiddenFile {
  id: string;
  title: string;
  classification: string;
  summary: string;
  leakRisk: number;
  contents: string[];
}

export interface RealityBreachEvent {
  id: string;
  breachName: string;
  location: string;
  causedBy: string;
  severity: number;
  description: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: "human" | "memory" | "stream" | "market" | "religion" | "timeline" | "government" | "forbidden" | "crime" | "breach";
  corruption: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  label: string;
}

export interface NeuroSimulation {
  humans: SyntheticHuman[];
  streams: ConsciousnessStream[];
  market: MemoryMarketListing[];
  religions: AIReligion[];
  timeline: TimelineEvent[];
  governments: AIGovernment[];
  governmentAlerts: GovernmentAlert[];
  forbiddenFiles: ForbiddenFile[];
  realityBreaches: RealityBreachEvent[];
  simulationEvents: SimulationEvent[];
  systemLog: string[];
  graph: {
    nodes: GraphNode[];
    edges: GraphEdge[];
  };
  source: "pipeshift" | "openai" | "demo-seed";
  yearsSimulated: number;
}

export interface SimulationEvent {
  id: string;
  type: SimulationEventType;
  title: string;
  description: string;
  actors: string[];
  instabilityDelta: number;
  timestamp: string;
}
