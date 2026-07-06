export interface ExperienceEntry {
  slug: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  stack: string[];
  featured?: boolean;
  productSlug?: string;
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    slug: "american-express",
    company: "American Express",
    role: "Software Engineering Intern — Distributed Infra & Data Services",
    period: "Jun 2025 — Aug 2025",
    summary:
      "Owned the design and delivery of a production API that replaced a legacy, ticket-driven DNS provisioning platform.",
    highlights: [
      "Designed and deployed a production Flask + PostgreSQL API replacing a legacy DNS platform, cutting provisioning time by 70% and supporting 100+ automated requests/day.",
      "Defined the API contract and documented 11 RESTful endpoints in Swagger, improving scalability and cross-team adoption.",
      "Shipped 3 production features automating the DNS record lifecycle, eliminating manual provisioning tickets for teams.",
    ],
    stack: ["Python", "Flask", "PostgreSQL", "Swagger", "Gerrit"],
    featured: true,
    productSlug: "amex-dns-platform",
  },
  {
    slug: "ernst-and-young",
    company: "Ernst & Young",
    role: "Data Analysis and Solutions Intern",
    period: "Jul 2024 — Sep 2024",
    summary:
      "Built and hardened Python automation pipelines that replaced manual reporting work across large client datasets.",
    highlights: [
      "Developed 5 Python automation pipelines for reporting and processing large client datasets, saving 15+ hours/week and improving team productivity by 35%.",
      "Trained regression, clustering, and decision tree models on 200K+ records to inform client resource allocation strategy.",
      "Hardened pipelines with preprocessing and validation layers, reducing downstream reporting errors.",
    ],
    stack: ["Python", "scikit-learn", "SQL"],
  },
  {
    slug: "boericke-research-laboratory",
    company: "Boericke Research Laboratory",
    role: "Business Intelligence Analyst Intern",
    period: "Jun 2023 — Sep 2023",
    summary:
      "Shipped supply-chain dashboards and rebuilt the e-commerce front end to reduce overstocking costs and bounce rate.",
    highlights: [
      "Built Tableau dashboards integrated with SQL data sources to track supply chain KPIs, reducing overstocking costs by 15%.",
      "Revamped the e-commerce platform using HTML, CSS, and JavaScript, boosting engagement by 20% and reducing bounce rate by 18%.",
    ],
    stack: ["Tableau", "SQL", "JavaScript"],
  },
];

export interface InvolvementEntry {
  organization: string;
  role: string;
  period: string;
  detail: string;
}

export const INVOLVEMENT: InvolvementEntry[] = [
  {
    organization: "UCLA Computer Science Department",
    role: "Undergraduate Reader",
    period: "Jul 2025 — Jun 2026",
    detail:
      "Defined grading standards and partnered with faculty to streamline evaluation of programming labs for 100+ students.",
  },
  {
    organization: "ACM-W UCLA",
    role: "External Officer",
    period: "Sep 2024 — Jun 2026",
    detail: "Led and moderated an industry panel with FAANG speakers, engaging 60+ attendees.",
  },
  {
    organization: "National Students Data Corps UCLA",
    role: "Board Advisor",
    period: "Sep 2023 — Jun 2026",
    detail:
      "Scaled membership from 50 to 850+ through data-driven growth initiatives; led a website redesign that grew traffic 30% in two months.",
  },
];
