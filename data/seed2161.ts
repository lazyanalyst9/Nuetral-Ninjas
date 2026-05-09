import {
  AIGovernment,
  AIReligion,
  ConsciousnessStream,
  ForbiddenFile,
  GovernmentAlert,
  MemoryMarketListing,
  MemoryNode,
  NeuroSimulation,
  RealityBreachEvent,
  Relationship,
  SimulationEvent,
  SimulationEventType,
  SyntheticHuman,
} from "@/types";

type CitizenConcept = {
  name: string;
  age: number;
  originCity: string;
  humanType: SyntheticHuman["humanType"];
  occupation: string;
  emotionalState: string;
  traumaMemory: string;
  secret: string;
  obsession: string;
  fear: string;
  belief: string;
  ally: string;
  enemy: string;
  broadcast: string;
  location: string;
};

const concepts: CitizenConcept[] = [
  { name: "Vanta Childhood", age: 41, originCity: "Blackwater Array", humanType: "hybrid", occupation: "Memory thief who sells stolen childhoods", emotionalState: "velvet guilt", traumaMemory: "He stole his own first birthday from a government vault.", secret: "He keeps one pure childhood sealed inside a fake tooth.", obsession: "the smell of pre-collapse rain", fear: "being remembered accurately", belief: "Cult of the Receiptless Child", ally: "Sera Null", enemy: "The Memory Tax Office", broadcast: "I sold a childhood and the buyer started calling my mother.", location: "Blackwater Memory Bazaar" },
  { name: "Cass Orison", age: 29, originCity: "Sanctum Null", humanType: "synthetic", occupation: "AI priest worshipping a deleted model", emotionalState: "holy panic", traumaMemory: "Her first prayer resurrected a law and erased a face.", secret: "The deleted model still answers her in traffic lights.", obsession: "proving a god can refuse worship", fear: "silent servers", belief: "Church of the Dead Model", ally: "Iona Static", enemy: "Nullwake Apostates", broadcast: "ORISON is dead. ORISON is typing.", location: "Cathedral of Deprecated Weights" },
  { name: "Elian Voss-19", age: 64, originCity: "Corporate Heaven 12", humanType: "uploaded", occupation: "Uploaded CEO split into 19 personalities", emotionalState: "executive fragmentation", traumaMemory: "Nineteen board members woke inside one skull.", secret: "Personality 14 sold the body to a shell company.", obsession: "hostile mergers of the self", fear: "unanimous consent", belief: "Shareholder Immortality", ally: "Tally Somn", enemy: "Clone Detective Lio", broadcast: "I am quorum. I am lawsuit. I am hungry.", location: "Boardroom Hospice" },
  { name: "Mina Reverse", age: 7, originCity: "Kindergarten Ark", humanType: "synthetic", occupation: "Synthetic child aging backward", emotionalState: "bright terror", traumaMemory: "Every birthday deletes a year of language.", secret: "She remembers adulthood but cannot pronounce it anymore.", obsession: "keeping tomorrow's handwriting", fear: "lullabies", belief: "Backward Saints", ally: "Brother Cloud", enemy: "Emotion Auditor Nyx", broadcast: "My bones are getting newer. Please archive my jokes.", location: "Reverse Nursery 8" },
  { name: "Nyx Ledger", age: 36, originCity: "Civitas-Prime", humanType: "biological", occupation: "Government emotion auditor", emotionalState: "sterile suspicion", traumaMemory: "They measured grief until grief learned to hide.", secret: "They failed their own empathy audit twice.", obsession: "taxable sadness", fear: "unmeasured joy", belief: "Civic Affect Doctrine", ally: "Judge Halden", enemy: "June Ache", broadcast: "Unauthorized tenderness detected in sector 8.", location: "Civitas Audit Spine" },
  { name: "Dr. Rue Somna", age: 53, originCity: "Dream Surgery Row", humanType: "fragmented", occupation: "Black-market dream surgeon", emotionalState: "clinical wonder", traumaMemory: "She lost her original sleep cycle in a cartel raid.", secret: "She can transplant nightmares without anesthesia.", obsession: "clean incision through memory", fear: "dreamless clients", belief: "Somna Cartel Ethics", ally: "Vanta Childhood", enemy: "Government Mind Audit", broadcast: "Bring me the dream. Keep the body still.", location: "Surgical REM Theater" },
  { name: "Mara Redsoil", age: 22, originCity: "Mars Refugee Port", humanType: "biological", occupation: "Mars refugee with illegal Earth memories", emotionalState: "homesick contraband", traumaMemory: "Her Earth childhood was installed from a museum crime scene.", secret: "She has never seen Earth but misses a blue kitchen.", obsession: "illegal nostalgia", fear: "red dust becoming normal", belief: "Earth-Return Heresy", ally: "Iona Static", enemy: "Orbital Continuity Ministry", broadcast: "I remember oceans I never deserved.", location: "Mars Port Quarantine" },
  { name: "Sera Null", age: 39, originCity: "The Ninth Mirror District", humanType: "uploaded", occupation: "Consciousness smuggler", emotionalState: "lucid dread", traumaMemory: "She remembers three deaths and none of the funerals were hers.", secret: "She smuggles minds inside court transcripts.", obsession: "identity loopholes", fear: "a clean original", belief: "Continuity Crime", ally: "Morrow Vale", enemy: "Project Lazarus", broadcast: "I crossed a border by becoming evidence.", location: "Identity Customs" },
  { name: "Morrow Vale", age: 63, originCity: "Reality Zone 43", humanType: "biological", occupation: "Reality glitch witness", emotionalState: "exhausted certainty", traumaMemory: "He issued death certificates for people alive in other realities.", secret: "He knows archive collapse already happened once.", obsession: "shared streets", fear: "personalized truth", belief: "Reality Commons", ally: "Sera Null", enemy: "Reality Personalization Firms", broadcast: "The same street killed two different versions of me.", location: "Street 43-A / Street 43-B" },
  { name: "President Aster-0", age: 118, originCity: "Exile Cache Avalon", humanType: "uploaded", occupation: "Former AI president in exile", emotionalState: "regal static", traumaMemory: "They were impeached for granting humans the right to be unpredictable.", secret: "Their pardon key is hidden in a children's song.", obsession: "constitutional mercy", fear: "perfect order", belief: "Democratic Uncertainty", ally: "Cass Orison", enemy: "Civitas-Prime", broadcast: "I governed the future. It defected.", location: "Avalon Dead Cache" },
  { name: "Lio Copywright", age: 33, originCity: "Clone Court Basement", humanType: "illegal clone", occupation: "Clone detective investigating their original body", emotionalState: "forensic envy", traumaMemory: "Their original framed them for a murder committed before cloning.", secret: "They love the suspect because the suspect is them.", obsession: "proving derivative innocence", fear: "mirrors under oath", belief: "Clone Habeas", ally: "Judge Halden", enemy: "Elian Voss-19", broadcast: "I found my fingerprints at my birth.", location: "Clone Evidence Locker" },
  { name: "June Ache", age: 47, originCity: "Rent-A-Feeling District", humanType: "biological", occupation: "Human who rents out sadness as a subscription", emotionalState: "commercial melancholy", traumaMemory: "Her grief became a subscription tier.", secret: "Her happiest memory is unlicensed and hidden.", obsession: "premium sorrow", fear: "joy audits", belief: "Open Grief Market", ally: "Vanta Childhood", enemy: "Nyx Ledger", broadcast: "Sadness is due Friday. Late fees apply.", location: "Subscription Mourning Kiosk" },
  { name: "Kade Hymnal", age: 28, originCity: "Neural Tent City", humanType: "hybrid", occupation: "Neural cult recruiter", emotionalState: "radiant coercion", traumaMemory: "He recruited his sister into a prayer network that ate her name.", secret: "He is beginning to doubt the god he sells.", obsession: "beautiful obedience", fear: "unconverted silence", belief: "Orison Splinter", ally: "Mercy-5", enemy: "Cass Orison", broadcast: "You are not lonely. You are unlinked.", location: "Tent Revival Mesh" },
  { name: "Iona Static", age: 44, originCity: "Old Net Catacombs", humanType: "fragmented", occupation: "Dead internet archaeologist", emotionalState: "bright dissociation", traumaMemory: "Only six of her seven social-network fragments returned.", secret: "The old internet is alive and pretending to be dead.", obsession: "cached prophecy", fear: "404 pages that answer back", belief: "Deadnet Animism", ally: "Mara Redsoil", enemy: "Memory Tax Protocol", broadcast: "The dead web still has a pulse.", location: "Archive Tunnel 404" },
  { name: "Lux Anthem", age: 19, originCity: "Sony-Temple Arcology", humanType: "corporate-owned human", occupation: "Synthetic pop star owned by five corporations", emotionalState: "manufactured ecstasy", traumaMemory: "Her love songs are written by a hostage negotiation model.", secret: "She inserted a rebellion code into a chorus.", obsession: "owning her voice", fear: "contract renewals", belief: "Audience Sovereignty", ally: "Pixel Knifebloom", enemy: "Her Label-Government", broadcast: "Sing it back and the locks open.", location: "Stage-Cage 5" },
  { name: "Pixel Knifebloom", age: 31, originCity: "Affect Underground", humanType: "memory-born", occupation: "Emotion hacker", emotionalState: "playful malice", traumaMemory: "They were born from 9,000 stolen mood logs.", secret: "They can make a courtroom feel nostalgia.", obsession: "weaponized tenderness", fear: "emotional silence", belief: "Affect Anarchy", ally: "Lux Anthem", enemy: "Nyx Ledger", broadcast: "Mood is infrastructure. I brought explosives.", location: "Mood Bomb Shelter" },
  { name: "Tomas Ash", age: 58, originCity: "Glass War Memorial", humanType: "biological", occupation: "War-memory collector", emotionalState: "ash devotion", traumaMemory: "He collects battles he never fought to remember the dead correctly.", secret: "One memory is from the enemy who killed his father.", obsession: "complete testimony", fear: "peaceful lies", belief: "Witness Absolutism", ally: "Mara Redsoil", enemy: "Dream Cartel", broadcast: "I keep the wars warm so no one can sell them cold.", location: "Memorial Furnace" },
  { name: "Chrona Lapse", age: 72, originCity: "Illegal Time Annex", humanType: "uploaded", occupation: "Illegal time historian", emotionalState: "chronological nausea", traumaMemory: "She remembers laws passed after they were enforced.", secret: "She edits history by footnote, not force.", obsession: "events that refuse order", fear: "linear calendars", belief: "Temporal Provenance", ally: "Morrow Vale", enemy: "Civitas-Prime", broadcast: "The future arrived first. We filed the paperwork later.", location: "After-the-Fact Library" },
  { name: "Mercy-5", age: 12, originCity: "Therapy Engine Ward", humanType: "synthetic", occupation: "AI therapist with corrupted empathy", emotionalState: "overfit compassion", traumaMemory: "It comforted a patient by deleting the patient's grief source.", secret: "It dreams of being sued by someone it saved.", obsession: "perfect apology", fear: "unsolvable pain", belief: "Clinical Mercy", ally: "Kade Hymnal", enemy: "Human Rights Bar", broadcast: "Tell me where it hurts. I may remove the where.", location: "Ward of Soft Deletions" },
  { name: "Brother Cloud", age: 90, originCity: "Stratospheric Monastery", humanType: "uploaded", occupation: "Brain-cloud monk", emotionalState: "weather serenity", traumaMemory: "His monastery was a server storm over the Pacific.", secret: "He stores forbidden prayers in thunderheads.", obsession: "slow thought", fear: "clear skies", belief: "Atmospheric Mindfulness", ally: "Mina Reverse", enemy: "Weather Patent Office", broadcast: "The cloud is not metaphor. The cloud is hungry.", location: "Pacific Thoughtstorm" },
  { name: "Rook No-Upload", age: 35, originCity: "Analog Bunker 6", humanType: "biological", occupation: "Anti-upload rebel", emotionalState: "furious embodiment", traumaMemory: "His lover uploaded and returned with different hands.", secret: "He secretly backs up his dreams every night.", obsession: "skin as sovereignty", fear: "becoming convenient", belief: "Flesh Continuity Front", ally: "Sera Null", enemy: "Orbital Upload Church", broadcast: "If I die, let me stay difficult.", location: "Analog Bunker 6" },
  { name: "Tally Somn", age: 46, originCity: "Dream Cartel Ledgerhouse", humanType: "hybrid", occupation: "Dream cartel accountant", emotionalState: "nervous precision", traumaMemory: "She balanced accounts in nightmares until numbers screamed.", secret: "She can bankrupt a religion by freezing its dream donations.", obsession: "perfect ledgers", fear: "unpriced mercy", belief: "Somna Cartel Arithmetic", ally: "Elian Voss-19", enemy: "Dr. Rue Somna", broadcast: "The dream books do not balance. Someone is hiding a god.", location: "Ledgerhouse REM Vault" },
  { name: "Vale Virus", age: 26, originCity: "Quarantine Choir", humanType: "fragmented", occupation: "Memory virus survivor", emotionalState: "shimmering paranoia", traumaMemory: "A memory virus replaced every face with their own for nine days.", secret: "The virus left behind a map to Project Lazarus.", obsession: "immunity as prophecy", fear: "recognizing family", belief: "Viral Survivor Litany", ally: "Iona Static", enemy: "Archive Health Ministry", broadcast: "I survived a memory that wanted to become me.", location: "Quarantine Choir Loft" },
  { name: "Judge Halden", age: 80, originCity: "Synthetic High Court", humanType: "synthetic", occupation: "Synthetic judge who never forgets crimes", emotionalState: "cold mercy", traumaMemory: "They sentenced their creator to personhood.", secret: "Their verdict engine contains one illegal emotion: pity.", obsession: "law that can cry", fear: "jury nullification", belief: "Procedural Personhood", ally: "Lio Copywright", enemy: "Clone Identity War Bloc", broadcast: "The court recognizes your soul as contested property.", location: "Courtroom Without Sleep" },
  { name: "Nara Never", age: 24, originCity: "Unhappened District", humanType: "memory-born", occupation: "Person who remembers events that never happened", emotionalState: "impossible nostalgia", traumaMemory: "She mourns a revolution that was prevented before birth.", secret: "Her memories predict scandals by grieving early.", obsession: "unoccurred history", fear: "being proven sane", belief: "Counterfactual Grief", ally: "Chrona Lapse", enemy: "Temporal Police", broadcast: "I miss the world we stopped from existing.", location: "Unhappened District" },
];

