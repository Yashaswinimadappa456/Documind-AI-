import React, { useState } from 'react';
import { UploadedDocument } from '../types';
import { FileText, Layers, Hash, Calendar, Search, Plus, Eye, CheckCircle2 } from 'lucide-react';

interface DocumentLibraryViewProps {
  documents: UploadedDocument[];
  onOpenUpload: () => void;
  onInspectDocument: (doc: UploadedDocument) => void;
  onSelectForChat: (doc: UploadedDocument) => void;
}

export const DocumentLibraryView: React.FC<DocumentLibraryViewProps> = ({
  documents,
  onOpenUpload,
  onInspectDocument,
  onSelectForChat,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Research Paper', 'Technical Docs', 'Academic Notes', 'Manual'];

  const filteredDocs = documents.filter((doc) => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="text-xs font-semibold text-indigo-400 tracking-wider uppercase mb-1">
              Document Knowledge Store
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Uploaded Documents & Vector Index
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Browse ingested research papers, technical manuals, and notes indexed for RAG retrieval.
            </p>
          </div>

          <button
            onClick={onOpenUpload}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-md shadow-indigo-600/20 whitespace-nowrap self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New PDF</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents by title or topic..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white line-clamp-1" title={doc.name}>
                        {doc.name}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mt-0.5">
                        <span>{doc.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{(doc.sizeBytes / (1024 * 1024)).toFixed(1)} MB</span>
                      </div>
                    </div>
                  </div>

                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Indexed
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mt-3 line-clamp-3">
                  {doc.summary}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/60 mt-4 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">Pages</span>
                    <div className="text-xs font-semibold text-slate-200 font-mono tabular-nums">
                      {doc.pageCount}
                    </div>
                  </div>
                  <div className="border-x border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase">Chunks</span>
                    <div className="text-xs font-semibold text-indigo-300 font-mono tabular-nums">
                      {doc.chunkCount}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">Vectors</span>
                    <div className="text-xs font-semibold text-slate-200 font-mono tabular-nums">
                      {doc.chunkCount}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Strip */}
              <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-slate-800/80">
                <button
                  onClick={() => onInspectDocument(doc)}
                  className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Chunks</span>
                </button>

                <button
                  onClick={() => onSelectForChat(doc)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-indigo-200 px-3 py-1.5 rounded-lg bg-indigo-950/50 hover:bg-indigo-900/50 border border-indigo-500/30 transition-colors"
                >
                  <span>Chat With Document</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
