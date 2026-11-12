import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, UploadedDocument, Citation } from '../types';
import { ChatMessageItem } from './ChatMessageItem';
import { Send, Trash2, HelpCircle, FileText, Sparkles, Filter } from 'lucide-react';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onClearChat: () => void;
  starterQuestions: string[];
  selectedDocument: UploadedDocument | null;
  onSelectDocument: (id: string | null) => void;
  onOpenConcepts: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  onClearChat,
  starterQuestions,
  selectedDocument,
  onSelectDocument,
  onOpenConcepts,
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-61px)] bg-slate-950">
      {/* Scope Banner */}
      <div className="px-6 py-2.5 border-b border-slate-800/80 bg-slate-900/40 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-indigo-400" />
          <span>Active Context:</span>
          {selectedDocument ? (
            <div className="flex items-center gap-1.5 text-indigo-300 font-medium">
              <FileText className="w-3 h-3" />
              <span className="truncate max-w-sm">{selectedDocument.name}</span>
              <button
                onClick={() => onSelectDocument(null)}
                className="text-[11px] text-slate-400 hover:text-slate-200 underline ml-1"
              >
                (Clear Filter)
              </button>
            </div>
          ) : (
            <span className="text-slate-300 font-medium">
              All Uploaded Documents (Global Knowledge Base)
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConcepts}
            className="flex items-center gap-1 text-slate-400 hover:text-indigo-300 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How RAG works</span>
          </button>
          <button
            onClick={onClearChat}
            className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors"
            title="Reset conversation"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
        {messages.map((message) => (
          <ChatMessageItem key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Starter Prompts Bar */}
      <div className="px-6 pt-2 pb-1 bg-slate-950 border-t border-slate-800/50">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="flex items-center gap-1 text-slate-400 shrink-0">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>Try asking:</span>
          </span>
          {starterQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => onSendMessage(q)}
              className="px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors whitespace-nowrap shrink-0 text-xs text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box Area */}
      <div className="p-4 px-6 bg-slate-950 border-t border-slate-800">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative">
          <div className="relative rounded-xl border border-slate-700/80 bg-slate-900/90 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all shadow-lg shadow-black/20">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about your uploaded documents (e.g., 'What is self-attention and how is it calculated?')..."
              rows={2}
              className="w-full bg-transparent px-4 py-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none resize-none leading-relaxed"
            />

            <div className="flex items-center justify-between px-3 py-2 border-t border-slate-800/60 bg-slate-900/40 rounded-b-xl text-xs">
              <span className="text-slate-400 text-[11px]">
                Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-[10px] text-slate-300">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-slate-800 font-mono text-[10px] text-slate-300">Shift + Enter</kbd> for newline
              </span>

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <span>Ask DocuMind</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
