export interface OtherBuild {
  name: string;
  description: string;
  stack: string[];
  github: string;
}

export const OTHER_BUILDS: OtherBuild[] = [
  {
    name: "RISC-V PipelineSim",
    description: "A C++ simulator for a 5-stage pipelined RISC-V CPU implementing the RV32-I instruction set.",
    stack: ["C++"],
    github: "https://github.com/anushkanayak15/RISC-V-PipelineSim-A-5-Stage-Pipelined-RISC-V-CPU-Simulator",
  },
  {
    name: "Recommender System",
    description: "A data-mining competition platform where recommendation algorithms compete to maximize simulated revenue across multi-iteration learning rounds.",
    stack: ["Python", "Sim4Rec"],
    github: "https://github.com/anushkanayak15/Recommender-System",
  },
  {
    name: "Brewin Interpreter",
    description: "An interpreter for a custom programming language, built across a multi-part UCLA programming languages course project.",
    stack: ["Python"],
    github: "https://github.com/anushkanayak15/Brewin-Interpreter",
  },
  {
    name: "Song Popularity Prediction",
    description: "Predicting Spotify track popularity from audio features across 114K tracks using forward feature selection and a random forest classifier.",
    stack: ["Python", "scikit-learn"],
    github: "https://github.com/anushkanayak15/Song-Popularity-Prediction-Model",
  },
];