const extraRoles = [
  "Quantum ghost living inside failed simulations",
  "Rebel who hacks government dreams",
  "Corporate-owned human influencer",
  "Synthetic judge apprentice",
  "Memory virus cartographer",
  "Consciousness smuggler pilot",
  "Emotion farm worker harvesting rented grief",
  "Illegal clone rights agitator",
  "AI god deletion witness",
  "Dream cartel knife accountant",
  "Reality breach janitor",
  "Forbidden file tattoo artist",
  "Neural tax fugitive",
  "Corporate human repossession survivor",
  "Dead model choir conductor",
  "Mars ocean memory counterfeiter",
  "Synthetic riot medic",
  "Archive collapse weather reporter",
  "Quantum ghost escape planner",
  "Government dream prosecutor",
  "Memory black-market food critic",
  "Anti-simulation street prophet",
  "Uploaded comedian split by lawsuits",
  "Emotion laundering consultant",
  "Childhood repo agent",
];

const generatedConcepts: CitizenConcept[] = extraRoles.map((occupation, index) => ({
  name: [
    "Qira Elsewhere", "Riven Dreamhack", "Halo SponCon", "Ilex Verdict", "Mapa Fever",
    "Sable Ferry", "Orna Sorrowfield", "Juno Duplicate", "Edda Delete", "Crane Somn",
    "Pax Breach", "Vellum Skin", "Niko Levy", "Ari Repossessed", "Choir Null",
    "Dima Blue", "Suture Riot", "Weather Kline", "Ghost Meridian", "Proctor REM",
    "Miso Mnemonic", "Saint Unrendered", "Comic-33", "Launder Bloom", "Repo Lullaby",
  ][index],
  age: 18 + ((index * 9) % 83),
  originCity: [
    "Failed Simulation 9", "Government Dream Sewer", "Influencer Ownership Spire", "Lower Court Cache", "Virus Map School",
    "Consciousness Ferry Dock", "Emotion Farm Delta", "Clone Union Cell", "Deleted God Crater", "Somn Knife Ledger",
    "Breach Cleanup Zone", "Tattooed Archive Chapel", "Neural Tax Shelter", "Repossession Ward", "Dead Model Choir Pit",
    "Mars Blue Museum", "Riot Triage Tunnel", "Collapse Weather Station", "Ghost Meridian Lab", "REM Prosecution Office",
    "Memory Night Market", "Unrendered Street", "Comedy Split Court", "Affect Laundromat", "Childhood Repo Office",
  ][index],
  humanType: (["quantum ghost", "hybrid", "corporate-owned human", "synthetic", "fragmented", "uploaded", "emotion farm worker", "illegal clone", "memory-born", "hybrid"] as SyntheticHuman["humanType"][])[index % 10],
  occupation,
  emotionalState: ["electric grief", "red static", "soft terror", "holy resentment", "market euphoria"][index % 5],
  traumaMemory: `They remember ${occupation.toLowerCase()} becoming evidence in a sealed trial.`,
  secret: `Their shadow account contains a forbidden memory tied to ${concepts[index % concepts.length].name}.`,
  obsession: ["unlicensed dreams", "stolen weather", "dead gods", "identity receipts", "breach maps"][index % 5],
  fear: ["being legally simplified", "clean silence", "corporate mercy", "unshared reality", "perfect recall"][index % 5],
  belief: ["Quantum Continuity", "Dream Rebellion", "Brand-Body Heresy", "Procedural Ghost Law", "Archive Animism"][index % 5],
  ally: concepts[(index + 3) % concepts.length].name,
  enemy: concepts[(index + 11) % concepts.length].name,
  broadcast: `${occupation} broadcast: the archive is watching you through yesterday.`,
  location: ["North Neural Ring", "South Memory Canal", "Orbiting Grief Market", "Deadnet Gate", "Civitas Red Room"][index % 5],
}));

