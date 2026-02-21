// PLAYFUL GEOMETRIC SKILL — LandingPage.jsx
// THE NORTH STAR EXAMPLE
//
// This is what the skill looks like when everything works together.
// Read this entire file before building any page with this skill.
//
// What to notice:
// - Every section has background decoration (shapes, dots) — no empty backgrounds
// - The confetti color rotation across icon circles
// - Hard pop shadows on every interactive element
// - Bounce hover lifts on cards and buttons
// - Warm cream background throughout — not white
// - Outfit for all headings, Plus Jakarta Sans for body
// - Floating decorative shapes using the float animation
// - The "most popular" badge rotation on the pricing card

import { useState } from "react";
import { Zap, Shield, BarChart, Palette, Code, Globe, Check, ArrowRight, Star } from "lucide-react";

// ── TOKENS ────────────────────────────────────────────────────────────────────
const t = {
  bg:         "#FFFDF5",
  card:       "#FFFFFF",
  fg:         "#1E293B",
  muted:      "#64748B",
  border:     "#E2E8F0",
  accent:     "#8B5CF6",
  secondary:  "#F472B6",
  tertiary:   "#FBBF24",
  quaternary: "#34D399",
};

const confetti = [t.accent, t.secondary, t.tertiary, t.quaternary];
const pop = (size = 4) => `${size}px ${size}px 0px 0px ${t.fg}`;

const BOUNCE = "cubic-bezier(0.34,1.56,0.64,1)";

