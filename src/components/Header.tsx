import React from 'react';
import { ActiveTab } from '../types';
import { Sparkles, UploadCloud, Server } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenUpload: () => void;
  serverOnline: boolean;
  documentCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenUpload,
  serverOnline,
  documentCount,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Single text wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
            DocuMind AI
          </span>
          <span className="text-[11px] text-slate-400 whitespace-nowrap">
            Phase 1 · RAG Document Assistant
          </span>
        </div>
      </div>

      {/* Zone 2: Navigation Links (Single-line, whitespace-nowrap) */}
      <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800/80">
        <button
          onClick={() => onTabChange('chat')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'chat'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Chat Assistant
        </button>
        <button
          onClick={() => onTabChange('pipeline')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'pipeline'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          RAG Pipeline
        </button>
        <button
          onClick={() => onTabChange('concepts')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'concepts'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          GenAI Concepts
        </button>
        <button
          onClick={() => onTabChange('documents')}
          className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'documents'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Document Library ({documentCount})
        </button>
      </nav>

      {/* Zone 3: Primary Action + Server Status */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/60 px-2.5 py-1 rounded-lg border border-slate-800">
          <Server className="w-3.5 h-3.5 text-slate-400" />
          <span>Backend:</span>
          <span className={`font-mono text-[11px] ${serverOnline ? 'text-emerald-400' : 'text-amber-400'}`}>
            {serverOnline ? 'Online (Port 3000)' : 'Connecting...'}
          </span>
        </div>

        <button
          onClick={onOpenUpload}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-indigo-500/20"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          <span>Upload PDF</span>
        </button>
      </div>
    </header>
  );
};