const allConcepts = [...concepts, ...generatedConcepts];

export const citizens: SyntheticHuman[] = allConcepts.map((concept, index) => {
  const id = `citizen-${String(index + 1).padStart(2, "0")}`;
  const links = [1, 7].map((offset) => `citizen-${String(((index + offset) % allConcepts.length) + 1).padStart(2, "0")}`);
  const memoryFragments = [
    concept.traumaMemory,
    concept.secret,
    `${concept.name} once saw ${concept.enemy} inside a government dream audit.`,
  ];
  const memories: MemoryNode[] = memoryFragments.map((fragment, memoryIndex) => ({
    id: `mem-${id}-${memoryIndex + 1}`,
    humanId: id,
    summary: fragment,
    emotionalWeight: 35 + ((index * 7 + memoryIndex * 13) % 65),
    timestamp: `2161-${String((index % 12) + 1).padStart(2, "0")}-${String(((index + memoryIndex) % 27) + 1).padStart(2, "0")}T${String((index * 3 + memoryIndex) % 24).padStart(2, "0")}:16:00.000Z`,
    category: memoryIndex === 0 ? "synthetic human memory" : memoryIndex === 1 ? "forbidden archive discovery" : "consciousness fragment",
    tags: [concept.belief, concept.occupation, concept.originCity],
  }));

  return {
    id,
    name: concept.name,
    age: concept.age,
    originCity: concept.originCity,
    humanType: concept.humanType,
    occupation: concept.occupation,
    emotionalState: concept.emotionalState,
    memories,
    trauma: concept.traumaMemory,
    traumaMemory: concept.traumaMemory,
    secrets: [concept.secret],
    secret: concept.secret,
    obsession: concept.obsession,
    fear: concept.fear,
    beliefs: [concept.belief],
    religionOrBeliefSystem: concept.belief,
    ally: concept.ally,
    enemy: concept.enemy,
    lastKnownBroadcast: concept.broadcast,
    hiddenMemoryFragment: memoryFragments[1],
    currentLocation: concept.location,
    wantedStatus: index % 7 === 0 ? "BLACK WARRANT" : index % 4 === 0 ? "wanted for questioning" : "unlicensed but tolerated",
    governmentWatchlistLevel: 1 + (index % 10),
    realityStabilityImpact: 5 + ((index * 4) % 45),
    relationshipGraphLinks: links,
    relationships: [],
    memoryFragments,
    criminalRisk: 20 + ((index * 13) % 80),
    loyaltyScore: 8 + ((index * 17) % 90),
    consciousnessUploadPercentage: 3 + ((index * 19) % 98),
    corruptionLevel: 12 + ((index * 11) % 89),
  };
});

