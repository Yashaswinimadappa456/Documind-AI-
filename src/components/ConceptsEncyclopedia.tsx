import React, { useState } from 'react';
import { GENAI_CONCEPTS } from '../data/initialData';
import { ConceptExplanation } from '../types';
import { BookOpen, Search, Copy, Check, Lightbulb, Code2, Compass } from 'lucide-react';

export const ConceptsEncyclopedia: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedConcept, setSelectedConcept] = useState<ConceptExplanation>(GENAI_CONCEPTS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Data Prep', 'Vector Search', 'RAG Core', 'LLM & Prompts', 'Advanced Systems'];

  const filteredConcepts = GENAI_CONCEPTS.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.detailedExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="pb-6 border-b border-slate-800">
          <div className="text-xs font-semibold text-indigo-400 tracking-wider uppercase mb-1">
            Learning & Mentorship Center
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            GenAI & RAG Engineering Concepts
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Practical explanations, real-world analogies, and LangChain implementation examples for the 11 foundational concepts powering DocuMind AI.
          </p>

          {/* Search & Category Filter Controls */}
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search concepts (e.g., embeddings, chunking, prompt)..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
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
        </div>

        {/* 2-Column Split: Concepts Index & Deep Dive View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Concept Cards List */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredConcepts.map((concept) => {
              const isSelected = selectedConcept.id === concept.id;
              return (
                <div
                  key={concept.id}
                  onClick={() => setSelectedConcept(concept)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500 shadow-sm'
                      : 'bg-slate-900/50 hover:bg-slate-900 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1 text-[11px]">
                    <span className="font-mono text-indigo-400">{concept.category}</span>
                    <span className="text-slate-400 text-[10px]">Click to study</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {concept.term}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {concept.shortDefinition}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Deep Dive Detail Panel */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-indigo-400">
                  {selectedConcept.category}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  {selectedConcept.term}
                </h2>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-medium">
                  {selectedConcept.shortDefinition}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>

            {/* In-Depth Explanation */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Technical Mechanics
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedConcept.detailedExplanation}
              </p>
            </div>

            {/* Real World Analogy */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Plain-English Analogy</span>
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed italic">
                "{selectedConcept.analogy}"
              </p>
            </div>

            {/* Code Snippet */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 font-semibold uppercase tracking-wider text-slate-300">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Code Implementation Pattern</span>
                </span>
                <button
                  onClick={() => handleCopyCode(selectedConcept.id, selectedConcept.codeSnippet)}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {copiedId === selectedConcept.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy code</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                <code>{selectedConcept.codeSnippet}</code>
              </pre>
            </div>

            {/* Role in DocuMind */}
            <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-500/20 flex gap-2.5 text-xs text-indigo-300">
              <Compass className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-indigo-200">How it applies in DocuMind:</span>
                <p className="mt-0.5 text-indigo-300/80 leading-relaxed">
                  {selectedConcept.whyItMattersInDocuMind}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
