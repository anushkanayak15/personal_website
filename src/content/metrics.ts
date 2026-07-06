import { TOTAL_TECHNOLOGIES } from "./skills";

export interface HomeMetric {
  label: string;
  value: number;
  suffix?: string;
  trend?: string;
  tooltip: string;
}

export const HOME_METRICS: HomeMetric[] = [
  {
    label: "Projects built",
    value: 7,
    tooltip: "GrowthOS, Amex DNS Platform, Biomedical RAG, Fairness-Aware ASR, sEMG Decoding, Encoded Inequality, Relevant Priors",
  },
  {
    label: "Production systems",
    value: 2,
    tooltip: "Amex DNS Platform (enterprise) + GrowthOS (deployed live)",
  },
  {
    label: "Research projects",
    value: 5,
    tooltip: "Biomedical RAG, Fairness-Aware ASR, sEMG Decoding, Encoded Inequality, Relevant Priors",
  },
  {
    label: "AI models trained",
    value: 5,
    tooltip: "Whisper + LoRA, CNN + BiLSTM + CTC, FastText, Logistic Regression, Llama 3.2 1B",
  },
  {
    label: "Internships",
    value: 3,
    tooltip: "American Express, Ernst & Young, Boericke Research Laboratory",
  },
  {
    label: "Technologies",
    value: TOTAL_TECHNOLOGIES,
    suffix: "+",
    tooltip: "Counted from the Systems & Stack skill list below",
  },
];
