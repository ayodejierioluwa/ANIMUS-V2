import React, { useState, useEffect } from 'react';
import { Play, Sparkles, Code, Shield, HelpCircle, GitPullRequest, Laptop, FileCode, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import StyleCustomizer from './components/StyleCustomizer';
import PreviewFrame from './components/PreviewFrame';
import CreatorTimeline from './components/CreatorTimeline';
import CodeExporter from './components/CodeExporter';
import SentryAudit from './components/SentryAudit';
import { compileSite } from './utils/compiler';

export default function App() {
  // 1. App State Controllers
  const [prompt, setPrompt] = useState('Create a premium dark-mode portfolio for an AI Research Agency with floating torus mesh and custom cyber-grid background.');
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('canvas'); // canvas, timeline, sentry
  
  // Custom design styling tokens state
  const [tokens, setTokens] = useState({
    bgColor: '#050508',
    accentPrimary: '#6366f1',
    accentSecondary: '#a855f7',
    fontHeading: 'Outfit',
    fontBody: 'Inter',
    geometryType: 'torus_knot'
  });

  // Custom text content layout state
  const [content, setContent] = useState({
    projectName: 'NEURAL_FLOW',
    heroBadge: 'Swarm Compile V2.0',
    heroTitleBold: 'Decentralized',
    heroTitleGradient: ' Agent Swarms',
    heroSubtitle: 'Orchestrating a billion instructions per second, compiled client-side in the WebGL sandbox and audited for supreme WCAG precision.',
    ctaText: 'Deploy Swarm',
    feat1Title: 'GSAP Scrollytelling',
    feat1Desc: 'Seamless entrance animations bound directly to hardware scroll triggers for premium user interaction.',
    feat2Title: 'WebGL Torus Canvas',
    feat2Desc: 'Procedural meshes floating in the context background, reacting dynamically to standard human pointer mouse gestures.',
    feat3Title: 'Sentry Design Audits',
    feat3Desc: 'Continuous layout health diagnostic checklists checking structural div balances and WCAG compliance.',
    feat4Title: 'One-Click Exporters',
    feat4Desc: 'Seamlessly export fully optimized static bundles, download files individually, or trigger a local SQLite push.'
  });

  // Compiled Code Cache
  const [codes, setCodes] = useState({ html: '', css: '', js: '' });

  // Initial compilation on mount
  useEffect(() => {
    const result = compileSite(tokens, content);
    setCodes(result);
  }, []);

  // Update compiled codes whenever tokens or content edits occur
  useEffect(() => {
    if (!generating) {
      const result = compileSite(tokens, content);
      setCodes(result);
    }
  }, [tokens, content, generating]);

  // 2. Preset Select Trigger
  const handlePresetSelect = (presetTokens) => {
    setTokens(presetTokens);
    // Adjust brand name based on preset
    const nameMap = {
      '#6366f1': 'NEURAL_FLOW',
      '#f59e0b': 'SOLARIS_GEN',
      '#06b6d4': 'CYBER_GRID',
      '#10b981': 'ORGANIC_WAVE'
    };
    const newName = nameMap[presetTokens.accentPrimary] || 'AETHER_FLOW';
    setContent(prev => ({ ...prev, projectName: newName }));
    
    // Play quick visual highlight
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: [presetTokens.accentPrimary, presetTokens.accentSecondary]
    });
  };

  // 3. Compile & Swarm Trigger
  const handleCompile = () => {
    if (generating) return;
    setGenerating(true);
    setActiveTab('timeline'); // Force open Kimi swarm timeline to see it live!
    
    // Visual scan effect in logs
    setTimeout(() => {
      // Trigger final success state
      setGenerating(false);
      setActiveTab('canvas'); // Re-open live canvas
      
      // Multi-directional premium confetti shower
      const end = Date.now() + (1 * 1000);
      const colors = [tokens.accentPrimary, tokens.accentSecondary, '#06b6d4'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }, 4500); // Sequence completes in 4.5s
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-body text-slate-300">
      
      {/* 1. Backdrop Glow System */}
      <div className="cyber-bg">
        <div className="cyber-grid"></div>
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </div>

      {/* 2. Top Header Navigation */}
      <header className="glass-panel mx-6 mt-6 px-6 py-4 flex items-center justify-between border border-[rgba(255,255,255,0.06)] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h1 className="font-heading text-lg font-black tracking-tight text-white flex items-center gap-1.5">
              ANIMUS ENGINE <span className="text-xs py-0.5 px-1.5 rounded bg-indigo-500/10 text-indigo-400 font-mono">V2.0</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-medium font-mono uppercase tracking-wider">Kimi K2.6 Swarm Intelligence</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs bg-slate-950/40 border border-[rgba(255,255,255,0.04)] px-3 py-1.5 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-slate-400">Local DB Memory Active</span>
          </div>

          <button className="btn-glass text-xs py-1.5 px-3 flex items-center gap-1.5 border border-indigo-500/25 hover:border-indigo-500/60 bg-indigo-950/10 text-indigo-300">
            <GitPullRequest size={13} />
            Git status: ready
          </button>
        </div>
      </header>

      {/* 3. Main Dashboard Grid */}
      <main className="grid grid-cols-12 gap-6 p-6 max-w-[1600px] mx-auto items-start">
        
        {/* LEFT COLUMN: Customizable controller hub */}
        <section className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <StyleCustomizer
            tokens={tokens}
            setTokens={setTokens}
            content={content}
            setContent={setContent}
            onPresetSelect={handlePresetSelect}
          />
        </section>

        {/* RIGHT COLUMN: Interactive Renderer, Timelines, Auditing, and Code */}
        <section className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          
          {/* Main Renderer Canvas with Tabs */}
          <div className="glass-panel p-4 flex flex-col gap-4 border border-[rgba(255,255,255,0.06)] bg-slate-950/20 backdrop-blur-md">
            
            {/* View Mode Tabs */}
            <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-3 flex-wrap gap-2">
              <div className="flex bg-slate-900/60 p-1 border border-[rgba(255,255,255,0.05)] rounded-lg gap-1">
                <button
                  onClick={() => setActiveTab('canvas')}
                  className={`px-3 py-1.5 text-xs rounded-md font-heading font-medium flex items-center gap-1.5 transition-all ${
                    activeTab === 'canvas' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Laptop size={14} />
                  Live Preview Canvas
                </button>
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`px-3 py-1.5 text-xs rounded-md font-heading font-medium flex items-center gap-1.5 transition-all ${
                    activeTab === 'timeline' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Code size={14} />
                  Agent Swarm Timeline
                </button>
                <button
                  onClick={() => setActiveTab('sentry')}
                  className={`px-3 py-1.5 text-xs rounded-md font-heading font-medium flex items-center gap-1.5 transition-all ${
                    activeTab === 'sentry' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Shield size={14} />
                  Animus Sentry Diagnostics
                </button>
              </div>

              {/* Glowing audit seal badge */}
              <div className="flex items-center gap-2 bg-emerald-950/10 border border-emerald-900/20 px-3 py-1.5 rounded-lg text-emerald-400 font-mono text-[10px] font-semibold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                AUDIT CERTIFIED
              </div>
            </div>

            {/* Render Active View Tab */}
            <div className="min-h-[460px]">
              {activeTab === 'canvas' && (
                <PreviewFrame htmlCode={codes.html} projectName={content.projectName} />
              )}
              {activeTab === 'timeline' && (
                <CreatorTimeline active={generating} onComplete={() => {}} category="tech" />
              )}
              {activeTab === 'sentry' && (
                <SentryAudit tokens={tokens} />
              )}
            </div>

          </div>

          {/* Bottom Side-by-Side Code Terminal Panel */}
          <CodeExporter codes={codes} projectName={content.projectName} />

        </section>

      </main>

      {/* 4. Bottom Cyber Prompt Console Bar */}
      <footer className="glass-panel mx-6 mb-6 p-4 border border-[rgba(255,255,255,0.06)] bg-slate-950/65 backdrop-blur-xl relative">
        <div className="scan-line"></div>
        <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
          {/* Glowing prompt input center */}
          <div className="relative flex-grow">
            <textarea
              rows={1}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Inject design instructions into the Kimi agent swarm..."
              className="w-full glass-input pr-10 py-3.5 text-xs leading-relaxed resize-none focus:border-indigo-400"
              style={{ minHeight: '44px' }}
            />
            <Sparkles size={14} className="absolute right-3.5 top-3.5 text-indigo-400 animate-pulse" />
          </div>

          {/* Glowing swarm button */}
          <button
            onClick={handleCompile}
            disabled={generating}
            className="btn-neon w-full sm:w-auto h-11 flex items-center justify-center gap-2 px-6 text-sm flex-shrink-0"
          >
            {generating ? (
              <>
                <RefreshCw size={15} className="animate-spin text-white" />
                Swarm Generating...
              </>
            ) : (
              <>
                <Play size={15} className="fill-white stroke-none" />
                Compile Swarm Nodes
              </>
            )}
          </button>
        </div>
      </footer>

    </div>
  );
}
