import React, { useState } from 'react';
import { Layers, Command, Eye, Compass, Palette, ShieldAlert, Check, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const PRESETS = [
  {
    name: 'Obsidian Void',
    tokens: { bgColor: '#050508', accentPrimary: '#6366f1', accentSecondary: '#a855f7', fontHeading: 'Outfit', fontBody: 'Inter', geometryType: 'torus_knot' }
  },
  {
    name: 'Solaris Flare',
    tokens: { bgColor: '#0b0505', accentPrimary: '#f59e0b', accentSecondary: '#f43f5e', fontHeading: 'Space Grotesk', fontBody: 'Inter', geometryType: 'sphere' }
  },
  {
    name: 'Cyber Grid',
    tokens: { bgColor: '#050a0a', accentPrimary: '#06b6d4', accentSecondary: '#6366f1', fontHeading: 'Outfit', fontBody: 'Inter', geometryType: 'torus_knot' }
  },
  {
    name: 'Organic Wave',
    tokens: { bgColor: '#050a05', accentPrimary: '#10b981', accentSecondary: '#06b6d4', fontHeading: 'Syne', fontBody: 'Inter', geometryType: 'sphere' }
  }
];

export default function StyleCustomizer({ tokens, setTokens, onPresetSelect }) {
  const [hoveredLayer, setHoveredLayer] = useState(null);
  const [figmaExporting, setFigmaExporting] = useState(false);
  const [figmaLogs, setFigmaLogs] = useState([]);

  // Mock Figma handoff integration
  const triggerFigmaHandoff = () => {
    if (figmaExporting) return;
    setFigmaExporting(true);
    setFigmaLogs(['🔗 Handshaking with Figma API...']);
    
    const steps = [
      '⚡ Parsing HSL styling tokens...',
      '🎨 Exporting color vector styles...',
      '🏗️ Compiling responsive CSS bento grids...',
      '🚀 Uploading frame layouts to Figma document...',
      '✨ FIGMA EXPORT COMPLETE - Handed off successfully!'
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < steps.length) {
        setFigmaLogs(prev => [...prev, steps[current]]);
        current++;
      } else {
        clearInterval(interval);
        setFigmaExporting(false);
        confetti({
          particleCount: 50,
          spread: 80,
          colors: ['#f24e1e', '#a259ff', '#0acf83'] // Figma brand colors!
        });
      }
    }, 600);
  };

  const layers = [
    { id: 'nav', name: 'Navigation Bar', tag: 'Header', type: 'Nav' },
    { id: 'hero', name: 'Hero Main Panel', tag: 'Layout', type: 'Section' },
    { id: 'bento', name: 'Bento Features Grid', tag: 'Grids', type: 'Section' },
    { id: 'timeline', name: 'Chronology Timeline', tag: 'GSAP Motion', type: 'Section' },
    { id: 'footer', name: 'Footer Signature', tag: 'Metadata', type: 'Footer' }
  ];

  return (
    <div className="glass-panel p-6 flex flex-col gap-6 overflow-y-auto max-h-[85vh] relative">
      <div className="scan-line"></div>
      
      {/* Sidebar Header */}
      <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.06)] pb-4">
        <Layers size={18} className="text-indigo-400" />
        <div>
          <h3 className="font-heading text-sm font-bold text-white">Canvas Layers</h3>
          <p className="text-[10px] text-slate-500 font-mono">Figma Document structure</p>
        </div>
      </div>

      {/* 1. Layers Tree */}
      <div className="flex flex-col gap-2">
        {layers.map((layer) => {
          const isHovered = hoveredLayer === layer.id;
          return (
            <div
              key={layer.id}
              className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition-all duration-200 cursor-pointer ${
                isHovered ? 'border-indigo-500/35 bg-indigo-950/10 text-white' : 'border-[rgba(255,255,255,0.02)] hover:bg-slate-900/25 text-slate-400'
              }`}
              onMouseEnter={() => setHoveredLayer(layer.id)}
              onMouseLeave={() => setHoveredLayer(null)}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-slate-500">{layer.type}</span>
                <span className="font-medium text-slate-300">{layer.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950/40 border border-[rgba(255,255,255,0.04)] text-indigo-400 font-mono">
                  {layer.tag}
                </span>
                <Eye size={12} className="text-slate-500 hover:text-white transition-all" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Visual Style Presets (Moodboard) */}
      <div className="flex flex-col gap-3 border-t border-[rgba(255,255,255,0.06)] pt-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Palette size={13} className="text-purple-400" />
          Aether Visual Presets
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => onPresetSelect(preset.tokens)}
              className="btn-glass text-xs py-2 px-3 flex flex-col gap-1 items-start text-left hover:border-indigo-400/40 bg-slate-900/30"
            >
              <span className="font-semibold text-white">{preset.name}</span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.tokens.accentPrimary }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.tokens.accentSecondary }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Figma Design Handoff Exporter */}
      <div className="flex flex-col gap-3 border-t border-[rgba(255,255,255,0.06)] pt-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Command size={13} className="text-amber-400" />
          Design-Dev Handoff
        </h4>
        <button
          onClick={triggerFigmaHandoff}
          disabled={figmaExporting}
          className="btn-glass w-full text-xs py-2 px-3 border border-indigo-500/25 hover:border-indigo-500/60 bg-indigo-950/10 text-indigo-300 flex items-center justify-center gap-1.5"
        >
          {figmaExporting ? <RefreshCw size={12} className="animate-spin text-indigo-400" /> : '🔌'}
          {figmaExporting ? 'Sending to Figma...' : 'Send components to Figma'}
        </button>

        {figmaLogs.length > 0 && (
          <div className="bg-slate-950/90 rounded-md border border-[rgba(255,255,255,0.04)] p-3 font-mono text-[9px] h-28 overflow-y-auto flex flex-col gap-1 text-slate-400 select-all">
            {figmaLogs.map((log, idx) => (
              <div key={idx} className={log.includes('FIGMA EXPORT') ? 'text-emerald-400 font-semibold' : ''}>
                {log}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
