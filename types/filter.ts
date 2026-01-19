// Filter-related TypeScript interfaces

import type { ContractType } from "./job";

export interface JobFilters {
  contractTypes: ContractType[];
  location: string;
}

export const defaultJobFilters: JobFilters = {
  contractTypes: [],
  location: "",
};

export const CONTRACT_TYPE_OPTIONS: ContractType[] = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];
