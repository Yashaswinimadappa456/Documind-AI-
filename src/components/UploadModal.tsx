import React, { useState, useRef } from 'react';
import { UploadedDocument } from '../types';
import { X, UploadCloud, FileText, AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDocumentAdded: (doc: UploadedDocument) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onDocumentAdded,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const validateAndSetFile = (file: File) => {
    setErrorMessage(null);
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMessage('Please select a valid PDF file. Other file types will be supported in future phases.');
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setErrorMessage('File size exceeds the 25MB limit. Please upload a smaller document.');
      return;
    }
    setSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleProcessUpload = () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setUploadProgress(15);

    // Simulate multi-stage ingestion progression for Phase 1 verification
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            // Create a rich simulated document entry
            const estimatedPages = Math.max(1, Math.round(selectedFile.size / (150 * 1024)));
            const estimatedChunks = estimatedPages * 3;

            const newDoc: UploadedDocument = {
              id: `doc-${Date.now()}`,
              name: selectedFile.name,
              sizeBytes: selectedFile.size,
              pageCount: estimatedPages,
              chunkCount: estimatedChunks,
              uploadedAt: new Date().toISOString(),
              status: 'ready',
              category: 'Academic Notes',
              summary: `Uploaded document: "${selectedFile.name}". Ingestion completed successfully for Phase 1 simulation. Ready for Phase 2 deep text parsing.`,
              chunks: [
                {
                  id: `chk-${Date.now()}-1`,
                  documentId: `doc-${Date.now()}`,
                  documentName: selectedFile.name,
                  pageNumber: 1,
                  chunkIndex: 0,
                  content: `Extracted content preview from page 1 of ${selectedFile.name}. In Phase 2, the server-side PDFLoader will extract high-fidelity text streams from every page.`,
                  tokenCount: 42,
                  embeddingPreview: [0.019, 0.144, -0.052, 0.281, -0.119],
                },
              ],
            };

            onDocumentAdded(newDoc);
            setIsProcessing(false);
            onClose();
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Upload Document (PDF)</h2>
              <p className="text-[11px] text-slate-400">Ingest research papers, notes, or manuals</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {/* Dropzone Container */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-indigo-500 bg-indigo-500/10 scale-[0.99]'
                : 'border-slate-700/80 hover:border-slate-600 bg-slate-950/60'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              accept=".pdf,application/pdf"
              className="hidden"
            />

            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                <FileText className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="text-xs font-semibold text-slate-200">
                {selectedFile ? selectedFile.name : 'Click to browse or drag and drop your PDF'}
              </div>
              <p className="text-[11px] text-slate-400">
                Supports PDF files up to 25MB · Text extraction & vector indexing
              </p>
            </div>
          </div>

          {/* Selected File Details & Progress */}
          {selectedFile && (
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-200 truncate">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate font-medium">{selectedFile.name}</span>
                </div>
                <span className="text-slate-400 font-mono text-[11px] shrink-0">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </span>
              </div>

              {isProcessing && (
                <div className="space-y-1">
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-indigo-500 h-1.5 rounded-full transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>
                      {uploadProgress < 40
                        ? 'Extracting raw PDF text...'
                        : uploadProgress < 80
                        ? 'Splitting into chunks...'
                        : 'Creating vector index...'}
                    </span>
                    <span>{uploadProgress}%</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Educational Note */}
          <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-[11px] text-indigo-300/90 flex gap-2">
            <Info className="w-4 h-4 shrink-0 text-indigo-400 mt-0.5" />
            <div>
              <span className="font-semibold text-indigo-200">Phase 1 Architecture Checkpoint:</span>
              <p className="mt-0.5 text-indigo-300/80">
                In Phase 1, uploading sets up the document records and chunk data structure. In Phase 2, our backend Node.js server will extract raw text streams using a real PDF parser, ready for chunking in Phase 3!
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-3.5 border-t border-slate-800 bg-slate-950/60">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleProcessUpload}
            disabled={!selectedFile || isProcessing}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors shadow-sm"
          >
            {isProcessing ? 'Processing Document...' : 'Ingest Document'}
          </button>
        </div>
      </div>
    </div>
  );
};
