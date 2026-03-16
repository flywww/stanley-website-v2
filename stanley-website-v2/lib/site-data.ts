export type Metric = {
  value: string;
  label: string;
};

export type Skill = {
  title: string;
  description: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  time: string;
  bullets: string[];
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  name: string;
  featured: boolean;
  featuredImage?: string;
  gridImage: string;
  gallery: GalleryImage[];
  brief: string;
  roleTags: string[];
  contributionTags: string[];
  problem: string[];
  solution: string[];
  outcome: string[];
  capabilities: string[];
  related: string[];
};

export const siteMeta = {
  name: "Stanley Lin",
  title: "Product team lead",
  siteUrl: "https://stanley004.com",
  avatar: "/images/profile/stanley-lin.jpeg",
  defaultOgImage: "/images/projects/medistation/platform.jpg",
  eyebrow: "Product team lead",
  headline: "I build thoughtful products with product strategy and engineering depth.",
  intro:
    "Product leader with design and engineering depth, building practical products across medical and software environments from strategy to delivery.",
  email: "flywww004@gmail.com",
  location: "New Taipei City, Taiwan",
  linkedin: "https://www.linkedin.com/in/stanley004/",
  github: "https://github.com/flywww",
  x: "https://x.com/flywww004s",
  footerHeadline: "Let's build a great product for the world!",
};

export const metrics: Metric[] = [
  { value: "12", label: "years of experience" },
  { value: "15", label: "products complete" },
  { value: "5", label: "invention patents" },
];

export const keySkills: Skill[] = [
  {
    title: "Front-end development",
    description: "Building front-end with React and Next.js.",
  },
  {
    title: "Back-end development",
    description: "Building back-end services with Node.js and Express.js.",
  },
  {
    title: "Product strategy",
    description: "Build vision, mission, and roadmap for products.",
  },
  {
    title: "Product planning",
    description: "Plan and manage products from the ground up.",
  },
];

export const experienceHighlights: ExperienceItem[] = [
  {
    company: "Twin Beans",
    role: "Product Director",
    time: "2018-present",
    bullets: [
      "recruited and established a software agile development team from scratch",
      "led a product team of 6+ members",
      "formulated product strategies and increased project value significantly",
      "designed products across Windows, Web, and Mobile",
    ],
  },
  {
    company: "ATOM Health",
    role: "Medical device engineer",
    time: "2015-2017",
    bullets: [
      "developed medical device firmware and hardware",
      "worked on ECG and health-monitoring products",
    ],
  },
  {
    company: "NeeMe Technologies",
    role: "Co-founder, Product Manager",
    time: "2014-2015",
    bullets: [
      "built a team from scratch",
      "independently designed and developed the CaloShop iOS app",
    ],
  },
  {
    company: "ARKNAV International",
    role: "Electronics engineer, project manager",
    time: "2011-2014",
    bullets: [
      "developed ECG heart-rate products used in hospitals",
      "worked across electronics engineering and project management",
    ],
  },
];

export const projectsPage = {
  title: "Selected product work",
};

export const contactPage = {
  title: "Let’s connect",
  intro:
    "If you want to discuss product work, collaboration, or opportunities, the easiest path is email or LinkedIn.",
};

