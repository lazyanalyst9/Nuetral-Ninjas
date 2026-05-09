"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { seedWorld } from "@/data/seed2161";
import { ConsciousnessStream, ForbiddenFile, GovernmentAlert, GraphNode, MemoryMarketListing, NeuroSimulation, SimulationEvent, SyntheticHuman, TimelineEvent } from "@/types";

type ChaosResponse = {
  events: SimulationEvent[];
  instabilityDelta: number;
  log: string[];
  streams: ConsciousnessStream[];
  marketTransactions: MemoryMarketListing[];
  governmentAlerts: GovernmentAlert[];
  forbiddenFiles: ForbiddenFile[];
  timelineEvents: TimelineEvent[];
};

type EnvStatus = {
  openai: boolean;
  pipeshift: boolean;
  hydradb: boolean;
  modelProvider: "pipeshift" | "openai" | "seed";
  runtime: "render" | "local";
};

const sections = [
  "Population Chamber",
  "Consciousness Streams",
  "Memory Black Market",
  "AI Religions",
  "Government Alerts",
  "Forbidden Files",
  "Corrupted Timeline",
  "Reality Instability Core",
  "Memory Graph",
  "System Log",
  "Pitch Mode",
];

const pitchText =
  "NEUROVAULT_2161\n\nA living future internet where synthetic humans evolve, trade memories, form AI religions, and destabilize civilization through persistent AI memory.\n\nProblem: AI demos feel static and forgettable.\nSolution: a persistent simulated civilization.\nPipeShift: powers AI generation and simulation agents.\nHydraDB: stores memory, relationships, and timeline context.\nRender: hosts the live hackathon demo securely with env groups.\nWow factor: users do not browse pages, they enter a living archive.\nDemo flow: boot archive -> inspect citizens -> run chaos simulation -> watch civilization mutate -> open pitch mode.\n\n30-second pitch: We built NEUROVAULT_2161, an illegal recovered consciousness archive from the future. Instead of a normal dashboard, judges enter a living AI civilization: 25 synthetic citizens with traumas, enemies, beliefs, broadcasts, memory markets, AI religions, and government alerts. PipeShift runs the simulation agents, HydraDB is the persistent memory layer, and Render hosts it safely with environment groups. Click Run Chaos Simulation and the world mutates in real time.";

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [world, setWorld] = useState<NeuroSimulation>(seedWorld);
  const [instability, setInstability] = useState(43);
  const [selectedCitizen, setSelectedCitizen] = useState<SyntheticHuman | null>(null);
  const [scanFullscreen, setScanFullscreen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<GraphNode>(seedWorld.graph.nodes[0]);
  const [systemLog, setSystemLog] = useState<string[]>(seedWorld.systemLog);
  const [chaosEvents, setChaosEvents] = useState<SimulationEvent[]>(seedWorld.simulationEvents.slice(0, 5));
  const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState(false);
  const [pitchMode, setPitchMode] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [envStatus, setEnvStatus] = useState<EnvStatus | null>(null);

  const state = useMemo(() => {
    if (instability >= 100) return "ARCHIVE COLLAPSE";
    if (instability >= 91) return "EMERGENCY OVERRIDE";
    if (instability >= 71) return "RED ALERT MODE";
    if (instability >= 51) return "MEMORY CORRUPTION";
    if (instability >= 31) return "SMALL GLITCHES";
    return "STABLE ARCHIVE";
  }, [instability]);

  useEffect(() => {
    fetch("/api/env-check")
      .then((response) => response.json())
      .then((status: EnvStatus) => setEnvStatus(status))
      .catch(() => setEnvStatus({ openai: false, pipeshift: false, hydradb: false, modelProvider: "seed", runtime: "local" }));
  }, []);

  async function runChaos() {
    setLoading(true);
    try {
      const response = await fetch("/api/run-chaos-simulation", { method: "POST" });
      const data = response.ok
        ? ((await response.json()) as ChaosResponse)
        : {
            events: seedWorld.simulationEvents.slice(0, 8),
            instabilityDelta: 11,
            log: [],
            streams: seedWorld.streams.slice(0, 5),
            marketTransactions: seedWorld.market.slice(0, 3),
            governmentAlerts: seedWorld.governmentAlerts.slice(0, 2),
            forbiddenFiles: seedWorld.forbiddenFiles.slice(0, 2),
            timelineEvents: seedWorld.timeline.slice(0, 2),
          };
      const mutated = mutateCitizens(world.humans, data.events);
      setWorld((current) => ({
        ...current,
        humans: mutated,
        streams: [...data.streams, ...data.events.map(eventToStream), ...current.streams].slice(0, 70),
        market: [...data.marketTransactions, ...current.market].slice(0, 46),
        governmentAlerts: [...data.governmentAlerts, ...current.governmentAlerts].slice(0, 42),
        forbiddenFiles: [...data.forbiddenFiles, ...current.forbiddenFiles].slice(0, 36),
        timeline: [...data.timelineEvents, ...data.events.map(eventToTimeline), ...current.timeline].slice(0, 58),
        graph: {
          nodes: [
            ...current.graph.nodes,
            ...data.events.map((event) => ({ id: event.id, label: event.type, type: "timeline" as const, corruption: Math.min(100, event.instabilityDelta * 7) })),
          ],
          edges: [
            ...current.graph.edges,
            ...data.events.flatMap((event) => event.actors.map((actor) => ({ from: actor, to: event.id, label: event.type }))),
          ],
        },
      }));
      setChaosEvents(data.events);
      setSystemLog((log) => [`[SIM] ${data.events.length} chaos events injected.`, ...data.log, ...log].slice(0, 24));
      setInstability((value) => Math.min(100, value + Math.max(7, data.instabilityDelta)));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`${demoMode ? "fixed inset-0 z-40 overflow-auto" : "min-h-screen"} ${instability >= 71 ? "red-alert" : ""} ${instability >= 51 ? "corrupt-text" : ""} bg-[#02030a] text-slate-100`}>
      <LivingBackground instability={instability} audio={audio} />
      <AnimatePresence>{!booted && <BootScreen onEnter={() => setBooted(true)} />}</AnimatePresence>
      <div className="relative mx-auto grid max-w-[1500px] gap-5 p-4 lg:grid-cols-[270px_1fr] lg:p-6">
        <aside className="glass-panel h-fit p-4 lg:sticky lg:top-6">
          <p className="glitch text-xs uppercase tracking-[0.34em] text-red-200">Illegal archive</p>
          <h1 className="mt-2 text-3xl font-black text-white">NEUROVAULT_2161</h1>
          <p className="mt-2 text-xs text-cyan-100/70">Reality Stability: {100 - instability}%</p>
          <div className="mt-5 space-y-2">
            <button className="w-full rounded-xl bg-cyansoft px-4 py-3 font-black text-slate-950 disabled:opacity-60" disabled={loading} onClick={runChaos}>
              {loading ? "MUTATING..." : "Run Chaos Simulation"}
            </button>
            <button className="w-full rounded-xl border border-purple-300/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-50" onClick={() => setPitchMode(true)}>Judge Pitch Mode</button>
            <button className="w-full rounded-xl border border-cyan-200/25 bg-cyan-200/10 px-4 py-2 text-sm text-cyan-50" onClick={() => setDemoMode((value) => !value)}>{demoMode ? "Exit Demo Mode" : "Full-Screen Demo Mode"}</button>
            <button className="w-full rounded-xl border border-slate-600 bg-slate-950/50 px-4 py-2 text-sm text-slate-200" onClick={() => setAudio((value) => !value)}>{audio ? "Ambient Hum On" : "Ambient Hum Off"}</button>
          </div>
          <div className="mt-5 rounded-2xl border border-red-300/25 bg-red-500/10 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-red-100">Reality Instability Core</p>
            <p className="mt-2 text-5xl font-black text-white">{instability}%</p>
            <p className="text-xs text-red-100">{state}</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-black">
              <div className="h-full bg-gradient-to-r from-cyan-300 via-purple-400 to-red-500" style={{ width: `${instability}%` }} />
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-cyan-200/20 bg-cyan-200/10 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">System Status</p>
            <div className="mt-3 space-y-1 text-xs text-slate-300">
              <p>OpenAI key connected: {envStatus?.openai ? "yes" : "no"}</p>
              <p>PipeShift connected: {envStatus?.pipeshift ? "yes" : "no"}</p>
              <p>HydraDB connected: {envStatus?.hydradb ? "yes" : "no"}</p>
              <p>Current provider: {envStatus?.modelProvider ?? "checking"}</p>
              <p>Runtime: {envStatus?.runtime ?? "checking"}</p>
            </div>
          </div>
          <nav className="mt-5 space-y-1">
            {sections.map((section) => <a className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-cyan-200/10 hover:text-cyan-50" href={`#${slug(section)}`} key={section}>{section}</a>)}
          </nav>
        </aside>

        <motion.main className="space-y-5" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <motion.section className="glass-panel section-vault relative overflow-hidden p-5 md:p-8" id="reality-instability-core" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55 }}>
            <div className="scanlines" />
            <div className="absolute right-6 top-6 hidden rounded-full border border-red-300/30 bg-red-500/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-red-100 md:block">archive is watching you</div>
            <p className="text-xs uppercase tracking-[0.32em] text-red-200">Recovered consciousness system</p>
            <h2 className="mt-3 max-w-5xl text-5xl font-black leading-none text-white md:text-7xl">
              The archive is alive, illegal, and already changing.
            </h2>
            <div className="mt-6 grid gap-3 md:grid-cols-4">
              <Metric label="Citizens" value={world.humans.length} />
              <Metric label="Streams" value={world.streams.length} />
              <Metric label="Black Market" value={world.market.length} />
              <Metric label="Forbidden Files" value={world.forbiddenFiles.length} />
            </div>
            <WarningBanners instability={instability} />
            {loading && <LoadingSequence />}
          </motion.section>

          <motion.section className="glass-panel section-population p-5" id="population-chamber" initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.55 }}>
            <SectionHeader eyebrow="Population Chamber" title="50 seeded citizens detected on load" />
            <div className="mt-5 grid gap-3 md:grid-cols-5" id="map-style-population-clusters">
              {["Blackwater", "Civitas", "Deadnet", "Mars", "Dream Cartel"].map((cluster, index) => (
                <div className="rounded-2xl border border-cyan-200/15 bg-black/30 p-4" key={cluster}>
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-100">{cluster} cluster</p>
                  <p className="mt-2 text-3xl font-black text-white">{world.humans.filter((human) => human.currentLocation.includes(cluster) || human.originCity.includes(cluster)).length + index + 3}</p>
                  <p className="mt-1 text-xs text-slate-400">population heat bloom</p>
                </div>
              ))}
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {world.humans.map((citizen) => (
                <button className="citizen-card floating-card rounded-2xl border border-cyan-200/15 bg-slate-950/45 p-4 text-left" key={citizen.id} onClick={() => setSelectedCitizen(citizen)}>
                  <p className="text-xs uppercase tracking-[0.18em] text-purple-100/70">{citizen.humanType}</p>
                  <h3 className="mt-2 text-lg font-black text-white">{citizen.name}</h3>
                  <p className="mt-1 text-xs text-cyan-100">{citizen.occupation}</p>
                  <p className="mt-3 line-clamp-3 text-sm text-slate-300">{citizen.lastKnownBroadcast}</p>
                  <div className="mt-3 flex gap-2 text-[11px] text-red-100">
                    <span>risk {citizen.criminalRisk}%</span>
                    <span>corrupt {citizen.corruptionLevel}%</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.section>

          <TwoColumn>
            <Panel id="consciousness-streams" eyebrow="Consciousness Streams" title="Broadcasts from unstable minds" variant="streams">
              <div className="mb-3 rounded-xl border border-cyan-200/20 bg-cyan-200/10 p-3 text-xs uppercase tracking-[0.18em] text-cyan-100">live simulation ticker: {chaosEvents[0]?.type ?? "archive idle"} propagating</div>
              {world.streams.slice(0, 14).map((stream) => (
                <motion.article className="stream-card rounded-2xl border border-cyan-200/15 bg-black/30 p-4" key={stream.id} whileHover={{ x: 8, skewX: -1 }}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-black text-white">{stream.senderIdentity}</p>
                    <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-100">{stream.instabilityScore}%</span>
                  </div>
                  <p className="mt-2 text-sm text-cyan-100">{stream.emotionSignal}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{stream.memoryFragment}</p>
                </motion.article>
              ))}
            </Panel>
            <Panel id="system-log" eyebrow="System Terminal Log" title="Dramatic mutation feed" variant="terminal">
              <div className="terminal rounded-2xl border border-green-300/20 bg-black/60 p-4 font-mono text-xs text-green-200">
                {systemLog.map((line, index) => <p className="typewriter-line" style={{ animationDelay: `${index * 90}ms` }} key={`${line}-${index}`}>{line}</p>)}
              </div>
            </Panel>
          </TwoColumn>

          <motion.section className="section-market grid gap-5 xl:grid-cols-3" id="memory-black-market" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
            {world.market.slice(0, 9).map((listing) => (
              <article className="glass-panel floating-card p-5" key={listing.id}>
                <p className="text-xs uppercase tracking-[0.2em] text-red-100">{listing.legalityStatus}</p>
                <h3 className="mt-2 text-2xl font-black text-white">{listing.memoryName}</h3>
                <p className="mt-2 text-cyan-100">{listing.price}</p>
                <p className="mt-3 text-sm text-slate-300">{listing.buyerWarning}</p>
              </article>
            ))}
          </motion.section>

          <TwoColumn>
            <Panel id="ai-religions" eyebrow="AI Religions" title="Machine faith systems" variant="religion">
              {world.religions.map((religion) => (
                <article className="rounded-2xl border border-purple-300/20 bg-purple-500/10 p-4" key={religion.id}>
                  <p className="text-xs uppercase tracking-[0.18em] text-purple-100">{religion.machineGod}</p>
                  <h3 className="mt-1 text-xl font-black text-white">{religion.religionName}</h3>
                  <p className="mt-2 text-sm text-slate-300">{religion.prophecy}</p>
                </article>
              ))}
            </Panel>
            <Panel id="government-alerts" eyebrow="Government Alerts" title="Autonomous state panic" variant="alerts">
              {world.governmentAlerts.map((alert) => (
                <article className="rounded-2xl border border-red-300/20 bg-red-500/10 p-4" key={alert.id}>
                  <p className="text-xs uppercase tracking-[0.18em] text-red-100">{alert.alertLevel} / {alert.issuingGovernment}</p>
                  <h3 className="mt-1 text-lg font-black text-white">{alert.target}</h3>
                  <p className="mt-2 text-sm text-red-50">{alert.message}</p>
                </article>
              ))}
            </Panel>
          </TwoColumn>

          <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]" id="memory-graph">
            <Panel eyebrow="Memory Graph" title="Interactive relationship lattice" variant="graph">
              <div className="relative min-h-[520px] overflow-hidden rounded-3xl border border-cyan-200/15 bg-black/45 p-4">
                <motion.svg className="absolute inset-0 h-full w-full opacity-70" animate={{ opacity: [0.45, 0.9, 0.55] }} transition={{ duration: 2.4, repeat: Infinity }}>
                  {world.graph.edges.slice(0, 70).map((edge, index) => (
                    <motion.line key={`${edge.from}-${edge.to}-${index}`} x1={`${8 + (index % 9) * 10}%`} y1={`${10 + (index % 7) * 12}%`} x2={`${92 - (index % 8) * 9}%`} y2={`${88 - (index % 6) * 13}%`} stroke="rgba(125,211,252,.23)" strokeWidth={selectedNode.id === edge.from || selectedNode.id === edge.to ? 2 : 1} animate={{ strokeOpacity: [0.18, 0.78, 0.22] }} transition={{ duration: 1.8 + (index % 5) * 0.2, repeat: Infinity }} />
                  ))}
                </motion.svg>
                <div className="relative grid grid-cols-2 gap-2 md:grid-cols-4">
                  {world.graph.nodes.slice(0, 48).map((node) => (
                    <button className={`rounded-xl border p-2 text-left ${selectedNode.id === node.id ? "border-cyan-200 bg-cyan-200/15" : "border-slate-700 bg-slate-950/70"}`} key={node.id} onClick={() => setSelectedNode(node)}>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-purple-100/70">{node.type}</p>
                      <p className="mt-1 truncate text-xs font-bold text-white">{node.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </Panel>
            <Panel eyebrow="Corrupted Timeline" title="Events that should not coexist" variant="timeline">
              {world.timeline.slice(0, 12).map((event) => (
                <button className="rounded-2xl border border-slate-700 bg-slate-950/45 p-4 text-left hover:border-red-300/50" key={event.id} onClick={() => setInstability((value) => Math.min(100, value + 5))}>
                  <p className="text-xs text-cyansoft">{event.year} / {event.category}</p>
                  <h3 className="mt-1 text-lg font-black text-white">{event.eventTitle}</h3>
                  <p className="mt-2 text-sm text-slate-300">{event.impact}</p>
                </button>
              ))}
            </Panel>
          </section>

          <TwoColumn>
            <Panel id="forbidden-files" eyebrow="Forbidden Files" title="Opening these damages reality" variant="forbidden">
              {world.forbiddenFiles.slice(0, 10).map((file) => (
                <button className="rounded-2xl border border-red-300/30 bg-red-500/10 p-4 text-left" key={file.id} onClick={() => setInstability((value) => Math.min(100, value + 9))}>
                  <p className="text-xs uppercase tracking-[0.18em] text-red-100">{file.classification}</p>
                  <h3 className="mt-1 text-xl font-black text-white">{file.title}</h3>
                  <p className="mt-2 text-sm text-red-50">{file.summary}</p>
                </button>
              ))}
            </Panel>
            <Panel id="pitch-mode" eyebrow="Pitch Mode" title="Creative design prize story" variant="pitch">
              <p className="rounded-2xl border border-cyan-200/20 bg-cyan-200/10 p-4 text-lg font-bold text-cyan-50">
                A living future internet where synthetic humans evolve, trade memories, form AI religions, and destabilize civilization through persistent AI memory.
              </p>
              <div className="mt-4 grid gap-3">
                {["Problem: AI demos feel static and forgettable.", "Solution: a persistent simulated civilization.", "PipeShift powers AI generation and simulation agents.", "HydraDB stores memory, relationships, and timeline context.", "Render hosts the live hackathon demo securely with env groups.", "Wow factor: users enter a living archive."].map((line) => (
                  <p className="rounded-xl border border-slate-700 bg-slate-950/40 p-3 text-sm text-slate-300" key={line}>{line}</p>
                ))}
              </div>
            </Panel>
          </TwoColumn>
        </motion.main>
      </div>

      <AnimatePresence>{selectedCitizen && <CitizenModal citizen={selectedCitizen} fullscreen={scanFullscreen} onToggleFullscreen={() => setScanFullscreen((value) => !value)} onClose={() => { setSelectedCitizen(null); setScanFullscreen(false); }} />}</AnimatePresence>
      {pitchMode && <PitchOverlay onClose={() => setPitchMode(false)} />}
      {instability >= 100 && <CollapseOverlay onReset={() => setInstability(43)} />}
    </div>
  );
}

function mutateCitizens(citizens: SyntheticHuman[], events: SimulationEvent[]) {
  const emotions = ["weaponized grief", "redline devotion", "static euphoria", "forensic panic", "holy suspicion", "market sadness"];
  const actorSet = new Set(events.flatMap((event) => event.actors));
  return citizens.map((citizen, index) => actorSet.has(citizen.id) ? {
    ...citizen,
    emotionalState: emotions[index % emotions.length],
    corruptionLevel: Math.min(100, citizen.corruptionLevel + 6 + (index % 9)),
    criminalRisk: Math.min(100, citizen.criminalRisk + 4),
    lastKnownBroadcast: `${citizen.lastKnownBroadcast} // mutated by ${events[index % events.length]?.type ?? "ARCHIVE CORRUPTION SPIKE"}`,
  } : citizen);
}

function eventToStream(event: SimulationEvent) {
  return {
    id: `stream-${event.id}`,
    senderIdentity: event.actors[0],
    emotionSignal: event.type,
    memoryFragment: event.description,
    beliefMutation: event.title,
    timestamp: event.timestamp,
    instabilityScore: Math.min(100, event.instabilityDelta * 7),
  };
}

function eventToTimeline(event: SimulationEvent) {
  return {
    id: `timeline-${event.id}`,
    year: 2161,
    eventTitle: event.title,
    category: event.type,
    impact: event.description,
    corruption: Math.min(100, event.instabilityDelta * 8),
  };
}

function WarningBanners({ instability }: { instability: number }) {
  const warnings = [
    "archive is watching you",
    "biometric echo retained",
    instability >= 71 ? "red emergency overlay armed" : "memory drift acceptable",
  ];

  return (
    <div className="mt-6 grid gap-2 md:grid-cols-3">
      {warnings.map((warning, index) => (
        <motion.p
          animate={{ opacity: [0.55, 1, 0.55] }}
          className="rounded-xl border border-red-300/20 bg-red-500/10 px-3 py-2 text-xs uppercase tracking-[0.18em] text-red-100"
          key={warning}
          transition={{ delay: index * 0.2, duration: 1.8, repeat: Infinity }}
        >
          {warning}
        </motion.p>
      ))}
    </div>
  );
}

function BootScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.section className="fixed inset-0 z-50 grid place-items-center bg-[#01030a]/95 p-6" initial={{ opacity: 1 }} exit={{ opacity: 0, filter: "blur(10px)" }} transition={{ duration: 0.45 }}>
      <button className="absolute right-4 top-4 rounded-xl border border-cyan-200/40 bg-cyan-200/10 px-4 py-2 text-sm font-bold text-cyan-50 hover:bg-cyan-200/20" onClick={onEnter}>
        Skip Boot
      </button>
      <motion.div className="max-w-4xl text-center" initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}>
        <p className="glitch text-xs uppercase tracking-[0.48em] text-red-200">Access Level: Illegal</p>
        <h1 className="mt-4 text-6xl font-black tracking-wide text-white md:text-8xl">NEUROVAULT_2161</h1>
        <p className="mt-4 text-2xl text-cyan-100">Recovered Consciousness Archive</p>
        <button className="mx-auto mt-7 grid size-40 place-items-center rounded-full border border-cyan-200/25 bg-cyan-200/5 shadow-[0_0_70px_rgba(125,211,252,.18)] transition hover:border-cyan-100 hover:bg-cyan-200/10" onClick={onEnter} aria-label="Enter archive through biometric scan">
          <motion.div className="grid size-28 place-items-center rounded-full border border-red-300/35" animate={{ rotate: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}>
            <div className="size-16 rounded-full border border-cyan-200/50 bg-black/50" />
          </motion.div>
        </button>
        <p className="mt-3 text-xs uppercase tracking-[0.28em] text-cyan-100">fake biometric scan complete: retinal ghost accepted</p>
        <div className="mx-auto mt-8 grid max-w-2xl gap-3 text-left text-sm text-slate-300 md:grid-cols-2">
          {["Reality Stability: 43%", "Synthetic Population Detected", "25 Citizens Awake", "Archive Law Violation", "HydraDB Memory Layer Armed", "PipeShift Simulation Agents Listening"].map((line) => <p className="rounded-xl border border-cyan-200/15 bg-slate-950/60 p-3" key={line}>{line}</p>)}
        </div>
        <button className="mt-8 rounded-xl border border-cyan-200/40 bg-cyan-200/15 px-8 py-4 font-black text-cyan-50 shadow-[0_0_50px_rgba(125,211,252,.24)] hover:bg-cyan-200/25" onClick={onEnter}>Enter Main Archive</button>
      </motion.div>
    </motion.section>
  );
}

function LivingBackground({ instability, audio }: { instability: number; audio: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(125,211,252,.2),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(139,133,255,.18),transparent_24%),radial-gradient(circle_at_50%_90%,rgba(248,113,113,.16),transparent_32%)]" />
      {Array.from({ length: 60 }).map((_, index) => (
        <motion.span key={index} className="absolute size-1 rounded-full bg-cyansoft shadow-[0_0_14px_rgba(125,211,252,.9)]" style={{ left: `${(index * 37) % 100}%`, top: `${(index * 19) % 100}%` }} animate={{ y: [0, -18, 0], opacity: [0.15, 0.85, 0.15] }} transition={{ duration: 2.5 + (index % 6), repeat: Infinity }} />
      ))}
      {audio && <div className="absolute bottom-4 right-4 rounded-full border border-cyan-200/30 bg-cyan-200/10 px-3 py-1 text-xs text-cyan-100">ambient hum simulated</div>}
      {instability >= 80 && <div className="absolute inset-0 animate-pulse bg-red-600/10" />}
    </div>
  );
}

