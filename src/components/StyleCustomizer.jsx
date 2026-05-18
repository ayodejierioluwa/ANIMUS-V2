import React from 'react';
import { Sliders, Paintbrush, Type, Globe, Compass } from 'lucide-react';

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

export default function StyleCustomizer({ tokens, setTokens, content, setContent, onPresetSelect }) {
  const handleTokenChange = (key, value) => {
    setTokens(prev => ({ ...prev, [key]: value }));
  };

  const handleContentChange = (key, value) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="glass-panel p-6 flex flex-col gap-6 overflow-y-auto max-h-[80vh]">
      <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.06)] pb-4">
        <Sliders size={18} className="text-purple-400" />
        <h3 className="font-heading text-lg font-bold text-white">Style & Content Hub</h3>
      </div>

      {/* 1. Curated Quick Presets */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Paintbrush size={13} className="text-indigo-400" />
          Vibe Presets
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

      {/* 2. Brand Identity Inputs */}
      <div className="flex flex-col gap-4 border-t border-[rgba(255,255,255,0.06)] pt-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Globe size={13} className="text-cyan-400" />
          Brand Details
        </h4>
        
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-400 font-medium">Brand Signature Name</label>
          <input
            type="text"
            className="glass-input text-xs"
            value={content.projectName || ''}
            onChange={(e) => handleContentChange('projectName', e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-400 font-medium">Hero Top Badge</label>
          <input
            type="text"
            className="glass-input text-xs"
            value={content.heroBadge || ''}
            onChange={(e) => handleContentChange('heroBadge', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-medium">Hero Bold Header</label>
            <input
              type="text"
              className="glass-input text-xs"
              value={content.heroTitleBold || ''}
              onChange={(e) => handleContentChange('heroTitleBold', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-medium">Hero Gradient Title</label>
            <input
              type="text"
              className="glass-input text-xs"
              value={content.heroTitleGradient || ''}
              onChange={(e) => handleContentChange('heroTitleGradient', e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-400 font-medium">Hero Subtitle copy</label>
          <textarea
            rows={2}
            className="glass-input text-xs resize-none"
            value={content.heroSubtitle || ''}
            onChange={(e) => handleContentChange('heroSubtitle', e.target.value)}
          />
        </div>
      </div>

      {/* 3. Style Tokens Customizer */}
      <div className="flex flex-col gap-4 border-t border-[rgba(255,255,255,0.06)] pt-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Paintbrush size={13} className="text-purple-400" />
          Aether Styling Tokens
        </h4>

        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-500 font-medium truncate">Bg Color</label>
            <div className="flex gap-1.5 items-center bg-slate-950/40 p-1 border border-[rgba(255,255,255,0.05)] rounded-md">
              <input
                type="color"
                className="w-5 h-5 rounded border-0 bg-transparent cursor-pointer"
                value={tokens.bgColor}
                onChange={(e) => handleTokenChange('bgColor', e.target.value)}
              />
              <span className="text-[10px] font-mono font-medium text-slate-400">{tokens.bgColor.slice(1,5)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-500 font-medium truncate">Accent Primary</label>
            <div className="flex gap-1.5 items-center bg-slate-950/40 p-1 border border-[rgba(255,255,255,0.05)] rounded-md">
              <input
                type="color"
                className="w-5 h-5 rounded border-0 bg-transparent cursor-pointer"
                value={tokens.accentPrimary}
                onChange={(e) => handleTokenChange('accentPrimary', e.target.value)}
              />
              <span className="text-[10px] font-mono font-medium text-slate-400">{tokens.accentPrimary.slice(1,5)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] text-slate-500 font-medium truncate">Accent Secondary</label>
            <div className="flex gap-1.5 items-center bg-slate-950/40 p-1 border border-[rgba(255,255,255,0.05)] rounded-md">
              <input
                type="color"
                className="w-5 h-5 rounded border-0 bg-transparent cursor-pointer"
                value={tokens.accentSecondary}
                onChange={(e) => handleTokenChange('accentSecondary', e.target.value)}
              />
              <span className="text-[10px] font-mono font-medium text-slate-400">{tokens.accentSecondary.slice(1,5)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Geometry & Typography controls */}
      <div className="flex flex-col gap-4 border-t border-[rgba(255,255,255,0.06)] pt-4">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Compass size={13} className="text-amber-400" />
          WebGL & Typography
        </h4>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-slate-400 font-medium">3D Geometry Focus</label>
          <select
            className="glass-input text-xs bg-slate-950"
            value={tokens.geometryType}
            onChange={(e) => handleTokenChange('geometryType', e.target.value)}
          >
            <option value="torus_knot">WebGL Torus Knot Wireframe</option>
            <option value="sphere">WebGL Interactive Sphere</option>
            <option value="none">Particles Grid Background Only</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Type size={12} className="text-slate-400" />
              Heading Font
            </label>
            <select
              className="glass-input text-xs bg-slate-950"
              value={tokens.fontHeading}
              onChange={(e) => handleTokenChange('fontHeading', e.target.value)}
            >
              <option value="Outfit">Outfit</option>
              <option value="Space Grotesk">Space Grotesk</option>
              <option value="Syne">Syne</option>
              <option value="Inter">Inter</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Type size={12} className="text-slate-400" />
              Body Font
            </label>
            <select
              className="glass-input text-xs bg-slate-950"
              value={tokens.fontBody}
              onChange={(e) => handleTokenChange('fontBody', e.target.value)}
            >
              <option value="Inter">Inter</option>
              <option value="Outfit">Outfit</option>
              <option value="Space Grotesk">Space Grotesk</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