export const products: Project[] = [
  {
    slug: "medireco",
    name: "MEDIRECO",
    featured: true,
    featuredImage: "/images/projects/medireco/hero.png",
    gridImage: "/images/projects/medireco/hero.png",
    gallery: [
      { src: "/images/projects/medireco/hero.png", alt: "MEDIRECO product hero" },
      { src: "/images/projects/medireco/ui.jpeg", alt: "MEDIRECO UI" },
      { src: "/images/projects/medireco/hardware.png", alt: "MEDIRECO hardware" },
      { src: "/images/projects/medireco/3600x2000-03.jpg", alt: "MEDIRECO operating room overview" },
    ],
    brief:
      "MEDIRECO is an operating-room recording and integration system that captures surgical video and key signals so physicians can review and manage cases from multiple perspectives.",
    roleTags: ["Product strategy", "Roadmap", "UX/UI", "Specs"],
    contributionTags: ["First integrated surgical recording product in Taiwan"],
    problem: [
      "operating rooms needed a reliable way to record crucial surgical video and related information in one system",
      "physicians needed a safer review and management workflow after surgery",
    ],
    solution: [
      "built a black-box style surgical recording product",
      "defined product strategy and roadmap",
      "prioritized user requirements, ran agile development, researched users, planned UX/UI, and wrote specs",
    ],
    outcome: [
      "flagship product contributing to over 70% of company revenue",
      "installed in 80+ operating rooms nationwide",
      "adopted by 70% of medical center-level hospitals in Taiwan",
    ],
    capabilities: [
      "product strategy",
      "roadmap planning",
      "UX/UI design",
      "specs writing",
      "agile team leadership",
      "medical-device workflow integration",
    ],
    related: ["medistation", "medimeet"],
  },
  {
    slug: "medistation",
    name: "MEDISTATION",
    featured: true,
    featuredImage: "/images/projects/medistation/platform.jpg",
    gridImage: "/images/projects/medistation/platform.jpg",
    gallery: [
      { src: "/images/projects/medistation/platform.jpg", alt: "MEDISTATION platform overview" },
      { src: "/images/projects/medistation/data-analysis.png", alt: "MEDISTATION data analysis screen" },
      { src: "/images/projects/medistation/ui-desktop.png", alt: "MEDISTATION desktop interface" },
      { src: "/images/projects/medistation/ui-mobile.png", alt: "MEDISTATION mobile interface" },
      { src: "/images/projects/medistation/ui-ipad.png", alt: "MEDISTATION iPad interface" },
    ],
    brief:
      "MEDISTATION lets physicians study and manage surgical cases before and after operations from anywhere.",
    roleTags: ["Product strategy", "Roadmap", "UX/UI", "Agile lead"],
    contributionTags: ["Scaled projects from room-level installs to hospital-wide deals"],
    problem: [
      "hospitals needed a better way to organize and revisit recorded surgical cases",
      "physicians needed remote access to cases for study and preparation",
    ],
    solution: [
      "built a medical video management platform across web and multi-device workflows",
      "handled product strategy, roadmap, user prioritization, UX/UI planning, specs, and agile execution",
    ],
    outcome: [
      "enabled the company to plan large-scale projects for entire hospitals",
      "increased project value from about 1 million to over 5 million dollars",
    ],
    capabilities: [
      "product strategy",
      "UX/UI planning",
      "project management",
      "multi-device product design",
      "agile delivery",
    ],
    related: ["medireco", "medimeet"],
  },
  {
    slug: "medimeet",
    name: "MEDIMEET",
    featured: true,
    featuredImage: "/images/projects/medimeet/hero.png",
    gridImage: "/images/projects/medimeet/hero.png",
    gallery: [
      { src: "/images/projects/medimeet/hero.png", alt: "MEDIMEET product hero" },
      { src: "/images/projects/medimeet/on-tablet.jpg", alt: "MEDIMEET on tablet" },
      { src: "/images/projects/medimeet/main-page.png", alt: "MEDIMEET main page" },
      { src: "/images/projects/medimeet/or-list-page.png", alt: "MEDIMEET operating room list page" },
    ],
    brief:
      "MEDIMEET provides remote surgical streaming so doctors can teach, study, and discuss cases without being physically in the operating room.",
    roleTags: ["Product strategy", "Roadmap", "UX/UI", "Agile lead"],
    contributionTags: ["43 online live-surgery events by 2023"],
    problem: [
      "surgical teaching and case discussion were limited by location and room access",
      "hospitals needed a remote observation workflow that still fit medical use",
    ],
    solution: [
      "planned and shaped a teleconsultation and remote surgical streaming product",
      "covered strategy, roadmap, user requirements, research, UX/UI planning, specs, and agile process",
    ],
    outcome: [
      "43 online live-surgery events organized by 2023",
      "over 10 operating rooms using MEDIMEET",
    ],
    capabilities: [
      "product strategy",
      "remote-collaboration workflow design",
      "UX/UI planning",
      "project management",
      "agile delivery",
    ],
    related: ["medireco", "medistation"],
  },
  {
    slug: "mocaheart",
    name: "MOCAheart / MOCACare",
    featured: true,
    featuredImage: "/images/projects/mocaheart/hero.webp",
    gridImage: "/images/projects/mocaheart/hero.webp",
    gallery: [
      { src: "/images/projects/mocaheart/hero.webp", alt: "MOCAheart product hero" },
      { src: "/images/projects/mocaheart/ios-android.png", alt: "MOCACare iOS and Android app screens" },
      { src: "/images/projects/mocaheart/app.png", alt: "MOCAheart app screen" },
    ],
    brief:
      "MOCAheart is an all-in-one smart heart tracker that measures heart rate, blood oxygen, and pulse-wave related signals through a connected device and mobile app.",
    roleTags: ["iOS app process", "iOS app", "Firmware"],
    contributionTags: ["Resolved Bluetooth ECG packet loss", "Shipped in the US"],
    problem: [
      "users needed a simpler consumer-facing way to measure heart-related vital signs outside clinical settings",
      "the product needed reliable software and hardware integration for connected measurement",
    ],
    solution: [
      "built the iOS app process",
      "developed the iOS app for both China and the USA",
      "developed firmware for the device",
    ],
    outcome: [
      "resolved random Bluetooth EKG packet drops caused by software and hardware integration issues",
      "app available in the United States with over 1000 users as of 2017",
    ],
    capabilities: [
      "iOS development",
      "firmware development",
      "connected-device integration",
      "consumer product implementation",
    ],
    related: ["jdm", "mocacare-medical"],
  },
  {
    slug: "jdm",
    name: "JDM",
    featured: false,
    gridImage: "/images/projects/jdm/hero.png",
    gallery: [{ src: "/images/projects/jdm/hero.png", alt: "JDM product screen" }],
    brief:
      "JDM is a portable device that lets users monitor blood oxygen, EKG, and blood pressure anytime through a connected app experience.",
    roleTags: ["iOS app process", "iOS app"],
    contributionTags: ["Fixed Bluetooth EKG packet drops", "500+ users"],
    problem: [
      "users needed a portable vital-sign product that worked reliably in daily use",
      "the app and device connection had stability issues during ECG data transfer",
    ],
    solution: [
      "built the iOS app development process",
      "developed the iOS app",
    ],
    outcome: [
      "resolved the software and hardware integration issue causing random Bluetooth EKG packet drops",
      "app available in China with over 500 users as of 2017",
    ],
    capabilities: [
      "iOS development",
      "Bluetooth integration",
      "mobile product implementation",
      "device/app troubleshooting",
    ],
    related: ["mocaheart", "mocacare-medical"],
  },
  {
    slug: "ekardia",
    name: "eKARDIA",
    featured: false,
    gridImage: "/images/projects/ekardia/hero.png",
    gallery: [{ src: "/images/projects/ekardia/hero.png", alt: "eKARDIA device" }],
    brief:
      "Portable ECG measurement system for hospital patients, designed to measure ECG and detect falls in care environments.",
    roleTags: ["Hardware", "Firmware", "ECG algorithm"],
    contributionTags: ["Passed medical-grade safety testing"],
    problem: [
      "hospitals needed portable ECG monitoring with safety and reliability appropriate for patient care",
      "the system needed device intelligence beyond basic signal capture",
    ],
    solution: [
      "designed hardware and firmware",
      "independently developed the heart-rhythm algorithm",
    ],
    outcome: [
      "passed medical-grade safety standards tests for both software and hardware",
      "deployed in a hospital to reduce patient-monitoring burden",
    ],
    capabilities: [
      "hardware design",
      "firmware development",
      "ECG algorithm development",
      "hospital-device implementation",
    ],
    related: ["jdm", "mocaheart"],
  },
  {
    slug: "caloshop",
    name: "CaloShop",
    featured: false,
    gridImage: "/images/projects/caloshop/hero.png",
    gallery: [
      { src: "/images/projects/caloshop/hero.png", alt: "CaloShop product hero" },
      { src: "/images/projects/caloshop/main-page.png", alt: "CaloShop main page" },
      { src: "/images/projects/caloshop/product-page.jpg", alt: "CaloShop product page" },
      { src: "/images/projects/caloshop/workout-video.jpg", alt: "CaloShop workout video still" },
    ],
    brief:
      "CaloShop combines fitness tracking and shopping by turning recorded exercise calories into marketplace discounts.",
    roleTags: ["Co-founder", "PM", "iOS developer"],
    contributionTags: ["Built and shipped independently to the App Store"],
    problem: [
      "fitness apps and shopping apps were separate experiences, with little direct motivation loop between them",
      "the product needed both a consumer concept and an executable first version",
    ],
    solution: [
      "built and led a small team with marketing and product functions",
      "developed the iOS app",
      "planned and designed the UX/UI",
    ],
    outcome: ["independently developed the iOS app and launched it on the App Store"],
    capabilities: [
      "product design",
      "product planning",
      "iOS development",
      "early-stage team building",
    ],
    related: ["jdm", "mocaheart"],
  },
  {
    slug: "mocacare-medical",
    name: "MOCACare medical version",
    featured: false,
    gridImage: "/images/projects/mocacare-medical/hero.png",
    gallery: [{ src: "/images/projects/mocacare-medical/hero.png", alt: "MOCACare medical version screen" }],
    brief:
      "Medical-use monitoring variant connected to the MOCACare product line, positioned closer to clinical monitoring scenarios than the consumer app.",
    roleTags: ["Mobile app", "Firmware", "Product adaptation"],
    contributionTags: ["Adapted portable monitoring experience toward clinical use"],
    problem: [
      "consumer monitoring patterns did not fully match hospital and medical-use workflows",
      "the product line needed a more clinical version for deployment-oriented scenarios",
    ],
    solution: [
      "extended mobile and device-side monitoring experience toward medical-use requirements",
      "reused heart-monitoring product knowledge in a more clinical direction",
    ],
    outcome: ["keep this page public-safe and concise until more source-backed material is confirmed"],
    capabilities: [
      "mobile product adaptation",
      "firmware coordination",
      "clinical workflow translation",
    ],
    related: ["mocaheart", "jdm"],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProjects(slugs: string[]) {
  return slugs
    .map((slug) => getProduct(slug))
    .filter((project): project is Project => Boolean(project));
}
