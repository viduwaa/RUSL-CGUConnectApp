import type { Job } from "@/types/job";

// Favorite Companies
export interface FavoriteCompany {
  id: string;
  name: string;
  industry: string;
  logo: string;
  location: string;
  openJobs: number;
  followers: string;
  isFollowing: boolean;
}

export const mockFavoriteCompanies: FavoriteCompany[] = [
  {
    id: "1",
    name: "WSO2",
    industry: "Software",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=WSO2&backgroundColor=FF6B35",
    location: "Colombo, Sri Lanka",
    openJobs: 12,
    followers: "25K",
    isFollowing: true,
  },
  {
    id: "2",
    name: "TechVentures Lanka",
    industry: "Tech",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=TVL&backgroundColor=4ECDC4",
    location: "Colombo 03, Sri Lanka",
    openJobs: 8,
    followers: "15K",
    isFollowing: true,
  },
  {
    id: "3",
    name: "Dialog Axiata",
    industry: "Telecom",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=DLG&backgroundColor=FF6384",
    location: "Colombo, Sri Lanka",
    openJobs: 15,
    followers: "120K",
    isFollowing: true,
  },
  {
    id: "4",
    name: "Virtusa",
    industry: "IT Services",
    logo: "https://api.dicebear.com/7.x/initials/png?seed=VRT&backgroundColor=36A2EB",
    location: "Colombo, Sri Lanka",
    openJobs: 20,
    followers: "85K",
    isFollowing: true,
  },
];

// Job Applications
export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyLogo: string;
  appliedDate: string;
  status: "pending" | "reviewing" | "interview" | "offered" | "rejected";
  statusDate: string;
}

export const mockApplications: JobApplication[] = [
  {
    id: "app-001",
    jobId: "2",
    jobTitle: "Full Stack Software Engineer",
    company: "TechVentures Lanka",
    companyLogo:
      "https://api.dicebear.com/7.x/initials/png?seed=TVL&backgroundColor=4ECDC4",
    appliedDate: "Jan 15, 2026",
    status: "interview",
    statusDate: "Jan 18, 2026",
  },
  {
    id: "app-002",
    jobId: "1",
    jobTitle: "Senior Management Accountant",
    company: "Swis Group Holdings",
    companyLogo:
      "https://api.dicebear.com/7.x/initials/png?seed=SGH&backgroundColor=9966FF",
    appliedDate: "Jan 10, 2026",
    status: "reviewing",
    statusDate: "Jan 12, 2026",
  },
  {
    id: "app-003",
    jobId: "3",
    jobTitle: "Digital Marketing Manager",
    company: "BrandCraft Agency",
    companyLogo:
      "https://api.dicebear.com/7.x/initials/png?seed=BCA&backgroundColor=FF9F40",
    appliedDate: "Jan 5, 2026",
    status: "offered",
    statusDate: "Jan 17, 2026",
  },
  {
    id: "app-004",
    jobId: "4",
    jobTitle: "HR Business Partner",
    company: "Global Solutions Ltd",
    companyLogo:
      "https://api.dicebear.com/7.x/initials/png?seed=GSL&backgroundColor=4BC0C0",
    appliedDate: "Dec 28, 2025",
    status: "rejected",
    statusDate: "Jan 8, 2026",
  },
];

// Saved Jobs (bookmarked)
export const mockSavedJobs: Job[] = [
  {
    id: "2",
    title: "Full Stack Software Engineer",
    company: "TechVentures Lanka",
    location: "Colombo 03, Sri Lanka",
    contractType: "Full-time",
    salary: "LKR 300,000 - 450,000",
    postedDate: "1 day ago",
    description:
      "Join our innovative development team to build cutting-edge web and mobile applications.",
    requirements: [],
    responsibilities: [],
    companyInfo: "",
    isBookmarked: true,
  },
  {
    id: "5",
    title: "Data Analyst Intern",
    company: "Analytics Pro",
    location: "Remote, Sri Lanka",
    contractType: "Internship",
    salary: "LKR 40,000 - 60,000",
    postedDate: "1 week ago",
    description:
      "Kick-start your career in data analytics with our 6-month internship program.",
    requirements: [],
    responsibilities: [],
    companyInfo: "",
    isBookmarked: true,
  },
];

// User Skills
export const mockUserSkills = [
  "React Native",
  "TypeScript",
  "Node.js",
  "Python",
  "AWS",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "Git",
  "Agile",
];

// User Education
export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  grade?: string;
}

export const mockEducation: Education[] = [
  {
    id: "edu-001",
    degree: "BSc in Computer Science",
    institution: "University of Colombo",
    year: "2020 - 2024",
    grade: "First Class Honours",
  },
  {
    id: "edu-002",
    degree: "Diploma in Software Engineering",
    institution: "NIBM",
    year: "2019 - 2020",
    grade: "Distinction",
  },
];

// User Experience
export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  isCurrent: boolean;
}

export const mockExperience: Experience[] = [
  {
    id: "exp-001",
    title: "Software Engineer",
    company: "Tech Solutions Ltd",
    duration: "Jan 2024 - Present",
    description:
      "Developing mobile applications using React Native and TypeScript.",
    isCurrent: true,
  },
  {
    id: "exp-002",
    title: "Junior Developer",
    company: "StartupXYZ",
    duration: "Jun 2023 - Dec 2023",
    description: "Built web applications using React and Node.js.",
    isCurrent: false,
  },
];

// Notification Preferences
export interface NotificationPreference {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  category: "email" | "push" | "sms";
}

export const mockNotificationPreferences: NotificationPreference[] = [
  {
    id: "notif-pref-001",
    title: "Job Alerts",
    description: "Get notified when new jobs match your profile",
    enabled: true,
    category: "push",
  },
  {
    id: "notif-pref-002",
    title: "Application Updates",
    description: "Updates on your job applications",
    enabled: true,
    category: "push",
  },
  {
    id: "notif-pref-003",
    title: "Messages",
    description: "New message notifications",
    enabled: true,
    category: "push",
  },
  {
    id: "notif-pref-004",
    title: "Email Digest",
    description: "Weekly summary of job recommendations",
    enabled: true,
    category: "email",
  },
  {
    id: "notif-pref-005",
    title: "Marketing Emails",
    description: "Tips, news, and promotions",
    enabled: false,
    category: "email",
  },
];