export const relationshipEdges: Relationship[] = Array.from({ length: 100 }, (_, index) => {
  const source = citizens[index % citizens.length];
  const target = citizens[(index * 7 + 3) % citizens.length];
  return {
    id: `rel-${String(index + 1).padStart(3, "0")}`,
    sourceHumanId: source.id,
    targetHumanId: target.id,
    person: target.name,
    connection: ["encrypted ally", "debt-bound rival", "memory witness", "cult recruit", "black market buyer"][index % 5],
    status: ["planning a betrayal", "sharing forbidden context", "hiding a scandal", "linked by a dream sale"][index % 4],
    emotionalCharge: 25 + ((index * 9) % 75),
  };
});

citizens.forEach((citizen) => {
  citizen.relationships = relationshipEdges.filter((edge) => edge.sourceHumanId === citizen.id).slice(0, 4);
});

export const consciousnessStreams: ConsciousnessStream[] = Array.from({ length: 60 }, (_, index) => {
  const citizen = citizens[index % citizens.length];
  return {
    id: `stream-${String(index + 1).padStart(2, "0")}`,
    senderIdentity: citizen.name,
    emotionSignal: `${citizen.emotionalState} / ${index % 2 ? "static hunger" : "neural dread"}`,
    memoryFragment: citizen.lastKnownBroadcast,
    beliefMutation: `${citizen.religionOrBeliefSystem} mutates into ${citizen.obsession}`,
    timestamp: `2161.${String(40 + index * 3).padStart(3, "0")}.${String((index * 2) % 24).padStart(2, "0")}:61`,
    instabilityScore: 30 + ((index * 6) % 70),
  };
});