// Global styles
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #FFFDF5; color: #1E293B; font-family: 'Plus Jakarta Sans', sans-serif; -webkit-font-smoothing: antialiased; }
  ::selection { background: #8B5CF6; color: white; }

  /* dot grid background */
  .dots { background-image: radial-gradient(circle, #CBD5E1 1px, transparent 1px); background-size: 24px 24px; }

  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
  @keyframes float2 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(8deg)} }
  @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes popIn { 0%{opacity:0;transform:scale(0.8)} 70%{transform:scale(1.05)} 100%{opacity:1;transform:scale(1)} }
  @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  @keyframes wiggle { 0%,100%{transform:rotate(0)} 25%{transform:rotate(4deg)} 75%{transform:rotate(-4deg)} }

  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
`;

// ── LIFT BUTTON ───────────────────────────────────────────────────────────────
function LiftButton({ children, variant = "primary", size = "lg", showArrow, onClick }) {
  const [s, set] = useState("rest");
  const isPrimary = variant === "primary";
  const shadow = s === "hover" ? pop(6) : s === "active" ? pop(2) : pop(4);
  const trans = s === "hover" ? "translate(-2px,-2px)" : s === "active" ? "translate(2px,2px)" : "translate(0,0)";
  const bgHover = !isPrimary && s === "hover" ? t.tertiary : undefined;

  return (
    <button onMouseEnter={()=>set("hover")} onMouseLeave={()=>set("rest")}
      onMouseDown={()=>set("active")} onMouseUp={()=>set("hover")} onClick={onClick}
      style={{
        display:"inline-flex", alignItems:"center", gap:10, whiteSpace:"nowrap",
        padding: size==="lg" ? "15px 32px" : "10px 22px",
        fontSize: size==="lg" ? 16 : 14,
        fontFamily:"'Plus Jakarta Sans',sans-serif", fontWeight:700,
        borderRadius:9999,
        background: bgHover || (isPrimary ? t.accent : "transparent"),
        color: isPrimary ? "#fff" : t.fg,
        border:`2px solid ${t.fg}`,
        boxShadow: shadow, transform: trans,
        cursor:"pointer", outline:"none",
        transition:`transform 200ms ${BOUNCE}, box-shadow 200ms ${BOUNCE}, background 150ms ease`,
      }}>
      {children}
      {showArrow && (
        <span style={{width:28,height:28,borderRadius:"50%",background:"rgba(255,255,255,0.25)",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <ArrowRight size={14} strokeWidth={2.5}/>
        </span>
      )}
    </button>
  );
}

// ── NAV ───────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 48px",background:t.bg,borderBottom:`2px solid ${t.fg}`,position:"sticky",top:0,zIndex:100}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:28,height:28,background:t.accent,border:`2px solid ${t.fg}`,boxShadow:pop(2),borderRadius:6}}/>
        <span style={{fontSize:20,fontWeight:800,fontFamily:"Outfit",letterSpacing:"-0.01em"}}>Drip</span>
      </div>
      <div style={{display:"flex",gap:4}}>
        {["Skills","Docs","Pricing","Blog"].map(l=>(
          <a key={l} href="#" style={{padding:"8px 14px",borderRadius:9999,fontSize:14,fontWeight:500,color:t.muted,textDecoration:"none",transition:"all 150ms"}}
            onMouseEnter={e=>{e.target.style.background="#F1F5F9";e.target.style.color=t.fg;}}
            onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color=t.muted;}}>{l}</a>
        ))}
      </div>
      <LiftButton variant="primary" size="sm">Get started free</LiftButton>
    </nav>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{position:"relative",overflow:"hidden",padding:"100px 48px",background:t.bg}}>

      {/* Background decorations — the "wild" in "stable grid, wild decoration" */}
      {/* Large yellow circle behind the content — gives warmth and depth */}
      <div style={{position:"absolute",top:-80,left:-80,width:400,height:400,borderRadius:"50%",background:t.tertiary,opacity:0.25,animation:"float 6s ease-in-out infinite",zIndex:0}}/>
      {/* Dotted grid pattern */}
      <div className="dots" style={{position:"absolute",inset:0,opacity:0.5,zIndex:0}}/>
      {/* Floating shapes */}
      <div style={{position:"absolute",top:80,right:120,width:60,height:60,background:t.secondary,border:`2px solid ${t.fg}`,boxShadow:pop(3),borderRadius:12,animation:"float2 4s ease-in-out infinite",zIndex:0}}/>
      <div style={{position:"absolute",bottom:100,right:80,width:40,height:40,borderRadius:"50%",background:t.quaternary,border:`2px solid ${t.fg}`,boxShadow:pop(2),animation:"float 5s ease-in-out 1s infinite",zIndex:0}}/>
      {/* Spinning asterisk */}
      <div style={{position:"absolute",top:40,right:300,fontSize:40,color:t.accent,animation:"spin-slow 10s linear infinite",zIndex:0,userSelect:"none",lineHeight:1}}>✦</div>

      {/* Content */}
      <div style={{position:"relative",zIndex:1,maxWidth:1100,margin:"0 auto",textAlign:"center"}}>
        {/* Eyebrow */}
        <div style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 16px",background:"#EDE9FE",border:`2px solid ${t.fg}`,borderRadius:9999,boxShadow:pop(2),marginBottom:32,animation:`popIn .4s ${BOUNCE} both`}}>
          <span style={{fontSize:12,fontWeight:700,color:t.accent,letterSpacing:"0.1em",textTransform:"uppercase"}}>✦ Now in public beta</span>
        </div>

        {/* Headline */}
        <h1 style={{fontFamily:"Outfit",fontSize:"clamp(40px,6vw,72px)",fontWeight:800,lineHeight:1.05,letterSpacing:"-0.03em",color:t.fg,marginBottom:24,animation:`fadeUp .5s ${BOUNCE} .1s both`}}>
          Give your vibe-coded app<br/>
          <span style={{color:t.accent}}>a real design</span>
          {" "}in one command
        </h1>

        {/* Subhead */}
        <p style={{fontSize:20,color:t.muted,maxWidth:600,margin:"0 auto 48px",lineHeight:1.6,animation:`fadeUp .5s ${BOUNCE} .2s both`}}>
          Drop a design skill into your project. Your AI agent reads it and builds
          everything — today and every new component after — in the same beautiful style.
        </p>

        {/* CTAs */}
        <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap",marginBottom:32,animation:`fadeUp .5s ${BOUNCE} .3s both`}}>
          <LiftButton variant="primary" size="lg" showArrow>Browse skills</LiftButton>
          <LiftButton variant="secondary" size="lg">See how it works</LiftButton>
        </div>

        {/* Command pill */}
        <div style={{display:"inline-flex",alignItems:"center",gap:12,padding:"12px 24px",background:t.fg,borderRadius:9999,border:`2px solid ${t.fg}`,boxShadow:`0 0 0 4px ${t.tertiary}`,animation:`fadeUp .5s ${BOUNCE} .4s both`}}>
          <span style={{fontSize:15,color:t.tertiary,fontFamily:"monospace",fontWeight:600,letterSpacing:"0.02em"}}>
            npx drip add retro-terminal
          </span>
        </div>
      </div>
    </section>
  );
}

// ── FEATURES ──────────────────────────────────────────────────────────────────
function Features() {
  const features = [
    { icon: Palette, title: "Complete design systems", desc: "Every skill ships with colors, typography, spacing, motion, and 15+ annotated components.", color: t.accent },
    { icon: Code,    title: "Agent-ready structure", desc: "Skills are structured for AI agents to read. The agent understands intent, not just code.", color: t.secondary },
    { icon: Zap,     title: "One command install",   desc: "npx drip add retro-terminal places the skill folder exactly where it needs to be.", color: t.tertiary },
    { icon: Shield,  title: "Persistent context",    desc: "The skill stays in your project. Every future component the agent builds follows the same style.", color: t.quaternary },
    { icon: BarChart, title: "Growing library",      desc: "New skills added regularly. Brutalist, Swiss Grid, Glassmorphism, Bento and more coming.", color: t.accent },
    { icon: Globe,   title: "Works everywhere",      desc: "Compatible with Lovable, Cursor, Claude Code, Bolt — wherever you build.", color: t.secondary },
  ];

  return (
    <section style={{position:"relative",overflow:"hidden",padding:"96px 48px",background:t.bg,borderTop:`2px solid ${t.fg}`}}>
      {/* Background dot pattern */}
      <div className="dots" style={{position:"absolute",inset:0,opacity:0.4,zIndex:0}}/>
      {/* Corner decoration */}
      <div style={{position:"absolute",bottom:-40,right:-40,width:200,height:200,borderRadius:"50%",border:`3px dashed ${t.accent}`,opacity:0.3,zIndex:0}}/>

      <div style={{position:"relative",zIndex:1,maxWidth:1100,margin:"0 auto"}}>
        {/* Section header */}
        <div style={{textAlign:"center",marginBottom:64}}>
          <div style={{fontSize:12,fontWeight:700,color:t.accent,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:12}}>
            What's inside
          </div>
          <h2 style={{fontFamily:"Outfit",fontSize:42,fontWeight:800,letterSpacing:"-0.02em",color:t.fg}}>
            Everything your agent needs to{" "}
            <span style={{color:t.secondary,position:"relative",display:"inline-block"}}>
              design beautifully
              <svg style={{position:"absolute",bottom:-6,left:0,width:"100%"}} viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M0,5 C50,0 100,10 150,5 S200,0 200,5" stroke={t.secondary} strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
        </div>

        {/* Feature grid — 3 columns */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
          {features.map((f,i)=>{
            const [hov, setHov] = useState(false);
            const [wiggling, setWiggling] = useState(false);
            return (
              <div key={i}
                onMouseEnter={()=>{setHov(true);setWiggling(true);}}
                onMouseLeave={()=>{setHov(false);setTimeout(()=>setWiggling(false),400);}}
                style={{
                  background:t.card, border:`2px solid ${t.fg}`,
                  borderRadius:16, padding:"28px",
                  boxShadow: hov ? pop(8) : pop(4),
                  transform: hov ? "translate(-2px,-2px) rotate(-0.5deg)" : "translate(0,0)",
                  transition:`transform 300ms ${BOUNCE}, box-shadow 300ms ${BOUNCE}`,
                  cursor:"default",
                }}>
                {/* Icon circle with wiggle */}
                <div style={{width:52,height:52,borderRadius:"50%",background:f.color,border:`2px solid ${t.fg}`,boxShadow:pop(2),display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20,
                  animation: wiggling ? `wiggle .4s ${BOUNCE}` : "none",
                }}>
                  <f.icon size={22} strokeWidth={2.5} color="#fff"/>
                </div>
                <h3 style={{fontFamily:"Outfit",fontSize:20,fontWeight:700,color:t.fg,marginBottom:10}}>{f.title}</h3>
                <p style={{fontSize:14,color:t.muted,lineHeight:1.6}}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── STATS ─────────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { value: "12", label: "Design skills", color: t.accent },
    { value: "15+", label: "Components per skill", color: t.secondary },
    { value: "1", label: "Command to install", color: t.tertiary },
    { value: "∞", label: "Consistent style", color: t.quaternary },
  ];
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",borderTop:`2px solid ${t.fg}`,borderBottom:`2px solid ${t.fg}`}}>
      {stats.map((s,i)=>(
        <div key={i} style={{padding:"40px 32px",textAlign:"center",borderRight:i<3?`2px solid ${t.fg}`:"none",background:t.bg}}>
          <div style={{fontFamily:"Outfit",fontSize:52,fontWeight:800,color:s.color,lineHeight:1,marginBottom:8,
            textShadow:`3px 3px 0px ${t.fg}`}}>{s.value}</div>
          <div style={{fontSize:13,color:t.muted,fontWeight:500}}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// ── PRICING ───────────────────────────────────────────────────────────────────
function Pricing() {
  const plans = [
    { name:"Free",    price:"$0",  period:"forever", desc:"Perfect for trying out Drip.", color:t.quaternary,
      features:["3 free skills","npx drip add","Community support","MIT license"] },
    { name:"Pro",     price:"$12", period:"per month", desc:"For serious builders.", color:t.accent, popular:true,
      features:["All 12+ skills","Priority updates","New skills first","Commercial license","Email support"] },
    { name:"Team",    price:"$39", period:"per month", desc:"For teams that ship together.", color:t.secondary,
      features:["Everything in Pro","5 team members","Shared skill config","Slack support","Custom skills (soon)"] },
  ];

  return (
    <section style={{position:"relative",overflow:"hidden",padding:"96px 48px",background:t.bg,borderTop:`2px solid ${t.fg}`}}>
      <div className="dots" style={{position:"absolute",inset:0,opacity:0.3,zIndex:0}}/>

      <div style={{position:"relative",zIndex:1,maxWidth:1000,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:64}}>
          <div style={{fontSize:12,fontWeight:700,color:t.secondary,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:12}}>Simple pricing</div>
          <h2 style={{fontFamily:"Outfit",fontSize:42,fontWeight:800,letterSpacing:"-0.02em",color:t.fg}}>Start free. Upgrade when ready.</h2>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24,alignItems:"center"}}>
          {plans.map((p,i)=>{
            const [hov,setHov]=useState(false);
            return (
              <div key={i} style={{position:"relative"}}>
                {/* MOST POPULAR badge — rotated on the featured card */}
                {p.popular && (
                  <div style={{position:"absolute",top:-20,left:"50%",transform:"translateX(-50%) rotate(-4deg)",zIndex:2,
                    display:"inline-flex",alignItems:"center",gap:6,padding:"8px 20px",
                    background:t.tertiary,border:`2px solid ${t.fg}`,borderRadius:9999,
                    boxShadow:pop(3),whiteSpace:"nowrap",
                    fontFamily:"Outfit",fontSize:12,fontWeight:800,color:t.fg,letterSpacing:"0.04em",
                  }}>
                    <Star size={12} strokeWidth={2.5} fill={t.fg}/> MOST POPULAR <Star size={12} strokeWidth={2.5} fill={t.fg}/>
                  </div>
                )}
                <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                  style={{
                    background:t.card, border:`2px solid ${t.fg}`,
                    borderRadius:16, padding:"32px 28px",
                    boxShadow: hov ? (p.popular ? `8px 8px 0px 0px ${t.secondary}` : pop(8)) : (p.popular ? `6px 6px 0px 0px ${t.secondary}` : pop(4)),
                    transform: p.popular ? (hov?"translate(-2px,-2px) scale(1.03)":"scale(1.03)") : (hov?"translate(-2px,-2px)":""),
                    transition:`transform 300ms ${BOUNCE}, box-shadow 300ms ${BOUNCE}`,
                    marginTop: p.popular ? 12 : 0,
                  }}>
                  {/* Plan color accent bar */}
                  <div style={{height:6,background:p.color,border:`2px solid ${t.fg}`,borderRadius:3,marginBottom:24,boxShadow:pop(1)}}/>
                  <div style={{fontFamily:"Outfit",fontSize:22,fontWeight:800,color:t.fg,marginBottom:4}}>{p.name}</div>
                  <div style={{fontSize:13,color:t.muted,marginBottom:24}}>{p.desc}</div>
                  <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:28}}>
                    <span style={{fontFamily:"Outfit",fontSize:48,fontWeight:800,color:t.fg,lineHeight:1}}>{p.price}</span>
                    <span style={{fontSize:14,color:t.muted}}>/{p.period}</span>
                  </div>
                  <LiftButton variant={p.popular?"primary":"secondary"} size="md">
                    {p.name==="Free"?"Start for free":"Choose "+p.name}
                  </LiftButton>
                  <div style={{marginTop:24,display:"flex",flexDirection:"column",gap:10}}>
                    {p.features.map(f=>(
                      <div key={f} style={{display:"flex",alignItems:"center",gap:10}}>
                        <div style={{width:20,height:20,borderRadius:"50%",background:p.color,border:`2px solid ${t.fg}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                          <Check size={10} strokeWidth={3} color="#fff"/>
                        </div>
                        <span style={{fontSize:14,color:t.fg}}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section style={{position:"relative",overflow:"hidden",padding:"80px 48px",background:t.accent,borderTop:`2px solid ${t.fg}`}}>
      {/* White floating shapes */}
      <div style={{position:"absolute",top:-30,right:80,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.1)",border:"2px solid rgba(255,255,255,0.2)",animation:"float 5s ease-in-out infinite"}}/>
      <div style={{position:"absolute",bottom:-20,left:60,width:80,height:80,background:"rgba(255,255,255,0.1)",border:"2px solid rgba(255,255,255,0.2)",borderRadius:12,animation:"float2 4s ease-in-out infinite"}}/>
      <div style={{position:"absolute",top:20,left:"40%",fontSize:48,color:"rgba(255,255,255,0.15)",animation:"spin-slow 15s linear infinite",userSelect:"none",lineHeight:1}}>✦</div>

      <div style={{position:"relative",zIndex:1,textAlign:"center",maxWidth:700,margin:"0 auto"}}>
        <h2 style={{fontFamily:"Outfit",fontSize:"clamp(32px,5vw,56px)",fontWeight:800,color:"#fff",letterSpacing:"-0.02em",lineHeight:1.1,marginBottom:20}}>
          Stop shipping generic.<br/>Start shipping beautiful.
        </h2>
        <p style={{fontSize:18,color:"rgba(255,255,255,0.8)",marginBottom:40,lineHeight:1.6}}>
          One command. Your entire project gets a real design.
        </p>
        <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
          <button style={{display:"inline-flex",alignItems:"center",gap:10,padding:"15px 32px",background:t.tertiary,color:t.fg,border:`2px solid ${t.fg}`,borderRadius:9999,fontSize:16,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif",boxShadow:`4px 4px 0px 0px ${t.fg}`,cursor:"pointer"}}
            onMouseEnter={e=>{e.currentTarget.style.transform="translate(-2px,-2px)";e.currentTarget.style.boxShadow=`6px 6px 0px 0px ${t.fg}`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=`4px 4px 0px 0px ${t.fg}`;}}
            style={{display:"inline-flex",alignItems:"center",gap:10,padding:"15px 32px",background:t.tertiary,color:t.fg,border:`2px solid ${t.fg}`,borderRadius:9999,fontSize:16,fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif",boxShadow:`4px 4px 0px 0px ${t.fg}`,cursor:"pointer",transition:`transform 200ms ${BOUNCE}, box-shadow 200ms ${BOUNCE}`}}>
            Browse skills free <ArrowRight size={16} strokeWidth={2.5}/>
          </button>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{padding:"40px 48px",borderTop:`2px solid ${t.fg}`,display:"flex",justifyContent:"space-between",alignItems:"center",background:t.bg,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:24,height:24,background:t.accent,border:`2px solid ${t.fg}`,boxShadow:pop(2),borderRadius:4}}/>
        <span style={{fontFamily:"Outfit",fontWeight:800,fontSize:16,color:t.fg}}>Drip</span>
      </div>
      <span style={{fontSize:13,color:t.muted}}>© 2024 Drip. Give your app the drip it deserves.</span>
      <div style={{display:"flex",gap:20}}>
        {["Skills","Docs","GitHub","Twitter"].map(l=>(
          <a key={l} href="#" style={{fontSize:13,color:t.muted,textDecoration:"none",fontWeight:500,transition:"color 150ms"}}
            onMouseEnter={e=>e.target.style.color=t.fg}
            onMouseLeave={e=>e.target.style.color=t.muted}>{l}</a>
        ))}
      </div>
    </footer>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function PlayfulLandingPage() {
  return (
    <>
      <style>{styles}</style>
      <div style={{minHeight:"100vh",background:t.bg}}>
        <Nav />
        <Hero />
        <Stats />
        <Features />
        <Pricing />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
