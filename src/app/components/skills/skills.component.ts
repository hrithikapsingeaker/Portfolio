import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { SkillCategory } from '../../models/portfolio.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="skills-section">
      <div class="container skills-container">
        
        <div class="section-header">
          <div class="section-tag">
            <i class="fa-solid fa-code"></i> Specialized Services & Tech
          </div>
          <h2>Technical <span class="gradient-text">Skills & Solutions</span></h2>
          <p>
            Click any domain to explore technical competencies, query optimization methods, and production stack depth.
          </p>
        </div>

        <!-- Categories Grid: All 4 Cards in 1 Line in 1 Div (Centered) -->
        <div class="categories-grid">
          <div 
            *ngFor="let cat of skillCategories" 
            class="skill-card glass-card"
            (click)="openSkillModal(cat)"
            tabindex="0"
            role="button"
            (keydown.enter)="openSkillModal(cat)"
            (keydown.space)="openSkillModal(cat); $event.preventDefault()"
            [attr.aria-label]="'Explore ' + cat.title + ' competencies'">
            
            <div class="card-icon-wrap">
              <i class="fa-solid" [ngClass]="cat.icon"></i>
            </div>

            <div class="card-content">
              <h3 class="card-title">{{ cat.title }}</h3>
              <span class="card-badge">{{ cat.skills.length }} Competencies</span>
            </div>

            <div class="card-action">
              <span class="view-skills-hint">
                <span>View Full Stack</span>
                <i class="fa-solid fa-arrow-right-long action-arrow"></i>
              </span>
            </div>

          </div>
        </div>

        <!-- Bottom Enterprise Stack Strip (Centered) -->
        <div class="tech-strip glass-card">
          <div class="strip-header">
            <i class="fa-solid fa-layer-group text-orange"></i>
            <span>Core Enterprise Stack:</span>
          </div>
          <div class="badges-row">
            <span class="tech-pill">C#</span>
            <span class="tech-pill">ASP.NET MVC</span>
            <span class="tech-pill">WinForms Desktop</span>
            <span class="tech-pill">Microsoft SQL Server</span>
            <span class="tech-pill">T-SQL Stored Procedures</span>
            <span class="tech-pill">Entity Framework & LINQ</span>
            <span class="tech-pill">ADO.NET High Throughput</span>
            <span class="tech-pill">IIS Production Deployment</span>
            <span class="tech-pill">RBAC Security Governance</span>
          </div>
        </div>

      </div>

      <!-- Skills Domain Detail Modal -->
      <div 
        class="modal-overlay" 
        *ngIf="selectedModalCategory" 
        (click)="closeModal()"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="selectedModalCategory.title + ' Details'">
        
        <div class="modal-content glass-card" (click)="$event.stopPropagation()">
          <button class="modal-close-btn" (click)="closeModal()" aria-label="Close dialog">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="modal-header">
            <div class="modal-icon">
              <i class="fa-solid" [ngClass]="selectedModalCategory.icon"></i>
            </div>
            <div class="modal-title-group">
              <div class="modal-badge-row">
                <span class="badge-tag">Technical Domain</span>
                <span class="badge-count">{{ selectedModalCategory.skills.length }} Verified Skills</span>
              </div>
              <h3 class="modal-domain-title">{{ selectedModalCategory.title }}</h3>
              <p class="modal-sub">Commercial proficiency and implementation capabilities</p>
            </div>
          </div>

          <div class="modal-body">
            
            <div class="modal-skills-list">
              <div *ngFor="let skill of selectedModalCategory.skills" class="modal-skill-item">
                <div class="skill-meta">
                  <div class="skill-name-wrap">
                    <i class="fa-solid" [ngClass]="skill.icon || 'fa-code'"></i>
                    <span class="skill-name">{{ skill.name }}</span>
                  </div>
                  <span class="skill-tag">{{ skill.tag }}</span>
                </div>
                
                <div class="skill-bar-wrapper">
                  <div class="skill-bar-track">
                    <div class="skill-bar-fill" [style.width.%]="skill.level"></div>
                  </div>
                  <span class="skill-percent">{{ skill.level }}%</span>
                </div>
              </div>
            </div>

            <!-- Modal Action Footer -->
            <div class="modal-cta-box">
              <div class="cta-text">
                <strong>Interested in solutions with this technology stack?</strong>
                <p>Discuss project scope, system design, or interview requirements.</p>
              </div>
              <button (click)="discussDomain()" class="btn btn-primary btn-sm cta-quote-btn">
                <i class="fa-solid fa-comments"></i>
                <span>Discuss Requirements</span>
              </button>
            </div>

          </div>
        </div>
      </div>

    </section>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .skills-section {
      width: 100%;
      padding: 90px 0;
      position: relative;
      background: #121212;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
    }

    .skills-container {
      width: 100%;
      max-width: 1240px;
      margin-left: auto;
      margin-right: auto;
      padding: 0 24px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .section-header {
      text-align: center;
      max-width: 720px;
      margin: 0 auto 40px auto;
      width: 100%;
    }

    /* All 4 Cards Centered in One Line */
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      width: 100%;
      max-width: 1240px;
      margin: 0 auto 35px auto;
      justify-content: center;
      align-items: stretch;
      box-sizing: border-box;
    }

    /* Clean, Interactive Skill Card (Matching Projects Style) */
    .skill-card {
      padding: 24px 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      justify-content: space-between;
      gap: 16px;
      background: #1E1E1E;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      box-sizing: border-box;
      min-height: 200px;
    }
    .skill-card:hover, .skill-card:focus-visible {
      border-color: var(--primary-orange);
      transform: translateY(-4px);
      box-shadow: 0 12px 28px rgba(253, 111, 0, 0.2);
      outline: none;
    }

    .card-icon-wrap {
      width: 46px;
      height: 46px;
      border-radius: var(--radius-sm);
      background: var(--primary-orange-light);
      color: var(--primary-orange);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease;
      flex-shrink: 0;
    }
    .skill-card:hover .card-icon-wrap {
      transform: scale(1.08);
      background: var(--primary-orange);
      color: #FFFFFF;
    }

    .card-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      width: 100%;
      min-width: 0;
    }

    /* Single Line Title Guaranteed (No Wrapping) */
    .card-title {
      font-size: clamp(0.78rem, 0.95vw, 0.94rem);
      font-weight: 700;
      color: #FFFFFF;
      margin: 0;
      line-height: 1.25;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      max-width: 100%;
      text-align: center;
      transition: color 0.2s ease;
    }
    .skill-card:hover .card-title {
      color: var(--primary-orange);
    }

    .card-badge {
      font-size: 0.74rem;
      color: #A3A3A3;
      background: #252525;
      padding: 3px 10px;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.06);
      font-weight: 500;
    }

    .card-action {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding-top: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }
    .view-skills-hint {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.82rem;
      font-weight: 600;
      color: #A3A3A3;
      transition: all 0.2s ease;
    }
    .action-arrow {
      transition: transform 0.2s ease;
    }
    .skill-card:hover .view-skills-hint {
      color: var(--primary-orange);
    }
    .skill-card:hover .action-arrow {
      transform: translateX(4px);
    }

    /* Centered Bottom Tech Strip */
    .tech-strip {
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: 14px;
      width: 100%;
      max-width: 1240px;
      margin: 0 auto;
      background: #1E1E1E;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-md);
      box-sizing: border-box;
    }
    .strip-header {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      font-weight: 700;
      font-size: 0.95rem;
      color: #FFFFFF;
    }
    .badges-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
    }
    .tech-pill {
      background: #252525;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-sm);
      padding: 5px 12px;
      font-size: 0.82rem;
      color: #FFFFFF;
      transition: all 0.2s ease;
    }
    .tech-pill:hover {
      border-color: var(--primary-orange);
      color: var(--primary-orange);
    }

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      animation: fadeIn 0.2s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-content {
      position: relative;
      width: 100%;
      max-width: 660px;
      max-height: 88vh;
      overflow-y: auto;
      padding: 32px;
      background: #1E1E1E;
      border: 1px solid rgba(253, 111, 0, 0.4);
      border-radius: var(--radius-md);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9);
      animation: slideUp 0.25s ease;
      text-align: left;
    }
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .modal-close-btn {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #252525;
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #FFFFFF;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      transition: all 0.2s ease;
    }
    .modal-close-btn:hover {
      background: var(--primary-orange);
      border-color: var(--primary-orange);
      transform: rotate(90deg);
    }

    .modal-header {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 24px;
      padding-right: 40px;
    }
    .modal-icon {
      width: 52px;
      height: 52px;
      border-radius: var(--radius-sm);
      background: var(--primary-orange-light);
      color: var(--primary-orange);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      flex-shrink: 0;
    }
    .modal-title-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .modal-badge-row {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 2px;
    }
    .badge-tag {
      font-size: 0.74rem;
      font-weight: 600;
      color: var(--primary-orange);
      background: var(--primary-orange-light);
      padding: 3px 10px;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(253, 111, 0, 0.25);
    }
    .badge-count {
      font-size: 0.74rem;
      color: #FBBF24;
    }
    .modal-domain-title {
      font-size: 1.45rem;
      font-weight: 800;
      color: #FFFFFF;
      margin: 0;
    }
    .modal-sub {
      font-size: 0.88rem;
      color: #A3A3A3;
      margin: 0;
    }

    .modal-body {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .modal-skills-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .modal-skill-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
      background: #252525;
      padding: 12px 14px;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .skill-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .skill-name-wrap {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--primary-orange);
      font-size: 0.92rem;
    }
    .skill-name {
      font-weight: 600;
      color: #FFFFFF;
    }
    .skill-tag {
      font-size: 0.72rem;
      color: #A3A3A3;
      background: rgba(255, 255, 255, 0.06);
      padding: 3px 8px;
      border-radius: var(--radius-sm);
    }

    .skill-bar-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .skill-bar-track {
      flex: 1;
      height: 7px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-full);
      overflow: hidden;
    }
    .skill-bar-fill {
      height: 100%;
      background: var(--primary-orange);
      border-radius: var(--radius-full);
      transition: width 0.8s ease;
    }
    .skill-percent {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--primary-orange);
      width: 36px;
      text-align: right;
    }

    .modal-cta-box {
      margin-top: 8px;
      padding: 18px 20px;
      background: #252525;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .cta-text strong {
      display: block;
      color: #FFFFFF;
      font-size: 0.92rem;
    }
    .cta-text p {
      margin: 4px 0 0 0;
      font-size: 0.82rem;
      color: #A3A3A3;
    }
    .cta-quote-btn {
      white-space: nowrap;
      flex-shrink: 0;
    }

    @media (max-width: 1024px) {
      .categories-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 16px;
      }
    }
    @media (max-width: 600px) {
      .categories-grid {
        grid-template-columns: 1fr;
      }
      .modal-content {
        padding: 24px 18px;
      }
      .modal-header {
        flex-direction: column;
      }
      .modal-cta-box {
        flex-direction: column;
        align-items: stretch;
      }
      .cta-quote-btn {
        width: 100%;
      }
    }
  `]
})
export class SkillsComponent {
  skillCategories: SkillCategory[] = [];
  selectedModalCategory: SkillCategory | null = null;

  constructor(private portfolioService: PortfolioService) {
    this.skillCategories = this.portfolioService.getSkillCategories();
  }

  openSkillModal(category: SkillCategory): void {
    this.selectedModalCategory = category;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal(): void {
    this.selectedModalCategory = null;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selectedModalCategory) {
      this.closeModal();
    }
  }

  discussDomain(): void {
    this.closeModal();
    const el = document.getElementById('forms-hub');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
