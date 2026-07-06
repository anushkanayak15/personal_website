export interface Skill {
  name: string;
  projects: string[];
}

export interface SkillCategory {
  id: string;
  label: string;
  skills: Skill[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "Python", projects: ["amex-dns-platform", "biomedical-rag", "fairness-aware-asr", "encoded-inequality", "relevant-priors"] },
      { name: "TypeScript", projects: ["growthos"] },
      { name: "JavaScript", projects: ["growthos"] },
      { name: "C++", projects: [] },
      { name: "SQL", projects: ["amex-dns-platform"] },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks & Data",
    skills: [
      { name: "Next.js", projects: ["growthos"] },
      { name: "React", projects: ["growthos"] },
      { name: "Node.js", projects: ["growthos"] },
      { name: "Flask", projects: ["amex-dns-platform"] },
      { name: "REST APIs", projects: ["amex-dns-platform"] },
      { name: "PostgreSQL", projects: ["amex-dns-platform"] },
      { name: "MySQL", projects: [] },
      { name: "Firebase", projects: [] },
    ],
  },
  {
    id: "ai-ml",
    label: "AI / Machine Learning",
    skills: [
      { name: "PyTorch", projects: ["semg-keystroke-decoding", "fairness-aware-asr"] },
      { name: "Hugging Face Transformers", projects: ["fairness-aware-asr"] },
      { name: "LoRA Fine-Tuning", projects: ["fairness-aware-asr"] },
      { name: "RAG", projects: ["biomedical-rag"] },
      { name: "FAISS / Vector Search", projects: ["biomedical-rag"] },
      { name: "Embeddings", projects: ["biomedical-rag", "encoded-inequality"] },
      { name: "LLM APIs", projects: ["growthos", "biomedical-rag"] },
      { name: "Prompt Engineering", projects: ["growthos", "biomedical-rag"] },
      { name: "Model Evaluation", projects: ["biomedical-rag", "fairness-aware-asr", "relevant-priors"] },
      { name: "scikit-learn", projects: ["relevant-priors"] },
      { name: "TensorFlow", projects: [] },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    skills: [
      { name: "AWS", projects: [] },
      { name: "Google Cloud", projects: [] },
      { name: "Docker", projects: [] },
      { name: "CI/CD", projects: ["growthos"] },
      { name: "Linux / Unix", projects: ["amex-dns-platform"] },
      { name: "Git / GitHub", projects: ["growthos", "amex-dns-platform", "biomedical-rag", "fairness-aware-asr"] },
      { name: "Gerrit", projects: ["amex-dns-platform"] },
    ],
  },
];

export const TOTAL_TECHNOLOGIES = SKILL_CATEGORIES.reduce(
  (sum, category) => sum + category.skills.length,
  0
);
