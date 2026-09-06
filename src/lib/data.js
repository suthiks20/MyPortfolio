export const LINKS = {
  email: 'suthikshank@gmail.com',
  phone: '9585115142',
  github: 'https://github.com/suthiks20',
  linkedin: 'https://linkedin.com/in/suthikshan-k-43114528b',
}

export const ABOUT_TECH = [
  'TensorFlow',
  'React',
  'FastAPI',
  'PostgreSQL',
  'System Design',
]

export const PROJECTS = [
  {
    id: 'trustpulse',
    index: '01',
    name: 'TrustPulse',
    tagline: 'Adaptive re-authentication driven by facial trust scoring.',
    tech: ['FaceNet', 'FastAPI', 'React', 'PostgreSQL'],
    quote:
      'Weighted Trust Score driving adaptive re-authentication using facial biometrics, liveness detection, and phishing scoring.',
    live: 'https://trustpulse-six.vercel.app/',
    accent: ['#00d9ff', '#ff006e'],
    description:
      'Secure Biometric Authentication — face matching (face-api + CLIP embeddings), liveness detection, phishing classification, and a weighted multi-factor trust score. 94%+ liveness accuracy, <2% false positives, <200ms response.',
  },
  {
    id: 'civicflow',
    index: '02',
    name: 'Civic Flow',
    tagline: 'AI-routed civic issue reporting with severity intelligence.',
    tech: ['Fastify', 'Prisma', 'PostgreSQL', 'Socket.IO', 'React'],
    quote:
      'FAISS-RAG severity scoring with EXIF validation, CLIP+YOLOv8 relevance, and auto-routing for civic issues.',
    live: 'https://civicflow-plum.vercel.app/en',
    accent: ['#84cc16', '#00d9ff'],
    description:
      'AI-driven civic intelligence — RAG-backed document retrieval over municipal PDFs, interactive city maps (Mapbox), real-time GPS business locator, and NLP Q&A. Reduced permit research from 3+ hours to ~5 minutes across 2 city pilots.',
  },
  {
    id: 'currisync',
    index: '03',
    name: 'CurriSync',
    tagline: 'Curriculum management with automated approval workflows.',
    tech: ['Fastify', 'Prisma', 'Neon PostgreSQL', 'React', 'Tailwind'],
    quote:
      'Email-triggered PDF/DOCX report generation in role-based approval workflows with JWT authentication.',
    live: 'https://curriculam.vercel.app/login',
    accent: ['#ff006e', '#a855f7'],
    description:
      'Curriculum management + approval workflows — visual course builder, multi-level approvals with role-based access, document version control with audit trail, and deadline notifications. Pilot across 3+ institutions, 40+ simultaneous users.',
  },
  {
    id: 'ams',
    index: '04',
    name: 'Apartment Management System',
    tagline: 'Multi-tenant apartment management with a live AI copilot.',
    tech: ['Fastify', 'Knex', 'PostgreSQL', 'React/TypeScript', 'NVIDIA NIM'],
    quote:
      'Live AI Copilot (Llama 3.1) grounded in real-time database context across 10+ multi-tenant modules.',
    live: 'https://ams.bluekode.com/login',
    accent: ['#3b82f6', '#00d9ff'],
    description:
      'Multi-tenant apartment management + AI Copilot (Llama 3.1) grounded in live DB context. Row-level security for data isolation, WebSocket notifications, S3 document storage. 200+ concurrent beta users, p95 <150ms API, <2s copilot inference.',
  },
  {
    id: 'bearing',
    index: '05',
    name: 'Bearing RUL Prediction',
    tagline: 'Physics-informed remaining-useful-life prediction.',
    tech: ['PyTorch', 'Squeezezy', 'React', 'Three.js'],
    quote:
      'Physics-informed Health Index estimation using temporal CNN on NASA bearing dataset for nonlinear RUL prediction.',
    live: 'https://bearing-gold-phi.vercel.app/',
    accent: ['#84cc16', '#22d3ee'],
    description:
      'Predictive maintenance for rotating equipment — time-series analysis on vibration/temperature data, temporal CNN trained on NASA bearing dataset. 87% prediction accuracy (10-30 days ahead), 8% false positive rate. 3D bearing UI with concentric health rings (green → yellow → red).',
  },
]

