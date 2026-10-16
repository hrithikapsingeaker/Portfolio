import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { Project } from '../../models/portfolio.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="projects-section">
      <div class="container">
        
        <div class="section-header">
          <div class="section-tag">
            <i class="fa-solid fa-layer-group"></i> Portfolio Showcase
          </div>
          <h2>Featured <span class="gradient-text">Projects</span></h2>
          <p>
            Click any project to explore its full technical architecture, database schema design, and implementation highlights.
          </p>
        </div>

        <!-- Category Filter Tabs -->
        <div class="filter-tabs">
          <button 
            type="button"
            class="filter-btn" 
            [class.active]="selectedCategory === 'all'"
            (click)="selectedCategory = 'all'">
            All Projects
          </button>
          <button 
            type="button"
            class="filter-btn" 
            [class.active]="selectedCategory === 'web'"
            (click)="selectedCategory = 'web'">
            Web Applications
          </button>
          <button 
            type="button"
            class="filter-btn" 
            [class.active]="selectedCategory === 'portal'"
            (click)="selectedCategory = 'portal'">
            Web Portals
          </button>
          <button 
            type="button"
            class="filter-btn" 
            [class.active]="selectedCategory === 'desktop'"
            (click)="selectedCategory = 'desktop'">
            Desktop / WinForms
          </button>
        </div>

        <!-- Clean Projects Grid: Name Only with Click to Open Modal -->
        <div class="projects-grid">
          <div 
            *ngFor="let proj of filteredProjects" 
            class="project-card glass-card"
            (click)="openDetailModal(proj)"
            tabindex="0"
            role="button"
            (keydown.enter)="openDetailModal(proj)"
            (keydown.space)="openDetailModal(proj); $event.preventDefault()"
            [attr.aria-label]="'Open details for ' + proj.title">
            
            <div class="card-header-mini">
              <div class="project-icon-badge">
                <i class="fa-solid" [ngClass]="proj.icon"></i>
              </div>
              <span class="category-pill">{{ proj.categoryLabel }}</span>
            </div>

            <div class="card-title-area">
              <h3 class="project-name">{{ proj.title }}</h3>
            </div>

            <div class="card-action-bar">
              <span class="click-hint">
                <span>View Details</span>
                <i class="fa-solid fa-arrow-right-long hint-arrow"></i>
              </span>
            </div>

          </div>
        </div>

      </div>

      <!-- Comprehensive Project Details Modal -->
      <div 
        class="modal-overlay" 
        *ngIf="selectedModalProject" 
        (click)="closeModal()"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="selectedModalProject.title + ' Details'">
        
        <div class="modal-content glass-card" (click)="$event.stopPropagation()">
          <button class="modal-close-btn" (click)="closeModal()" aria-label="Close dialog">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="modal-header">
            <div class="modal-icon">
              <i class="fa-solid" [ngClass]="selectedModalProject.icon"></i>
            </div>
            <div class="modal-title-group">
              <div class="modal-badge-row">
                <span class="badge-type">{{ selectedModalProject.categoryLabel }}</span>
                <span class="badge-commercial"><i class="fa-solid fa-star"></i> Commercial Project</span>
              </div>
              <h3 class="modal-project-title">{{ selectedModalProject.title }}</h3>
              <p class="modal-sub">{{ selectedModalProject.subtitle }}</p>
            </div>
          </div>

          <div class="modal-body">
            <!-- Project Overview -->
            <div class="modal-section">
              <h4 class="section-title"><i class="fa-solid fa-circle-info text-orange"></i> Overview & Architecture</h4>
              <p class="section-text">{{ selectedModalProject.description }}</p>
            </div>

            <!-- Key Architectural Highlights -->
            <div class="modal-section">
              <h4 class="section-title"><i class="fa-solid fa-list-check text-orange"></i> Key Implementation Highlights</h4>
              <ul class="modal-list">
                <li *ngFor="let hl of selectedModalProject.highlights">
                  <i class="fa-solid fa-check text-orange list-icon"></i>
                  <span>{{ hl }}</span>
                </li>
              </ul>
            </div>

            <!-- Technology Stack -->
            <div class="modal-section">
              <h4 class="section-title"><i class="fa-solid fa-microchip text-orange"></i> Technologies & Tools</h4>
              <div class="modal-tech-chips">
                <span class="tech-chip" *ngFor="let tech of selectedModalProject.technologies">
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Modal Footer with close button -->
            <div class="modal-close-footer">
              <button (click)="closeModal()" class="btn btn-secondary btn-sm">
                <span>Close Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects-section {
      padding: 90px 0;
      position: relative;
      background: #121212;
    }
    .filter-tabs {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 40px;
    }
    .filter-btn {
      background: #1E1E1E;
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #A3A3A3;
      padding: 9px 22px;
      border-radius: var(--radius-sm);
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .filter-btn:hover {
      border-color: var(--primary-orange);
      color: #FFFFFF;
    }
    .filter-btn.active {
      background: var(--primary-orange);
      border-color: var(--primary-orange);
      color: #FFFFFF;
      box-shadow: 0 4px 14px rgba(253, 111, 0, 0.35);
    }

    /* Clean Projects Grid */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    /* Minimalist, Interactive Project Card */
    .project-card {
      padding: 26px 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 20px;
      background: #1E1E1E;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-md);
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      min-height: 180px;
    }
    .project-card:hover, .project-card:focus-visible {
      border-color: var(--primary-orange);
      transform: translateY(-4px);
      box-shadow: 0 12px 28px rgba(253, 111, 0, 0.2);
      outline: none;
    }

    .card-header-mini {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .project-icon-badge {
      width: 44px;
      height: 44px;
      border-radius: var(--radius-sm);
      background: var(--primary-orange-light);
      color: var(--primary-orange);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      transition: transform 0.25s ease;
    }
    .project-card:hover .project-icon-badge {
      transform: scale(1.08);
      background: var(--primary-orange);
      color: #FFFFFF;
    }
    .category-pill {
      font-size: 0.74rem;
      color: #A3A3A3;
      background: #252525;
      padding: 4px 10px;
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.06);
      font-weight: 500;
    }

    .card-title-area {
      flex: 1;
      display: flex;
      align-items: center;
    }
    .project-name {
      font-size: 1.35rem;
      font-weight: 700;
      color: #FFFFFF;
      margin: 0;
      line-height: 1.3;
      transition: color 0.2s ease;
    }
    .project-card:hover .project-name {
      color: var(--primary-orange);
    }

    .card-action-bar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-top: 14px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }
    .click-hint {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      font-weight: 600;
      color: #A3A3A3;
      transition: all 0.2s ease;
    }
    .hint-arrow {
      transition: transform 0.2s ease;
    }
    .project-card:hover .click-hint {
      color: var(--primary-orange);
    }
    .project-card:hover .hint-arrow {
      transform: translateX(4px);
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
      max-width: 680px;
      max-height: 88vh;
      overflow-y: auto;
      padding: 32px;
      background: #1E1E1E;
      border: 1px solid rgba(253, 111, 0, 0.4);
      border-radius: var(--radius-md);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9);
      animation: slideUp 0.25s ease;
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
    .badge-type {
      font-size: 0.76rem;
      font-weight: 600;
      color: var(--primary-orange);
      background: var(--primary-orange-light);
      padding: 3px 10px;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(253, 111, 0, 0.25);
    }
    .badge-commercial {
      font-size: 0.74rem;
      color: #FBBF24;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .modal-project-title {
      font-size: 1.6rem;
      font-weight: 800;
      color: #FFFFFF;
      margin: 0;
    }
    .modal-sub {
      font-size: 0.92rem;
      color: #A3A3A3;
      margin: 0;
    }

    .modal-body {
      display: flex;
      flex-direction: column;
      gap: 22px;
    }
    .modal-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .section-title {
      font-size: 0.98rem;
      font-weight: 600;
      color: #FFFFFF;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-text {
      font-size: 0.92rem;
      line-height: 1.65;
      color: #CCCCCC;
      margin: 0;
    }

    .modal-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 0;
      padding: 0;
    }
    .modal-list li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 0.88rem;
      line-height: 1.5;
      color: #E0E0E0;
    }
    .list-icon {
      margin-top: 3px;
      flex-shrink: 0;
      font-size: 0.85rem;
    }

    .modal-tech-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .tech-chip {
      background: #252525;
      border: 1px solid rgba(253, 111, 0, 0.35);
      color: #FFFFFF;
      border-radius: var(--radius-sm);
      padding: 5px 12px;
      font-size: 0.82rem;
      font-weight: 500;
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

    @media (max-width: 992px) {
      .projects-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }
    }
    @media (max-width: 600px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
      .modal-content {
        padding: 24px 20px;
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
export class ProjectsComponent {
  @Output() formSelected = new EventEmitter<{ formType: string; context?: any }>();

  projects: Project[] = [];
  selectedCategory: string = 'all';
  selectedModalProject: Project | null = null;

  constructor(private portfolioService: PortfolioService) {
    this.projects = this.portfolioService.getProjects();
  }

  get filteredProjects(): Project[] {
    if (this.selectedCategory === 'all') {
      return this.projects;
    }
    return this.projects.filter(p => p.category === this.selectedCategory);
  }

  openDetailModal(project: Project): void {
    this.selectedModalProject = project;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal(): void {
    this.selectedModalProject = null;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selectedModalProject) {
      this.closeModal();
    }
  }

  requestQuoteForProject(project: Project): void {
    this.formSelected.emit({
      formType: 'quote',
      context: {
        projectType: project.category === 'desktop' ? 'desktop-winforms' : 'web-mvc',
        notes: `Inquiry regarding architectural design similar to ${project.title} (${project.subtitle})`
      }
    });
    const el = document.getElementById('forms-hub');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  quoteFromModal(project: Project): void {
    this.closeModal();
    this.requestQuoteForProject(project);
  }
}
