import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, ExternalLink, RefreshCw } from 'lucide-react';

export default function PreviewFrame({ htmlCode, projectName }) {
  const [deviceMode, setDeviceMode] = useState('desktop'); // desktop, tablet, mobile
  const [key, setKey] = useState(0); // Trigger iframe reload

  const refreshIframe = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Viewport Control Bar */}
      <div className="glass-panel px-6 py-3 flex items-center justify-between border border-[rgba(255,255,255,0.06)] bg-slate-950/40">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="font-heading text-sm font-semibold text-white">Live Canvas Render</span>
        </div>

        {/* Viewport toggles */}
        <div className="flex bg-slate-900/60 p-1 border border-[rgba(255,255,255,0.05)] rounded-lg gap-1">
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`p-1.5 rounded-md text-slate-400 hover:text-white transition-all ${deviceMode === 'desktop' ? 'bg-indigo-600 text-white' : ''}`}
            title="Desktop Mode"
          >
            <Monitor size={16} />
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            className={`p-1.5 rounded-md text-slate-400 hover:text-white transition-all ${deviceMode === 'tablet' ? 'bg-indigo-600 text-white' : ''}`}
            title="Tablet Mode"
          >
            <Tablet size={16} />
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`p-1.5 rounded-md text-slate-400 hover:text-white transition-all ${deviceMode === 'mobile' ? 'bg-indigo-600 text-white' : ''}`}
            title="Mobile Mode"
          >
            <Smartphone size={16} />
          </button>
        </div>

        {/* Action icons */}
        <div className="flex gap-2">
          <button
            onClick={refreshIframe}
            className="p-2 rounded hover:bg-white/5 border border-transparent hover:border-slate-800 text-slate-400 hover:text-white transition-all"
            title="Reload Preview"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Device Frame */}
      <div className={`device-frame ${deviceMode} overflow-hidden shadow-2xl relative`}>
        {/* Top Simulated Web Header */}
        <div className="device-header">
          <div className="device-dot red"></div>
          <div className="device-dot yellow"></div>
          <div className="device-dot green"></div>
          <div className="device-address">
            http://animus-engine-v2.local/{projectName.toLowerCase().replace(/\s+/g, '-')}/
          </div>
        </div>

        {/* Live IFrame sandbox */}
        <iframe
          key={key}
          title="Animus Site Preview"
          srcDoc={htmlCode}
          sandbox="allow-scripts"
          className="w-full h-full border-0 bg-[#050508]"
          style={{ height: 'calc(100% - 36px)' }}
        />
      </div>
    </div>
  );
}
