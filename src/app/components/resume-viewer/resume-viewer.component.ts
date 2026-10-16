import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-resume-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Resume Modal Container (Hidden by default, never shown on page load) -->
    <div 
      *ngIf="isOpen" 
      class="resume-modal-backdrop"
      (click)="onBackdropClick($event)"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-resume-title"
    >
      <div class="resume-modal-card" (click)="$event.stopPropagation()">
        
        <!-- Modal Top Bar -->
        <header class="modal-header">
          <div class="header-left">
            <div class="badge-verified">
              <i class="fa-solid fa-circle-check"></i> Official Resume
            </div>
            <h2 id="modal-resume-title" class="modal-title">
              Hrithik Apsingekar <span class="title-sub">• Software Developer</span>
            </h2>
          </div>

          <div class="header-actions">
            <!-- View Mode Switcher -->
            <div class="view-switch-pills">
              <button 
                type="button" 
                class="pill-btn" 
                [class.active]="viewMode === 'interactive'"
                (click)="viewMode = 'interactive'"
                title="Interactive High-Contrast View"
              >
                <i class="fa-solid fa-list-check"></i> Structured View
              </button>
              <button 
                type="button" 
                class="pill-btn" 
                [class.active]="viewMode === 'pdf'"
                (click)="viewMode = 'pdf'"
                title="Original PDF Document"
              >
                <i class="fa-solid fa-file-pdf"></i> PDF Document
              </button>
            </div>

            <!-- Download Button -->
            <a 
              [href]="portfolioService.personalInfo.resumeUrl" 
              download="Hrithik_Apsingekar_Resume.pdf" 
              class="btn btn-primary btn-sm"
              title="Download PDF to your computer"
            >
              <i class="fa-solid fa-download"></i>
              <span>Download PDF</span>
            </a>

            <!-- Open In New Tab -->
            <a 
              [href]="portfolioService.personalInfo.resumeUrl" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn btn-outline btn-sm icon-only-mobile"
              title="Open PDF in new browser tab"
            >
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>

            <!-- Close Modal Button -->
            <button 
              type="button" 
              class="close-btn" 
              (click)="closeModal()" 
              aria-label="Close resume modal"
              title="Close (Esc)"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </header>

        <!-- Modal Body Content -->
        <div class="modal-body">

          <!-- MODE 1: Embedded Original PDF -->
          <div *ngIf="viewMode === 'pdf'" class="pdf-viewer-container">
            <object 
              [data]="safePdfUrl" 
              type="application/pdf" 
              class="pdf-object"
            >
              <div class="pdf-fallback-msg">
                <i class="fa-solid fa-file-pdf fallback-icon"></i>
                <h3>PDF Preview</h3>
                <p>Your browser doesn't support inline PDF display.</p>
                <div class="fallback-actions">
                  <a [href]="portfolioService.personalInfo.resumeUrl" download="Hrithik_Apsingekar_Resume.pdf" class="btn btn-primary">
                    <i class="fa-solid fa-download"></i> Download Resume PDF
                  </a>
                  <button type="button" (click)="viewMode = 'interactive'" class="btn btn-outline">
                    View Structured Resume
                  </button>
                </div>
              </div>
            </object>
          </div>

          <!-- MODE 2: Structured Interactive View (Exact match to final resume) -->
          <div *ngIf="viewMode === 'interactive'" class="structured-resume-sheet">
            
            <!-- Resume Document Paper -->
            <article class="resume-sheet-content">
              
              <!-- Sheet Header -->
              <div class="sheet-header">
                <div class="sheet-title-group">
                  <h1 class="applicant-name">Hrithik Apsingekar</h1>
                  <h2 class="applicant-title">Software Developer</h2>
                </div>
                <div class="applicant-contacts">
                  <a [href]="'mailto:' + portfolioService.personalInfo.email" class="contact-pill">
                    <i class="fa-solid fa-envelope"></i> apsingekarhrithik&#64;gmail.com
                  </a>
                  <span class="contact-divider">•</span>
                  <a [href]="portfolioService.personalInfo.linkedinUrl" target="_blank" rel="noopener noreferrer" class="contact-pill">
                    <i class="fa-brands fa-linkedin"></i> LinkedIn Profile
                  </a>
                </div>
              </div>

              <!-- PROFESSIONAL SUMMARY -->
              <section class="sheet-section">
                <h3 class="section-heading">PROFESSIONAL SUMMARY</h3>
                <p class="summary-text">
                  Software Developer with 1.4+ years of professional experience developing and maintaining web and desktop applications using
                  <strong>C#</strong>, <strong>.NET Framework</strong>, <strong>ASP.NET MVC</strong>, <strong>ADO.NET</strong>, <strong>Entity Framework</strong>, <strong>LINQ</strong>, and <strong>Microsoft SQL Server</strong>. Experienced in
                  building modular architectures, implementing CRUD operations, designing relational databases, authoring stored procedures,
                  and integrating responsive UIs with backend services. Strong understanding of OOP principles, RBAC, data validation, and
                  debugging. Contributed to Housing Society Management, Matrimony, and Document Management domains. Skilled in HTML5,
                  CSS3, Bootstrap, JavaScript, IIS hosting, and production maintenance.
                </p>
              </section>

              <!-- TECHNICAL SKILLS -->
              <section class="sheet-section">
                <h3 class="section-heading">TECHNICAL SKILLS</h3>
                <ul class="skills-bullets">
                  <li>
                    <strong>Programming Languages:</strong> C#, SQL, JavaScript, HTML5, CSS3
                  </li>
                  <li>
                    <strong>.NET Technologies:</strong> .NET Framework, ASP.NET MVC, ADO.NET, Entity Framework, LINQ, Windows Forms (WinForms)
                  </li>
                  <li>
                    <strong>Database Technologies:</strong> Microsoft SQL Server, SSMS, Stored Procedures, Views, Joins, Indexes, FILESTREAM
                  </li>
                  <li>
                    <strong>Web Technologies:</strong> Bootstrap, Responsive Web Design, Form Validation, AJAX (where applicable)
                  </li>
                  <li>
                    <strong>Security & Architecture:</strong> Authentication, Role-Based Access Control (RBAC), Data Validation, CRUD Operations, Debugging
                  </li>
                  <li>
                    <strong>Deployment & Tools:</strong> Internet Information Services (IIS), Visual Studio
                  </li>
                </ul>
              </section>

              <!-- PROFESSIONAL EXPERIENCE -->
              <section class="sheet-section">
                <h3 class="section-heading">PROFESSIONAL EXPERIENCE</h3>
                
                <div class="exp-block">
                  <div class="exp-top">
                    <div>
                      <h4 class="exp-role">Software Programmer</h4>
                      <div class="exp-company">Tweak Software and Solution</div>
                    </div>
                    <div class="exp-dates">2025 – Present</div>
                  </div>

                  <h5 class="sub-heading">ROLES AND RESPONSIBILITIES</h5>
                  <ul class="duties-list">
                    <li>Participate across all phases of the SDLC, including requirements gathering, architecture design, development, and unit testing.</li>
                    <li>Build and maintain full-stack web applications using C#, ASP.NET MVC, Razor view engine, and .NET Framework in an N-tier setup.</li>
                    <li>Develop responsive user interfaces using HTML5, CSS3, and Bootstrap, integrating asynchronous jQuery AJAX calls for partial rendering.</li>
                    <li>Implement strongly typed Views, ViewModels, and custom HTML Helpers to isolate domain models and ensure compile-time type safety.</li>
                    <li>Engineer desktop solutions using C# WinForms and ADO.NET, utilizing background threading models to ensure non-blocking UI responsiveness.</li>
                    <li>Design and optimize normalized relational schemas (3NF) in MS SQL Server, managing keys, constraints, and index strategies.</li>
                    <li>Author high-performance T-SQL stored procedures, views, UDFs, and CTEs for core transactional and reporting modules.</li>
                    <li>Implement data-access logic via ADO.NET and Entity Framework, writing optimized LINQ queries with eager loading (.Include) to prevent N+1 issues.</li>
                    <li>Enforce transaction management and ACID compliance using explicit database transactions (SqlTransaction) during multi-step writes.</li>
                    <li>Implement Role-Based Access Control (RBAC), Forms Authentication, and session state lifecycles to protect sensitive controllers and views.</li>
                    <li>Fortify endpoints against web security threats, including SQL Injection (parameterization), XSS (Razor encoding), and CSRF (AntiForgeryToken).</li>
                    <li>Build custom action filters and global exception-handling pipelines in Global.asax and FilterConfig for centralized logging and trapping.</li>
                  </ul>
                </div>
              </section>

              <!-- PROJECT EXPERIENCE -->
              <section class="sheet-section">
                <h3 class="section-heading">PROJECT EXPERIENCE</h3>
                
                <!-- Project 1 -->
                <div class="project-entry">
                  <div class="proj-header">
                    <h4 class="proj-title">
                      T HomeConnect <span class="proj-sep">–</span> <span class="proj-sub">Housing Society Management System</span>
                    </h4>
                    <span class="proj-tech">ASP.NET MVC, C#, SQL Server, Bootstrap</span>
                  </div>
                  <ul class="duties-list">
                    <li>Contribute to the development of housing society modules, including member directory, amenity booking, and maintenance billing.</li>
                    <li>Develop application functionality for managing society records and processing resident requests.</li>
                    <li>Design and maintain SQL Server tables, queries, and stored procedures supporting core society workflows.</li>
                    <li>Build responsive user interfaces using HTML5, CSS3, and Bootstrap integrated into ASP.NET MVC views.</li>
                    <li>Implement data validation and role-based access control rules matching administrative security requirements.</li>
                  </ul>
                </div>

                <!-- Project 2 -->
                <div class="project-entry">
                  <div class="proj-header">
                    <h4 class="proj-title">
                      Tweak Vivah Setu <span class="proj-sep">–</span> <span class="proj-sub">Matrimony Portal</span>
                    </h4>
                    <span class="proj-tech">ASP.NET MVC, C#, Entity Framework, LINQ</span>
                  </div>
                  <ul class="duties-list">
                    <li>Develop matchmaking features including user profile management, activity dashboards, and partner discovery filters.</li>
                    <li>Implement multi-criteria search functionality using LINQ-to-Entities and Entity Framework.</li>
                    <li>Integrate frontend user workflows with relational database procedures for profile creation, verification, and updates.</li>
                    <li>Design mobile-first responsive screens to improve usability across all handheld devices and desktop browsers.</li>
                  </ul>
                </div>

                <!-- Project 3 -->
                <div class="project-entry">
                  <div class="proj-header">
                    <h4 class="proj-title">
                      DMS WinForms <span class="proj-sep">–</span> <span class="proj-sub">Document Management System</span>
                    </h4>
                    <span class="proj-tech">C# WinForms, ADO.NET, SQL Server</span>
                  </div>
                  <ul class="duties-list">
                    <li>Develop desktop application modules for electronic document indexing, archiving, and administrative workflows.</li>
                    <li>Implement secure login authentication, custom navigation panels, and meeting management interfaces.</li>
                    <li>Integrate WinForms interfaces with SQL Server databases via asynchronous ADO.NET pipelines.</li>
                    <li>Implement granular role-based permissions to safeguard sensitive document records and restrict access.</li>
                  </ul>
                </div>
              </section>

              <!-- EDUCATION -->
              <section class="sheet-section">
                <h3 class="section-heading">EDUCATION</h3>
                <div class="edu-entry">
                  <h4 class="edu-degree">Bachelor of Computer Applications (BCA)</h4>
                </div>
              </section>

            </article>

          </div>

        </div>

        <!-- Modal Footer Bar -->
        <footer class="modal-footer">
          <div class="footer-left-info">
            <i class="fa-solid fa-briefcase text-orange"></i>
            <span>Ready for full-time opportunities & technical discussion.</span>
          </div>

          <div class="footer-buttons">
            <button type="button" class="btn btn-outline btn-sm" (click)="closeModal()">
              Close
            </button>
            <a 
              [href]="portfolioService.personalInfo.resumeUrl" 
              download="Hrithik_Apsingekar_Resume.pdf" 
              class="btn btn-primary btn-sm"
            >
              <i class="fa-solid fa-file-arrow-down"></i> Save Copy As PDF
            </a>
          </div>
        </footer>

      </div>
    </div>
  `,
  styles: [`
    .resume-modal-backdrop {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(10, 10, 10, 0.88);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      animation: modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      overflow-y: auto;
    }

    @keyframes modalFadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .resume-modal-card {
      width: 100%;
      max-width: 1100px;
      max-height: 92vh;
      background: #181818;
      border: 1px solid rgba(253, 111, 0, 0.35);
      border-radius: var(--radius-md);
      box-shadow: 0 25px 65px rgba(0, 0, 0, 0.85), 0 0 35px rgba(253, 111, 0, 0.2);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: modalScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes modalScaleUp {
      from {
        opacity: 0;
        transform: scale(0.96) translateY(12px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    /* Modal Header */
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      background: #1F1F1F;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      gap: 16px;
      flex-wrap: wrap;
    }

    .header-left {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .badge-verified {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.76rem;
      font-weight: 700;
      color: var(--primary-orange);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .modal-title {
      font-size: 1.25rem;
      color: #FFFFFF;
      margin: 0;
      line-height: 1.2;
    }

    .title-sub {
      font-size: 0.95rem;
      color: #A3A3A3;
      font-weight: 400;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .view-switch-pills {
      display: flex;
      background: #141414;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(255, 255, 255, 0.08);
      padding: 3px;
      gap: 4px;
    }

    .pill-btn {
      background: transparent;
      border: none;
      color: #A3A3A3;
      padding: 6px 12px;
      font-size: 0.82rem;
      font-weight: 600;
      border-radius: 4px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    .pill-btn:hover {
      color: #FFFFFF;
    }

    .pill-btn.active {
      background: var(--primary-orange);
      color: #FFFFFF;
    }

    .close-btn {
      width: 36px;
      height: 36px;
      border-radius: var(--radius-sm);
      background: #282828;
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #FFFFFF;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-left: 6px;
    }

    .close-btn:hover {
      background: #dc2626;
      border-color: #dc2626;
      color: #FFFFFF;
      transform: scale(1.05);
    }

    /* Modal Body */
    .modal-body {
      flex: 1;
      overflow-y: auto;
      max-height: calc(92vh - 140px);
      background: #141414;
      padding: 0;
      position: relative;
    }

    /* MODE 1: PDF Viewer */
    .pdf-viewer-container {
      width: 100%;
      height: 74vh;
      min-height: 550px;
      background: #1A1A1A;
      display: flex;
    }

    .pdf-object {
      width: 100%;
      height: 100%;
      border: none;
    }

    .pdf-fallback-msg {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 40px;
      text-align: center;
      color: #FFFFFF;
      gap: 14px;
      margin: auto;
    }

    .fallback-icon {
      font-size: 3.5rem;
      color: var(--primary-orange);
    }

    .fallback-actions {
      display: flex;
      gap: 12px;
      margin-top: 10px;
    }

    /* MODE 2: Structured Document View */
    .structured-resume-sheet {
      padding: 30px;
      display: flex;
      justify-content: center;
    }

    .resume-sheet-content {
      width: 100%;
      max-width: 900px;
      background: #1C1C1C;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-sm);
      padding: 40px 48px;
      display: flex;
      flex-direction: column;
      gap: 24px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    }

    /* Sheet Header */
    .sheet-header {
      text-align: center;
      border-bottom: 2px solid var(--primary-orange);
      padding-bottom: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .applicant-name {
      font-size: 2.3rem;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.01em;
      margin: 0;
    }

    .applicant-title {
      font-size: 1.15rem;
      font-weight: 600;
      color: var(--primary-orange);
      margin: 0;
    }

    .applicant-contacts {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
      font-size: 0.88rem;
      color: #CCCCCC;
      margin-top: 4px;
    }

    .contact-pill {
      color: #CCCCCC;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: color 0.2s ease;
    }

    .contact-pill:hover {
      color: var(--primary-orange);
    }

    .contact-pill i {
      color: var(--primary-orange);
      font-size: 0.82rem;
    }

    .contact-divider {
      color: #666666;
    }

    /* Sections */
    .sheet-section {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .section-heading {
      font-size: 1rem;
      font-weight: 700;
      color: var(--primary-orange);
      letter-spacing: 0.08em;
      border-bottom: 1px solid rgba(255, 255, 255, 0.09);
      padding-bottom: 5px;
      margin: 0;
    }

    .summary-text {
      font-size: 0.92rem;
      line-height: 1.65;
      color: #D1D5DB;
      margin: 0;
    }

    .summary-text strong {
      color: #FFFFFF;
    }

    /* Skills Bullets */
    .skills-bullets {
      list-style: disc;
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      font-size: 0.9rem;
      line-height: 1.55;
      color: #CCCCCC;
    }

    .skills-bullets strong {
      color: #FFFFFF;
    }

    /* Experience */
    .exp-block {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .exp-top {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
    }

    .exp-role {
      font-size: 1.05rem;
      font-weight: 700;
      color: #FFFFFF;
      margin: 0;
    }

    .exp-company {
      font-size: 0.95rem;
      color: var(--primary-orange);
      font-weight: 500;
    }

    .exp-dates {
      font-family: var(--font-mono);
      font-size: 0.88rem;
      color: #A3A3A3;
      font-weight: 600;
    }

    .sub-heading {
      font-size: 0.88rem;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: 0.05em;
      margin: 4px 0 0 0;
    }

    .duties-list {
      list-style: disc;
      padding-left: 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      font-size: 0.88rem;
      line-height: 1.55;
      color: #CCCCCC;
    }

    /* Projects */
    .project-entry {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-bottom: 12px;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.07);
    }

    .project-entry:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }

    .proj-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 8px;
    }

    .proj-title {
      font-size: 1rem;
      font-weight: 700;
      color: #FFFFFF;
      margin: 0;
    }

    .proj-sep {
      color: var(--primary-orange);
      margin: 0 4px;
    }

    .proj-sub {
      color: #E0E0E0;
      font-weight: 500;
    }

    .proj-tech {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      color: var(--primary-orange);
    }

    /* Education */
    .edu-entry {
      padding: 4px 0;
    }

    .edu-degree {
      font-size: 1rem;
      font-weight: 700;
      color: #FFFFFF;
      margin: 0;
    }

    /* Modal Footer */
    .modal-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 24px;
      background: #1F1F1F;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      flex-wrap: wrap;
      gap: 12px;
    }

    .footer-left-info {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.88rem;
      color: #A3A3A3;
    }

    .footer-buttons {
      display: flex;
      gap: 10px;
    }

    @media (max-width: 768px) {
      .resume-modal-card {
        max-height: 96vh;
      }
      .modal-header {
        padding: 12px 16px;
      }
      .modal-title {
        font-size: 1.05rem;
      }
      .title-sub {
        display: none;
      }
      .structured-resume-sheet {
        padding: 12px;
      }
      .resume-sheet-content {
        padding: 24px 18px;
      }
      .applicant-name {
        font-size: 1.7rem;
      }
      .applicant-contacts {
        font-size: 0.8rem;
      }
      .contact-divider {
        display: none;
      }
      .applicant-contacts {
        flex-direction: column;
        gap: 4px;
      }
      .icon-only-mobile span {
        display: none;
      }
      .footer-left-info {
        display: none;
      }
      .modal-footer {
        justify-content: flex-end;
      }
    }
  `]
})
export class ResumeViewerComponent implements OnInit, OnDestroy {
  isOpen: boolean = false;
  viewMode: 'interactive' | 'pdf' = 'interactive';
  safePdfUrl!: SafeResourceUrl;
  private sub!: Subscription;

  constructor(
    public portfolioService: PortfolioService,
    private sanitizer: DomSanitizer
  ) {
    this.safePdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl('assets/Hrithik_Apsingekar_Resume.pdf');
  }

  ngOnInit(): void {
    // Hidden on load! Only opens when triggered by user interaction
    this.sub = this.portfolioService.resumeModal$.subscribe((open) => {
      this.isOpen = open;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (typeof document !== 'undefined') {
      document.body.classList.remove('modal-open');
    }
  }

  @HostListener('window:keydown.escape')
  onEscapePress(): void {
    if (this.isOpen) {
      this.closeModal();
    }
  }

  closeModal(): void {
    this.portfolioService.closeResumeModal();
  }

  onBackdropClick(event: MouseEvent): void {
    // Only close if user clicked directly on the darkened backdrop
    if ((event.target as HTMLElement).classList.contains('resume-modal-backdrop')) {
      this.closeModal();
    }
  }
}
