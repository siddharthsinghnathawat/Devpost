import type { ImagePlaceholder } from './placeholder-images';

export type Job = {
  id: string;
  title: string;
  companyName: string;
  companyLogo: ImagePlaceholder;
  location: string;
  salaryRange: string;
  jobType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Expert';
  description: string[];
  companyOverview: string;
  applicationDeadline: string;
};
