export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'web' | 'desktop' | 'portal';
  categoryLabel: string;
  description: string;
  highlights: string[];
  technologies: string[];
  icon: string;
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    tag: string;
    icon?: string;
  }[];
}

export interface ExperienceItem {
  company: string;
  location: string;
  role: string;
  period: string;
  isCurrent: boolean;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  score: string;
  period: string;
  highlights: string[];
}

// ================= Form Submissions Models =================

export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  preferredContact: 'email' | 'phone' | 'linkedin';
  submittedAt: Date;
}

export interface ProjectQuoteSubmission {
  id: string;
  clientName: string;
  companyName?: string;
  email: string;
  projectType: 'web-mvc' | 'desktop-winforms' | 'database-arch' | 'fullstack-net' | 'api-integration';
  budgetRange: string;
  timeline: string;
  requiredFeatures: string[];
  projectBrief: string;
  estimatedEstimate?: {
    estDays: number;
    complexityLevel: string;
  };
  submittedAt: Date;
}

export interface ConsultationSubmission {
  id: string;
  fullName: string;
  email: string;
  organization: string;
  purpose: 'technical-interview' | 'freelance-contract' | 'architecture-discussion' | 'mentorship';
  preferredDate: string;
  timeSlot: 'morning' | 'afternoon' | 'evening';
  meetingPlatform: 'google-meet' | 'microsoft-teams' | 'zoom' | 'phone';
  agendaNotes: string;
  submittedAt: Date;
}

export interface RecommendationSubmission {
  id: string;
  recommenderName: string;
  designation: string;
  organization: string;
  relationship: 'manager' | 'senior-dev' | 'colleague' | 'client' | 'mentor';
  rating: number; // 1 to 5
  projectWorkedOn: string;
  feedbackText: string;
  submittedAt: Date;
}

export interface FormSubmissionSummary {
  id: string;
  formType: 'Quick Contact' | 'Project Quote' | 'Consultation' | 'Recommendation';
  name: string;
  email: string;
  date: Date;
  summary: string;
  badgeColor: string;
}
