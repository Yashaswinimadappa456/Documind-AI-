import React, { useState } from 'react';
import { ChatMessage, Citation } from '../types';
import { Bot, User, Copy, Check, BookOpen, ChevronDown, ChevronUp, Clock, FileText } from 'lucide-react';

interface ChatMessageItemProps {
  message: ChatMessage;
  onCitationClick?: (citation: Citation) => void;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  onCitationClick,
}) => {
  const [copied, setCopied] = useState(false);
  const [showCitations, setShowCitations] = useState(true);

  const isUser = message.role === 'user';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`py-5 px-6 transition-colors ${
      isUser ? 'bg-slate-900/40' : 'bg-slate-900/10'
    }`}>
      <div className="max-w-4xl mx-auto flex gap-4">
        {/* Role Avatar */}
        <div className="shrink-0 mt-0.5">
          {isUser ? (
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <User className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Bot className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Message Content & Metadata */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-200">
                {isUser ? 'You' : 'DocuMind Assistant'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-[11px]">{message.timestamp}</span>
              {message.retrievalMetadata && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-[11px] text-indigo-400 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{message.retrievalMetadata.searchLatencyMs}ms</span>
                  </span>
                </>
              )}
            </div>

            {!isUser && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
                title="Copy response"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Formatted Text Body */}
          <div className="text-sm text-slate-200 leading-relaxed space-y-3 whitespace-pre-line">
            {message.content}
          </div>

          {/* Grounded Citations Section */}
          {message.citations && message.citations.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <button
                onClick={() => setShowCitations(!showCitations)}
                className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors mb-2.5"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Grounded Sources ({message.citations.length} Verified References)</span>
                {showCitations ? (
                  <ChevronUp className="w-3 h-3" />
                ) : (
                  <ChevronDown className="w-3 h-3" />
                )}
              </button>

              {showCitations && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {message.citations.map((citation, idx) => (
                    <div
                      key={idx}
                      onClick={() => onCitationClick && onCitationClick(citation)}
                      className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between gap-2 text-[11px] mb-1">
                        <div className="flex items-center gap-1.5 text-slate-300 font-medium truncate">
                          <FileText className="w-3 h-3 text-indigo-400 shrink-0" />
                          <span className="truncate">{citation.documentName}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400 shrink-0 font-mono tabular-nums">
                          <span>p.{citation.pageNumber}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-400">
                            {(citation.similarityScore * 100).toFixed(0)}% match
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2 italic font-mono bg-slate-950/50 p-1.5 rounded border border-slate-800/60 group-hover:text-slate-300 transition-colors">
                        "{citation.snippet}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
