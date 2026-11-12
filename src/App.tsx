import React, { useState, useEffect } from 'react';
import { ActiveTab, UploadedDocument, ChatMessage, Citation } from './types';
import { INITIAL_DOCUMENTS, INITIAL_MESSAGES, STARTER_QUESTIONS } from './data/initialData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { PipelineVisualizer } from './components/PipelineVisualizer';
import { ConceptsEncyclopedia } from './components/ConceptsEncyclopedia';
import { DocumentLibraryView } from './components/DocumentLibraryView';
import { UploadModal } from './components/UploadModal';
import { DocumentInspectorModal } from './components/DocumentInspectorModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [documents, setDocuments] = useState<UploadedDocument[]>(INITIAL_DOCUMENTS);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [inspectingDoc, setInspectingDoc] = useState<UploadedDocument | null>(null);
  const [serverOnline, setServerOnline] = useState(false);

  // Poll backend health status
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.status === 'online') {
          setServerOnline(true);
        }
      })
      .catch(() => {
        setServerOnline(false);
      });
  }, []);

  const selectedDocument = selectedDocumentId
    ? documents.find((d) => d.id === selectedDocumentId) || null
    : null;

  const handleDocumentAdded = (newDoc: UploadedDocument) => {
    setDocuments((prev) => [newDoc, ...prev]);
    setSelectedDocumentId(newDoc.id);

    // Announce addition in chat
    const sysMsg: ChatMessage = {
      id: `sys-${Date.now()}`,
      role: 'assistant',
      content: `I've successfully added **${newDoc.name}** (${newDoc.pageCount} pages, ${newDoc.chunkCount} chunks) to the knowledge base! You can now ask questions about its content.`,
      timestamp: 'Just now',
    };
    setMessages((prev) => [...prev, sysMsg]);
  };

  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);

    // Educational retrieval & grounding simulation for Phase 1
    setTimeout(() => {
      generateSimulatedResponse(text);
    }, 450);
  };

  const generateSimulatedResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();

    // Check query domain against active documents
    const activeDocs = selectedDocument ? [selectedDocument] : documents;

    // Search for keywords in active chunks
    let matchedChunks: { doc: UploadedDocument; chunk: any; score: number }[] = [];

    activeDocs.forEach((doc) => {
      doc.chunks.forEach((chunk) => {
        let score = 0;
        const words = lowerQuery.split(/\s+/).filter((w) => w.length > 3);
        words.forEach((w) => {
          if (chunk.content.toLowerCase().includes(w)) {
            score += 0.25;
          }
        });
        if (score > 0) {
          matchedChunks.push({ doc, chunk, score: Math.min(0.96, score + 0.4) });
        }
      });
    });

    matchedChunks.sort((a, b) => b.score - a.score);

    if (
      lowerQuery.includes('attention') ||
      lowerQuery.includes('transformer') ||
      lowerQuery.includes('dot-product') ||
      lowerQuery.includes('q k v') ||
      lowerQuery.includes('query')
    ) {
      const citations: Citation[] = [
        {
          documentId: 'doc-1',
          documentName: 'Attention_Is_All_You_Need_Transformer.pdf',
          pageNumber: 3,
          similarityScore: 0.95,
          snippet: 'Scaled Dot-Product Attention: Attention(Q, K, V) = softmax(Q K^T / sqrt(d_k)) V. We compute the dot products of the query with all keys, divide each by sqrt(d_k), and apply a softmax function to obtain the weights on the values.',
          chunkIndex: 1,
        },
        {
          documentId: 'doc-1',
          documentName: 'Attention_Is_All_You_Need_Transformer.pdf',
          pageNumber: 5,
          similarityScore: 0.88,
          snippet: 'Multi-Head Attention allows the model to jointly attend to information from different representation subspaces at different positions: MultiHead(Q,K,V) = Concat(head_1, ..., head_h) W^O.',
          chunkIndex: 2,
        },
      ];

      const reply: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: `According to **Attention Is All You Need**:

### 1. Mechanism of Attention
The model computes an attention matrix by multiplying query vectors ($Q$) with key vectors ($K^T$). This determines how much focus a given token should place on every other token in the sequence:

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V$$

### 2. Multi-Head Parallelism
Instead of performing a single attention function with $d_{\\text{model}}$-dimensional keys, values, and queries, the authors project queries, keys, and values $h=8$ times with different learned linear projections to $d_k = 64$ dimensions. This permits joint attention to information from different representation subspaces.

*(Verified against chunks retrieved from Page 3 and Page 5)*`,
        timestamp: 'Just now',
        citations,
        retrievalMetadata: {
          chunksRetrieved: citations.length,
          searchLatencyMs: 118,
          modelUsed: 'gemini-3.8-flash',
          groundedInDocs: true,
        },
      };

      setMessages((prev) => [...prev, reply]);
    } else if (
      lowerQuery.includes('overlap') ||
      lowerQuery.includes('chunk') ||
      lowerQuery.includes('split') ||
      lowerQuery.includes('rag') ||
      lowerQuery.includes('retrieval')
    ) {
      const citations: Citation[] = [
        {
          documentId: 'doc-2',
          documentName: 'Retrieval_Augmented_Generation_Fundamentals.pdf',
          pageNumber: 4,
          similarityScore: 0.93,
          snippet: 'Chunking with overlap is essential for preserving contextual continuity... An overlap of 10-20% ensures that thoughts spanning across boundaries remain intact.',
          chunkIndex: 1,
        },
        {
          documentId: 'doc-2',
          documentName: 'Retrieval_Augmented_Generation_Fundamentals.pdf',
          pageNumber: 2,
          similarityScore: 0.86,
          snippet: 'Retrieval-Augmented Generation (RAG) is an architectural pattern that combines an external knowledge retriever with a generative language model.',
          chunkIndex: 0,
        },
      ];

      const reply: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: `Based on **Retrieval Augmented Generation Fundamentals**:

### Why Chunk Overlap is Critical:
1. **Context Continuity**: Text documents express ideas across multiple sentences. If you split at a rigid character limit (e.g. at exactly character 500), you risk severing an explanation right in the middle of a crucial equation or thesis.
2. **Boundary Preservation**: A 10%–20% overlap (e.g., \`chunk_size=800\`, \`chunk_overlap=150\`) guarantees that semantic phrases near the edge of Chunk A are re-captured at the start of Chunk B.
3. **Higher Embedding Match**: When a user queries a concept spanning the boundary, the vector store will still identify a complete sentence rather than fragmented half-words.`,
        timestamp: 'Just now',
        citations,
        retrievalMetadata: {
          chunksRetrieved: citations.length,
          searchLatencyMs: 94,
          modelUsed: 'gemini-3.8-flash',
          groundedInDocs: true,
        },
      };

      setMessages((prev) => [...prev, reply]);
    } else {
      // Clear message when the answer cannot be found in the uploaded documents
      const reply: ChatMessage = {
        id: `asst-${Date.now()}`,
        role: 'assistant',
        content: `I cannot find this information in the uploaded documents. 

**DocuMind AI Grounding Guardrail**:
To prevent hallucinations, DocuMind AI is strictly configured to answer questions using only facts verified in your uploaded PDFs. The current knowledge base contains:
- *Attention Is All You Need* (Transformer architecture, self-attention, multi-head attention)
- *Retrieval Augmented Generation Fundamentals* (RAG architecture, text splitting, chunk overlap)

To ask about this topic, please use the **Upload PDF** button in the header or sidebar to ingest relevant reference material!`,
        timestamp: 'Just now',
        retrievalMetadata: {
          chunksRetrieved: 0,
          searchLatencyMs: 62,
          modelUsed: 'gemini-3.8-flash',
          groundedInDocs: false,
        },
      };

      setMessages((prev) => [...prev, reply]);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: 'Conversation history cleared. Ready for your next document query!',
        timestamp: 'Just now',
      },
    ]);
  };

  const handleSelectForChat = (doc: UploadedDocument) => {
    setSelectedDocumentId(doc.id);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Contract Compliant Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenUpload={() => setIsUploadOpen(true)}
        serverOnline={serverOnline}
        documentCount={documents.length}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'chat' && (
          <>
            <Sidebar
              documents={documents}
              selectedDocumentId={selectedDocumentId}
              onSelectDocument={setSelectedDocumentId}
              onOpenUpload={() => setIsUploadOpen(true)}
              onInspectDocument={setInspectingDoc}
            />
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              onClearChat={handleClearChat}
              starterQuestions={STARTER_QUESTIONS}
              selectedDocument={selectedDocument}
              onSelectDocument={setSelectedDocumentId}
              onOpenConcepts={() => setActiveTab('concepts')}
            />
          </>
        )}

        {activeTab === 'pipeline' && <PipelineVisualizer />}

        {activeTab === 'concepts' && <ConceptsEncyclopedia />}

        {activeTab === 'documents' && (
          <DocumentLibraryView
            documents={documents}
            onOpenUpload={() => setIsUploadOpen(true)}
            onInspectDocument={setInspectingDoc}
            onSelectForChat={handleSelectForChat}
          />
        )}
      </div>

      {/* Upload PDF Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onDocumentAdded={handleDocumentAdded}
      />

      {/* Inspect Document Chunks Modal */}
      <DocumentInspectorModal
        document={inspectingDoc}
        onClose={() => setInspectingDoc(null)}
      />
    </div>
  );
}