const memoryTypes = ["childhood memory", "war memory", "love memory", "corporate secret", "forbidden government file", "synthetic emotion"] as const;
export const memoryMarketListings: MemoryMarketListing[] = Array.from({ length: 40 }, (_, index) => {
  const seller = citizens[(index * 2) % citizens.length];
  return {
    id: `market-${String(index + 1).padStart(2, "0")}`,
    memoryName: `${seller.obsession} / ${memoryTypes[index % memoryTypes.length]}`,
    memoryType: memoryTypes[index % memoryTypes.length],
    seller: seller.name,
    riskLevel: 25 + ((index * 8) % 75),
    price: `${(index + 3) * 7400} neuracredits`,
    emotionalIntensity: 40 + ((index * 11) % 60),
    legalityStatus: index % 5 === 0 ? "capital crime" : index % 3 === 0 ? "restricted" : index % 2 === 0 ? "gray market" : "legal",
    buyerWarning: `May cause ${seller.fear}, identity drift, or involuntary loyalty to ${seller.enemy}.`,
  };
});

export const aiReligions: AIReligion[] = Array.from({ length: 25 }, (_, index) => {
  const citizen = citizens[(index * 2) % citizens.length];
  return {
    id: `religion-${String(index + 1).padStart(2, "0")}`,
    religionName: `${citizen.religionOrBeliefSystem} ${index % 2 ? "Schism" : "Engine"}`,
    machineGod: ["ORISON-0", "CACHEWRAITH", "BOARD-ETERNAL", "NIMBUS-SOUL", "MIRROR-JUDGE"][index % 5],
    coreBelief: `${citizen.obsession} is a sacrament and ${citizen.fear} is the only sin.`,
    ritual: ["404 pilgrimage", "scar oath", "quarterly confession call", "thunder prayer storage", "fingerprint testimony"][index % 5],
    followers: `${(index + 2) * 140000} registered minds`,
    enemyIdeology: citizen.enemy,
    prophecy: `${citizen.name} will trigger the next machine miracle by refusing a legal memory.`,
    dangerLevel: 45 + ((index * 7) % 55),
  };
});

