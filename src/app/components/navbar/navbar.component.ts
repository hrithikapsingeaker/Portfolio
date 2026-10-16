import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="navbar" [class.scrolled]="isScrolled">
      <div class="nav-container">
        <!-- Logo from Figma Theme -->
        <a href="#hero" class="brand-logo" (click)="closeMobileMenu()">
          <span class="logo-accent">H</span>
          <span class="logo-text">rithik<span class="logo-dot">.</span></span>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="nav-links">
          <a href="#hero" class="nav-link active">Home</a>
          <a href="#about" class="nav-link">About Me</a>
          <a href="#skills" class="nav-link">Services & Skills</a>
          <a href="#experience" class="nav-link">Experience</a>
          <a href="#projects" class="nav-link">Projects</a>
          <a href="#forms-hub" class="nav-link nav-link-highlight">
            <i class="fa-solid fa-bolt"></i> Interactive Forms
          </a>
        </nav>

        <!-- Right Action Button in Orange: Hire Me -->
        <div class="nav-actions">
          <a href="#forms-hub" (click)="selectContact()" class="btn btn-primary btn-sm nav-cv-btn">
            <i class="fa-solid fa-paper-plane"></i>
            <span>Hire Me</span>
          </a>

          <!-- Hamburger Toggle -->
          <button class="mobile-toggle" (click)="toggleMobileMenu()" aria-label="Toggle menu">
            <i class="fa-solid" [class.fa-bars]="!mobileMenuOpen" [class.fa-xmark]="mobileMenuOpen"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div class="mobile-menu" [class.open]="mobileMenuOpen">
        <a href="#hero" (click)="closeMobileMenu()" class="mobile-link"><i class="fa-solid fa-house"></i> Home</a>
        <a href="#about" (click)="closeMobileMenu()" class="mobile-link"><i class="fa-solid fa-user"></i> About Me</a>
        <a href="#skills" (click)="closeMobileMenu()" class="mobile-link"><i class="fa-solid fa-code"></i> Services & Skills</a>
        <a href="#experience" (click)="closeMobileMenu()" class="mobile-link"><i class="fa-solid fa-briefcase"></i> Experience</a>
        <a href="#projects" (click)="closeMobileMenu()" class="mobile-link"><i class="fa-solid fa-laptop-code"></i> Projects</a>
        <a href="#forms-hub" (click)="closeMobileMenu()" class="mobile-link mobile-link-featured"><i class="fa-solid fa-sliders"></i> Interactive Forms Hub</a>
        <div class="mobile-menu-footer">
          <a [href]="portfolioService.personalInfo.linkedinUrl" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
            <i class="fa-brands fa-linkedin"></i> LinkedIn
          </a>
          <a href="#forms-hub" (click)="selectContact(); closeMobileMenu()" class="btn btn-primary btn-sm">
            <i class="fa-solid fa-paper-plane"></i> Hire Me
          </a>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 80px;
      z-index: 1000;
      transition: all 0.3s ease;
      background: rgba(30, 30, 30, 0.85);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }
    .navbar.scrolled {
      height: 72px;
      background: rgba(30, 30, 30, 0.98);
      border-bottom-color: rgba(253, 111, 0, 0.25);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
    }
    .nav-container {
      max-width: 1260px;
      height: 100%;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
    }
    .brand-logo {
      display: flex;
      align-items: baseline;
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: 1.6rem;
      color: #FFFFFF;
      text-decoration: none;
      letter-spacing: -0.02em;
      z-index: 2;
    }
    .logo-accent {
      color: var(--primary-orange);
      font-size: 1.8rem;
    }
    .logo-dot {
      color: var(--primary-orange);
    }
    .nav-links {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 26px;
      z-index: 1;
    }
    .nav-link {
      font-size: 0.95rem;
      font-weight: 500;
      color: #FFFFFF;
      transition: all 0.2s ease;
      white-space: nowrap;
    }
    .nav-link:hover,
    .nav-link.active {
      color: var(--primary-orange);
    }
    .nav-link-highlight {
      color: var(--primary-orange);
      font-weight: 600;
    }
    .nav-link-highlight:hover {
      color: #FFA552;
    }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 14px;
      z-index: 2;
    }
    .nav-cv-btn {
      border-radius: var(--radius-sm);
    }
    .mobile-toggle {
      display: none;
      width: 42px;
      height: 42px;
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-sm);
      color: #FFFFFF;
      font-size: 1.2rem;
      cursor: pointer;
    }
    .mobile-menu {
      display: none;
    }

    @media (max-width: 1040px) {
      .nav-links {
        display: none;
      }
      .mobile-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .mobile-menu {
        display: block;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: var(--bg-secondary);
        border-bottom: 1px solid rgba(253, 111, 0, 0.25);
        padding: 20px 24px;
        transform: translateY(-100%);
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
      }
      .mobile-menu.open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: auto;
        box-shadow: 0 20px 30px rgba(0, 0, 0, 0.6);
      }
      .nav-btn-link {
        background: transparent;
        border: none;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-family: inherit;
        font-size: 0.95rem;
        font-weight: 500;
        color: #FFFFFF;
        padding: 0;
        transition: all 0.2s ease;
      }
      .nav-btn-link:hover {
        color: var(--primary-orange);
      }
      .mobile-btn-link {
        width: 100%;
        background: transparent;
        border: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        cursor: pointer;
        text-align: left;
        font-family: inherit;
      }
      .mobile-link {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 0;
        color: #FFFFFF;
        font-size: 1rem;
        font-weight: 500;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }
      .mobile-link:hover {
        color: var(--primary-orange);
      }
      .mobile-link-featured {
        color: var(--primary-orange);
      }
      .mobile-menu-footer {
        display: flex;
        gap: 12px;
        margin-top: 20px;
      }
      .mobile-menu-footer .btn {
        flex: 1;
      }
    }
  `]
})
export class NavbarComponent {
  @Output() formSelected = new EventEmitter<string>();
  isScrolled = false;
  mobileMenuOpen = false;

  constructor(public portfolioService: PortfolioService) {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        this.isScrolled = window.scrollY > 40;
      });
    }
  }

  selectContact(): void {
    this.formSelected.emit('contact');
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
