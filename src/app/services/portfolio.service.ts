
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmailService } from './email.service';
import {
  Project,
  SkillCategory,
  ExperienceItem,
  EducationItem,
  ContactSubmission,
  ProjectQuoteSubmission,
  ConsultationSubmission,
  RecommendationSubmission,
  FormSubmissionSummary
} from '../models/portfolio.model';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  readonly personalInfo = {
    name: 'Hrithik Apsingekar',
    title: 'Software Developer',
    roleHighlight: 'C# • .NET Framework • ASP.NET MVC • ADO.NET • Entity Framework • SQL Server',
    email: 'apsingekarhrithik@gmail.com',
    phone: '+91 9356801456',
    location: 'Pune, Maharashtra, India',
    linkedinUrl: 'https://www.linkedin.com/in/hrithik-apsingekar-644a8b442/',
    githubUrl: 'https://github.com/hrithikapsingekar',
    resumeUrl: 'assets/Hrithik_Apsingekar_Resume.pdf',
    avatarUrl: 'assets/hrithik-figma.png',
    availability: 'Available for Full-time Roles & Contracts',
    yearsExperience: '1.4+',
    summary: 'Software Developer with 1.4+ years of professional experience developing and maintaining web and desktop applications using C#, .NET Framework, ASP.NET MVC, ADO.NET, Entity Framework, LINQ, and Microsoft SQL Server. Experienced in building modular architectures, implementing CRUD operations, designing relational databases, authoring stored procedures, and integrating responsive UIs with backend services. Strong understanding of OOP principles, RBAC, data validation, and debugging. Contributed to Housing Society Management, Matrimony, and Document Management domains.'
  };

  private readonly projectsData: Project[] = [
    {
      id: 'home-connect',
      title: 'T HomeConnect',
      subtitle: 'Housing Society Management System',
      category: 'web',
      categoryLabel: 'Full-Stack Web Development',
      description: 'Comprehensive residential community platform managing member workflows, automated maintenance invoicing, and amenity reservations with high data isolation.',
      highlights: [
        'Contribute to the development of housing society modules, including member directory, amenity booking, and maintenance billing.',
        'Develop application functionality for managing society records and processing resident requests.',
        'Design and maintain SQL Server tables, queries, and stored procedures supporting core society workflows.',
        'Build responsive user interfaces using HTML5, CSS3, and Bootstrap integrated into ASP.NET MVC views.',
        'Implement data validation and role-based access control rules matching administrative security requirements.'
      ],
      technologies: ['C#', 'ASP.NET MVC', 'SQL Server', 'Bootstrap', 'ADO.NET', 'HTML5', 'CSS3', 'IIS'],
      icon: 'fa-building-user',
      featured: true
    },
    {
      id: 'vivah-setu',
      title: 'Tweak Vivah Setu',
      subtitle: 'Matrimony Portal',
      category: 'portal',
      categoryLabel: 'Web Portal Architecture',
      description: 'High-performance matchmaking portal featuring advanced multi-attribute filtering, LINQ query optimizations, and user profile management systems.',
      highlights: [
        'Develop matchmaking features including user profile management, activity dashboards, and partner discovery filters.',
        'Implement multi-criteria search functionality using LINQ-to-Entities and Entity Framework.',
        'Integrate frontend user workflows with relational database procedures for profile creation, verification, and updates.',
        'Design mobile-first responsive screens to improve usability across all handheld devices and desktop browsers.'
      ],
      technologies: ['ASP.NET MVC', 'C#', 'Entity Framework', 'LINQ', 'SQL Server', 'Indexed Views', 'JavaScript'],
      icon: 'fa-heart-circle-check',
      featured: true
    },
    {
      id: 'dms-winforms',
      title: 'DMS WinForms',
      subtitle: 'Document Management System',
      category: 'desktop',
      categoryLabel: 'Desktop Application Development',
      description: 'Secure enterprise desktop software for corporate document handling, automated watermarking, version control, and RBAC compliance.',
      highlights: [
        'Develop desktop application modules for electronic document indexing, archiving, and administrative workflows.',
        'Implement secure login authentication, custom navigation panels, and meeting management interfaces.',
        'Integrate WinForms interfaces with SQL Server databases via asynchronous ADO.NET pipelines.',
        'Implement granular role-based permissions to safeguard sensitive document records and restrict access.'
      ],
      technologies: ['C# WinForms', 'ADO.NET', 'SQL Server', '.NET Framework', 'RBAC Security', 'FILESTREAM'],
      icon: 'fa-folder-tree',
      featured: true
    }
  ];

  private readonly skillCategoriesData: SkillCategory[] = [
    {
      title: '.NET Technologies & Architecture',
      icon: 'fa-cubes',
      skills: [
        { name: 'C#', level: 94, tag: 'Core Language', icon: 'fa-code' },
        { name: '.NET Framework / .NET', level: 90, tag: 'Framework', icon: 'fa-layer-group' },
        { name: 'ASP.NET MVC & Razor', level: 92, tag: 'Web Framework', icon: 'fa-globe' },
        { name: 'ADO.NET', level: 90, tag: 'Data Access', icon: 'fa-database' },
        { name: 'Entity Framework & LINQ', level: 88, tag: 'ORM / Querying', icon: 'fa-bolt' },
        { name: 'Windows Forms (WinForms)', level: 88, tag: 'Desktop UI', icon: 'fa-window-maximize' }
      ]
    },
    {
      title: 'Database Technologies',
      icon: 'fa-database',
      skills: [
        { name: 'Microsoft SQL Server', level: 92, tag: 'RDBMS', icon: 'fa-server' },
        { name: 'SSMS (Management Studio)', level: 92, tag: 'Database Tools', icon: 'fa-wrench' },
        { name: 'Stored Procedures & UDFs', level: 94, tag: 'T-SQL Logic', icon: 'fa-terminal' },
        { name: 'Views, CTEs & Joins', level: 90, tag: 'Query Optimization', icon: 'fa-table-cells' },
        { name: 'Indexes & 3NF Normalization', level: 90, tag: 'Schema Design', icon: 'fa-sitemap' },
        { name: 'SQL Server FILESTREAM', level: 82, tag: 'Binary Storage', icon: 'fa-file-lines' }
      ]
    },
    {
      title: 'Web Technologies & Frontend',
      icon: 'fa-laptop-code',
      skills: [
        { name: 'HTML5 & CSS3', level: 92, tag: 'Modern Web', icon: 'fa-code' },
        { name: 'JavaScript & jQuery AJAX', level: 86, tag: 'Scripting & Asynch', icon: 'fa-brands fa-js' },
        { name: 'Bootstrap & Responsive Design', level: 90, tag: 'UI Framework', icon: 'fa-mobile-screen' },
        { name: 'Form Validation & Razor Helpers', level: 92, tag: 'Type-Safe Views', icon: 'fa-circle-check' }
      ]
    },
    {
      title: 'Security, Deployment & Tools',
      icon: 'fa-shield-halved',
      skills: [
        { name: 'Authentication & Forms Auth', level: 90, tag: 'Identity', icon: 'fa-key' },
        { name: 'Role-Based Access Control (RBAC)', level: 92, tag: 'Security', icon: 'fa-user-lock' },
        { name: 'SQL Injection, XSS & CSRF Fortification', level: 90, tag: 'Security', icon: 'fa-shield-halved' },
        { name: 'IIS Server Hosting', level: 86, tag: 'Deployment', icon: 'fa-cloud' },
        { name: 'Visual Studio & VS Code', level: 94, tag: 'IDE Suite', icon: 'fa-laptop' },
        { name: 'Debugging & CRUD Operations', level: 92, tag: 'Quality', icon: 'fa-bug' }
      ]
    }
  ];

  private readonly experienceData: ExperienceItem[] = [
    {
      company: 'Tweak Software and Solution',
      location: 'Pune, Maharashtra',
      role: 'Software Programmer',
      period: '2025 – Present',
      isCurrent: true,
      summary: 'Developing and maintaining enterprise full-stack web and desktop applications using C#, ASP.NET MVC, ADO.NET, and SQL Server in an N-tier setup.',
      responsibilities: [
        'Participate across all phases of the SDLC, including requirements gathering, architecture design, development, and unit testing.',
        'Build and maintain full-stack web applications using C#, ASP.NET MVC, Razor view engine, and .NET Framework in an N-tier setup.',
        'Develop responsive user interfaces using HTML5, CSS3, and Bootstrap, integrating asynchronous jQuery AJAX calls for partial rendering.',
        'Implement strongly typed Views, ViewModels, and custom HTML Helpers to isolate domain models and ensure compile-time type safety.',
        'Engineer desktop solutions using C# WinForms and ADO.NET, utilizing background threading models to ensure non-blocking UI responsiveness.',
        'Design and optimize normalized relational schemas (3NF) in MS SQL Server, managing keys, constraints, and index strategies.',
        'Author high-performance T-SQL stored procedures, views, UDFs, and CTEs for core transactional and reporting modules.',
        'Implement data-access logic via ADO.NET and Entity Framework, writing optimized LINQ queries with eager loading (.Include) to prevent N+1 issues.',
        'Enforce transaction management and ACID compliance using explicit database transactions (SqlTransaction) during multi-step writes.',
        'Implement Role-Based Access Control (RBAC), Forms Authentication, and session state lifecycles to protect sensitive controllers and views.',
        'Fortify endpoints against web security threats, including SQL Injection (parameterization), XSS (Razor encoding), and CSRF (AntiForgeryToken).',
        'Build custom action filters and global exception-handling pipelines in Global.asax and FilterConfig for centralized logging and trapping.'
      ],
      technologies: ['C#', 'ASP.NET MVC', 'SQL Server', 'ADO.NET', 'Entity Framework', 'LINQ', 'WinForms', 'IIS', 'Bootstrap', 'JavaScript']
    }
  ];

  private readonly educationData: EducationItem[] = [
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Swami Ramanand Teerth Marathwada University (SRTMUN)',
      location: 'Nanded, Maharashtra',
      score: 'Distinction',
      period: '2021 – 2025',
      highlights: [
        'Distinction academic record with strong specialization in Object-Oriented Programming, Database Management, and Data Structures.',
        'Built full-stack capstone projects demonstrating layered architecture and relational schema modeling.'
      ]
    }
  ];

  // Resume Modal Management (Starts CLOSED so it never shows on page load)
  private resumeModalSubject = new BehaviorSubject<boolean>(false);
  public resumeModal$ = this.resumeModalSubject.asObservable();

  // Forms Submissions Management
  private readonly submissionsKey = 'hrithik_portfolio_submissions_v1';
  private submissionsSubject = new BehaviorSubject<FormSubmissionSummary[]>(this.loadStoredSubmissions());
  public submissions$ = this.submissionsSubject.asObservable();

  // Toast Messaging
  private toastSubject = new BehaviorSubject<ToastMessage | null>(null);
  public toast$ = this.toastSubject.asObservable();

  openResumeModal(): void {
    this.resumeModalSubject.next(true);
    if (typeof document !== 'undefined') {
      document.body.classList.add('modal-open');
    }
  }

  closeResumeModal(): void {
    this.resumeModalSubject.next(false);
    if (typeof document !== 'undefined') {
      document.body.classList.remove('modal-open');
    }
  }

  constructor(private emailService: EmailService) { }

  getProjects(): Project[] {
    return [...this.projectsData];
  }

  getSkillCategories(): SkillCategory[] {
    return [...this.skillCategoriesData];
  }

  getExperience(): ExperienceItem[] {
    return [...this.experienceData];
  }

  getEducation(): EducationItem[] {
    return [...this.educationData];
  }

  // Submission Handlers
  submitContact(data: Omit<ContactSubmission, 'id' | 'submittedAt'>): ContactSubmission {
    const submission: ContactSubmission = {
      ...data,
      id: 'cnt_' + Date.now(),
      submittedAt: new Date()
    };

    this.recordSubmission({
      id: submission.id,
      formType: 'Quick Contact',
      name: submission.fullName,
      email: submission.email,
      date: submission.submittedAt,
      summary: `Subject: ${submission.subject} | Mode: ${submission.preferredContact.toUpperCase()}`,
      badgeColor: '#00f2fe'
    });

    this.showToast('success', 'Message Received!', `Thank you ${submission.fullName}, your submission is being processed.`);

    // Dispatch SMTP Email
    this.emailService.sendEmail({
      formType: 'Quick Contact Inquiry',
      name: submission.fullName,
      email: submission.email,
      phone: submission.phone || 'Not provided',
      subject: submission.subject,
      message: submission.message,
      metadata: {
        'Preferred Channel': submission.preferredContact
      }
    }).subscribe({
      next: (res) => {
        if (res.success) {
          this.showToast('success', 'Email Dispatched via SMTP!', `Inquiry emailed to Hrithik (apsingekarhrithik@gmail.com). A copy was sent to ${submission.email}!`);
        }
      }
    });

    return submission;
  }

  submitProjectQuote(data: Omit<ProjectQuoteSubmission, 'id' | 'submittedAt'>): ProjectQuoteSubmission {
    const submission: ProjectQuoteSubmission = {
      ...data,
      id: 'qte_' + Date.now(),
      submittedAt: new Date()
    };

    this.recordSubmission({
      id: submission.id,
      formType: 'Project Quote',
      name: submission.clientName,
      email: submission.email,
      date: submission.submittedAt,
      summary: `Type: ${submission.projectType} | Budget: ${submission.budgetRange} | Timeline: ${submission.timeline}`,
      badgeColor: '#8b5cf6'
    });

    this.showToast('success', 'Quote Proposal Submitted!', `Quote proposal for ${submission.clientName} generated successfully! Hrithik will review your specifications.`);

    // Dispatch SMTP Email
    this.emailService.sendEmail({
      formType: 'Project Quote Proposal',
      name: submission.clientName,
      email: submission.email,
      phone: submission.companyName ? `Company: ${submission.companyName}` : undefined,
      subject: `Project Proposal: ${submission.projectType} (${submission.budgetRange})`,
      message: submission.projectBrief,
      metadata: {
        'Company': submission.companyName || 'Not specified',
        'Project Type': submission.projectType,
        'Budget Range': submission.budgetRange,
        'Timeline': submission.timeline,
        'Selected Features': submission.requiredFeatures?.join(', ') || 'Core scope',
        'Estimated Timeline': `${submission.estimatedEstimate?.estDays || 14} Days (${submission.estimatedEstimate?.complexityLevel || 'Standard'})`
      }
    }).subscribe({
      next: (res) => {
        if (res.success) {
          this.showToast('success', 'Proposal Sent via SMTP!', `Project quote emailed to Hrithik. A confirmation receipt has been sent to ${submission.email}.`);
        }
      }
    });

    return submission;
  }

  submitConsultation(data: Omit<ConsultationSubmission, 'id' | 'submittedAt'>): ConsultationSubmission {
    const submission: ConsultationSubmission = {
      ...data,
      id: 'cns_' + Date.now(),
      submittedAt: new Date()
    };

    this.recordSubmission({
      id: submission.id,
      formType: 'Consultation',
      name: submission.fullName,
      email: submission.email,
      date: submission.submittedAt,
      summary: `Date: ${submission.preferredDate} (${submission.timeSlot}) | Via ${submission.meetingPlatform}`,
      badgeColor: '#10b981'
    });

    this.showToast('success', 'Session Scheduled!', `Consultation request reserved for ${submission.preferredDate}. A calendar invitation will be dispatched shortly.`);

    // Dispatch SMTP Email
    this.emailService.sendEmail({
      formType: 'Technical Consultation Request',
      name: submission.fullName,
      email: submission.email,
      phone: `Organization: ${submission.organization}`,
      subject: `Interview/Meeting Request: ${submission.purpose} (${submission.preferredDate})`,
      message: submission.agendaNotes,
      metadata: {
        'Organization': submission.organization,
        'Purpose': submission.purpose,
        'Preferred Date': submission.preferredDate,
        'Time Slot': submission.timeSlot,
        'Meeting Platform': submission.meetingPlatform
      }
    }).subscribe({
      next: (res) => {
        if (res.success) {
          this.showToast('success', 'Meeting Request Emailed via SMTP!', `Meeting details sent to Hrithik (apsingekarhrithik@gmail.com).`);
        }
      }
    });

    return submission;
  }

  submitRecommendation(data: Omit<RecommendationSubmission, 'id' | 'submittedAt'>): RecommendationSubmission {
    const submission: RecommendationSubmission = {
      ...data,
      id: 'rec_' + Date.now(),
      submittedAt: new Date()
    };

    this.recordSubmission({
      id: submission.id,
      formType: 'Recommendation',
      name: submission.recommenderName,
      email: `${submission.relationship} @ ${submission.organization}`,
      date: submission.submittedAt,
      summary: `Rating: ${'★'.repeat(submission.rating)} | Project: ${submission.projectWorkedOn}`,
      badgeColor: '#f59e0b'
    });

    this.showToast('success', 'Endorsement Added!', `Thank you ${submission.recommenderName}! Your ${submission.rating}-star testimonial has been recorded.`);

    // Dispatch SMTP Email
    this.emailService.sendEmail({
      formType: 'Peer Endorsement & Recommendation',
      name: submission.recommenderName,
      email: 'apsingekarhrithik@gmail.com',
      subject: `New ${submission.rating}★ Endorsement from ${submission.recommenderName} (${submission.designation} at ${submission.organization})`,
      message: submission.feedbackText,
      metadata: {
        'Recommender': submission.recommenderName,
        'Designation': submission.designation,
        'Organization': submission.organization,
        'Relationship': submission.relationship,
        'Project Worked On': submission.projectWorkedOn,
        'Rating': `${submission.rating} / 5 Stars`
      }
    }).subscribe();

    return submission;
  }

  private recordSubmission(item: FormSubmissionSummary): void {
    const current = this.submissionsSubject.value;
    const updated = [item, ...current];
    this.submissionsSubject.next(updated);
    try {
      localStorage.setItem(this.submissionsKey, JSON.stringify(updated));
    } catch {
      // LocalStorage fallback
    }
  }

  private loadStoredSubmissions(): FormSubmissionSummary[] {
    try {
      const saved = localStorage.getItem(this.submissionsKey);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore
    }

    // Default demonstration seed entries to show rich interactivity
    return [
      {
        id: 'seed-1',
        formType: 'Recommendation',
        name: 'Technical Project Lead',
        email: 'Tweak Software and Solution',
        date: new Date('2026-09-15'),
        summary: 'Rating: ★★★★★ | "Hrithik demonstrated outstanding mastery in SQL stored procedure tuning and robust ASP.NET MVC architecture."',
        badgeColor: '#f59e0b'
      },
      {
        id: 'seed-2',
        formType: 'Project Quote',
        name: 'Society Management Committee',
        email: 'management@homeconnect.org',
        date: new Date('2026-08-20'),
        summary: 'Type: web-mvc | Budget: Medium Scale | Timeline: 2 Months (Delivered Ahead of Time)',
        badgeColor: '#8b5cf6'
      }
    ];
  }

  clearSubmissions(): void {
    try {
      localStorage.removeItem(this.submissionsKey);
    } catch { }
    this.submissionsSubject.next([]);
    this.showToast('info', 'Submissions Cleared', 'Activity history has been reset.');
  }

  showToast(type: ToastMessage['type'], title: string, message: string): void {
    const toast: ToastMessage = {
      id: 'tst_' + Date.now(),
      type,
      title,
      message
    };
    this.toastSubject.next(toast);
    setTimeout(() => {
      if (this.toastSubject.value?.id === toast.id) {
        this.toastSubject.next(null);
      }
    }, 5500);
  }

  dismissToast(): void {
    this.toastSubject.next(null);
  }
}
