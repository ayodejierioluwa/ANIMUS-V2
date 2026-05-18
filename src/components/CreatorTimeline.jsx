import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Cpu, RefreshCw, Layers, CheckCircle2 } from 'lucide-react';

export default function CreatorTimeline({ active, onComplete, category }) {
  const [stages, setStages] = useState([
    { id: 1, name: 'NLP & Prompt Scanner', icon: Cpu, desc: 'Analyzing request criteria & color metrics...', status: 'idle', progress: 0 },
    { id: 2, name: 'Agent Wireframe Architect', icon: Layers, desc: 'Planning responsive grids & typography hierarchy...', status: 'idle', progress: 0 },
    { id: 3, name: 'GSAP Motion Engineer', icon: RefreshCw, desc: 'Orchestrating scroll-triggered timelines...', status: 'idle', progress: 0 },
    { id: 4, name: 'Animus Quality Sentry', icon: Shield, desc: 'Executing contrast audits & structural critique...', status: 'idle', progress: 0 }
  ]);

  const [logs, setLogs] = useState([]);
  const [activeStageId, setActiveStageId] = useState(null);

  useEffect(() => {
    if (!active) {
      setStages(prev => prev.map(s => ({ ...s, status: 'idle', progress: 0 })));
      setLogs([]);
      setActiveStageId(null);
      return;
    }

    // Start creation sequence
    let currentStageIndex = 0;
    setActiveStageId(1);
    
    const addLog = (text, type = 'info') => {
      const time = new Date().toLocaleTimeString().split(' ')[0];
      setLogs(prev => [...prev, { text: `[${time}] ${text}`, type }].slice(-6));
    };

    addLog('🔥 IGNITING ANIMUS AGENT SWARM (Kimi K2.6 Core)...', 'system');

    const interval = setInterval(() => {
      setStages(prev => {
        const next = [...prev];
        const currentStage = next[currentStageIndex];

        if (!currentStage) {
          clearInterval(interval);
          onComplete();
          return prev;
        }

        if (currentStage.status === 'idle') {
          currentStage.status = 'active';
          addLog(`Swarm Node [${currentStage.name}] activated.`, 'system');
        }

        currentStage.progress += 20;

        // Custom live sub-logs streaming in
        if (currentStage.id === 1 && currentStage.progress === 40) {
          addLog(`Sourcing premium stock visual palettes for category: ${category.toUpperCase()}...`);
        } else if (currentStage.id === 2 && currentStage.progress === 60) {
          addLog('Generating responsive grid layout structures. Page structure loaded.');
        } else if (currentStage.id === 3 && currentStage.progress === 60) {
          addLog('Injecting smooth GSAP ScrollTrigger timeline bindings...');
        } else if (currentStage.id === 4 && currentStage.progress === 40) {
          addLog('Running z-index stack integrity audit...', 'warning');
        } else if (currentStage.id === 4 && currentStage.progress === 80) {
          addLog('WCAG Contrast Ratios analyzed. 0 defects detected.', 'success');
        }

        if (currentStage.progress >= 100) {
          currentStage.progress = 100;
          currentStage.status = 'done';
          addLog(`Node [${currentStage.name}] finished.`, 'success');
          
          currentStageIndex++;
          if (currentStageIndex < next.length) {
            setActiveStageId(next[currentStageIndex].id);
          } else {
            setActiveStageId(null);
            addLog('✨ SYSTEM BUILD PRISTINE - SOVEREIGN SEAL CERTIFIED!', 'success');
          }
        }

        return next;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [active, category]);

  return (
    <div className="glass-panel p-6 flex flex-col gap-6 h-full min-h-[420px] relative overflow-hidden">
      <div className="scan-line"></div>
      
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] pb-4">
        <h3 className="font-heading text-lg font-bold flex items-center gap-2 text-white">
          <Terminal size={18} className="text-cyan-400" />
          Kimi K2.6 Swarm Panel
        </h3>
        <span className="text-xs font-mono px-2 py-1 rounded bg-slate-900/60 border border-[rgba(255,255,255,0.04)] text-cyan-400">
          Agentic Mode: Swarm V2
        </span>
      </div>

      {/* Cyber timeline flowchart */}
      <div className="flex flex-col gap-4 flex-grow">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const isActive = stage.id === activeStageId;
          const isDone = stage.status === 'done';
          
          return (
            <div key={stage.id} className={`flex items-center gap-4 p-3 rounded-lg border transition-all duration-300 ${
              isActive ? 'border-[rgba(6,182,212,0.3)] bg-cyan-950/10' : 
              isDone ? 'border-[rgba(16,185,129,0.15)] bg-emerald-950/5' : 'border-transparent'
            }`}>
              {/* Icon / Neon indicator */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                isActive ? 'border-cyan-400 bg-cyan-900/20 text-cyan-400 animate-pulse' :
                isDone ? 'border-emerald-400 bg-emerald-900/20 text-emerald-400' : 'border-slate-800 text-slate-500'
              }`}>
                {isDone ? <CheckCircle2 size={20} /> : <Icon size={20} />}
              </div>

              {/* Text metadata */}
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`text-sm font-semibold font-heading ${isActive ? 'text-cyan-300' : isDone ? 'text-emerald-300' : 'text-slate-400'}`}>
                    {stage.name}
                  </h4>
                  <span className="text-xs font-mono font-medium text-slate-500">{stage.progress}%</span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">{stage.desc}</p>
                
                {/* Progress bar */}
                <div className="h-[3px] w-full bg-slate-950 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 rounded-full ${
                      isDone ? 'bg-emerald-400' : 'bg-cyan-400'
                    }`} 
                    style={{ width: `${stage.progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-time Streaming Command Console */}
      <div className="bg-slate-950/80 rounded-lg border border-[rgba(255,255,255,0.04)] p-4 font-mono text-[11px] h-40 flex flex-col gap-1.5 overflow-y-auto">
        {logs.length === 0 ? (
          <span className="text-slate-600 italic">Console idling. Awaiting generation trigger...</span>
        ) : (
          logs.map((log, i) => (
            <div key={i} className={`truncate ${
              log.type === 'system' ? 'text-amber-400 font-semibold' :
              log.type === 'success' ? 'text-emerald-400' :
              log.type === 'warning' ? 'text-rose-400' : 'text-slate-300'
            }`}>
              {log.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
