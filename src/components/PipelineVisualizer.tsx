import React, { useState } from 'react';
import { PIPELINE_STAGES } from '../data/initialData';
import { PipelineStage } from '../types';
import { Layers, ArrowRight, Play, CheckCircle2, Cpu, Code2, Database, Search, Sparkles } from 'lucide-react';

export const PipelineVisualizer: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<PipelineStage>(PIPELINE_STAGES[0]);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = () => {
    setIsSimulating(true);
    setActiveStepIndex(0);
    setSelectedStage(PIPELINE_STAGES[0]);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < PIPELINE_STAGES.length) {
        setActiveStepIndex(step);
        setSelectedStage(PIPELINE_STAGES[step]);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 1200);
  };

  const getStageIcon = (id: number) => {
    switch (id) {
      case 1:
        return <Layers className="w-4 h-4" />;
      case 2:
        return <Code2 className="w-4 h-4" />;
      case 3:
        return <Cpu className="w-4 h-4" />;
      case 4:
        return <Database className="w-4 h-4" />;
      case 5:
        return <Search className="w-4 h-4" />;
      case 6:
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="text-xs font-semibold text-indigo-400 tracking-wider uppercase mb-1">
              DocuMind System Architecture
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Interactive RAG Pipeline Visualizer
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Inspect how external PDFs are ingested, indexed, and retrieved to ground Google Gemini in verified factual evidence.
            </p>
          </div>

          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-xl transition-all shadow-md shadow-indigo-600/20 whitespace-nowrap self-start md:self-auto"
          >
            <Play className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Simulating Pipeline...' : 'Run Live Flow Simulation'}</span>
          </button>
        </div>

        {/* Pipeline Horizontal Stepper Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PIPELINE_STAGES.map((stage, idx) => {
            const isCurrent = selectedStage.id === stage.id;
            const isStepActive = activeStepIndex === idx;

            return (
              <div
                key={stage.id}
                onClick={() => {
                  setSelectedStage(stage);
                  setActiveStepIndex(idx);
                }}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all relative ${
                  isCurrent
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-md ring-1 ring-indigo-500/30'
                    : 'bg-slate-900/50 hover:bg-slate-900 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Active Simulation Indicator */}
                {isStepActive && isSimulating && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                  </span>
                )}

                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-mono text-[11px] font-semibold text-slate-300">
                    Step {stage.id}
                  </span>
                  <span className="text-[10px] text-indigo-400 font-mono">
                    {stage.phase}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1.5 rounded-lg ${
                    isCurrent ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {getStageIcon(stage.id)}
                  </div>
                  <h3 className="text-xs font-semibold text-white leading-tight line-clamp-2">
                    {stage.name}
                  </h3>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  {stage.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Detail Panel */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                {getStageIcon(selectedStage.id)}
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-slate-400">Step {selectedStage.id} of 6</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-indigo-400 font-medium">{selectedStage.phase}</span>
                </div>
                <h2 className="text-lg font-bold text-white mt-0.5">
                  {selectedStage.name}
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {selectedStage.keyConcepts.map((concept, i) => (
                <span
                  key={i}
                  className="text-xs text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700/60 font-mono"
                >
                  {concept}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {selectedStage.description}
          </p>

          {/* Data Transformation Pipeline Flow */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Incoming Data Interface
              </div>
              <div className="text-xs font-mono text-indigo-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                {selectedStage.incomingData}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Outgoing Data Interface
              </div>
              <div className="text-xs font-mono text-emerald-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                {selectedStage.outgoingData}
              </div>
            </div>
          </div>

          {/* Sample Payload Inspector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-slate-300">
                Live Payload Inspection
              </span>
              <span className="font-mono text-[11px]">Transformation Example</span>
            </div>

            <div className="bg-slate-950 rounded-xl border border-slate-800/90 p-4 font-mono text-xs space-y-3">
              <div>
                <span className="text-slate-400 block mb-1"># 1. INPUT PAYLOAD:</span>
                <span className="text-slate-200 bg-slate-900/80 px-2 py-1 rounded block overflow-x-auto">
                  {selectedStage.samplePayload.input}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1"># 2. TRANSFORMATION LOGIC:</span>
                <span className="text-indigo-400 bg-indigo-950/30 px-2 py-1 rounded block overflow-x-auto border border-indigo-900/40">
                  {selectedStage.samplePayload.transformation}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1"># 3. RESULTING OUTPUT:</span>
                <span className="text-emerald-300 bg-slate-900/80 px-2 py-1 rounded block overflow-x-auto">
                  {selectedStage.samplePayload.output}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
