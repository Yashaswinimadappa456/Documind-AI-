import { UploadedDocument, ChatMessage, ConceptExplanation, PipelineStage } from '../types';

export const INITIAL_DOCUMENTS: UploadedDocument[] = [
  {
    id: 'doc-1',
    name: 'Attention_Is_All_You_Need_Transformer.pdf',
    sizeBytes: 2211840,
    pageCount: 15,
    chunkCount: 38,
    uploadedAt: '2026-11-10T14:20:00Z',
    status: 'ready',
    category: 'Research Paper',
    summary: 'The seminal 2017 paper by Vaswani et al. introducing the Transformer model architecture based entirely on self-attention mechanisms without recurrence or convolutions.',
    chunks: [
      {
        id: 'chk-1-1',
        documentId: 'doc-1',
        documentName: 'Attention_Is_All_You_Need_Transformer.pdf',
        pageNumber: 1,
        chunkIndex: 0,
        content: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The Transformer is the first transduction model relying entirely on self-attention to compute representations of its input and output without using sequence-aligned RNNs or convolution.',
        tokenCount: 64,
        embeddingPreview: [0.034, -0.128, 0.542, 0.089, -0.215],
      },
      {
        id: 'chk-1-2',
        documentId: 'doc-1',
        documentName: 'Attention_Is_All_You_Need_Transformer.pdf',
        pageNumber: 3,
        chunkIndex: 1,
        content: 'An attention function can be described as mapping a query and a set of key-value pairs to an output, where the query, keys, values, and output are all vectors. The output is computed as a weighted sum of the values, where the weight assigned to each value is computed by a compatibility function of the query with the corresponding key. Specifically, Scaled Dot-Product Attention: Attention(Q, K, V) = softmax(Q K^T / sqrt(d_k)) V.',
        tokenCount: 92,
        embeddingPreview: [0.088, -0.045, 0.391, -0.198, 0.412],
      },
      {
        id: 'chk-1-3',
        documentId: 'doc-1',
        documentName: 'Attention_Is_All_You_Need_Transformer.pdf',
        pageNumber: 5,
        chunkIndex: 2,
        content: 'Multi-Head Attention allows the model to jointly attend to information from different representation subspaces at different positions. MultiHead(Q, K, V) = Concat(head_1, ..., head_h) W^O where head_i = Attention(Q W_i^Q, K W_i^K, V W_i^V). In this work we employ h = 8 parallel attention layers, or heads. For each of these, we use d_k = d_v = d_model / h = 64.',
        tokenCount: 88,
        embeddingPreview: [0.052, -0.112, 0.441, -0.067, 0.318],
      },
    ],
  },
  {
    id: 'doc-2',
    name: 'Retrieval_Augmented_Generation_Fundamentals.pdf',
    sizeBytes: 1548288,
    pageCount: 12,
    chunkCount: 26,
    uploadedAt: '2026-11-11T09:45:00Z',
    status: 'ready',
    category: 'Technical Docs',
    summary: 'A comprehensive technical guide to RAG architectures, chunking strategies, dense vector retrieval, and prompt augmentation techniques.',
    chunks: [
      {
        id: 'chk-2-1',
        documentId: 'doc-2',
        documentName: 'Retrieval_Augmented_Generation_Fundamentals.pdf',
        pageNumber: 2,
        chunkIndex: 0,
        content: 'Retrieval-Augmented Generation (RAG) is an architectural pattern that combines an external knowledge retriever with a generative language model. Instead of relying solely on the parametric knowledge frozen within weights during pre-training, RAG dynamically fetches relevant context chunks at inference time.',
        tokenCount: 58,
        embeddingPreview: [0.012, 0.231, -0.098, 0.354, -0.082],
      },
      {
        id: 'chk-2-2',
        documentId: 'doc-2',
        documentName: 'Retrieval_Augmented_Generation_Fundamentals.pdf',
        pageNumber: 4,
        chunkIndex: 1,
        content: 'Chunking with overlap is essential for preserving contextual continuity. If a document is split strictly at fixed character boundaries (e.g. 500 characters), semantic sentences or formulas can be severed in half. An overlap of 10-20% (e.g. chunk_size=500, chunk_overlap=100) ensures that thoughts spanning across boundaries remain intact.',
        tokenCount: 76,
        embeddingPreview: [0.045, 0.178, -0.142, 0.421, -0.015],
      },
    ],
  },
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-welcome',
    role: 'assistant',
    content: `Welcome to **DocuMind AI**! I am your intelligent document assistant.

I specialize in answering questions grounded strictly in your uploaded PDF documents using **Retrieval-Augmented Generation (RAG)**. 

### What you can do right now in Phase 1:
- Explore the **pre-loaded sample documents** in the sidebar.
- Test asking questions about the sample papers using the starter prompts below.
- Click **RAG Pipeline** in the top bar to inspect how documents get parsed, chunked, embedded, and retrieved.
- Open **GenAI Encyclopedia** to study core concepts like *Embeddings*, *Vector Stores*, *Retrievers*, and *Prompt Templates* with interactive code and analogies.

Try clicking one of the sample questions below to see how answers and source citations look!`,
    timestamp: 'Just now',
    retrievalMetadata: {
      chunksRetrieved: 0,
      searchLatencyMs: 0,
      modelUsed: 'gemini-3.8-flash',
      groundedInDocs: true,
    },
  },
  {
    id: 'msg-demo-q',
    role: 'user',
    content: 'How does Scaled Dot-Product Attention work and why is the scaling factor needed?',
    timestamp: '2 mins ago',
  },
  {
    id: 'msg-demo-a',
    role: 'assistant',
    content: `Based on **Attention Is All You Need**, Scaled Dot-Product Attention computes attention weights between queries and keys to produce a weighted sum of values:

$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V$$

### Key Mechanics:
1. **Dot-Product Compatibility**: For each query vector, the dot product with all key vectors is calculated ($QK^T$). Higher dot products signify stronger contextual relevance.
2. **The Scaling Factor ($\\sqrt{d_k}$)**:
   - For large values of $d_k$, the dot products can grow exceedingly large in magnitude.
   - Large values push the softmax function into regions where gradients are extremely small (the vanishing gradient problem).
   - Dividing by $\\sqrt{d_k}$ counteracts this growth and stabilizes gradient flow during backpropagation.
3. **Softmax Normalization**: Turns the scaled scores into probabilities summing to $1.0$.
4. **Value Aggregation**: Multiplies the softmax probabilities by the value matrix $V$.`,
    timestamp: '1 min ago',
    citations: [
      {
        documentId: 'doc-1',
        documentName: 'Attention_Is_All_You_Need_Transformer.pdf',
        pageNumber: 3,
        similarityScore: 0.94,
        snippet: 'An attention function can be described as mapping a query and a set of key-value pairs to an output... The output is computed as a weighted sum of the values... Specifically, Scaled Dot-Product Attention: Attention(Q, K, V) = softmax(Q K^T / sqrt(d_k)) V.',
        chunkIndex: 1,
      },
      {
        documentId: 'doc-1',
        documentName: 'Attention_Is_All_You_Need_Transformer.pdf',
        pageNumber: 1,
        similarityScore: 0.82,
        snippet: 'The Transformer is the first transduction model relying entirely on self-attention to compute representations of its input and output without using sequence-aligned RNNs or convolution.',
        chunkIndex: 0,
      },
    ],
    retrievalMetadata: {
      chunksRetrieved: 2,
      searchLatencyMs: 142,
      modelUsed: 'gemini-3.8-flash',
      groundedInDocs: true,
    },
  },
];

