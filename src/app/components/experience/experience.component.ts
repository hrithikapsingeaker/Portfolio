import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { ExperienceItem } from '../../models/portfolio.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="experience-section">
      <div class="container">
        
        <div class="section-header">
          <div class="section-tag">
            <i class="fa-solid fa-briefcase"></i> Work History
          </div>
          <h2>Professional <span class="gradient-text">Experience</span></h2>
          <p>
            Commercial software engineering experience delivering reliable web, desktop, and database systems.
          </p>
        </div>

        <div class="timeline-container">
          <div *ngFor="let exp of experiences" class="timeline-card glass-card">
            
            <div class="timeline-meta">
              <div class="status-indicator">
                <span class="live-dot" *ngIf="exp.isCurrent"></span>
                <span class="period-text">{{ exp.period }}</span>
              </div>
              <span class="location-tag"><i class="fa-solid fa-location-dot"></i> {{ exp.location }}</span>
            </div>

            <div class="role-header">
              <div class="company-logo-badge">
                <i class="fa-solid fa-building"></i>
              </div>
              <div>
                <h3 class="role-title">{{ exp.role }}</h3>
                <h4 class="company-name">{{ exp.company }}</h4>
              </div>
            </div>

            <p class="role-summary">{{ exp.summary }}</p>

            <div class="responsibilities-block">
              <h5><i class="fa-solid fa-list-check text-orange"></i> Core Responsibilities & Impact:</h5>
              <ul class="resp-list">
                <li *ngFor="let resp of exp.responsibilities">
                  <i class="fa-solid fa-circle-check resp-bullet"></i>
                  <span>{{ resp }}</span>
                </li>
              </ul>
            </div>

            <div class="tech-stack-row">
              <span class="tech-tag" *ngFor="let tech of exp.technologies">
                {{ tech }}
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .experience-section {
      padding: 95px 0;
      position: relative;
      background: #121212;
    }
    .timeline-container {
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }
    .timeline-card {
      padding: 38px 40px;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 20px;
      background: #1E1E1E;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-md);
    }
    .timeline-card:hover {
      border-color: rgba(253, 111, 0, 0.5);
    }
    .timeline-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .status-indicator {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--primary-orange-light);
      border: 1px solid rgba(253, 111, 0, 0.35);
      padding: 5px 14px;
      border-radius: var(--radius-full);
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--primary-orange);
      font-family: var(--font-mono);
    }
    .live-dot {
      width: 7px;
      height: 7px;
      background: var(--primary-orange);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--primary-orange);
    }
    .location-tag {
      font-size: 0.84rem;
      color: #737373;
    }
    .role-header {
      display: flex;
      align-items: center;
      gap: 18px;
    }
    .company-logo-badge {
      width: 52px;
      height: 52px;
      border-radius: var(--radius-sm);
      background: var(--primary-orange-light);
      color: var(--primary-orange);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4rem;
      border: 1px solid rgba(253, 111, 0, 0.3);
    }
    .role-title {
      font-size: 1.5rem;
      color: #FFFFFF;
      margin-bottom: 2px;
    }
    .company-name {
      font-size: 1.05rem;
      color: var(--primary-orange);
      font-weight: 500;
    }
    .role-summary {
      font-size: 0.98rem;
      line-height: 1.6;
      color: #A3A3A3;
    }
    .responsibilities-block h5 {
      font-size: 0.96rem;
      color: #FFFFFF;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .resp-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .resp-list li {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-size: 0.92rem;
      line-height: 1.5;
      color: #CCCCCC;
    }
    .resp-bullet {
      color: var(--primary-orange);
      margin-top: 4px;
      font-size: 0.88rem;
      flex-shrink: 0;
    }
    .tech-stack-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding-top: 14px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }
    .tech-tag {
      background: #252525;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-sm);
      padding: 4px 10px;
      font-size: 0.78rem;
      color: #FFFFFF;
    }

    @media (max-width: 768px) {
      .timeline-card {
        padding: 24px 20px;
      }
      .role-header {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class ExperienceComponent {
  experiences: ExperienceItem[] = [];

  constructor(private portfolioService: PortfolioService) {
    this.experiences = this.portfolioService.getExperience();
  }
}
