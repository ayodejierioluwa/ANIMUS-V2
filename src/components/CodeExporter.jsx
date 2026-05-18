import React, { useState } from 'react';
import { Terminal, Copy, Download, Check, FileCode, CheckCircle2 } from 'lucide-react';

export default function CodeExporter({ codes, projectName }) {
  const [activeTab, setActiveTab] = useState('html'); // html, css, js
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const textToCopy = codes[activeTab];
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const text = codes[activeTab];
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

  return (
    <div className="glass-panel p-6 flex flex-col gap-4 min-h-[300px]">
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-4 flex-wrap gap-3">
        <h3 className="font-heading text-lg font-bold flex items-center gap-2 text-white">
          <Terminal size={18} className="text-cyan-400" />
          Code Terminal Export
        </h3>

        {/* Code tabs */}
        <div className="flex bg-slate-900/60 p-1 border border-[rgba(255,255,255,0.05)] rounded-lg gap-1">
          {['html', 'css', 'js'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 text-xs rounded-md font-mono transition-all capitalize ${
                activeTab === tab ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Action icons */}
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="btn-glass py-1.5 px-3 text-xs flex items-center gap-1.5 hover:border-cyan-400/40"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          
          <button
            onClick={downloadFile}
            className="btn-glass py-1.5 px-3 text-xs flex items-center gap-1.5 hover:border-emerald-400/40"
          >
            <Download size={13} />
            Download {activeTab.toUpperCase()}
          </button>
        </div>
      </div>

      {/* Code terminal pane */}
      <div className="bg-slate-950/85 rounded-lg border border-[rgba(255,255,255,0.04)] p-4 font-mono text-xs overflow-auto h-72 max-h-[500px] select-all relative scroll-smooth">
        <pre className="text-slate-300 text-[11px] leading-relaxed">
          <code>{codes[activeTab]}</code>
        </pre>
      </div>

      {/* Compiler Metadata Panel */}
      <div className="flex items-center justify-between bg-indigo-950/10 border border-indigo-900/20 p-3 rounded-lg flex-wrap gap-2 text-xs">
        <span className="text-slate-400 flex items-center gap-1.5">
          <FileCode size={14} className="text-indigo-400" />
          Static Code Bundle ready for deployment.
        </span>
        <span className="text-emerald-400 flex items-center gap-1.5 font-semibold font-mono">
          <CheckCircle2 size={14} />
          COMPILATION SUCCESSFUL
        </span>
      </div>
    </div>
  );
}