export const STARTER_QUESTIONS = [
  'How does Scaled Dot-Product Attention work?',
  'Why is chunk overlap important when splitting text?',
  'What are the advantages of Multi-Head Attention?',
  'What is the core difference between parametric and non-parametric memory?',
];

export const GENAI_CONCEPTS: ConceptExplanation[] = [
  {
    id: 'concept-doc-loader',
    term: 'Document Loader',
    category: 'Data Prep',
    shortDefinition: 'A component that imports raw external files (PDF, DOCX, Markdown, URLs) and parses them into standardized Document objects containing page content and metadata.',
    detailedExplanation: 'Raw PDFs contain binary streams, layout tables, fonts, and positional glyph coordinates. A Document Loader extracts the readable text stream while preserving structural metadata such as page numbers, file origin, author, and timestamp. In LangChain, loaders yield instances of Document(pageContent: string, metadata: object).',
    analogy: 'Imagine receiving a book written in encrypted handwriting. The Document Loader is the transcriber who types out the clean English words onto organized sheets with page numbers stamped on top.',
    codeSnippet: `// Example with LangChain Document representation:
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

const loader = new PDFLoader("notes.pdf", { splitPages: true });
const docs = await loader.load();
// docs[0].pageContent -> "The introduction text..."
// docs[0].metadata -> { source: "notes.pdf", loc: { pageNumber: 1 } }`,
    whyItMattersInDocuMind: 'DocuMind uses loaders in Phase 2 to parse uploaded PDFs page-by-page so we can track exact page citations for every answer.',
  },
  {
    id: 'concept-text-splitter',
    term: 'Text Splitter / Chunking',
    category: 'Data Prep',
    shortDefinition: 'An algorithm that divides lengthy documents into smaller, semantically coherent text segments (chunks) with configurable character or token overlap.',
    detailedExplanation: 'LLM context windows and embedding models have length limits. Furthermore, sending a 100-page book to find a 2-sentence fact introduces noise. By breaking documents into ~500-1,000 character chunks with a ~100-character overlap (e.g. RecursiveCharacterTextSplitter), each chunk encapsulates a discrete idea while overlap ensures boundaries do not split thoughts.',
    analogy: 'Cutting a long continuous roll of film into photographic slides. If you cut abruptly across an actor\'s face, the scene is ruined. An overlap ensures each slide retains context from the previous slide.',
    codeSnippet: `import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 800,
  chunkOverlap: 150,
  separators: ["\\n\\n", "\\n", " ", ""]
});
const chunkedDocs = await splitter.splitDocuments(rawDocs);`,
    whyItMattersInDocuMind: 'Chunking is Phase 3 of DocuMind. It determines the granularity of semantic search and prevents severing explanations in half.',
  },
  {
    id: 'concept-embeddings',
    term: 'Vector Embeddings',
    category: 'Vector Search',
    shortDefinition: 'Dense mathematical vectors (arrays of floating-point numbers) representing the semantic meaning of text in a high-dimensional continuous space.',
    detailedExplanation: 'Computers cannot calculate geometric distance between English strings like "dog" and "puppy". An embedding model (like Google gemini-embedding-2) maps textual phrases to vectors (e.g. 768 or 1536 floats). Phrases with similar meanings point in similar directions in vector space, allowing mathematical calculation of similarity (cosine similarity).',
    analogy: 'Assigning GPS coordinates on an enormous multi-dimensional map. "King" and "Queen" land in the royal district; "Apple" and "Banana" land in the fruit market.',
    codeSnippet: `// In Node.js with Google Gemini API:
const response = await ai.models.embedContent({
  model: 'gemini-embedding-2',
  contents: 'What is Multi-Head Attention?',
});
const vector = response.embedding.values; // [0.024, -0.194, 0.412, ...]`,
    whyItMattersInDocuMind: 'Embeddings power Phase 4. When a user asks a question, we embed the question and find document chunks with vectors closest to it.',
  },
  {
    id: 'concept-vector-store',
    term: 'Vector Store / Vector Database',
    category: 'Vector Search',
    shortDefinition: 'A specialized database engineered to store dense vectors alongside document metadata and perform ultra-fast approximate nearest neighbor (ANN) searches.',
    detailedExplanation: 'Traditional databases index strings and numbers using B-Trees or full-text inverted indexes. Vector stores (such as MemoryVectorStore for MVPs or ChromaDB/pgvector for production) index vectors using algorithms like HNSW (Hierarchical Navigable Small World) to return top-k most similar items in milliseconds.',
    analogy: 'A library catalog where books are shelved not alphabetically by title, but by thematic concept so books discussing similar themes sit right next to each other.',
    codeSnippet: `import { MemoryVectorStore } from "langchain/vectorstores/memory";
// Stores vectors + original chunk text + metadata in memory
const vectorStore = await MemoryVectorStore.fromDocuments(chunks, embeddings);`,
    whyItMattersInDocuMind: 'DocuMind uses an in-memory vector store in Phase 4 for fast local development, structured cleanly so it can swap to ChromaDB later.',
  },
  {
    id: 'concept-retriever',
    term: 'Retriever',
    category: 'RAG Core',
    shortDefinition: 'An interface that accepts an unstructured text query and returns a list of the most relevant Document chunks.',
    detailedExplanation: 'The Retriever abstracts the vector database query mechanism. When invoked with `retriever.getRelevantDocuments(query)`, it embeds the query, queries the vector store for cosine similarity, filters by metadata if specified, and returns the top k relevant chunks.',
    analogy: 'The research assistant who runs to the library stacks, pulls out the 3 most relevant textbook pages, and places them open on the professor\'s desk.',
    codeSnippet: `const retriever = vectorStore.asRetriever({
  k: 4, // Retrieve top 4 most relevant chunks
  searchType: "similarity"
});
const relevantChunks = await retriever.invoke("How does attention scale?");`,
    whyItMattersInDocuMind: 'The Retriever is the bridge between user questions and stored knowledge in Phase 5.',
  },
  {
    id: 'concept-retrieval-chain',
    term: 'Retrieval Chain',
    category: 'RAG Core',
    shortDefinition: 'An orchestrated pipeline that chains together query preprocessing, chunk retrieval, prompt construction, LLM generation, and output parsing into a single call.',
    detailedExplanation: 'Instead of manually coordinating each step, LangChain chains (e.g. `createRetrievalChain` using LCEL - LangChain Expression Language) bind: Query -> Retriever -> Prompt Template -> ChatModel -> Response Parser. It ensures proper data formatting and error handling.',
    analogy: 'An automated assembly line: the conveyor belt fetches the raw parts (retriever), attaches the chassis (prompt template), paints the car (LLM), and inspects the finish (parser).',
    codeSnippet: `import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

const combineDocsChain = await createStuffDocumentsChain({ llm, prompt });
const ragChain = await createRetrievalChain({
  retriever,
  combineDocsChain,
});
const response = await ragChain.invoke({ input: userQuestion });`,
    whyItMattersInDocuMind: 'Phase 5 integrates LangChain retrieval chains to cleanly route documents to Gemini without messy spaghetti code.',
  },
  {
    id: 'concept-prompt-template',
    term: 'Prompt Template',
    category: 'LLM & Prompts',
    shortDefinition: 'A parameterized prompt recipe that dynamically injects user questions, retrieved context chunks, and grounding rules before calling the LLM.',
    detailedExplanation: 'Hardcoding prompts leads to prompt injection risks and formatting errors. Prompt templates define placeholders (e.g. `{context}` and `{input}`) and enforce system rules like: "You are a factual assistant. Answer strictly using the context below. If the answer is not present, say I cannot find this in the documents."',
    analogy: 'A legal form with blank slots: "I, [Name], agree to [Terms]". The template ensures all required disclaimers and constraints are always present.',
    codeSnippet: `import { ChatPromptTemplate } from "@langchain/core/prompts";

const prompt = ChatPromptTemplate.fromMessages([
  ["system", \`Answer the question using ONLY the provided context:
{context}

If the context does not contain the answer, reply:
"I cannot find this information in the uploaded documents."\`],
  ["human", "{input}"]
]);`,
    whyItMattersInDocuMind: 'Guarantees that Gemini adheres to document facts and explicitly admits when information is missing.',
  },
  {
    id: 'concept-context-window',
    term: 'Context Window',
    category: 'LLM & Prompts',
    shortDefinition: 'The maximum total number of tokens (words/sub-words) that an LLM can process in a single inference call across both input and output.',
    detailedExplanation: 'Gemini models feature massive context windows (up to 1M+ tokens), but filling the entire context window with irrelevant pages degrades response speed, increases token consumption, and can cause the "lost-in-the-middle" attention phenomenon. RAG solves this by selecting only the top-k highest signal chunks.',
    analogy: 'Your desk surface. Even if you have a huge conference desk, keeping 50 thick binders piled up slows down your ability to find a specific paragraph compared to keeping just the 2 highlighted summary pages.',
    codeSnippet: `// Gemini 3.8 Flash supports extensive tokens, but targeted RAG keeps latency low:
// 4 retrieved chunks * 200 tokens = ~800 tokens of high-density context!`,
    whyItMattersInDocuMind: 'Understanding the context window helps us calibrate chunk size and top-k retrieval in DocuMind for fast, highly accurate answers.',
  },
  {
    id: 'concept-hallucination',
    term: 'Hallucination',
    category: 'LLM & Prompts',
    shortDefinition: 'When an AI model generates statements that sound confident and plausible but are factually false, invented, or unsubstantiated by source documents.',
    detailedExplanation: 'LLMs predict the most probable next token based on statistical patterns in pre-training data, not real-time fact verification. When asked obscure or proprietary questions, models may hallucinate plausible-sounding citations or figures. RAG mitigates hallucination by providing verifiable source text in the prompt.',
    analogy: 'A student who didn\'t read the textbook guessing convincingly on an essay exam vs. an open-book exam where the student quotes the exact paragraph.',
    codeSnippet: `// RAG Anti-Hallucination Guardrail in Prompt:
const SYSTEM_PROMPT = \`You must ground your response ONLY in the context excerpts.
Cite document page numbers.
Do NOT fabricate external facts or hypothetical explanations.\`;`,
    whyItMattersInDocuMind: 'DocuMind displays source citations and confidence indicators directly beneath responses so users can verify every claim.',
  },
  {
    id: 'concept-langchain',
    term: 'LangChain',
    category: 'Advanced Systems',
    shortDefinition: 'An open-source orchestration framework that provides composable abstractions, standard interfaces, and tools for building LLM applications.',
    detailedExplanation: 'LangChain standardizes integrations across document loaders, text splitters, embedding providers, vector databases, and LLM APIs. Using LangChain.js, you can swap the vector store from in-memory to ChromaDB or Pinecone with just one line of code without rewriting business logic.',
    analogy: 'Like React for AI: React gives you components and state hooks so you don\'t write manual DOM manipulation; LangChain gives you chains, loaders, and stores so you don\'t write raw vector math.',
    codeSnippet: `// LangChain composability:
// Loader -> Splitter -> VectorStore -> Retriever -> Model
const chain = RunnableSequence.from([
  {
    context: retriever.pipe(formatDocumentsAsString),
    question: new RunnablePassthrough()
  },
  prompt,
  model,
  new StringOutputParser()
]);`,
    whyItMattersInDocuMind: 'DocuMind uses LangChain.js to keep our RAG pipeline clean, modular, and maintainable across all 9 development phases.',
  },
  {
    id: 'concept-mcp',
    term: 'Model Context Protocol (MCP)',
    category: 'Advanced Systems',
    shortDefinition: 'An open standard protocol that enables AI models and agents to securely connect to external data sources, developer tools, and operational environments.',
    detailedExplanation: 'Created to solve tool-connectivity fragmentation, MCP establishes a standard client-server architecture. An MCP server exposes data resources, prompts, and tools (e.g., file system access, database queries, Git operations) that any MCP-compliant AI client can seamlessly query.',
    analogy: 'USB-C for AI: Instead of having separate proprietary cables for every single peripheral, a universal standard lets any device connect to any data source.',
    codeSnippet: `// Conceptual MCP Resource Request:
// Model asks MCP Server: "resources/read?uri=file:///papers/transformer.pdf"
// MCP Server returns structured content safely with permissions enforced!`,
    whyItMattersInDocuMind: 'In Phase 8 (Advanced Features), DocuMind\'s modular design allows adding an MCP server layer so external tools and agents can query our document index.',
  },
];

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 1,
    phase: 'Phase 2',
    name: 'Document Loader & Text Extraction',
    description: 'Parses binary PDF documents into readable text streams while extracting structural metadata such as page numbers and document titles.',
    incomingData: 'Raw Binary PDF File (e.g. attention.pdf - 2.2MB)',
    outgoingData: 'Array of Page Documents with text and page numbers',
    keyConcepts: ['PDF Parsing', 'Metadata Extraction', 'Stream Buffering'],
    samplePayload: {
      input: 'File Buffer: 0x25 0x50 0x44 0x46 ...',
      transformation: 'pdf-parse / PDFLoader extract page-level streams',
      output: '[{ pageNumber: 1, text: "The dominant sequence transduction models..." }, ...]',
    },
  },
  {
    id: 2,
    phase: 'Phase 3',
    name: 'Text Splitting & Chunking',
    description: 'Divides lengthy page text into smaller, overlapping segments so context is not broken across fixed character cuts.',
    incomingData: 'Continuous page text streams (~3,000 chars/page)',
    outgoingData: 'Document chunks (e.g. 800 chars) with 150 char overlap',
    keyConcepts: ['RecursiveCharacterTextSplitter', 'Chunk Size', 'Overlap Ratio'],
    samplePayload: {
      input: 'Full page text string (3,400 chars)',
      transformation: 'Recursive split by ["\\n\\n", "\\n", " ", ""] with overlap 150',
      output: '4 Chunks created with sequential chunkIndex [0, 1, 2, 3]',
    },
  },
  {
    id: 3,
    phase: 'Phase 4',
    name: 'Embedding Generation',
    description: 'Translates each text chunk into a high-dimensional dense vector representing its semantic meaning.',
    incomingData: 'Text chunk: "Scaled Dot-Product Attention: softmax(QK^T/sqrt(d_k))V"',
    outgoingData: 'Vector Float Array: [0.088, -0.045, 0.391, ... 768 dimensions]',
    keyConcepts: ['Google Gemini Embeddings', 'High-dimensional Vector Space'],
    samplePayload: {
      input: 'Text Chunk #1 content string',
      transformation: 'ai.models.embedContent({ model: "gemini-embedding-2" })',
      output: 'Float32Array[768] normalized embedding vector',
    },
  },
  {
    id: 4,
    phase: 'Phase 4',
    name: 'Vector Store Indexing',
    description: 'Stores chunk vectors along with original text and metadata in a vector database for similarity search.',
    incomingData: 'Vectors + Metadata (docName, pageNum, chunkIndex)',
    outgoingData: 'Searchable Vector Index (In-Memory / ChromaDB)',
    keyConcepts: ['Approximate Nearest Neighbors', 'Cosine Distance Index'],
    samplePayload: {
      input: '{ vector: Float32Array[768], metadata: { page: 3, docId: "doc-1" } }',
      transformation: 'MemoryVectorStore.addVectors() / HNSW indexing',
      output: 'Indexed collection ready for cosine similarity queries',
    },
  },
  {
    id: 5,
    phase: 'Phase 5',
    name: 'Semantic Retrieval & Re-ranking',
    description: 'Embeds user question, queries vector store, and returns top-k most relevant document chunks.',
    incomingData: 'User Query: "How does scaled attention work?"',
    outgoingData: 'Top 3 chunks with highest cosine similarity score (e.g. 0.94, 0.88)',
    keyConcepts: ['Retriever Interface', 'Top-K Ranking', 'Relevance Filtering'],
    samplePayload: {
      input: 'User Question Vector -> Cosine Distance computation',
      transformation: 'retriever.invoke(query) -> rank by similarity score',
      output: 'Top 2 chunks (Page 3 chunk 1 score: 0.94, Page 1 chunk 0 score: 0.82)',
    },
  },
  {
    id: 6,
    phase: 'Phase 6 & 7',
    name: 'Prompt Augmentation & Gemini Generation',
    description: 'Injects retrieved chunks into prompt template and instructs Gemini 3.8 Flash to synthesize a grounded answer with page citations.',
    incomingData: 'Retrieved Context + User Question + Anti-Hallucination rules',
    outgoingData: 'Grounded Answer with verified Page & Chunk citations',
    keyConcepts: ['Prompt Engineering', 'Grounding', 'Citation Mapping'],
    samplePayload: {
      input: 'System Instruction + Context Chunks + Question',
      transformation: 'ai.models.generateContent({ model: "gemini-3.8-flash" })',
      output: 'Markdown response with footnotes citing Page 3 and Page 1',
    },
  },
];
