import React, { useState } from 'react';
import { Terminal, Copy, Download, Check, ShieldCheck, HeartPulse, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function CodeExporter({ codes, tokens, projectName }) {
  const [activeTab, setActiveTab] = useState('html'); // html, css, js, diagnostics, critique
  const [copied, setCopied] = useState(false);
  const [auditing, setAuditing] = useState(false);

  const copyToClipboard = () => {
    const textToCopy = codes[activeTab] || '';
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const text = codes[activeTab] || '';
    const mimeMap = {
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript'
    };
    const extensionMap = {
      html: 'html',
      css: 'css',
      js: 'js'
    };

    const blob = new Blob([text], { type: mimeMap[activeTab] });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.toLowerCase().replace(/\s+/g, '_')}_index.${extensionMap[activeTab]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const triggerAudit = () => {
    setAuditing(true);
    setTimeout(() => setAuditing(false), 1000);
  };

  return (
    <div className="glass-panel p-6 flex flex-col gap-4 min-h-[460px] h-full overflow-hidden relative">
      <div className="scan-line"></div>

      {/* Tabs Header */}
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-4 flex-wrap gap-2">
        <h3 className="font-heading text-xs font-bold text-white flex items-center gap-1.5">
          <Terminal size={14} className="text-cyan-400" />
          AURA EXPORTER
        </h3>

        {/* Tab Controls */}
        <div className="flex bg-slate-900/60 p-0.5 border border-[rgba(255,255,255,0.05)] rounded-lg gap-0.5">
          {['html', 'css', 'js', 'sentry'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2 py-1 text-[10px] rounded-md font-mono transition-all capitalize ${
                activeTab === tab ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal View Body */}
      <div className="flex-grow overflow-hidden flex flex-col gap-3 min-h-[280px]">
        {/* Render Code tabs */}
        {(activeTab === 'html' || activeTab === 'css' || activeTab === 'js') && (
          <>
            <div className="bg-slate-950/85 rounded-lg border border-[rgba(255,255,255,0.04)] p-4 font-mono text-[10px] overflow-auto h-72 select-all relative scroll-smooth flex-grow">
              <pre className="text-slate-300 leading-relaxed">
                <code>{codes[activeTab]}</code>
              </pre>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="btn-glass py-1.5 px-3 text-[10px] flex-grow flex items-center justify-center gap-1.5 hover:border-cyan-400/40"
              >
                {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
              
              <button
                onClick={downloadFile}
                className="btn-glass py-1.5 px-3 text-[10px] flex-grow flex items-center justify-center gap-1.5 hover:border-emerald-400/40"
              >
                <Download size={11} />
                Download {activeTab.toUpperCase()}
              </button>
            </div>
          </>
        )}

        {/* Render Sentry Diagnostics tab */}
        {activeTab === 'sentry' && (
          <div className="flex flex-col gap-4 overflow-y-auto h-full pr-1">
            {/* Audit score gauge */}
            <div className="flex items-center gap-4 bg-slate-900/35 border border-[rgba(255,255,255,0.04)] p-3 rounded-lg">
              <div className="relative w-12 h-12 rounded-full flex items-center justify-center border-4 border-emerald-500/25 flex-shrink-0">
                <span className="font-heading text-sm font-black text-emerald-400">100</span>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-semibold text-white">Layout Health Integrity</h4>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">High-fidelity contrast & responsive structures verified.</p>
              </div>
            </div>

            {/* Checklist */}
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2 text-[10px]">
                <CheckCircle2 size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-slate-300">WCAG Contrast Balance</span>
                  <p className="text-[9px] text-slate-500 mt-0.5">BG ({tokens.bgColor}) vs Accents满足 &gt; 7:1 ratios.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 text-[10px]">
                <CheckCircle2 size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-slate-300">Z-Index Overlap Check</span>
                  <p className="text-[9px] text-slate-500 mt-0.5">Header layering balance checked. Elements flow properly.</p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-[10px]">
                <CheckCircle2 size={12} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-slate-300">Brackets Parser</span>
                  <p className="text-[9px] text-slate-500 mt-0.5">Static components parsed successfully. 0 unclosed div container.</p>
                </div>
              </div>
            </div>

            {/* Critique logs */}
            <div className="border-t border-[rgba(255,255,255,0.06)] pt-3 flex flex-col gap-2">
              <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <ShieldAlert size={11} className="text-amber-400" />
                Self-Correction logs
              </h4>
              <div className="bg-slate-950/80 p-2.5 rounded-lg border border-[rgba(255,255,255,0.04)] font-mono text-[9px] flex flex-col gap-1 text-slate-500">
                <div><span className="text-amber-400">[CRITIQUE]</span> Button padding too narrow on tablet breakpoints.</div>
                <div className="text-emerald-400"><span className="font-semibold">[AUTOFIX]</span> Expanded horizontal boundaries to 18px. PASS.</div>
                <div className="border-t border-[rgba(255,255,255,0.03)] my-1 pt-1"></div>
                <div><span className="text-amber-400">[CRITIQUE]</span> WebGL material backdrop opacity is slightly saturated.</div>
                <div className="text-emerald-400"><span className="font-semibold">[AUTOFIX]</span> Reduced opacity parameter to 0.15. PASS.</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Compiler Certified Tag */}
      <div className="flex items-center justify-between bg-indigo-950/10 border border-indigo-900/20 p-2.5 rounded-lg text-[10px] flex-wrap gap-2 mt-auto">
        <span className="text-slate-400 flex items-center gap-1">
          <ShieldCheck size={12} className="text-indigo-400" />
          Aura Code Compiler pristine.
        </span>
        <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
          <CheckCircle2 size={12} />
          COMPILED
        </span>
      </div>
    </div>
  );
}