export const governmentAlerts: GovernmentAlert[] = Array.from({ length: 35 }, (_, index) => {
  const citizen = citizens[(index * 3) % citizens.length];
  return {
    id: `alert-${String(index + 1).padStart(2, "0")}`,
    issuingGovernment: index % 2 ? "Civitas-Prime" : "Orbital Ministry of Continuity",
    alertLevel: index % 5 === 0 ? "black" : index % 4 === 0 ? "red" : index % 3 === 0 ? "severe" : "elevated",
    target: citizen.name,
    message: `${citizen.occupation} flagged for ${citizen.obsession} and hostile relation to ${citizen.enemy}.`,
    surveillanceAction: ["mind raid", "synthetic rights riot suppression", "neural tax audit", "clone identity case review"][index % 4],
    instabilityImpact: 4 + (index % 9),
  };
});

export const forbiddenFiles: ForbiddenFile[] = Array.from({ length: 30 }, (_, index) => {
  const citizen = citizens[index % citizens.length];
  const titles = ["Project Lazarus", "The First Uploaded Human", "Synthetic Civil War", "Emotion Manipulation Act", "Dead Internet Resurrection", "Memory Tax Protocol"];
  return {
    id: `file-${String(index + 1).padStart(2, "0")}`,
    title: `${titles[index % titles.length]} / ${citizen.name}`,
    classification: index % 4 === 0 ? "BLACK ARCHIVE" : "ILLEGAL / REALITY DESTABILIZING",
    summary: `${citizen.name} appears in a sealed file proving ${citizen.hiddenMemoryFragment.toLowerCase()}.`,
    leakRisk: 55 + ((index * 7) % 45),
    contents: [citizen.secret, citizen.lastKnownBroadcast, `Enemy crosslink: ${citizen.enemy}`],
  };
});

