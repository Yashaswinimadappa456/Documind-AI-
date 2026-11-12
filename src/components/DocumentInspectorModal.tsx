import React from 'react';
import { UploadedDocument } from '../types';
import { X, FileText, Layers, Hash, Calendar, HardDrive, CheckCircle2 } from 'lucide-react';

interface DocumentInspectorModalProps {
  document: UploadedDocument | null;
  onClose: () => void;
}

export const DocumentInspectorModal: React.FC<DocumentInspectorModalProps> = ({
  document,
  onClose,
}) => {
  if (!document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white truncate max-w-md">
                {document.name}
              </h2>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                <span>{document.category}</span>
                <span aria-hidden="true">·</span>
                <span>{(document.sizeBytes / (1024 * 1024)).toFixed(2)} MB</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-400">Indexed</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Document Stats Strip */}
        <div className="grid grid-cols-4 gap-3 p-4 px-6 bg-slate-950/40 border-b border-slate-800 text-xs">
          <div className="space-y-0.5">
            <span className="text-slate-400 flex items-center gap-1 text-[11px]">
              <Layers className="w-3 h-3 text-indigo-400" /> Total Pages
            </span>
            <div className="font-semibold text-slate-200 font-mono tabular-nums text-sm">
              {document.pageCount}
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-slate-400 flex items-center gap-1 text-[11px]">
              <Hash className="w-3 h-3 text-indigo-400" /> Total Chunks
            </span>
            <div className="font-semibold text-indigo-300 font-mono tabular-nums text-sm">
              {document.chunkCount}
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-slate-400 flex items-center gap-1 text-[11px]">
              <HardDrive className="w-3 h-3 text-indigo-400" /> Vector Dim
            </span>
            <div className="font-semibold text-slate-200 font-mono tabular-nums text-sm">
              768 (Gemini)
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-slate-400 flex items-center gap-1 text-[11px]">
              <Calendar className="w-3 h-3 text-indigo-400" /> Ingestion Status
            </span>
            <div className="font-semibold text-emerald-400 font-mono text-sm flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Ready
            </div>
          </div>
        </div>

        {/* Chunks Inspector Scroll List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-300 uppercase tracking-wider">
              Document Chunk Breakdown & Vector Signatures
            </span>
            <span>Showing sample chunks</span>
          </div>

          {document.chunks.map((chunk, i) => (
            <div
              key={chunk.id || i}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 font-mono text-[11px]">
                    Chunk #{chunk.chunkIndex}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    Page {chunk.pageNumber}
                  </span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">
                  ~{chunk.tokenCount} tokens
                </span>
              </div>

              <p className="text-xs text-slate-200 font-mono bg-slate-900/60 p-3 rounded-lg border border-slate-800/60 leading-relaxed whitespace-pre-wrap">
                {chunk.content}
              </p>

              {chunk.embeddingPreview && (
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono pt-1">
                  <span>Embedding Vector Vector[0..4]:</span>
                  <span className="text-indigo-400">
                    [{chunk.embeddingPreview.join(', ')}...]
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-800 bg-slate-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