export const EXPERIENCE = [
  {
    date: 'May 2026 – Jul 2026',
    company: 'BLUEKODE SOLUTIONS',
    role: 'Software Developer',
    points: [
      'Built multi-tenant AMS modules',
      'AI Copilot (Llama 3.1, NVIDIA)',
    ],
    tech: 'Fastify, React, Postgres',
  },
  {
    date: 'Apr 2025 – May 2025',
    company: 'APPIN TECHNOLOGY',
    role: 'AI/ML Engineer',
    points: ['Implemented ML pipelines', '85% accuracy, 40% faster'],
    tech: 'TensorFlow, Python, EDA',
  },
  {
    date: 'Feb 2025 – Mar 2025',
    company: 'ARTIFI TECH',
    role: 'Full-Stack Developer',
    points: ['Built CurriSync curriculum mgmt', 'JWT auth, role-based access'],
    tech: 'Fastify, Prisma, React',
  },
]

export const SKILLS = [
  {
    category: 'Backend & APIs',
    items: [
      { name: 'Fastify', desc: 'High-performance Node web framework' },
      { name: 'FastAPI', desc: 'Python async APIs with Pydantic' },
      { name: 'Node.js', desc: 'Event-driven, streaming data' },
      { name: 'REST APIs', desc: 'Design for real deployments' },
      { name: 'JWT Auth', desc: 'Stateless authentication' },
    ],
  },
  {
    category: 'Databases & ORM',
    items: [
      { name: 'PostgreSQL', desc: 'Relational, JSONB, row-level security' },
      { name: 'Knex.js', desc: 'Query builder, migrations' },
      { name: 'Prisma', desc: 'Type-safe ORM' },
      { name: 'SQLAlchemy', desc: 'Python ORM + async support' },
      { name: 'Database Design', desc: 'Normalization, indexing, scale' },
    ],
  },
  {
    category: 'AI / ML',
    items: [
      { name: 'TensorFlow', desc: 'Model training, inference' },
      { name: 'RAG', desc: 'LLMs + retrieval-augmented gen' },
      { name: 'LangChain', desc: 'Orchestration, chaining' },
      { name: 'CLIP', desc: 'Multimodal embeddings, similarity' },
      { name: 'YOLOv8', desc: 'Real-time object detection' },
      { name: 'LangGraph', desc: 'Agentic workflows' },
      { name: 'NLP', desc: 'Tokenization, embeddings, transformers' },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React', desc: 'Component design, hooks, performance' },
      { name: 'TypeScript', desc: 'Type safety, scalable codebases' },
    ],
  },
  {
    category: 'Languages',
    items: [
      { name: 'C++', desc: 'Systems programming, competitive edge' },
      { name: 'Python', desc: 'ML, backend, scripting' },
      { name: 'SQL', desc: 'Complex queries, optimization' },
    ],
  },
  {
    category: 'Tools & Devops',
    items: [
      { name: 'GitHub', desc: 'Versioning, collaboration' },
      { name: 'Postman', desc: 'API testing, documentation' },
      { name: 'Vercel', desc: 'Frontend deployment, edge functions' },
      { name: 'Render', desc: 'Backend hosting, automation' },
      { name: 'Docker (basics)', desc: 'Containerization basics' },
      { name: 'CI/CD Pipelines', desc: 'GitHub Actions, automated testing' },
    ],
  },
  {
    category: 'Area of Interest',
    items: [
      { name: 'System Design', desc: 'Scalability, trade-offs, distributed systems' },
      { name: 'Operating Systems', desc: 'Kernel concepts, process management' },
      { name: 'DBMS', desc: 'Query optimization, indexing strategies' },
      { name: 'Computer Networks', desc: 'Protocols, load balancing, security' },
      { name: 'OOP', desc: 'Design patterns, SOLID principles' },
    ],
  },
  {
    category: 'Soft Skills',
    items: [
      { name: 'Leadership', desc: 'Mentored interns at Bluekode, led NSS initiatives' },
      { name: 'Collaboration', desc: 'Cross-functional teams (backend, frontend, ML)' },
      { name: 'Communication', desc: 'Clear technical docs, client presentations' },
    ],
  },
]

export const ACHIEVEMENTS = [
  { icon: '🥈', title: 'IDEATHON 2024', subtitle: 'Runner Up' },
  { icon: '🥈', title: 'APTIV MOBILITY X', subtitle: 'Runner Up' },
  { icon: '💼', title: 'DATA ANALYTICS', subtitle: 'Accenture' },
  { icon: '📊', title: 'DATA SCIENCE', subtitle: 'Acmegrade' },
  { icon: '🧠', title: 'DEEP LEARNING', subtitle: 'NPTEL' },
]