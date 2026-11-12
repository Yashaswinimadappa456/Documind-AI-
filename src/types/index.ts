export interface DocumentChunk {
  id: string;
  documentId: string;
  documentName: string;
  pageNumber: number;
  chunkIndex: number;
  content: string;
  tokenCount: number;
  embeddingPreview?: number[]; // First few dimensions for visual display
}

export interface UploadedDocument {
  id: string;
  name: string;
  sizeBytes: number;
  pageCount: number;
  chunkCount: number;
  uploadedAt: string;
  status: 'ready' | 'processing' | 'error';
  category: 'Research Paper' | 'Academic Notes' | 'Technical Docs' | 'Manual' | 'General';
  summary: string;
  chunks: DocumentChunk[];
}

export interface Citation {
  documentId: string;
  documentName: string;
  pageNumber: number;
  similarityScore: number;
  snippet: string;
  chunkIndex: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  citations?: Citation[];
  retrievalMetadata?: {
    chunksRetrieved: number;
    searchLatencyMs: number;
    modelUsed: string;
    groundedInDocs: boolean;
  };
}

export type ActiveTab = 'chat' | 'pipeline' | 'concepts' | 'documents';

export interface ConceptExplanation {
  id: string;
  term: string;
  category: 'RAG Core' | 'Data Prep' | 'Vector Search' | 'LLM & Prompts' | 'Advanced Systems';
  shortDefinition: string;
  detailedExplanation: string;
  analogy: string;
  codeSnippet: string;
  whyItMattersInDocuMind: string;
}

export interface PipelineStage {
  id: number;
  phase: string;
  name: string;
  description: string;
  incomingData: string;
  outgoingData: string;
  keyConcepts: string[];
  samplePayload: {
    input: string;
    transformation: string;
    output: string;
  };
}
