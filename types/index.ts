export interface Relationship {
  person: string;
  connection: string;
  status: string;
}

export interface MemoryNode {
  id: string;
  summary: string;
  emotionalWeight: number;
  timestamp: string;
}

export interface SyntheticHuman {
  id: string;
  name: string;
  age: number;
  birthplace: string;
  occupation: string;
  personalityTraits: string[];
  memories: string[];
  trauma: string;
  goals: string[];
  fears: string[];
  politicalBeliefs: string;
  relationshipHistory: Relationship[];
  hiddenSecret: string;
  speakingStyle: string;
}

export interface FuturePost {
  username: string;
  platform: "Reddit_2126" | "X_Orbit" | "LinkedIn_Neural";
  post: string;
  comments: string[];
  sentiment: "hopeful" | "anxious" | "neutral" | "defiant";
  year: number;
}

export interface FutureNews {
  headline: string;
  summary: string;
  affectedGroups: string[];
  socialImpact: string;
  economicImpact: string;
  quoteFromCitizen: string;
}

export interface TimelineEvent {
  year: number;
  eventTitle: string;
  category: string;
  impact: string;
  relatedHumans: string[];
}
