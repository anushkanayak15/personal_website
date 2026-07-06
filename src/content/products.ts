export interface DiagramNode {
  id: string;
  label: string;
  x: number;
  y: number;
  tone?: "neutral" | "accent" | "secondary";
}

export interface DiagramEdge {
  id: string;
  source: string;
  target: string;
  tone?: "neutral" | "accent" | "secondary";
}

export interface Diagram {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export type ProductStatus = "live" | "production" | "research";

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  status: ProductStatus;
  statusLabel: string;
  oneLiner: string;
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  diagram: Diagram;
  engineeringDecisions: { title: string; detail: string }[];
  metrics: { label: string; value: string }[];
  techStack: string[];
  lessons: string[];
  roadmap?: string[];
  github?: string;
  githubNote?: string;
  demo?: string;
  extraSections?: { title: string; body: string[] }[];
}

export const PRODUCTS: Product[] = [
  {
    slug: "growthos",
    name: "GrowthOS",
    tagline: "Evolutionary Conversion Lab",
    status: "live",
    statusLabel: "Live",
    oneLiner:
      "A closed-loop landing-page experimentation platform that simulates behavioral cohorts, scores competing page hypotheses, and assembles a validated next version.",
    overview:
      "GrowthOS compresses the landing-page experimentation loop from weeks to minutes. It compares five distinct landing-page hypotheses for a product, simulates persona-driven visitor behavior against each, scores performance with a weighted fitness function, extracts explainable findings about what worked, assembles an evolved next-generation page from the winning sections, and validates that candidate again with a fresh random seed.",
    problem:
      "Real landing-page A/B testing takes weeks: you build variants, wait for statistically significant traffic, and the 'why' behind a winner is usually opaque even after you have a result. There was no fast, inspectable way to stress-test five fundamentally different page strategies against realistic visitor behavior before committing to real traffic.",
    solution:
      "GrowthOS runs a full closed-loop experiment: five hypothesis-driven Gen 0 candidates are simulated against 10,000 seeded synthetic visitors each (50,000 visits per run), scored with a weighted Growth Fitness Score, and mined for section-level 'Selection Findings.' A Gen 2 candidate is then recombined from the best-performing sections of the field — each section carries a labeled parent and reason — and validated against the original field with a new random seed. The system explicitly avoids claiming to be a black-box genetic algorithm or an LLM rewrite: every step is deterministic, inspectable, and logged.",
    architecture: [
      "Next.js App Router + TypeScript full-stack application, deployed on Vercel.",
      "`lib/variants.ts` — config-driven candidate page definitions (5 growth hypotheses, each with its own section composition).",
      "`lib/personas.ts` — 5 behavioral cohorts, each with an attention budget, trust threshold, bounce tendency, and per-section trigger/repel weights.",
      "`lib/simulation.ts` — seeded, deterministic Monte Carlo engine: draws a cohort, evaluates a hero-gate check, walks the page section by section accumulating resonance, and records dwell, reach, scroll, bounce, and conversion.",
      "`lib/metrics.ts` — aggregates conversion (with Wilson 95% confidence intervals), engagement, scroll depth, time on page, and per-section dwell/reach into a normalized Growth Fitness Score.",
      "`lib/evolution.ts` — selection, recombination, and mutation engine that assembles Gen 2 from real section-level evidence and records lineage.",
      "In-memory experiment state with a locally persisted Gen 2 preview; no backend database in the current version.",
    ],
    diagram: {
      nodes: [
        { id: "hypotheses", label: "5 Gen 0 Hypotheses", x: 0, y: 80, tone: "neutral" },
        { id: "personas", label: "Behavioral Cohorts", x: 220, y: 0, tone: "neutral" },
        { id: "simulation", label: "Seeded Simulation Engine", x: 440, y: 80, tone: "accent" },
        { id: "metrics", label: "Growth Fitness Score", x: 660, y: 0, tone: "secondary" },
        { id: "findings", label: "Selection Findings", x: 660, y: 160, tone: "secondary" },
        { id: "evolution", label: "Gen 2 Recombination", x: 880, y: 80, tone: "accent" },
        { id: "validation", label: "Validation Retest", x: 1100, y: 80, tone: "neutral" },
      ],
      edges: [
        { id: "e1", source: "hypotheses", target: "simulation", tone: "neutral" },
        { id: "e2", source: "personas", target: "simulation", tone: "neutral" },
        { id: "e3", source: "simulation", target: "metrics", tone: "accent" },
        { id: "e4", source: "simulation", target: "findings", tone: "accent" },
        { id: "e5", source: "metrics", target: "evolution", tone: "secondary" },
        { id: "e6", source: "findings", target: "evolution", tone: "secondary" },
        { id: "e7", source: "evolution", target: "validation", tone: "neutral" },
      ],
    },
    engineeringDecisions: [
      {
        title: "Deterministic seeded simulation",
        detail:
          "Every run uses a seeded random generator so the same seed reproduces the same synthetic visitor paths and metrics. That makes the demo debuggable and makes before/after comparisons apples-to-apples instead of noisy.",
      },
      {
        title: "Weighted, normalized fitness score over raw conversion",
        detail:
          "Conversion alone hides why a page won or lost. The Growth Fitness Score blends conversion (40%), engagement (20%), scroll depth (15%), time on page (15%), and inverse bounce rate (10%), each min-max normalized within the run.",
      },
      {
        title: "Wilson confidence intervals",
        detail:
          "At 10,000-visitor sample sizes, a naive normal approximation overstates certainty. Wilson intervals give a more honest uncertainty range around each candidate's conversion estimate.",
      },
      {
        title: "Explainable, rule-based evolution — not a black box",
        detail:
          "Gen 2 is assembled from explicit, inspectable rules (best hero-gate pass rate, strongest section-level dwell/reach/conversion, highest-converting CTA). Every inherited section carries a labeled parent variant and the reason it was selected.",
      },
      {
        title: "Synthetic data labeled as synthetic, everywhere",
        detail:
          "All personas, cohorts, and simulated metrics are explicitly documented as synthetic demonstration data, not real user telemetry — shipped as a first-class 'Integrity and Limitations' section inside the product itself.",
      },
    ],
    metrics: [
      { label: "Gen 0 candidates", value: "5" },
      { label: "Simulated visits / run", value: "50,000" },
      { label: "Behavioral cohorts", value: "5" },
      { label: "Fitness signals blended", value: "5" },
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Recharts", "canvas-confetti", "Vercel"],
    lessons: [
      "Explainability is the actual product. A system that says 'trust me, this page is better' is far less useful to a growth team than one that shows exactly which section moved the needle and why.",
      "Statistical honesty (Wilson intervals, normalized scoring, explicit synthetic-data labeling) matters as much as the simulation itself — it's what makes the tool credible rather than gimmicky.",
      "AI-assisted tooling was used as an implementation accelerator for scaffolding and iteration, but every experiment assumption, weighting decision, and product framing choice was deliberately made and reviewed by hand.",
    ],
    roadmap: [
      "Replace in-memory experiment state with persistent, queryable experiment history.",
      "Connect real analytics (PostHog/GA) so Gen 0 candidates can be validated against live traffic, not just simulation.",
      "Add live traffic allocation with guardrails instead of a static Gen 0 → Gen 2 cycle.",
      "Move from a single evolved candidate to a small multi-armed bandit across generations.",
    ],
    extraSections: [
      {
        title: "Experimentation Engine",
        body: [
          "Each candidate page is simulated against 10,000 visitors (50,000 total Gen 0 visits per run) using a seeded, deterministic Monte Carlo model — the same seed always reproduces the same visitor paths.",
          "A visitor draws a behavioral cohort and a Gaussian attention budget, passes a hero-gate relevance check, then walks the page section by section, accumulating resonance from cohort-specific triggers and repels until they convert, bounce, or run out of attention.",
          "Every session records dwell, reach, scroll depth, time on page, CTA interaction, and conversion — the raw signal the fitness score and selection findings are built from.",
        ],
      },
      {
        title: "User Simulation",
        body: [
          "Five behavioral cohorts stand in for real visitor archetypes: the Skeptic (needs proof before promises), the Achiever (responds to outcome framing), the Last-Minute Student (urgency-driven), the Explorer (converts after hands-on product exposure), and the Social Learner (responds to peer reassurance).",
          "Each cohort has its own trust threshold, attention budget, and section-level triggers/repels — so the same page can perform very differently depending on which cohort mix it's shown to, mirroring how real audiences aren't monolithic.",
        ],
      },
      {
        title: "Analytics",
        body: [
          "Conversion is estimated with a Wilson 95% confidence interval rather than a raw rate, which stays honest about uncertainty at 10K-visitor sample sizes.",
          "A weighted, min-max normalized Growth Fitness Score (40% conversion, 20% engagement, 15% scroll depth, 15% time on page, 10% inverse bounce) ranks candidates on outcome and on how they got there.",
          "Section-level dwell and reach rates feed the Selection Findings that decide what gets inherited into Gen 2 — the analytics layer is what makes the evolution step explainable instead of arbitrary.",
        ],
      },
    ],
    github: "https://github.com/anushkanayak15/growthos",
    demo: "https://growthos-plum.vercel.app",
  },
  {
    slug: "amex-dns-platform",
    name: "American Express DNS Platform",
    tagline: "Production infrastructure, Distributed Infra & Data Services",
    status: "production",
    statusLabel: "Production",
    oneLiner:
      "A production Flask + PostgreSQL API that replaced a legacy, ticket-driven DNS provisioning platform and automated its full record lifecycle.",
    overview:
      "Built as a Software Engineering Intern on American Express's Distributed Infrastructure and Data Services team. The legacy DNS provisioning platform required manual tickets for nearly every request, creating slow turnaround for teams across the org that needed DNS records created, updated, or retired.",
    problem:
      "DNS record provisioning ran through a legacy platform that depended on manual tickets per request. That created operational drag: slow turnaround for requesting teams, no self-service path, and no consistent contract for how other internal services could integrate with DNS state programmatically.",
    solution:
      "Designed and shipped a production Flask + PostgreSQL API to replace the legacy platform, with the DNS record lifecycle modeled explicitly in the data layer instead of handled ad hoc through tickets. Defined the API surface as a Swagger/OpenAPI contract first so consuming teams could integrate against a stable spec, then shipped three production features that automated the highest-friction manual workflows end to end.",
    architecture: [
      "Flask REST API layer exposing 11 documented endpoints for DNS record lifecycle operations (create, update, retire, query).",
      "PostgreSQL as the system of record for DNS record state and lifecycle transitions, replacing ad hoc, ticket-tracked state.",
      "Swagger / OpenAPI specification as the integration contract for other internal teams and services consuming the API.",
      "Automation layer replacing manual provisioning tickets with programmatic, auditable record lifecycle workflows.",
    ],
    diagram: {
      nodes: [
        { id: "teams", label: "Requesting Teams", x: 0, y: 80, tone: "neutral" },
        { id: "api", label: "Flask REST API (11 endpoints)", x: 260, y: 80, tone: "accent" },
        { id: "swagger", label: "Swagger / OpenAPI Contract", x: 260, y: -60, tone: "secondary" },
        { id: "db", label: "PostgreSQL (record lifecycle)", x: 540, y: 80, tone: "neutral" },
        { id: "automation", label: "Lifecycle Automation", x: 800, y: 80, tone: "accent" },
      ],
      edges: [
        { id: "e1", source: "teams", target: "api", tone: "neutral" },
        { id: "e2", source: "swagger", target: "api", tone: "secondary" },
        { id: "e3", source: "api", target: "db", tone: "accent" },
        { id: "e4", source: "db", target: "automation", tone: "accent" },
        { id: "e5", source: "automation", target: "teams", tone: "neutral" },
      ],
    },
    engineeringDecisions: [
      {
        title: "API contract before integration",
        detail:
          "Documented all 11 endpoints in Swagger early so consuming teams could build against a stable contract in parallel, instead of waiting on the implementation or integrating against undocumented behavior.",
      },
      {
        title: "Relational modeling of lifecycle state",
        detail:
          "Chose PostgreSQL to model DNS record state and transitions with real constraints, replacing a workflow where state effectively lived in ticket history rather than a queryable system of record.",
      },
      {
        title: "Automate the highest-friction workflows first",
        detail:
          "Scoped the first three production features around the manual ticket types that created the most provisioning delay, rather than trying to automate the entire legacy surface area at once.",
      },
    ],
    metrics: [
      { label: "Provisioning time", value: "-70%" },
      { label: "Automated requests / day", value: "100+" },
      { label: "Documented endpoints", value: "11" },
      { label: "Production features shipped", value: "3" },
    ],
    techStack: ["Python", "Flask", "PostgreSQL", "REST / Swagger (OpenAPI)", "Git / Gerrit", "Linux"],
    lessons: [
      "Shipping inside a large, compliance-conscious enterprise environment rewards API-first design — a clear contract unblocks other teams faster than a clever implementation does.",
      "Automation only pays off if it targets the highest-friction manual steps first; scoping matters as much as engineering the automation itself.",
      "A relational system of record for lifecycle state makes a system auditable in a way ticket-tracked state never can be.",
    ],
    githubNote: "Internal to American Express — source and infrastructure are confidential.",
  },
  {
    slug: "biomedical-rag",
    name: "Biomedical RAG",
    tagline: "Retrieval-augmented QA over BioASQ",
    status: "research",
    statusLabel: "Research",
    oneLiner:
      "A retrieval-augmented generation pipeline evaluated end-to-end on biomedical question answering, isolating retrieval quality from generation quality.",
    overview:
      "A RAG system built and evaluated against the BioASQ biomedical QA benchmark, directly comparing context-free generation to retrieval-grounded generation to test whether grounding actually improves answer quality rather than assuming it does.",
    problem:
      "LLMs answer biomedical questions fluently but can hallucinate facts with high confidence. Before trusting retrieval-augmented generation for a domain like biomedicine, you need a measurable way to test whether grounding generation in retrieved literature passages actually improves answer quality — and whether retrieval itself is finding the right passages in the first place.",
    solution:
      "Built a three-stage evaluation pipeline: (a) a context-free baseline that prompts the model directly and scores answers with BLEU, (b) a dense retrieval stage that embeds the full BioASQ text corpus, retrieves the top-5 passages per question by cosine similarity, and scores retrieval quality with precision/recall/F1@5 against gold relevant passages, and (c) a context-aware generation stage that conditions the model on those retrieved passages and scores the result with BLEU again — enabling a direct (a) vs (c) comparison.",
    architecture: [
      "Local LLM serving via Ollama running Llama-3.2-1B-Instruct (GGUF) for answer generation.",
      "BGE-base-en-v1.5 (GGUF) for passage and query embeddings.",
      "In-memory cosine-similarity retrieval over the BioASQ text-corpus subset, with passage embeddings cached to disk to avoid recomputing the slowest step on every run.",
      "BLEU scoring with smoothing (BioASQ gold answers are short, and unsmoothed BLEU collapses toward zero on short sequences).",
      "Retrieval evaluated independently via precision / recall / F1@5 against the dataset's labeled relevant-passage ids.",
    ],
    diagram: {
      nodes: [
        { id: "question", label: "Biomedical Question", x: 0, y: 80, tone: "neutral" },
        { id: "cf", label: "Context-Free Prompt", x: 240, y: 0, tone: "neutral" },
        { id: "embed", label: "Query Embedding (BGE)", x: 240, y: 160, tone: "secondary" },
        { id: "retrieve", label: "Cosine-Similarity Retrieval", x: 480, y: 160, tone: "secondary" },
        { id: "top5", label: "Top-5 Passages", x: 720, y: 160, tone: "secondary" },
        { id: "ca", label: "Context-Aware Prompt", x: 720, y: 40, tone: "neutral" },
        { id: "llm", label: "Llama 3.2 1B (Ollama)", x: 960, y: 100, tone: "accent" },
        { id: "eval", label: "BLEU + Precision/Recall/F1@5", x: 1200, y: 100, tone: "accent" },
      ],
      edges: [
        { id: "e1", source: "question", target: "cf", tone: "neutral" },
        { id: "e2", source: "question", target: "embed", tone: "secondary" },
        { id: "e3", source: "embed", target: "retrieve", tone: "secondary" },
        { id: "e4", source: "retrieve", target: "top5", tone: "secondary" },
        { id: "e5", source: "top5", target: "ca", tone: "secondary" },
        { id: "e6", source: "cf", target: "llm", tone: "neutral" },
        { id: "e7", source: "ca", target: "llm", tone: "neutral" },
        { id: "e8", source: "llm", target: "eval", tone: "accent" },
        { id: "e9", source: "top5", target: "eval", tone: "accent" },
      ],
    },
    engineeringDecisions: [
      {
        title: "Cache embeddings to disk",
        detail:
          "Embedding the full text corpus is the slowest step by far. Caching it once to disk instead of recomputing it on every run made iteration on retrieval and prompting fast.",
      },
      {
        title: "Smoothed BLEU for short gold answers",
        detail:
          "BioASQ's human answers are short, and standard BLEU collapses to zero on short sequences with limited n-gram overlap. Smoothing was necessary to get a meaningful generation-quality signal at all.",
      },
      {
        title: "Separate retrieval metrics from generation metrics",
        detail:
          "Precision/recall/F1@5 evaluates retrieval independently of BLEU on generation, because a RAG system can retrieve well and still generate poorly, or the reverse — collapsing both into one number would hide which stage is failing.",
      },
      {
        title: "Local model serving via Ollama",
        detail:
          "Ran generation and embeddings against local models through Ollama instead of a hosted API, keeping the evaluation reproducible and free to rerun.",
      },
    ],
    metrics: [
      { label: "Evaluation axes", value: "3" },
      { label: "Retrieved passages / query", value: "Top-5" },
      { label: "Generation metric", value: "BLEU (smoothed)" },
      { label: "Retrieval metrics", value: "P / R / F1@5" },
    ],
    techStack: ["Python", "Ollama", "Llama 3.2 1B Instruct", "BGE Embeddings", "NumPy / pandas", "NLTK (BLEU)"],
    lessons: [
      "Retrieval quality and generation quality are separate failure modes that need separate metrics — a single end-to-end score hides which stage of a RAG pipeline is actually underperforming.",
      "Short-answer biomedical QA punishes naive n-gram metrics like BLEU unless you smooth them; the evaluation method matters as much as the pipeline it's measuring.",
      "Caching the expensive step (corpus embedding) early made every later iteration on retrieval and prompting dramatically faster to test.",
    ],
    githubNote: "Coursework research notebook — not yet published to a public repository.",
  },
  {
    slug: "fairness-aware-asr",
    name: "Fairness-Aware ASR Fine-Tuning",
    tagline: "Closing gender performance gaps in multilingual speech recognition",
    status: "research",
    statusLabel: "Research",
    oneLiner:
      "LoRA fine-tuning of Whisper on FLEURS, paired with an evaluation framework built specifically to measure gender-based WER disparities across language families.",
    overview:
      "UCLA research project fine-tuning OpenAI's Whisper with LoRA on the multilingual FLEURS dataset, with an evaluation harness purpose-built to surface gender-based Word Error Rate (WER) disparities rather than just reporting aggregate accuracy.",
    problem:
      "ASR systems are known to perform unevenly across demographic groups, but before you can close a fairness gap you first have to measure it reliably — across languages and genders — and confirm that fine-tuning actually narrows the gap rather than just improving average WER while leaving the disparity intact.",
    solution:
      "Fine-tuned Whisper with LoRA (parameter-efficient adapters on frozen base weights) across language groups spanning eight language families in FLEURS, then built a gender-stratified WER evaluation framework comparing baseline versus fine-tuned checkpoints — deliberately sliced by language family rather than only in aggregate, since averaging across very different language families can hide exactly the disparities the project set out to measure.",
    architecture: [
      "Whisper encoder-decoder backbone with LoRA adapters injected into attention layers; base weights frozen, only low-rank deltas trained.",
      "Config-driven per-language-family fine-tuning (Germanic, Slavic, Romance, Bantu, Niger-Congo, Japonic, Uralic, Semitic groups) via YAML language configs.",
      "Batch transcription pipeline for baseline and fine-tuned checkpoints across the FLEURS multilingual test sets.",
      "Gender-stratified WER aggregation using the dataset's gender labels, compared baseline vs. fine-tuned per language family.",
    ],
    diagram: {
      nodes: [
        { id: "fleurs", label: "FLEURS Audio + Gender Labels", x: 0, y: 80, tone: "neutral" },
        { id: "encoder", label: "Whisper Encoder (frozen)", x: 260, y: 80, tone: "neutral" },
        { id: "lora", label: "LoRA Adapters (trainable)", x: 260, y: -60, tone: "accent" },
        { id: "decoder", label: "Whisper Decoder", x: 520, y: 80, tone: "neutral" },
        { id: "transcript", label: "Transcription", x: 760, y: 80, tone: "neutral" },
        { id: "wer", label: "WER by Gender × Language Family", x: 1000, y: 80, tone: "secondary" },
        { id: "compare", label: "Baseline vs Fine-Tuned", x: 1240, y: 80, tone: "accent" },
      ],
      edges: [
        { id: "e1", source: "fleurs", target: "encoder", tone: "neutral" },
        { id: "e2", source: "lora", target: "decoder", tone: "accent" },
        { id: "e3", source: "encoder", target: "decoder", tone: "neutral" },
        { id: "e4", source: "decoder", target: "transcript", tone: "neutral" },
        { id: "e5", source: "transcript", target: "wer", tone: "secondary" },
        { id: "e6", source: "wer", target: "compare", tone: "accent" },
      ],
    },
    engineeringDecisions: [
      {
        title: "LoRA over full fine-tuning",
        detail:
          "Full fine-tuning across many languages was not tractable on available compute. LoRA adapters kept multilingual experimentation feasible while still meaningfully adapting the model.",
      },
      {
        title: "Evaluate within language families, not just in aggregate",
        detail:
          "Averaging WER across very different language families can hide real disparities. Slicing evaluation by family surfaced gaps that an aggregate WER number would have masked.",
      },
      {
        title: "Baseline vs. fine-tuned as the core experimental design",
        detail:
          "Kept a strict baseline-vs-fine-tuned comparison structure so any WER or fairness-gap change could be attributed to fine-tuning itself, not to dataset shift or evaluation noise.",
      },
    ],
    metrics: [
      { label: "Language families evaluated", value: "8" },
      { label: "Languages in config", value: "~19" },
      { label: "Fine-tuning method", value: "LoRA" },
      { label: "Primary fairness metric", value: "Gender-stratified WER" },
    ],
    techStack: ["Python", "Hugging Face Transformers", "PEFT / LoRA", "Whisper", "FLEURS", "PyTorch"],
    lessons: [
      "Fairness evaluation has to be a first-class part of the pipeline, not a post-hoc audit — the language-family-grouped config made it easy to slice results in ways aggregate WER would have hidden.",
      "Parameter-efficient fine-tuning (LoRA) made it feasible to iterate across many languages without the cost of full retraining per language group.",
    ],
    githubNote: "UCLA research repository — not yet published under a personal account.",
  },
];

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((product) => product.slug === slug);
}
