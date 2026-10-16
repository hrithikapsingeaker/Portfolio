import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero" class="hero-section">
      <div class="container hero-container">
        
        <!-- Left Hero Content (Matching Reference Figma Design) -->
        <div class="hero-left">
          
          <div class="intro-greeting">Hi I am</div>
          <h2 class="intro-name">Hrithik Apsingekar</h2>
          <h1 class="hero-profession">
            Software <br>
            <span class="text-orange">Developer</span>
          </h1>

          <p class="hero-desc">
            Full-Stack Software Developer with <strong>1.4+ years</strong> of commercial experience crafting 
            high-performance enterprise web applications and desktop solutions using 
            <strong>C#</strong>, <strong>.NET Framework</strong>, <strong>ASP.NET MVC</strong>, 
            <strong>ADO.NET</strong>, <strong>WinForms</strong>, and <strong>Microsoft SQL Server</strong>.
          </p>

          <!-- Social Media Icons Row (Round dark pill buttons from Figma) -->
          <div class="social-icons-row">
            <a [href]="portfolioService.personalInfo.linkedinUrl" target="_blank" rel="noopener noreferrer" class="social-circle" title="LinkedIn Profile">
              <i class="fa-brands fa-linkedin-in"></i>
            </a>
            <a [href]="'mailto:' + portfolioService.personalInfo.email" class="social-circle" title="Send Email">
              <i class="fa-solid fa-envelope"></i>
            </a>
            <a href="https://github.com/hrithikapsingekar" target="_blank" rel="noopener noreferrer" class="social-circle" title="GitHub Repository">
              <i class="fa-brands fa-github"></i>
            </a>
          </div>

          <!-- Buttons Group (Hire Me, View Resume Modal, Download CV) -->
          <div class="hero-buttons">
            <a href="#forms-hub" (click)="selectForm('contact')" class="btn btn-primary btn-lg">
              <i class="fa-solid fa-paper-plane"></i>
              <span>Hire Me</span>
            </a>
            <button type="button" (click)="openResume()" class="btn btn-cv-view btn-lg">
              <i class="fa-solid fa-file-contract"></i>
              <span>View Resume</span>
            </button>
            <a [href]="portfolioService.personalInfo.resumeUrl" download="Hrithik_Apsingekar_Resume.pdf" class="btn btn-cv-outline btn-lg" title="Direct Download">
              <i class="fa-solid fa-download"></i>
              <span>Download CV</span>
            </a>
          </div>

          <!-- Stats Row from Reference Design -->
          <div class="stats-card-group">
            <div class="stat-item">
              <div class="stat-number">1.4+</div>
              <div class="stat-label">Years Experience</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-number">3+</div>
              <div class="stat-label">Enterprise Systems</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-number">100%</div>
              <div class="stat-label">Production Quality</div>
            </div>
          </div>

        </div>

        <!-- Right Hero Visual (Exact Reference Style: Dark Circle + B&W Pop-Out Portrait + Feathered/Blurred Edges) -->
        <div class="hero-right">
          <div class="visual-composition">
            
            <!-- Soft Ambient Glow behind the circular backdrop -->
            <div class="ambient-glow"></div>

            <!-- Large Dark Geometric Disc Backdrop (Centered behind torso) -->
            <div class="hero-backdrop-circle"></div>

            <!-- Cutout Portrait: Black & White, Scaled Big, Head Popping Out, Feathered/Blurred Sides & Bottom -->
            <div class="portrait-container">
              <img 
                [src]="portfolioService.personalInfo.avatarUrl" 
                alt="Hrithik Apsingekar - Software Developer" 
                class="hero-cutout-img"
              />
              
              <!-- Soft Vignette & Optical Blur Overlays (Left, Right, Bottom) -->
              <div class="edge-blur-left"></div>
              <div class="edge-blur-right"></div>
              <div class="edge-blur-bottom"></div>
            </div>

            <!-- Subtle Verified Tag Floating at the Bottom-Right -->
            <div class="floating-tech-badge badge-bottom-right">
              <div class="ftb-icon"><i class="fa-solid fa-layer-group"></i></div>
              <div class="ftb-info">
                <strong>Software Programmer</strong>
                <span>Tweak Software & Solution</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      min-height: 100vh;
      padding: 95px 0 25px 0;
      position: relative;
      display: flex;
      align-items: center;
      background: #1E1E1E;
      box-sizing: border-box;
      overflow: hidden;
    }
    .hero-container {
      display: grid;
      grid-template-columns: 1.05fr 1fr;
      gap: 36px;
      align-items: center;
      width: 100%;
      max-width: 1260px;
      margin: 0 auto;
      padding: 0 24px;
    }
    .hero-left {
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 2;
    }
    .intro-greeting {
      font-size: 1.2rem;
      font-weight: 600;
      color: #A3A3A3;
      letter-spacing: 0.02em;
      line-height: 1.2;
    }
    .intro-name {
      font-size: 1.65rem;
      font-weight: 700;
      color: #FFFFFF;
      line-height: 1.2;
    }
    .hero-profession {
      font-size: clamp(2.8rem, 4.2vw, 4.1rem);
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: -0.02em;
      margin: 2px 0 8px 0;
      color: #FFFFFF;
    }
    .hero-desc {
      font-size: 1rem;
      line-height: 1.6;
      color: #B0B0B0;
      max-width: 540px;
      margin: 0;
    }
    .hero-desc strong {
      color: #FFFFFF;
    }

    /* Social Icons Circle Row */
    .social-icons-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 6px 0 8px 0;
    }
    .social-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #252525;
      border: 1px solid rgba(255, 255, 255, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      font-size: 1rem;
      transition: all 0.25s ease;
    }
    .social-circle:hover {
      background: var(--primary-orange);
      border-color: var(--primary-orange);
      color: #FFFFFF;
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(253, 111, 0, 0.4);
    }

    /* Buttons Group */
    .hero-buttons {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      margin: 8px 0 14px 0;
    }
    .hero-buttons .btn {
      padding: 13px 26px;
      font-size: 0.95rem;
      border-radius: var(--radius-sm);
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn-cv-view {
      background: rgba(253, 111, 0, 0.15);
      color: #FD6F00;
      border: 1.5px solid #FD6F00;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.25s ease;
    }
    .btn-cv-view:hover {
      background: #FD6F00;
      color: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(253, 111, 0, 0.4);
    }
    .btn-cv-outline {
      background: transparent;
      color: #D1D5DB;
      border: 1.5px solid rgba(255, 255, 255, 0.35);
      font-weight: 600;
      transition: all 0.25s ease;
    }
    .btn-cv-outline:hover {
      border-color: #FFFFFF;
      color: #FFFFFF;
      background: rgba(255, 255, 255, 0.08);
      transform: translateY(-2px);
    }

    /* Stats Card Group */
    .stats-card-group {
      display: inline-flex;
      align-items: center;
      background: #171717;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: var(--radius-md);
      padding: 14px 26px;
      gap: 24px;
      max-width: fit-content;
      margin-top: 4px;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
    }
    .stat-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .stat-number {
      font-size: 1.75rem;
      font-weight: 800;
      color: var(--primary-orange);
      font-family: var(--font-heading);
      line-height: 1;
    }
    .stat-label {
      font-size: 0.78rem;
      color: #A3A3A3;
      font-weight: 500;
      white-space: nowrap;
    }
    .stat-divider {
      width: 1px;
      height: 36px;
      background: rgba(255, 255, 255, 0.12);
    }

    /* Right Visual Composition (Matching Reference Image) */
    .hero-right {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      position: relative;
    }
    .visual-composition {
      position: relative;
      width: clamp(480px, 46vw, 620px);
      height: clamp(650px, 86vh, 830px);
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    /* Soft Ambient Glow */
    .ambient-glow {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      width: 580px;
      height: 580px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(253, 111, 0, 0.09) 0%, rgba(20, 20, 20, 0) 70%);
      filter: blur(60px);
      z-index: 0;
      pointer-events: none;
    }

    /* Dark Geometric Disc Backdrop (Centered behind torso, exactly like reference) */
    .hero-backdrop-circle {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      width: clamp(430px, 43vw, 560px);
      height: clamp(430px, 43vw, 560px);
      border-radius: 50%;
      background: radial-gradient(circle at 50% 48%, #262626 0%, #1A1A1A 70%, #141414 100%);
      border: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.75), inset 0 0 40px rgba(0, 0, 0, 0.5);
      z-index: 1;
      pointer-events: none;
    }

    /* Portrait Container */
    .portrait-container {
      position: relative;
      z-index: 3;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      overflow: hidden;
    }

    /* Black & White Portrait with Mask-Based Soft Feathering from Down, Left & Right Sides */
    .hero-cutout-img {
      max-width: 100%;
      max-height: 830px;
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: bottom center;
      
      /* Black & White Monochrome Grade (Matching reference image) */
      filter: grayscale(100%) contrast(1.16) brightness(0.96) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.85));
      
      /* Smooth edge feathering: Down side, left side, and right side blur/fade out */
      -webkit-mask-image: 
        linear-gradient(to top, transparent 0%, rgba(0,0,0,0.15) 5%, rgba(0,0,0,0.85) 18%, black 28%),
        linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 5%, rgba(0,0,0,0.85) 15%, black 24%, black 76%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,0.3) 95%, transparent 100%);
      -webkit-mask-composite: source-in;
      mask-composite: intersect;

      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s ease;
      user-select: none;
      pointer-events: auto;
      image-rendering: -webkit-optimize-contrast;
      transform: translateZ(0);
    }

    .visual-composition:hover .hero-cutout-img {
      transform: translateY(-5px) scale(1.02);
      filter: grayscale(100%) contrast(1.2) brightness(1.0) drop-shadow(0 25px 50px rgba(0, 0, 0, 0.95));
    }

    /* Optical Edge Blur Overlays: Soft blur & fade from bottom, left, and right */
    .edge-blur-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 130px;
      background: linear-gradient(to top, #1E1E1E 15%, rgba(30, 30, 30, 0.85) 45%, transparent 100%);
      pointer-events: none;
      z-index: 4;
    }

    .edge-blur-left {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 75px;
      height: 75%;
      background: linear-gradient(to right, #1E1E1E 0%, rgba(30, 30, 30, 0.75) 45%, transparent 100%);
      pointer-events: none;
      z-index: 4;
    }

    .edge-blur-right {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 75px;
      height: 75%;
      background: linear-gradient(to left, #1E1E1E 0%, rgba(30, 30, 30, 0.75) 45%, transparent 100%);
      pointer-events: none;
      z-index: 4;
    }

    /* Floating Verified Experience Badge */
    .floating-tech-badge {
      position: absolute;
      z-index: 5;
      background: rgba(22, 22, 22, 0.94);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--radius-sm);
      padding: 9px 15px;
      display: flex;
      align-items: center;
      gap: 12px;
      box-shadow: 0 14px 35px rgba(0, 0, 0, 0.7);
    }
    .badge-bottom-right {
      bottom: 30px;
      right: -10px;
      animation: floatBadge2 4s ease-in-out infinite alternate 0.8s;
    }

    @keyframes floatBadge2 {
      from { transform: translateY(0); }
      to { transform: translateY(-5px); }
    }

    .ftb-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      background: var(--primary-orange-light);
      color: var(--primary-orange);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.05rem;
      flex-shrink: 0;
    }
    .ftb-info {
      display: flex;
      flex-direction: column;
    }
    .ftb-info strong {
      font-size: 0.86rem;
      color: #FFFFFF;
    }
    .ftb-info span {
      font-size: 0.72rem;
      color: #A3A3A3;
    }

    @media (max-width: 1200px) {
      .hero-container {
        gap: 20px;
      }
      .visual-composition {
        width: 440px;
        height: 640px;
      }
      .hero-backdrop-circle {
        width: 380px;
        height: 380px;
      }
    }

    @media (max-width: 900px) {
      .hero-section {
        min-height: auto;
        padding: 100px 0 40px 0;
      }
      .hero-container {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 32px;
      }
      .hero-left {
        align-items: center;
      }
      .hero-profession { font-size: 2.6rem; }
      .social-icons-row { justify-content: center; }
      .hero-buttons { justify-content: center; }
      .stats-card-group { margin: 0 auto; }
      .visual-composition {
        width: 340px;
        height: 520px;
        margin: 15px auto 0 auto;
      }
      .hero-backdrop-circle {
        width: 290px;
        height: 290px;
        bottom: 25px;
      }
      .hero-cutout-img {
        max-height: 520px;
      }
      .badge-bottom-right {
        bottom: 10px;
        right: 0;
      }
    }

    @media (max-width: 480px) {
      .visual-composition {
        width: 290px;
        height: 440px;
      }
      .hero-backdrop-circle {
        width: 240px;
        height: 240px;
      }
      .hero-cutout-img {
        max-height: 440px;
      }
      .floating-tech-badge {
        padding: 7px 12px;
      }
    }
  `]
})
export class HeroComponent {
  @Output() formSelected = new EventEmitter<string>();

  constructor(public portfolioService: PortfolioService) {}

  selectForm(type: string): void {
    this.formSelected.emit(type);
  }

  openResume(): void {
    this.portfolioService.openResumeModal();
  }
}
