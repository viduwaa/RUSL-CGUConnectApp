// Job-related TypeScript interfaces

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  contractType: "Full-time" | "Part-time" | "Contract" | "Internship";
  salary?: string;
  postedDate: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  companyInfo: string;
  isBookmarked: boolean;
}

export type ContractType = Job["contractType"];