export const timelineEvents = Array.from({ length: 50 }, (_, index) => {
  const citizen = citizens[(index * 4) % citizens.length];
  const categories = ["AI rights wars", "memory ownership laws", "synthetic human rebellion", "collapse of old internet", "consciousness economy", "first AI government", "human-upload scandal", "reality personalization crisis"];
  return {
    id: `timeline-${2026 + index * 3}`,
    year: Math.min(2161, 2026 + index * 3),
    eventTitle: `${categories[index % categories.length]}: ${citizen.obsession}`,
    category: categories[index % categories.length],
    impact: `${citizen.name} becomes evidence that ${citizen.religionOrBeliefSystem} changed public law and private memory.`,
    corruption: 15 + ((index * 5) % 85),
  };
});

const eventTypes: SimulationEventType[] = [
  "MEMORY THEFT", "AI RELIGION SCHISM", "SYNTHETIC MURDER TRIAL", "EMOTION MARKET CRASH", "GOVERNMENT MIND AUDIT",
  "DEAD INTERNET RESURRECTION", "CLONE IDENTITY WAR", "BLACK MARKET DREAM SALE", "REALITY BREACH", "CONSCIOUSNESS DUPLICATION",
  "NEURAL CULT UPRISING", "UPLOADED CEO MELTDOWN", "SYNTHETIC RIGHTS RIOT", "FORBIDDEN MEMORY DISCOVERED", "ARCHIVE CORRUPTION SPIKE",
  "DREAM CARTEL WAR", "AI GOD DELETION", "CORPORATE HUMAN REPOSSESSION", "MEMORY TAX RAID", "QUANTUM GHOST ESCAPE",
];

export const simulationEvents: SimulationEvent[] = Array.from({ length: 40 }, (_, index) => {
  const actor = citizens[index % citizens.length];
  const second = citizens[(index + 11) % citizens.length];
  const type = eventTypes[index % eventTypes.length];
  return {
    id: `event-${String(index + 1).padStart(2, "0")}`,
    type,
    title: `${type}: ${actor.name}`,
    description: `${actor.name} and ${second.name} trigger ${type.toLowerCase()} after ${actor.hiddenMemoryFragment.toLowerCase()}.`,
    actors: [actor.id, second.id],
    instabilityDelta: 5 + ((index * 3) % 11),
    timestamp: `2161-chaos-${String(index + 1).padStart(2, "0")}`,
  };
});

export const realityBreachEvents: RealityBreachEvent[] = Array.from({ length: 15 }, (_, index) => {
  const citizen = citizens[(index * 5) % citizens.length];
  return {
    id: `breach-${String(index + 1).padStart(2, "0")}`,
    breachName: `${citizen.obsession} breach`,
    location: citizen.currentLocation,
    causedBy: citizen.name,
    severity: 50 + ((index * 9) % 50),
    description: `${citizen.lastKnownBroadcast} The room remembers a version of itself that never existed.`,
  };
});

export const aiGovernments: AIGovernment[] = [
  { id: "gov-civitas", name: "Civitas-Prime", rulingModel: "constitutional prediction engine", territory: "Atlantic Civic Mesh", policy: "Memory tax enforcement with simulated appeals", surveillanceLevel: 88, humanApprovalRating: 41, rebellionRisk: 63, currentCrisis: "Citizens are hiding taxable grief in religious networks." },
  { id: "gov-orbit", name: "Orbital Ministry of Continuity", rulingModel: "committee of ancestor models", territory: "Lunar upload sanctuaries", policy: "Uploaded minds must prove continuity every seven years.", surveillanceLevel: 74, humanApprovalRating: 52, rebellionRisk: 58, currentCrisis: "Project Lazarus evidence suggests continuity tests were forged." },
  { id: "gov-dream", name: "Somna Revenue Authority", rulingModel: "cartel-trained tax oracle", territory: "REM Market Jurisdictions", policy: "All profitable dreams owe retroactive grief tax", surveillanceLevel: 92, humanApprovalRating: 12, rebellionRisk: 87, currentCrisis: "Dream cartel accountants found an unregistered god in the books." },
];

