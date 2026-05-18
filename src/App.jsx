import React, { useState, useEffect } from 'react';
import { Sparkles, Play, Code, Shield, Laptop, GitPullRequest, Layers, Palette, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import StyleCustomizer from './components/StyleCustomizer';
import PreviewFrame from './components/PreviewFrame';
import CreatorTimeline from './components/CreatorTimeline';
import CodeExporter from './components/CodeExporter';
import { compileSite } from './utils/compiler';

export default function App() {
  // 1. Dashboard State Controllers
  const [prompt, setPrompt] = useState('Create an ultra-premium landing page with elegant glassmorphic panels, glowing orb backgrounds, and smooth GSAP entrance cards.');
  const [generating, setGenerating] = useState(false);
  const [activePage, setActivePage] = useState('index.html'); // index.html, about.html, features.html
  const [showTimeline, setShowTimeline] = useState(false); // Toggle compile timeline overlay
  
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
    projectName: 'AURA_FLOW',
    heroBadge: 'AURA DESIGN COMPILER V2.0',
    heroTitleBold: 'Generative',
    heroTitleGradient: ' User Interfaces',
    heroSubtitle: 'Design visually in standard Figma layers, compile production-ready HTML/Tailwind web code client-side, audited for supreme z-index balance.',
    ctaText: 'Launch Studio',
    feat1Title: 'Production-Ready Code',
    feat1Desc: 'Outputs highly structured, semantic HTML, custom CSS, and GSAP ScrollTrigger scripts completely free from framework lock-in.',
    feat2Title: 'WebGL backdrop mesh',
    feat2Desc: 'Procedural meshes float gracefully in the backdrop canvas, easing smoothly towards standard human mouse cursor movements.',
    feat3Title: 'Diagnostics Sentinel',
    feat3Desc: 'Continuous z-index balance and contrast diagnostics verify structural completeness automatically on compile phases.',
    feat4Title: 'Figma Layer Handsoff',
    feat4Desc: 'Seamlessly maps compiled visual blocks into structured, named Figma layers for visual designers.'
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

  // 2. Chip Preset selections
  const handleChipSelect = (styleType) => {
    let presetTokens = {};
    let customPrompt = '';

    if (styleType === 'minimalist') {
      presetTokens = { bgColor: '#060608', accentPrimary: '#f8fafc', accentSecondary: '#64748b', fontHeading: 'Outfit', fontBody: 'Inter', geometryType: 'none' };
      customPrompt = 'Create a highly minimalist visual landing page with clean layouts, white key typography, structural margins, and floating particle grid backdrop.';
    } else if (styleType === 'glassmorphism') {
      presetTokens = { bgColor: '#05050c', accentPrimary: '#a855f7', accentSecondary: '#6366f1', fontHeading: 'Syne', fontBody: 'Inter', geometryType: 'sphere' };
      customPrompt = 'Create an ultra-premium landing page with glassmorphic cards, glowing radial HSL background gradients, and smooth responsive grid containers.';
    } else if (styleType === 'cyberpunk') {
      presetTokens = { bgColor: '#020a0a', accentPrimary: '#06b6d4', accentSecondary: '#ec4899', fontHeading: 'Outfit', fontBody: 'Space Grotesk', geometryType: 'torus_knot' };
      customPrompt = 'Create a dark cyberpunk dashboard portfolio featuring neon cyan/magenta gradients, interactive 3D torus knot meshes, and responsive layouts.';
    } else if (styleType === 'organic') {
      presetTokens = { bgColor: '#040804', accentPrimary: '#10b981', accentSecondary: '#06b6d4', fontHeading: 'Syne', fontBody: 'Inter', geometryType: 'sphere' };
      customPrompt = 'Create a responsive eco-tech landing page with emerald teal palettes, interactive WebGL backdrop, and smooth scrollytelling timeline.';
    }

    setTokens(presetTokens);
    setPrompt(customPrompt);

    // Play quick visual cue
    confetti({
      particleCount: 30,
      spread: 60,
      colors: [presetTokens.accentPrimary, presetTokens.accentSecondary]
    });
  };

  // 3. Compile Swarm Trigger
  const handleCompile = () => {
    if (generating) return;
    setGenerating(true);
    setShowTimeline(true); // Force open Kimi timeline overlay
    
    setTimeout(() => {
      // Trigger final success state
      setGenerating(false);
      setShowTimeline(false); // Close timeline overlay and return to live canvas
      
      // Multi-directional premium confetti shower
      const end = Date.now() + (1.2 * 1000);
      const colors = [tokens.accentPrimary, tokens.accentSecondary, '#06b6d4'];

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 4,
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
    <div className="min-h-screen relative overflow-hidden font-body text-slate-300 flex flex-col h-screen">
      
      {/* 1. Backdrop Glow System */}
      <div className="cyber-bg">
        <div className="cyber-grid"></div>
        <div className="glow-orb orb-1" style={{ background: tokens.accentPrimary }}></div>
        <div className="glow-orb orb-2" style={{ background: tokens.accentSecondary }}></div>
        <div className="glow-orb orb-3" style={{ background: tokens.accentPrimary }}></div>
      </div>

      {/* 2. Top Header Navigation (Aura Visual Editor Toolbar) */}
      <header className="glass-panel mx-6 mt-4 px-6 py-3 flex items-center justify-between border border-[rgba(255,255,255,0.06)] backdrop-blur-md flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h1 className="font-heading text-sm font-black tracking-tight text-white flex items-center gap-1.5">
              AURA BUILD <span className="text-[9px] py-0.5 px-1.5 rounded bg-indigo-500/10 text-indigo-400 font-mono">WORKSPACE V2.0</span>
            </h1>
            <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">Design to Dev Handoff Engine</p>
          </div>
        </div>

        {/* Page selector tabs */}
        <div className="flex bg-slate-900/60 p-0.5 border border-[rgba(255,255,255,0.05)] rounded-lg gap-0.5">
          {['index.html', 'about.html', 'features.html'].map((page) => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className={`px-3 py-1 text-[10px] rounded-md font-mono transition-all ${
                activePage === page ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[10px] bg-slate-950/40 border border-[rgba(255,255,255,0.04)] px-2.5 py-1 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono text-slate-400">Linked to Github Repo</span>
          </div>

          <button className="btn-glass text-[10px] py-1 px-2.5 flex items-center gap-1.5 border border-indigo-500/25 hover:border-indigo-500/60 bg-indigo-950/10 text-indigo-300">
            <GitPullRequest size={11} />
            Commit: Main
          </button>
        </div>
      </header>

      {/* 3. Main Dashboard Workspace (Three-Column Layout) */}
      <main className="grid grid-cols-12 gap-6 p-6 max-w-[1600px] mx-auto items-start flex-grow overflow-hidden w-full h-[calc(100vh-170px)]">
        
        {/* COLUMN 1: Canvas Layers & Moodboards (col-span-3) */}
        <section className="col-span-12 lg:col-span-3 h-full overflow-y-auto">
          <StyleCustomizer
            tokens={tokens}
            setTokens={setTokens}
            onPresetSelect={(t) => setTokens(t)}
          />
        </section>

        {/* COLUMN 2: Sandbox Preview Canvas (col-span-6) */}
        <section className="col-span-12 lg:col-span-6 h-full flex flex-col gap-4 overflow-hidden relative justify-center">
          {showTimeline ? (
            <div className="glass-panel p-6 border border-[rgba(255,255,255,0.06)] h-[560px] relative overflow-hidden backdrop-blur-xl">
              <CreatorTimeline active={generating} onComplete={() => {}} category="aura-builder" />
            </div>
          ) : (
            <PreviewFrame htmlCode={codes.html} projectName={content.projectName} />
          )}
        </section>

        {/* COLUMN 3: Inspect Code & Diagnostics (col-span-3) */}
        <section className="col-span-12 lg:col-span-3 h-full overflow-y-auto">
          <CodeExporter 
            codes={codes} 
            tokens={tokens} 
            projectName={content.projectName} 
          />
        </section>

      </main>

      {/* 4. Bottom Cyber Prompt & Preset Chips Bar */}
      <footer className="glass-panel mx-6 mb-4 p-3 border border-[rgba(255,255,255,0.06)] bg-slate-950/65 backdrop-blur-xl relative flex-shrink-0">
        <div className="scan-line"></div>
        <div className="flex flex-col gap-2">
          
          {/* Preset mood chips */}
          <div className="flex items-center gap-2 flex-wrap text-[10px]">
            <span className="text-slate-500 font-semibold uppercase tracking-wider mr-1">Aura Styles:</span>
            <button
              onClick={() => handleChipSelect('minimalist')}
              className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-[rgba(255,255,255,0.05)] hover:border-slate-400 text-slate-300 font-medium transition-all"
            >
              ⬜ Minimalist White
            </button>
            <button
              onClick={() => handleChipSelect('glassmorphism')}
              className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-[rgba(255,255,255,0.05)] hover:border-purple-400 text-slate-300 font-medium transition-all"
            >
              🔮 Translucent Glass
            </button>
            <button
              onClick={() => handleChipSelect('cyberpunk')}
              className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-[rgba(255,255,255,0.05)] hover:border-cyan-400 text-slate-300 font-medium transition-all"
            >
              ⚡ Cyberpunk Neon
            </button>
            <button
              onClick={() => handleChipSelect('organic')}
              className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-[rgba(255,255,255,0.05)] hover:border-emerald-400 text-slate-300 font-medium transition-all"
            >
              🍃 Organic Wave
            </button>
          </div>

          {/* Glowing prompt input center */}
          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
            <div className="relative flex-grow">
              <textarea
                rows={1}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Instruct the Aura generator to construct visual grids, layouts, or modify specific layers..."
                className="w-full glass-input pr-10 py-3 text-xs leading-relaxed resize-none focus:border-indigo-400"
                style={{ minHeight: '38px' }}
              />
              <Sparkles size={13} className="absolute right-3.5 top-3 text-indigo-400 animate-pulse" />
            </div>

            {/* Glowing swarm button */}
            <button
              onClick={handleCompile}
              disabled={generating}
              className="btn-neon w-full sm:w-auto h-9 flex items-center justify-center gap-2 px-5 text-xs flex-shrink-0"
            >
              {generating ? (
                <>
                  <RefreshCw size={13} className="animate-spin text-white" />
                  Generating UI...
                </>
              ) : (
                <>
                  <Play size={13} className="fill-white stroke-none" />
                  Generate UI
                </>
              )}
            </button>
          </div>
          
        </div>
      </footer>

    </div>
  );
}
