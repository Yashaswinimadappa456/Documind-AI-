import React from 'react';
import { UploadedDocument } from '../types';
import { FileText, Plus, Layers, Database, ChevronRight, Check } from 'lucide-react';

interface SidebarProps {
  documents: UploadedDocument[];
  selectedDocumentId: string | null;
  onSelectDocument: (id: string | null) => void;
  onOpenUpload: () => void;
  onInspectDocument: (doc: UploadedDocument) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  documents,
  selectedDocumentId,
  onSelectDocument,
  onOpenUpload,
  onInspectDocument,
}) => {
  const totalChunks = documents.reduce((sum, d) => sum + d.chunkCount, 0);
  const totalPages = documents.reduce((sum, d) => sum + d.pageCount, 0);

  return (
    <aside className="w-80 flex-shrink-0 border-r border-slate-800 bg-slate-950 flex flex-col h-[calc(100vh-61px)]">
      {/* Sidebar Header & Metrics */}
      <div className="p-4 border-b border-slate-800/80">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Knowledge Base
            </h2>
          </div>
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-1 text-[11px] font-medium text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-2 py-1 rounded transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>Add PDF</span>
          </button>
        </div>

        {/* Knowledge Metrics */}
        <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/60 text-center">
          <div>
            <div className="text-xs text-slate-400">Docs</div>
            <div className="text-sm font-semibold text-slate-200 font-mono tabular-nums">
              {documents.length}
            </div>
          </div>
          <div className="border-x border-slate-800">
            <div className="text-xs text-slate-400">Pages</div>
            <div className="text-sm font-semibold text-slate-200 font-mono tabular-nums">
              {totalPages}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Chunks</div>
            <div className="text-sm font-semibold text-indigo-300 font-mono tabular-nums">
              {totalChunks}
            </div>
          </div>
        </div>
      </div>

      {/* Target Document Filter */}
      <div className="px-4 py-2 border-b border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
        <span>Active Query Scope</span>
        <button
          onClick={() => onSelectDocument(null)}
          className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
            selectedDocumentId === null
              ? 'text-white bg-slate-800 font-medium'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          All Documents
        </button>
      </div>

      {/* Documents List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {documents.map((doc) => {
          const isSelected = selectedDocumentId === doc.id;
          return (
            <div
              key={doc.id}
              onClick={() => onSelectDocument(isSelected ? null : doc.id)}
              className={`group p-3 rounded-xl border transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-indigo-950/30 border-indigo-500/50 shadow-sm'
                  : 'bg-slate-900/40 hover:bg-slate-900 border-slate-800/70 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className={`mt-0.5 p-1.5 rounded-lg shrink-0 ${
                  isSelected ? 'bg-indigo-600/30 text-indigo-300' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                }`}>
                  <FileText className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-xs font-semibold text-slate-200 truncate group-hover:text-white" title={doc.name}>
                      {doc.name}
                    </h3>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1 font-mono tabular-nums">
                    <span>{doc.pageCount} pages</span>
                    <span aria-hidden="true">·</span>
                    <span>{doc.chunkCount} chunks</span>
                    <span aria-hidden="true">·</span>
                    <span>{(doc.sizeBytes / (1024 * 1024)).toFixed(1)} MB</span>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {doc.summary}
                  </p>
                </div>
              </div>

              {/* Inspector action button */}
              <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">{doc.category}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onInspectDocument(doc);
                  }}
                  className="flex items-center gap-1 text-slate-400 hover:text-indigo-300 transition-colors"
                >
                  <Layers className="w-3 h-3" />
                  <span>Inspect Chunks</span>
                  <ChevronRight className="w-3 h-3 opacity-60" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer info */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/90 text-xs text-slate-400">
        <div className="flex items-center justify-between">
          <span>Embeddings</span>
          <span className="font-mono text-slate-300 text-[11px]">gemini-embedding-2</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span>Vector Index</span>
          <span className="font-mono text-slate-300 text-[11px]">In-Memory (Chroma Ready)</span>
        </div>
      </div>
    </aside>
  );
};
