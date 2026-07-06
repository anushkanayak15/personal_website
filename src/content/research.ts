export interface ModelCardResult {
  metric: string;
  value: string;
}

export interface ModelCard {
  slug: string;
  name: string;
  summary: string;
  dataset: string;
  models: string[];
  evaluation: string;
  pipeline: string[];
  results: ModelCardResult[];
  tags: string[];
  github?: string;
  githubNote?: string;
  productSlug?: string;
}

export const MODEL_CARDS: ModelCard[] = [
  {
    slug: "fairness-aware-asr",
    name: "Fairness-Aware ASR Fine-Tuning",
    summary:
      "LoRA fine-tuning of Whisper on FLEURS, evaluated for gender-based WER disparities across eight language families.",
    dataset: "FLEURS (multilingual speech, ~19 languages across 8 language families, gender-labeled)",
    models: ["Whisper (baseline)", "Whisper + LoRA (fine-tuned)"],
    evaluation: "Gender-stratified Word Error Rate (WER), sliced by language family, baseline vs. fine-tuned",
    pipeline: [
      "Load FLEURS audio + gender labels per language family",
      "Fine-tune Whisper with LoRA adapters (frozen base weights)",
      "Batch transcription across baseline and fine-tuned checkpoints",
      "Aggregate WER split by gender × language family",
      "Compare baseline vs. fine-tuned disparity, not just average WER",
    ],
    results: [
      { metric: "Language families evaluated", value: "8" },
      { metric: "Languages covered", value: "~19" },
      { metric: "Fine-tuning method", value: "LoRA" },
    ],
    tags: ["Speech", "Fairness", "LoRA", "Hugging Face"],
    githubNote: "UCLA research repository — not yet published under a personal account.",
    productSlug: "fairness-aware-asr",
  },
  {
    slug: "semg-keystroke-decoding",
    name: "sEMG Keystroke Decoding",
    summary:
      "Decoding QWERTY keystrokes from surface EMG signals using CNN + BiLSTM + CTC, benchmarked against RNN, BiLSTM, and Transformer baselines.",
    dataset: "emg2qwerty (Meta Reality Labs) — 32-channel surface EMG, single subject (#89335547)",
    models: ["TDS Conv (baseline)", "Vanilla RNN", "BiLSTM", "Transformer", "CNN + BiLSTM (final)"],
    evaluation: "Character Error Rate (CER) via CTC decoding, validated across systematic architecture ablations",
    pipeline: [
      "Spectrogram-based preprocessing of raw sEMG signal",
      "Data augmentation: Gaussian noise, amplitude scaling, channel dropout, temporal masking",
      "CNN frontend (depth-ablated: 1–3 blocks) feeding a BiLSTM encoder",
      "CTC loss for sequence decoding to character output",
      "Grid search over dropout, learning rate, and LR scheduler (27 configurations)",
      "Extended 250-epoch training run on the selected architecture",
    ],
    results: [
      { metric: "Baseline CER (TDS Conv)", value: "30%" },
      { metric: "Final model CER (CNN + BiLSTM)", value: "15.5%" },
      { metric: "Best standalone sequential model", value: "BiLSTM" },
    ],
    tags: ["PyTorch Lightning", "CNN", "BiLSTM", "CTC", "Signal Processing"],
    github: "https://github.com/anushkanayak15/semg-keystroke-decoding",
  },
  {
    slug: "encoded-inequality",
    name: "Encoded Inequality — Gender Bias in Language Models",
    summary:
      "Measuring gender-coded language in job postings across seniority levels using FastText embeddings and the Word Embedding Association Test.",
    dataset:
      "Controlled synthetic job postings (4 seniority levels) + real-world LinkedIn Job Postings 2023–2024 (Kaggle)",
    models: ["FastText embeddings (trained per seniority group)"],
    evaluation: "WEAT (Word Embedding Association Test) effect sizes + lexicon-based gendered-term counts",
    pipeline: [
      "Data cleaning and seniority grouping (Entry / Mid / Senior / Leadership)",
      "Train separate FastText embeddings per seniority group",
      "Run WEAT to measure association between gendered terms and career concepts",
      "Cross-check with lexicon-based masculine/feminine term counts",
      "Repeat methodology on real-world LinkedIn postings for generalizability, with robustness checks",
    ],
    results: [
      { metric: "Experiments run", value: "2 (synthetic + real-world)" },
      { metric: "Seniority levels compared", value: "4" },
      { metric: "Method", value: "WEAT + lexicon analysis" },
    ],
    tags: ["NLP", "FastText", "WEAT", "Bias Auditing"],
    github: "https://github.com/anushkanayak15/encoded-inequality",
  },
  {
    slug: "relevant-priors",
    name: "Relevant Priors — Radiology Study Classifier",
    summary:
      "Predicting whether a prior radiology exam should be surfaced to a radiologist reading a current exam, framed as supervised binary classification.",
    dataset: "Current/prior radiology study description pairs — full public evaluation set of 27,614 pairs",
    models: ["Rule-based baseline (modality/anatomy heuristics)", "Logistic Regression + TF-IDF (final)"],
    evaluation: "Grouped validation by case (to prevent leakage) + full public evaluation set",
    pipeline: [
      "Engineer TF-IDF features over current/prior description pairs",
      "Add modality match, anatomy overlap, exact match, word overlap, Jaccard similarity features",
      "Train logistic regression classifier on engineered features",
      "Tune decision threshold on validation split (optimal: 0.71)",
      "Share feature logic between training and inference to avoid train/serve drift",
    ],
    results: [
      { metric: "Grouped validation accuracy", value: "94.77%" },
      { metric: "Full public evaluation accuracy", value: "96.40%" },
      { metric: "Correct predictions", value: "26,621 / 27,614" },
    ],
    tags: ["Healthcare ML", "TF-IDF", "Logistic Regression", "Clinical Decision Support"],
    github: "https://github.com/anushkanayak15/relevant-priors",
  },
];
