import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="about-section">
      <div class="container">
        
        <div class="section-header">
          <div class="section-tag">
            <i class="fa-solid fa-user"></i> Professional Profile
          </div>
          <h2>About <span class="gradient-text">Me</span></h2>
          <p>
            Bridging robust backend engineering with responsive modern interfaces.
          </p>
        </div>

        <div class="about-grid">
          
          <!-- Left Bio Card -->
          <div class="about-bio glass-card">
            <h3>Engineering Journey & Focus</h3>
            <p class="bio-lead">
              I am a <strong>Full-Stack .NET Developer</strong> based in <strong>Pune, Maharashtra</strong>, currently working as a 
              <strong>Software Programmer &#64; Tweak Software and Solution</strong>.
            </p>
            <p>
              My expertise centers around the Microsoft .NET ecosystem—spanning <strong>ASP.NET MVC</strong> for reliable web architectures, 
              <strong>WinForms</strong> for corporate desktop software, and <strong>Microsoft SQL Server</strong> for mission-critical databases.
            </p>
            <p>
              I focus on writing clean, scalable C# code, designing 3NF relational schemas, optimizing query performance via indexed views and LINQ, and deploying applications on <strong>IIS</strong>.
            </p>

            <!-- Key pillars -->
            <div class="pillars-grid">
              <div class="pillar-item">
                <div class="pillar-icon"><i class="fa-solid fa-shield-halved"></i></div>
                <div>
                  <h4>Secure RBAC</h4>
                  <p>Role-based authentication & tenant isolation.</p>
                </div>
              </div>
              <div class="pillar-item">
                <div class="pillar-icon"><i class="fa-solid fa-bolt-lightning"></i></div>
                <div>
                  <h4>Query Optimization</h4>
                  <p>Stored procedures, LINQ, and indexed views.</p>
                </div>
              </div>
              <div class="pillar-item">
                <div class="pillar-icon"><i class="fa-solid fa-network-wired"></i></div>
                <div>
                  <h4>Layered Architecture</h4>
                  <p>Clean separation of business & data tiers.</p>
                </div>
              </div>
              <div class="pillar-item">
                <div class="pillar-icon"><i class="fa-solid fa-server"></i></div>
                <div>
                  <h4>IIS Deployment</h4>
                  <p>Configuration and production web hosting.</p>
                </div>
              </div>
            </div>

            <div class="about-actions">
              <a href="#forms-hub" (click)="openContact()" class="btn btn-primary btn-sm">
                <span>Contact Me</span>
              </a>
              <button type="button" (click)="openResume()" class="btn btn-outline btn-sm">
                <i class="fa-solid fa-file-contract"></i> <span>View Resume</span>
              </button>
              <a [href]="portfolioService.personalInfo.linkedinUrl" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
                <i class="fa-brands fa-linkedin"></i> LinkedIn
              </a>
            </div>
          </div>

          <!-- Right Sidebar -->
          <div class="about-sidebar">
            
            <!-- Quick Info Card -->
            <div class="sidebar-card glass-card">
              <h4>Contact & Location</h4>
              <ul class="info-list">
                <li>
                  <span class="info-label"><i class="fa-solid fa-location-dot"></i> Location</span>
                  <span class="info-value">Pune, Maharashtra, India</span>
                </li>
                <li>
                  <span class="info-label"><i class="fa-solid fa-envelope"></i> Email</span>
                  <a [href]="'mailto:' + portfolioService.personalInfo.email" class="info-value">{{ portfolioService.personalInfo.email }}</a>
                </li>
                <li>
                  <span class="info-label"><i class="fa-brands fa-linkedin"></i> LinkedIn</span>
                  <a [href]="portfolioService.personalInfo.linkedinUrl" target="_blank" rel="noopener noreferrer" class="info-value">/in/hrithik-apsingekar</a>
                </li>
                <li>
                  <span class="info-label"><i class="fa-solid fa-briefcase"></i> Current Role</span>
                  <span class="info-value">Software Programmer &#64; Tweak Software</span>
                </li>
              </ul>
            </div>

            <!-- Education Card -->
            <div class="sidebar-card glass-card education-card">
              <div class="edu-header">
                <div class="edu-icon"><i class="fa-solid fa-graduation-cap"></i></div>
                <div>
                  <h4>Academic Education</h4>
                  <span class="edu-date">2021 – 2025</span>
                </div>
              </div>
              <div class="edu-body">
                <div class="edu-degree">Bachelor of Computer Applications (BCA)</div>
                <div class="edu-inst">SRTMUN, Nanded, Maharashtra</div>
                <div class="edu-score">
                  <i class="fa-solid fa-award"></i> Distinction: <strong>CGPA 8.94 / 10</strong>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    .about-section {
      padding: 95px 0;
      position: relative;
      background: #121212;
    }
    .about-grid {
      display: grid;
      grid-template-columns: 1.25fr 0.75fr;
      gap: 32px;
    }
    .about-bio {
      padding: 38px 36px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      background: #1E1E1E;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-md);
    }
    .about-bio h3 {
      font-size: 1.6rem;
      color: #FFFFFF;
    }
    .bio-lead {
      font-size: 1.08rem;
      color: #FFFFFF;
      line-height: 1.6;
    }
    .about-bio p {
      line-height: 1.7;
      color: #A3A3A3;
    }
    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin: 10px 0;
    }
    .pillar-item {
      display: flex;
      gap: 14px;
      padding: 14px;
      background: #252525;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(255, 255, 255, 0.06);
    }
    .pillar-icon {
      width: 38px;
      height: 38px;
      border-radius: 6px;
      background: var(--primary-orange-light);
      color: var(--primary-orange);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      flex-shrink: 0;
    }
    .pillar-item h4 {
      font-size: 0.95rem;
      margin-bottom: 2px;
      color: #FFFFFF;
    }
    .pillar-item p {
      font-size: 0.8rem;
      color: #737373;
      line-height: 1.4;
    }
    .about-actions {
      display: flex;
      gap: 14px;
      margin-top: 10px;
    }
    .about-sidebar {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .sidebar-card {
      padding: 28px 24px;
      background: #1E1E1E;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-md);
    }
    .sidebar-card h4 {
      font-size: 1.15rem;
      margin-bottom: 16px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      color: #FFFFFF;
    }
    .info-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .info-list li {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .info-label {
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #737373;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .info-label i {
      color: var(--primary-orange);
    }
    .info-value {
      font-size: 0.94rem;
      color: #FFFFFF;
      font-weight: 500;
      word-break: break-all;
    }
    .education-card .edu-header {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 14px;
    }
    .edu-icon {
      width: 44px;
      height: 44px;
      border-radius: 8px;
      background: var(--primary-orange-light);
      color: var(--primary-orange);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
    }
    .edu-header h4 {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
    .edu-date {
      font-size: 0.8rem;
      color: var(--primary-orange);
      font-family: var(--font-mono);
    }
    .edu-degree {
      font-weight: 700;
      font-size: 1.05rem;
      color: #FFFFFF;
      margin-bottom: 4px;
    }
    .edu-inst {
      font-size: 0.88rem;
      color: #A3A3A3;
      margin-bottom: 10px;
    }
    .edu-score {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: var(--primary-orange-light);
      color: var(--primary-orange);
      border: 1px solid rgba(253, 111, 0, 0.3);
      padding: 5px 12px;
      border-radius: var(--radius-sm);
      font-size: 0.86rem;
    }

    @media (max-width: 900px) {
      .about-grid {
        grid-template-columns: 1fr;
      }
      .pillars-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AboutComponent {
  @Output() formSelected = new EventEmitter<string>();

  constructor(public portfolioService: PortfolioService) {}

  openContact(): void {
    this.formSelected.emit('contact');
  }

  openResume(): void {
    this.portfolioService.openResumeModal();
  }
}