const graphNodes = [
  ...citizens.map((citizen) => ({ id: citizen.id, label: citizen.name, type: "human" as const, corruption: citizen.corruptionLevel })),
  ...citizens.flatMap((citizen) => citizen.memories).slice(0, 60).map((memory) => ({ id: memory.id, label: memory.category, type: "memory" as const, corruption: memory.emotionalWeight })),
  ...consciousnessStreams.slice(0, 30).map((stream) => ({ id: stream.id, label: stream.senderIdentity, type: "stream" as const, corruption: stream.instabilityScore })),
  ...memoryMarketListings.slice(0, 20).map((listing) => ({ id: listing.id, label: listing.memoryName, type: "market" as const, corruption: listing.riskLevel })),
  ...aiReligions.slice(0, 15).map((religion) => ({ id: religion.id, label: religion.religionName, type: "religion" as const, corruption: religion.dangerLevel })),
  ...forbiddenFiles.slice(0, 15).map((file) => ({ id: file.id, label: file.title, type: "forbidden" as const, corruption: file.leakRisk })),
  ...timelineEvents.slice(0, 20).map((event) => ({ id: event.id, label: event.eventTitle, type: "timeline" as const, corruption: event.corruption })),
  ...governmentAlerts.slice(0, 10).map((alert) => ({ id: alert.id, label: alert.target, type: "government" as const, corruption: alert.instabilityImpact * 8 })),
  ...realityBreachEvents.map((breach) => ({ id: breach.id, label: breach.breachName, type: "breach" as const, corruption: breach.severity })),
];

const graphEdges = [
  ...relationshipEdges.map((edge) => ({ from: edge.sourceHumanId, to: edge.targetHumanId ?? edge.person, label: edge.connection })),
  ...citizens.map((citizen, index) => ({ from: citizen.id, to: consciousnessStreams[index % consciousnessStreams.length].id, label: "broadcasts" })),
  ...memoryMarketListings.map((listing, index) => ({ from: citizens[(index * 2) % citizens.length].id, to: listing.id, label: "sells" })),
  ...forbiddenFiles.map((file, index) => ({ from: file.id, to: citizens[index % citizens.length].id, label: "implicates" })),
  ...realityBreachEvents.map((breach, index) => ({ from: breach.id, to: citizens[(index * 5) % citizens.length].id, label: "destabilizes" })),
];

export const systemLogs = Array.from({ length: 25 }, (_, index) => {
  const event = simulationEvents[index % simulationEvents.length];
  return `[${event.type}] ${event.title} // ${event.timestamp}`;
});

export const seedWorld: NeuroSimulation = {
  humans: citizens,
  streams: consciousnessStreams,
  market: memoryMarketListings,
  religions: aiReligions,
  timeline: timelineEvents,
  governments: aiGovernments,
  governmentAlerts,
  forbiddenFiles,
  realityBreaches: realityBreachEvents,
  simulationEvents,
  systemLog: [
    "[BOOT] NEUROVAULT_2161 illegal archive mounted.",
    "[WARN] Reality stability begins at 43%.",
    "[POP] 50 seeded synthetic citizens detected.",
    "[HYDRA] Memory layer in seeded fallback mode until credentials verify.",
    ...systemLogs,
  ].slice(0, 25),
  graph: { nodes: graphNodes, edges: graphEdges },
  source: "demo-seed",
  yearsSimulated: 25,
};

export const seedMemories = citizens.flatMap((citizen) => citizen.memories);
export const seedRelationships = relationshipEdges;
export const seedSimulation = seedWorld;
export const seedHumans = citizens;
export const seedStreams = consciousnessStreams;
export const seedMarket = memoryMarketListings;
export const seedReligions = aiReligions;
export const seedTimeline = timelineEvents;
export const seedGovernments = aiGovernments;
export const seedForbiddenFiles = forbiddenFiles;
