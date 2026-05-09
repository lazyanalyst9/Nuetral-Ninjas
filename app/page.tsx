"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FutureNews, FuturePost, SyntheticHuman, TimelineEvent } from "@/types";

const nav = ["Landing", "Citizens", "Feed", "News", "Timeline", "Chat"];

export default function Home() {
  const [humans, setHumans] = useState<SyntheticHuman[]>([]);
  const [feed, setFeed] = useState<FuturePost[]>([]);
  const [news, setNews] = useState<FutureNews | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [chat, setChat] = useState("");
  const [reply, setReply] = useState("");

  const timeline: TimelineEvent[] = [
    { year: 2099, eventTitle: "Ocean Firewall Treaty", category: "Politics", impact: "Data borders became territorial", relatedHumans: ["Nara-17"] },
    { year: 2112, eventTitle: "Memory Dividend", category: "Economy", impact: "People monetized archived experiences", relatedHumans: ["Eli Kade"] },
    { year: 2126, eventTitle: "Archive Recovery", category: "Culture", impact: "Lost citizen voices reappeared", relatedHumans: ["Unknown"] },
  ];

  const hit = async (path: string, cb: (d: any) => void) => {
    try { setLoading(path); setError(null); const r = await fetch(path,{method:"POST"}); if(!r.ok) throw new Error("Request failed"); cb(await r.json()); }
    catch(e){ setError((e as Error).message);} finally { setLoading(null);} };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-abyss via-slate-900 to-slate-800 text-slate-100">
      <div className="grid md:grid-cols-[220px_1fr] gap-4">
        <aside className="glass p-4 h-fit sticky top-4">
          <h1 className="text-xl font-bold text-cyansoft">AFTERLIFE_2126</h1>
          <p className="text-xs mt-1 text-slate-300">A recovered archive from the future internet.</p>
          <ul className="mt-4 space-y-2">{nav.map(n=><li key={n} className="text-sm text-slate-200/90">{n}</li>)}</ul>
        </aside>
        <main className="space-y-4">
          <motion.section initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="glass p-6">
            <h2 className="text-2xl font-semibold">Simulation Dashboard</h2>
            <p className="text-slate-300">Generate citizens, news, feed signals, and conversations from 2126.</p>
          </motion.section>

          <section className="grid lg:grid-cols-2 gap-4">
            <div className="glass p-4"><h3 className="font-semibold mb-2">Synthetic Human Generator</h3><button className="px-3 py-2 rounded bg-cyansoft/20" onClick={()=>hit('/api/generate-human',d=>setHumans([d,...humans]))}>Generate Citizen</button>{loading==='/api/generate-human'&&<p>Loading...</p>}{humans[0]&&<pre className="text-xs mt-2 overflow-auto">{JSON.stringify(humans[0],null,2)}</pre>}</div>
            <div className="glass p-4"><h3 className="font-semibold mb-2">Future Internet Feed</h3><button className="px-3 py-2 rounded bg-purplemuted/30" onClick={()=>hit('/api/generate-feed',setFeed)}>Generate Feed</button>{feed.length===0?<p className="text-sm text-slate-400 mt-2">Empty state: generate posts.</p>:feed.map((p,i)=><p key={i} className="text-sm mt-2">[{p.platform}] {p.post}</p>)}</div>
            <div className="glass p-4"><h3 className="font-semibold mb-2">Future News Network</h3><button className="px-3 py-2 rounded bg-cyansoft/20" onClick={()=>hit('/api/generate-news',setNews)}>Generate News</button>{news?<div className="mt-2"><p className="font-medium">{news.headline}</p><p className="text-sm text-slate-300">{news.summary}</p></div>:<p className="text-sm text-slate-400">Empty state: no news yet.</p>}</div>
            <div className="glass p-4"><h3 className="font-semibold mb-2">Civilization Timeline</h3>{timeline.map((t,i)=><div key={i} className="border-l border-cyan-200/20 pl-2 mt-2"><p>{t.year} — {t.eventTitle}</p><p className="text-xs text-slate-300">{t.category}: {t.impact}</p></div>)}</div>
          </section>

          <section className="glass p-4">
            <h3 className="font-semibold mb-2">Chat With Future Citizen</h3>
            <input value={chat} onChange={(e)=>setChat(e.target.value)} className="w-full bg-slate-800 rounded p-2" placeholder="Ask a citizen from 2126..." />
            <button className="mt-2 px-3 py-2 rounded bg-purplemuted/30 disabled:opacity-50" disabled={!humans[0]||!chat} onClick={async()=>{setLoading('chat'); const r=await fetch('/api/chat-citizen',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({citizen:humans[0],message:chat})}); const d=await r.json(); setReply(d.reply); setLoading(null);}}>Send</button>
            {loading==='chat'&&<p>Loading...</p>}
            {reply&&<p className="mt-2 text-slate-200">{reply}</p>}
            {error&&<p className="mt-2 text-red-300">Error: {error}</p>}
          </section>
        </main>
      </div>
    </div>
  );
}
