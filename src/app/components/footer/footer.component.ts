import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container footer-container">
        
        <div class="footer-top">
          <!-- Logo & Brand Description -->
          <div class="footer-brand">
            <div class="brand-logo">
              <span class="logo-accent">H</span>
              <span class="logo-text">rithik<span class="logo-dot">.</span></span>
            </div>
            <p class="footer-desc">
              Full-Stack .NET Developer specializing in ASP.NET MVC, WinForms, Microsoft SQL Server database schemas, and modern responsive web systems.
            </p>
            <div class="footer-social-row">
              <a [href]="portfolioService.personalInfo.linkedinUrl" target="_blank" rel="noopener noreferrer" class="f-social-btn" title="LinkedIn">
                <i class="fa-brands fa-linkedin-in"></i>
              </a>
              <a [href]="'mailto:' + portfolioService.personalInfo.email" class="f-social-btn" title="Email">
                <i class="fa-solid fa-envelope"></i>
              </a>
              <a href="https://github.com/hrithikapsingekar" target="_blank" rel="noopener noreferrer" class="f-social-btn" title="GitHub">
                <i class="fa-brands fa-github"></i>
              </a>
            </div>
          </div>

          <div class="footer-links-col">
            <h5>Navigation</h5>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About Me</a></li>
              <li><a href="#skills">Services & Skills</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#forms-hub">Interactive Forms</a></li>
              <li><a href="javascript:void(0)" (click)="openResume()">View Official Resume</a></li>
            </ul>
          </div>

          <div class="footer-links-col">
            <h5>Forms Suite</h5>
            <ul>
              <li><a href="#forms-hub">Quick Contact Form</a></li>
              <li><a href="#forms-hub">Project Quote Estimator</a></li>
              <li><a href="#forms-hub">1-on-1 Interview Booking</a></li>
              <li><a href="#forms-hub">Leave Endorsement</a></li>
              <li><a href="#forms-hub">Submissions Wall</a></li>
            </ul>
          </div>

          <div class="footer-contact-col">
            <h5>Contact Info</h5>
            <ul class="f-contact-list">
              <li>
                <i class="fa-solid fa-location-dot"></i>
                <span>Pune, Maharashtra, India</span>
              </li>
              <li>
                <i class="fa-solid fa-envelope"></i>
                <a [href]="'mailto:' + portfolioService.personalInfo.email">{{ portfolioService.personalInfo.email }}</a>
              </li>
              <li>
                <i class="fa-brands fa-linkedin"></i>
                <a [href]="portfolioService.personalInfo.linkedinUrl" target="_blank" rel="noopener noreferrer">/in/hrithik-apsingekar</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="copyright">
            © 2026 Hrithik Apsingekar. All Rights Reserved. Built with Angular & TypeScript (Figma Theme).
          </p>

          <div class="back-to-top">
            <a href="#hero" class="btn-top" title="Back to top">
              <i class="fa-solid fa-arrow-up"></i>
            </a>
          </div>
        </div>

      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #0D0D0D;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding: 75px 0 35px 0;
      position: relative;
    }
    .footer-top {
      display: grid;
      grid-template-columns: 1.4fr 0.8fr 1fr 1fr;
      gap: 40px;
      padding-bottom: 50px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .brand-logo {
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: 1.6rem;
      color: #FFFFFF;
      letter-spacing: -0.02em;
    }
    .logo-accent {
      color: var(--primary-orange);
      font-size: 1.8rem;
    }
    .logo-dot {
      color: var(--primary-orange);
    }
    .footer-desc {
      font-size: 0.92rem;
      line-height: 1.6;
      color: #A3A3A3;
      max-width: 320px;
    }
    .footer-social-row {
      display: flex;
      gap: 12px;
      margin-top: 6px;
    }
    .f-social-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #1E1E1E;
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
      transition: all 0.2s ease;
    }
    .f-social-btn:hover {
      background: var(--primary-orange);
      border-color: var(--primary-orange);
      color: #FFFFFF;
      transform: translateY(-2px);
    }

    .footer-links-col h5,
    .footer-contact-col h5 {
      font-size: 0.95rem;
      color: #FFFFFF;
      margin-bottom: 18px;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-family: var(--font-heading);
      font-weight: 700;
    }
    .footer-links-col ul,
    .footer-contact-col ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .footer-links-col a {
      color: #A3A3A3;
      font-size: 0.9rem;
      transition: all 0.2s ease;
    }
    .footer-links-col a:hover {
      color: var(--primary-orange);
      transform: translateX(4px);
      display: inline-block;
    }

    .f-contact-list li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 0.9rem;
      color: #A3A3A3;
    }
    .f-contact-list i {
      color: var(--primary-orange);
      margin-top: 4px;
      width: 14px;
    }
    .f-contact-list a {
      color: #A3A3A3;
    }
    .f-contact-list a:hover {
      color: var(--primary-orange);
    }

    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 30px;
      flex-wrap: wrap;
      gap: 16px;
    }
    .copyright {
      font-size: 0.85rem;
      color: #737373;
    }
    .btn-top {
      width: 42px;
      height: 42px;
      border-radius: var(--radius-sm);
      background: #1E1E1E;
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    .btn-top:hover {
      color: #FFFFFF;
      border-color: var(--primary-orange);
      background: var(--primary-orange);
    }

    @media (max-width: 992px) {
      .footer-top {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media (max-width: 600px) {
      .footer-top {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FooterComponent {
  constructor(public portfolioService: PortfolioService) {}

  openResume(): void {
    this.portfolioService.openResumeModal();
  }
}