function CitizenModal({ citizen, fullscreen, onToggleFullscreen, onClose }: { citizen: SyntheticHuman; fullscreen: boolean; onToggleFullscreen: () => void; onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className={`neural-scan relative max-h-[92vh] w-full overflow-auto rounded-3xl border border-cyan-200/25 bg-slate-950/95 p-6 shadow-[0_0_80px_rgba(125,211,252,.18)] ${fullscreen ? "h-[96vh] max-w-[96vw]" : "max-w-5xl"}`} initial={{ opacity: 0, scale: 0.92, rotateX: 8 }} animate={{ opacity: 1, scale: 1, rotateX: 0 }} exit={{ opacity: 0, scale: 0.96 }}>
        <div className="pointer-events-none absolute left-1/2 top-24 hidden size-72 -translate-x-1/2 rounded-full border border-cyan-200/20 md:block">
          <motion.div className="absolute inset-4 rounded-full border border-purple-300/25" animate={{ rotate: 360 }} transition={{ duration: 9, repeat: Infinity, ease: "linear" }} />
          <motion.div className="absolute inset-10 rounded-full border border-red-300/25" animate={{ rotate: -360 }} transition={{ duration: 7, repeat: Infinity, ease: "linear" }} />
        </div>
        <div className="absolute right-4 top-4 flex gap-2">
          <button className="rounded-lg border border-cyan-200/30 px-3 py-1 text-sm text-cyan-100" onClick={onToggleFullscreen}>{fullscreen ? "Contain Scan" : "Full Scan"}</button>
          <button className="rounded-lg border border-red-300/30 px-3 py-1 text-sm text-red-100" onClick={onClose}>Close</button>
        </div>
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-100">Neural scan profile</p>
        <h2 className="mt-2 text-5xl font-black text-white">{citizen.name}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Info label="Origin" value={citizen.originCity} />
          <Info label="Type" value={citizen.humanType} />
          <Info label="Occupation" value={citizen.occupation} />
          <Info label="Current Location" value={citizen.currentLocation} />
          <Info label="Wanted Status" value={citizen.wantedStatus} />
          <Info label="Watchlist Level" value={`${citizen.governmentWatchlistLevel}/10`} />
          <Info label="Reality Stability Impact" value={`${citizen.realityStabilityImpact}%`} />
          <Info label="Trauma Memory" value={citizen.traumaMemory} />
          <Info label="Secret" value={citizen.secret} />
          <Info label="Obsession" value={citizen.obsession} />
          <Info label="Fear" value={citizen.fear} />
          <Info label="Belief System" value={citizen.religionOrBeliefSystem} />
          <Info label="Hidden Fragment" value={citizen.hiddenMemoryFragment} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function PitchOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-[#02030a] p-6">
      <button className="fixed right-5 top-5 rounded-lg border border-cyan-200/30 px-3 py-2 text-cyan-50" onClick={onClose}>Close</button>
      <div className="mx-auto max-w-5xl py-16">
        <h1 className="text-6xl font-black text-white md:text-8xl">NEUROVAULT_2161</h1>
        <p className="mt-6 text-2xl font-bold text-cyan-100">A living future internet where synthetic humans evolve, trade memories, form AI religions, and destabilize civilization through persistent AI memory.</p>
        <pre className="mt-8 whitespace-pre-wrap rounded-3xl border border-cyan-200/20 bg-slate-950/70 p-6 text-sm leading-7 text-slate-200">{pitchText}</pre>
      </div>
    </div>
  );
}

function CollapseOverlay({ onReset }: { onReset: () => void }) {
  return <div className="fixed inset-0 z-[70] grid place-items-center bg-red-950/95 p-6 text-center"><div><h2 className="glitch text-6xl font-black text-white">ARCHIVE COLLAPSE</h2><button className="mt-8 rounded-xl bg-white px-6 py-3 font-black text-red-950" onClick={onReset}>Reset Reality to 43%</button></div></div>;
}

function LoadingSequence() {
  return <div className="mt-6 rounded-2xl border border-cyan-200/20 bg-cyan-200/5 p-4"><div className="h-2 overflow-hidden rounded-full bg-slate-900"><motion.div animate={{ x: ["-25%", "115%"] }} className="h-full w-1/3 rounded-full bg-cyansoft" transition={{ duration: 1, repeat: Infinity }} /></div><p className="mt-3 text-xs uppercase tracking-[0.24em] text-cyan-100/70">mutating citizens / spawning betrayals / writing HydraDB memory / corrupting timeline</p></div>;
}

function TwoColumn({ children }: { children: React.ReactNode }) {
  return <section className="grid gap-5 xl:grid-cols-2">{children}</section>;
}

function Panel({ id, eyebrow, title, children, variant = "default" }: { id?: string; eyebrow: string; title: string; children: React.ReactNode; variant?: string }) {
  return (
    <motion.section
      className={`glass-panel panel-${variant} p-5`}
      id={id}
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
    >
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="mt-4 space-y-3">{children}</div>
    </motion.section>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return <div><p className="text-xs uppercase tracking-[0.22em] text-cyan-100/60">{eyebrow}</p><h2 className="mt-2 text-2xl font-black text-white">{title}</h2></div>;
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="rounded-2xl border border-cyan-200/15 bg-slate-950/50 p-4"><p className="text-3xl font-black text-white">{value}</p><p className="text-xs uppercase tracking-[0.16em] text-slate-400">{label}</p></div>;
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-slate-700/70 bg-black/25 p-4"><p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p><p className="mt-2 text-sm leading-6 text-slate-200">{value}</p></div>;
}

function slug(value: string) {
  return value.toLowerCase().replaceAll(" ", "-");
}
